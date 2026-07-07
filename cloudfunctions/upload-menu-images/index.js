// 云函数：把云存储中的菜单图片 fileID 批量回填到 dishes.image
//
// 推荐流程：
// 1. 将压缩后的图片上传到云存储 menu/ 目录，例如 menu/宫保鸡丁.webp
// 2. 先调用本云函数并传入 { "dryRun": true } 查看匹配报告
// 3. 确认无误后重复调用 { "dryRun": false }，函数会自动处理下一批

const cloud = require('wx-server-sdk');

const CLOUD_ENV = 'cloud1-d7gcfpwmc6468882a';
const DEFAULT_CLOUD_FILE_PREFIX = 'cloud://cloud1-d7gcfpwmc6468882a.636c-cloud1-d7gcfpwmc6468882a-1437000386';
const COLLECTION = 'dishes';
const DEFAULT_IMAGE_PLACEHOLDERS = ['', 'cloud://xxxx.png'];
const DEFAULT_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg'];
const DEFAULT_STORAGE_DIR = 'menu';
const DEFAULT_UPDATE_LIMIT = 5;

// 本地菜名和图片文件名不一致时，在这里做映射：菜名 -> 云存储文件名（不含扩展名）
const DEFAULT_FILENAME_ALIASES = {
  '脆皮烧肉': '脆皮烤肉',
  '青椒肉丝': '青椒炒肉'
};

cloud.init({ env: CLOUD_ENV });

const db = cloud.database();

exports.main = async (event = {}) => {
  if (event.action === 'cleanupDuplicatePlaceholders') {
    return cleanupDuplicatePlaceholders(event);
  }

  const options = normalizeOptions(event);
  const dishes = await fetchAllDishes();
  const targetDishes = filterTargetDishes(dishes, options);
  const candidates = buildCandidates(targetDishes, options);

  if (candidates.fileIDs.length === 0) {
    return {
      ok: true,
      dryRun: options.dryRun,
      total: dishes.length,
      target: targetDishes.length,
      eligible: 0,
      matched: 0,
      updated: 0,
      skipped: dishes.map(formatAlreadyHasImage),
      unmatched: [],
      failed: [],
      message: '没有需要更新的菜品。'
    };
  }

  const existingFileIDs = await findExistingFileIDs(candidates.fileIDs);
  const matches = pickMatches(dishes, candidates.fileIDToDishName, existingFileIDs, options);

  if (options.dryRun) {
    const unmatched = findUnmatched(dishes, matches.byDishName, options);
    const skipped = dishes
      .filter(dish => !shouldUpdateDish(dish, options))
      .map(formatAlreadyHasImage);

    return {
      ok: true,
      dryRun: true,
      total: dishes.length,
      target: targetDishes.length,
      eligible: candidates.eligibleCount,
      matched: matches.list.length,
      updated: 0,
      matches: matches.list,
      unmatched,
      skipped,
      failed: [],
      message: 'dryRun 预演完成，未修改数据库。确认 matches 后传 { "dryRun": false } 正式更新。'
    };
  }

  const matchesToUpdate = matches.list.slice(0, options.updateLimit);
  const updateResult = await updateDishes(matchesToUpdate);
  const remainingInCurrentBatch = Math.max(matches.list.length - matchesToUpdate.length, 0);

  return {
    ok: updateResult.failed.length === 0 && updateResult.unverified.length === 0,
    dryRun: false,
    total: dishes.length,
    target: targetDishes.length,
    eligible: candidates.eligibleCount,
    matched: matches.list.length,
    attempted: matchesToUpdate.length,
    updated: updateResult.updated.length,
    verified: updateResult.verified.length,
    remainingInCurrentBatch,
    hasMore: candidates.eligibleCount > updateResult.verified.length,
    updatedItems: updateResult.updated,
    verifiedItems: updateResult.verified,
    unverified: updateResult.unverified,
    failed: updateResult.failed,
    message: candidates.eligibleCount > updateResult.verified.length
      ? `本批验证更新 ${updateResult.verified.length} 条。请继续调用 { "dryRun": false } 处理下一批。`
      : `当前没有更多可匹配更新项。本批验证更新 ${updateResult.verified.length} 条，失败 ${updateResult.failed.length} 条。`
  };
};

