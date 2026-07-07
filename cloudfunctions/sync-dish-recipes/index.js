// 云函数：把本地菜谱的 price / desc / ingredients / steps 同步到云数据库 dishes
//
// 使用方式：
// 1. 上传部署本云函数 sync-dish-recipes
// 2. 先调用 { "dryRun": true } 预览匹配情况
// 3. 确认后调用 { "dryRun": false, "updateLimit": 20 } 分批更新
//
// 本函数只更新 price、desc、ingredients、steps，不会修改 image / category。

const cloud = require('wx-server-sdk');
const recipes = require('./recipes.json');

const CLOUD_ENV = 'cloud1-d7gcfpwmc6468882a';
const COLLECTION = 'dishes';
const DEFAULT_UPDATE_LIMIT = 20;

cloud.init({ env: CLOUD_ENV });

const db = cloud.database();

exports.main = async (event = {}) => {
  const dryRun = event.dryRun !== false;
  const updateLimit = normalizePositiveInteger(event.updateLimit, DEFAULT_UPDATE_LIMIT, 50);
  const targetNames = normalizeTargetNames(event.names || event.targetNames);

  const localRecipes = filterRecipes(recipes, targetNames);
  const cloudDishes = await fetchAllDishes();
  const cloudByName = groupByName(cloudDishes);
  const plan = buildUpdatePlan(localRecipes, cloudByName);

  if (dryRun) {
    return {
      ok: true,
      dryRun: true,
      localRecipeCount: localRecipes.length,
      cloudDishCount: cloudDishes.length,
      willUpdateCount: plan.toUpdate.length,
      alreadySyncedCount: plan.alreadySynced.length,
      duplicateNameCount: plan.duplicates.length,
      missingCount: plan.missing.length,
      willUpdate: plan.toUpdate.map(formatPreviewItem),
      alreadySynced: plan.alreadySynced.map(formatPreviewItem),
      duplicates: plan.duplicates,
      missing: plan.missing,
      message: '预演完成，未修改数据库。确认 willUpdate 后传 { "dryRun": false } 正式更新。'
    };
  }

  const batch = plan.toUpdate.slice(0, updateLimit);
  const result = await updateRecipes(batch);

  return {
    ok: result.failed.length === 0,
    dryRun: false,
    localRecipeCount: localRecipes.length,
    cloudDishCount: cloudDishes.length,
    matchedCount: plan.toUpdate.length,
    attempted: batch.length,
    updated: result.updated.length,
    failed: result.failed,
    updatedItems: result.updated,
    remaining: Math.max(plan.toUpdate.length - batch.length, 0),
    hasMore: plan.toUpdate.length > batch.length,
    alreadySyncedCount: plan.alreadySynced.length,
    duplicateNameCount: plan.duplicates.length,
    missingCount: plan.missing.length,
    message: plan.toUpdate.length > batch.length
      ? `本批更新 ${result.updated.length} 条，还有 ${plan.toUpdate.length - batch.length} 条，请继续调用 { "dryRun": false }。`
      : `同步完成，本批更新 ${result.updated.length} 条，失败 ${result.failed.length} 条。`
  };
};

async function fetchAllDishes() {
  const dishes = [];
  const pageSize = 100;
  let skip = 0;

  while (true) {
    const res = await db.collection(COLLECTION)
      .field({
        name: true,
        price: true,
        desc: true,
        ingredients: true,
        steps: true
      })
      .skip(skip)
      .limit(pageSize)
      .get();

    dishes.push(...res.data);

    if (res.data.length < pageSize) break;
    skip += pageSize;
  }

  return dishes;
}

function buildUpdatePlan(localRecipes, cloudByName) {
  const toUpdate = [];
  const alreadySynced = [];
  const missing = [];
  const duplicates = [];

  localRecipes.forEach(recipe => {
    const cloudMatches = cloudByName[recipe.name] || [];

    if (cloudMatches.length === 0) {
      missing.push({
        name: recipe.name,
        reason: '云数据库中没有同名菜品'
      });
      return;
    }

    if (cloudMatches.length > 1) {
      duplicates.push({
        name: recipe.name,
        count: cloudMatches.length,
        dishIds: cloudMatches.map(dish => dish._id)
      });
      return;
    }

    const item = {
      dishId: cloudMatches[0]._id,
      name: recipe.name,
      price: Number(recipe.price) || 0,
      desc: String(recipe.desc || ''),
      ingredients: recipe.ingredients,
      steps: recipe.steps
    };

    if (isRecipeSynced(cloudMatches[0], item)) {
      alreadySynced.push(item);
      return;
    }

    toUpdate.push(item);
  });

  return { toUpdate, alreadySynced, missing, duplicates };
}

async function updateRecipes(items) {
  const results = await Promise.all(items.map(async item => {
    try {
      const updateRes = await db.collection(COLLECTION).doc(item.dishId).update({
        data: {
          price: item.price,
          desc: item.desc,
          ingredients: item.ingredients,
          steps: item.steps
        }
      });

      return {
        ok: true,
        item: {
          dishId: item.dishId,
          name: item.name,
          price: item.price,
          descLength: String(item.desc || '').length,
          ingredientCount: Array.isArray(item.ingredients) ? item.ingredients.length : 0,
          stepCount: Array.isArray(item.steps) ? item.steps.length : 0,
          updateStats: updateRes.stats || null
        }
      };
    } catch (error) {
      return {
        ok: false,
        failure: {
          dishId: item.dishId,
          name: item.name,
          error: error.message
        }
      };
    }
  }));

  return {
    updated: results
      .filter(result => result.ok)
      .map(result => result.item),
    failed: results
      .filter(result => result.failure)
      .map(result => result.failure)
  };
}

function filterRecipes(items, targetNames) {
  const normalized = items
    .filter(item => item && item.name)
    .map(item => ({
      name: item.name,
      price: Number(item.price) || 0,
      desc: String(item.desc || ''),
      ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
      steps: Array.isArray(item.steps) ? item.steps : []
    }));

  if (targetNames.length === 0) return normalized;

  const targetNameSet = new Set(targetNames);
  return normalized.filter(item => targetNameSet.has(item.name));
}

function groupByName(items) {
  const byName = {};
  items.forEach(item => {
    if (!item.name) return;
    if (!byName[item.name]) byName[item.name] = [];
    byName[item.name].push(item);
  });
  return byName;
}

function isRecipeSynced(cloudDish, localDish) {
  return Number(cloudDish.price) === Number(localDish.price)
    && String(cloudDish.desc || '') === String(localDish.desc || '')
    && stableStringify(cloudDish.ingredients || []) === stableStringify(localDish.ingredients || [])
    && stableStringify(cloudDish.steps || []) === stableStringify(localDish.steps || []);
}

function stableStringify(value) {
  return JSON.stringify(value);
}

function formatPreviewItem(item) {
  return {
    dishId: item.dishId,
    name: item.name,
    price: item.price,
    descLength: String(item.desc || '').length,
    ingredientCount: Array.isArray(item.ingredients) ? item.ingredients.length : 0,
    stepCount: Array.isArray(item.steps) ? item.steps.length : 0
  };
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
