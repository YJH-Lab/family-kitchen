const DEFAULT_IMAGE = '/images/default-goods-image.png';
const CLOUD_ENV = 'cloud1-d7gcfpwmc6468882a';

export async function attachDisplayImages(items, imageKey = 'image') {
  const list = Array.isArray(items) ? items : [];
  const cloudFileIDs = Array.from(new Set(
    list
      .map(item => item && item[imageKey])
      .filter(isCloudFileID)
  ));

  if (cloudFileIDs.length === 0) {
    return list.map(item => withDisplayImage(item, item && item[imageKey]));
  }

  try {
    const tempUrlMap = await getTempUrlMapWithFallback(cloudFileIDs);
    const successCount = Object.keys(tempUrlMap).length;
    if (successCount < cloudFileIDs.length) {
      console.warn('部分云图片转换失败：', {
        total: cloudFileIDs.length,
        success: successCount,
        failed: cloudFileIDs.filter(fileID => !tempUrlMap[fileID]).slice(0, 10)
      });
    }

    return list.map(item => {
      const image = item && item[imageKey];
      return withDisplayImage(item, tempUrlMap[image] || DEFAULT_IMAGE);
    });
  } catch (error) {
    console.error('转换云图片地址失败：', error);
    return list.map(item => withDisplayImage(item, DEFAULT_IMAGE));
  }
}

export async function attachDisplayImage(item, imageKey = 'image') {
  const list = await attachDisplayImages(item ? [item] : [], imageKey);
  return list[0] || null;
}

function isCloudFileID(value) {
  return typeof value === 'string' && value.startsWith('cloud://');
}

async function getTempUrlMap(fileIDs) {
  const map = {};
  const batchSize = 50;

  for (let i = 0; i < fileIDs.length; i += batchSize) {
    const fileList = fileIDs.slice(i, i + batchSize);
    const res = await wx.cloud.callFunction({
      name: 'get-temp-file-urls',
      data: { fileList }
    });
    const cloudResult = res.result || {};

    (cloudResult.fileList || []).forEach(file => {
      if (file.status === 0 && file.tempFileURL) {
        map[file.fileID] = file.tempFileURL;
      } else {
        console.warn('云图片临时地址获取失败：', {
          fileID: file.fileID,
          status: file.status,
          errMsg: file.errMsg
        });
      }
    });
  }

  return map;
}

async function getTempUrlMapWithFallback(fileIDs) {
  const primaryMap = await getTempUrlMap(fileIDs);
  const failedFileIDs = fileIDs.filter(fileID => !primaryMap[fileID]);

  if (failedFileIDs.length === 0) {
    return primaryMap;
  }

  const shortFileIDMap = {};
  const shortFileIDs = failedFileIDs
    .map(fileID => {
      const shortFileID = toShortCloudFileID(fileID);
      shortFileIDMap[shortFileID] = fileID;
      return shortFileID;
    })
    .filter(fileID => fileID !== shortFileIDMap[fileID]);

  if (shortFileIDs.length === 0) {
    return primaryMap;
  }

  const fallbackMap = await getTempUrlMap(shortFileIDs);
  Object.keys(fallbackMap).forEach(shortFileID => {
    const originalFileID = shortFileIDMap[shortFileID];
    primaryMap[originalFileID] = fallbackMap[shortFileID];
  });

  return primaryMap;
}

function toShortCloudFileID(fileID) {
  const prefix = `cloud://${CLOUD_ENV}.`;
  if (!fileID.startsWith(prefix)) {
    return fileID;
  }

  const pathStart = fileID.indexOf('/', prefix.length);
  if (pathStart < 0) {
    return fileID;
  }

  return `cloud://${CLOUD_ENV}${fileID.slice(pathStart)}`;
}

function withDisplayImage(item, image) {
  return Object.assign({}, item, {
    displayImage: normalizeImage(image)
  });
}

function normalizeImage(image) {
  if (!image || image === 'cloud://xxxx.png' || isCloudFileID(image)) {
    return DEFAULT_IMAGE;
  }

  return image;
}