async function cleanupDuplicatePlaceholders(event = {}) {
  const dryRun = event.dryRun !== false;
  const deleteLimit = normalizePositiveInteger(event.deleteLimit, 20, 50);
  const dishes = await fetchAllDishes({ includeAllFields: true });
  const duplicateGroups = findDuplicateGroups(dishes);
  const toDelete = [];

  duplicateGroups.forEach(group => {
    group.items
      .filter(dish => imageContainsPlaceholderText(dish.image))
      .forEach(dish => {
        toDelete.push({
          dishId: dish._id,
          name: dish.name,
          image: dish.image || '',
          category: dish.category || '',
          price: dish.price
        });
      });
  });

  if (dryRun) {
    return {
      ok: true,
      action: 'cleanupDuplicatePlaceholders',
      dryRun: true,
      totalBefore: dishes.length,
      duplicateNameCount: duplicateGroups.length,
      duplicateNames: duplicateGroups.map(group => ({
        name: group.name,
        count: group.items.length,
        placeholderCount: group.items.filter(dish => imageContainsPlaceholderText(dish.image)).length
      })),
      willDeleteCount: toDelete.length,
      willDelete: toDelete,
      message: '预演完成，未删除数据。确认无误后传 { "action": "cleanupDuplicatePlaceholders", "dryRun": false }。'
    };
  }

  const batch = toDelete.slice(0, deleteLimit);
  const deleteResult = await deleteDishes(batch);
  const totalAfter = await countDishes();
  const remainingDuplicateGroups = findDuplicateGroups(await fetchAllDishes({ includeAllFields: true }));

  return {
    ok: deleteResult.failed.length === 0,
    action: 'cleanupDuplicatePlaceholders',
    dryRun: false,
    totalBefore: dishes.length,
    attempted: batch.length,
    deleted: deleteResult.deleted.length,
    deletedItems: deleteResult.deleted,
    failed: deleteResult.failed,
    remainingDeleteCandidates: Math.max(toDelete.length - batch.length, 0),
    totalAfter,
    duplicateNameCountAfter: remainingDuplicateGroups.length,
    duplicateNamesAfter: remainingDuplicateGroups.map(group => ({
      name: group.name,
      count: group.items.length,
      placeholderCount: group.items.filter(dish => imageContainsPlaceholderText(dish.image)).length
    })),
    message: Math.max(toDelete.length - batch.length, 0) > 0
      ? '本批删除完成，还有候选项，请再次执行相同参数继续删除。'
      : `重复占位菜清理完成，dishes 当前还有 ${totalAfter} 条。`
  };
}

function normalizeOptions(event) {
  const dryRun = event.dryRun !== false;
  const storageDir = trimSlashes(event.storageDir || DEFAULT_STORAGE_DIR);
  const cloudFilePrefix = trimSlashes(event.cloudFilePrefix || DEFAULT_CLOUD_FILE_PREFIX);
  const extensions = Array.isArray(event.extensions) && event.extensions.length > 0
    ? event.extensions
    : (dryRun ? DEFAULT_EXTENSIONS : ['.webp']);
  const aliases = Object.assign({}, DEFAULT_FILENAME_ALIASES, event.aliases || {});

  return {
    dryRun,
    force: event.force === true,
    updateLimit: normalizePositiveInteger(event.updateLimit, DEFAULT_UPDATE_LIMIT, 10),
    targetNames: normalizeTargetNames(event.names || event.targetNames),
    cloudFilePrefix,
    storageDir,
    extensions: extensions.map(normalizeExtension),
    aliases,
    placeholders: DEFAULT_IMAGE_PLACEHOLDERS
  };
}

function filterTargetDishes(dishes, options) {
  if (options.dryRun) {
    return dishes;
  }

  if (options.targetNames.length === 0) {
    return dishes
      .filter(dish => shouldUpdateDish(dish, options))
      .slice(0, options.updateLimit);
  }

  const targetNameSet = new Set(options.targetNames);
  return dishes.filter(dish => targetNameSet.has(dish.name));
}

async function fetchAllDishes(options = {}) {
  const allDishes = [];
  const pageSize = 100;
  let skip = 0;

  while (true) {
    let query = db.collection(COLLECTION).skip(skip).limit(pageSize);
    if (!options.includeAllFields) {
      query = query.field({ name: true, image: true });
    }
    const res = await query.get();

    allDishes.push(...res.data);

    if (res.data.length < pageSize) break;
    skip += pageSize;
  }

  return allDishes;
}

async function countDishes() {
  const res = await db.collection(COLLECTION).count();
  return res.total;
}

function buildCandidates(dishes, options) {
  const fileIDs = [];
  const fileIDToDishName = {};
  let eligibleCount = 0;

  for (const dish of dishes) {
    if (!shouldUpdateDish(dish, options)) continue;

    eligibleCount += 1;

    const fileBaseNames = getCandidateFileBaseNames(dish.name, options.aliases);
    for (const fileBaseName of fileBaseNames) {
      for (const ext of options.extensions) {
        const fileID = `${options.cloudFilePrefix}/${options.storageDir}/${fileBaseName}${ext}`;
        fileIDs.push(fileID);
        fileIDToDishName[fileID] = dish.name;
      }
    }
  }

  return { fileIDs, fileIDToDishName, eligibleCount };
}

async function findExistingFileIDs(fileIDs) {
  const existingFileIDs = [];
  const batchSize = 50;

  for (let i = 0; i < fileIDs.length; i += batchSize) {
    const batch = fileIDs.slice(i, i + batchSize);
    const res = await cloud.getTempFileURL({ fileList: batch });

    for (const file of res.fileList) {
      if (file.status === 0) {
        existingFileIDs.push(file.fileID);
      }
    }
  }

  return existingFileIDs;
}

function pickMatches(dishes, fileIDToDishName, existingFileIDs) {
  const dishByName = {};
  dishes.forEach(dish => {
    dishByName[dish.name] = dish;
  });

  const byDishName = {};
  const list = [];

  for (const fileID of existingFileIDs) {
    const dishName = fileIDToDishName[fileID];
    if (!dishName || byDishName[dishName]) continue;

    const dish = dishByName[dishName];
    if (!dish) continue;

    const item = {
      dishId: dish._id,
      name: dish.name,
      from: dish.image || '',
      to: fileID
    };
    byDishName[dishName] = item;
    list.push(item);
  }

  return { byDishName, list };
}

function findUnmatched(dishes, matchedByDishName, options) {
  return dishes
    .filter(dish => shouldUpdateDish(dish, options))
    .filter(dish => !matchedByDishName[dish.name])
    .map(dish => ({
      name: dish.name,
      currentImage: dish.image || '',
      expectedFiles: getCandidateFileBaseNames(dish.name, options.aliases)
        .flatMap(fileBaseName => options.extensions.map(ext => `${options.cloudFilePrefix}/${options.storageDir}/${fileBaseName}${ext}`))
    }));
}

async function updateDishes(matches) {
  const results = await Promise.all(matches.map(async match => {
    try {
      const updateRes = await db.collection(COLLECTION).doc(match.dishId).update({
        data: { image: match.to }
      });

      const verifyRes = await db.collection(COLLECTION).doc(match.dishId)
        .field({ image: true })
        .get();
      const actualImage = verifyRes.data && verifyRes.data.image;

      if (actualImage === match.to) {
        return {
          ok: true,
          match: Object.assign({}, match, {
            updateStats: updateRes.stats || null,
            actualImage
          })
        };
      }

      return {
        ok: false,
        unverified: {
          name: match.name,
          dishId: match.dishId,
          expectedImage: match.to,
          actualImage: actualImage || '',
          updateStats: updateRes.stats || null
        }
      };
    } catch (error) {
      return {
        ok: false,
        failure: {
          name: match.name,
          fileID: match.to,
          error: error.message
        }
      };
    }
  }));

  const updated = results
    .filter(item => item.ok)
    .map(item => item.match);
  const verified = updated;
  const unverified = results
    .filter(item => item.unverified)
    .map(item => item.unverified);
  const failed = results
    .filter(item => item.failure)
    .map(item => item.failure);

  return { updated, verified, unverified, failed };
}

function shouldUpdateDish(dish, options) {
  if (options.force) return true;
  return options.placeholders.includes(dish.image || '');
}

function getCandidateFileBaseNames(dishName, aliases) {
  const names = [dishName];
  const alias = aliases[dishName];

  if (alias && alias !== dishName) {
    names.push(alias);
  }

  return names;
}

function normalizeExtension(ext) {
  return ext.startsWith('.') ? ext : `.${ext}`;
}

function normalizeTargetNames(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map(item => String(item).trim())
    .filter(Boolean);
}

function normalizePositiveInteger(value, defaultValue, maxValue) {
  const limit = Number(value || defaultValue);
  if (!Number.isFinite(limit) || limit <= 0) return defaultValue;
  return Math.min(Math.floor(limit), maxValue);
}

function trimSlashes(value) {
  return String(value).replace(/^\/+|\/+$/g, '');
}

function formatAlreadyHasImage(dish) {
  return {
    name: dish.name,
    currentImage: dish.image || ''
  };
}

function findDuplicateGroups(dishes) {
  const byName = {};
  dishes.forEach(dish => {
    if (!dish.name) return;
    if (!byName[dish.name]) byName[dish.name] = [];
    byName[dish.name].push(dish);
  });

  return Object.keys(byName)
    .filter(name => byName[name].length > 1)
    .map(name => ({
      name,
      items: byName[name]
    }));
}

function imageContainsPlaceholderText(image) {
  return String(image || '').includes('xxx');
}

async function deleteDishes(items) {
  const results = await Promise.all(items.map(async item => {
    try {
      const res = await db.collection(COLLECTION).doc(item.dishId).remove();
      return {
        ok: true,
        item: Object.assign({}, item, { removeStats: res.stats || null })
      };
    } catch (error) {
      return {
        ok: false,
        failure: {
          dishId: item.dishId,
          name: item.name,
          image: item.image,
          error: error.message
        }
      };
    }
  }));

  return {
    deleted: results
      .filter(result => result.ok)
      .map(result => result.item),
    failed: results
      .filter(result => result.failure)
      .map(result => result.failure)
  };
}
