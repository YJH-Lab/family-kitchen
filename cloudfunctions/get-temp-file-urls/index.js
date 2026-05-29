const cloud = require('wx-server-sdk');

cloud.init({ env: 'cloud1-d7gcfpwmc6468882a' });

exports.main = async (event = {}) => {
  const fileList = Array.isArray(event.fileList)
    ? event.fileList.filter(fileID => typeof fileID === 'string' && fileID.startsWith('cloud://'))
    : [];

  if (fileList.length === 0) {
    return {
      ok: true,
      fileList: []
    };
  }

  const result = [];
  const batchSize = 50;

  for (let i = 0; i < fileList.length; i += batchSize) {
    const batch = fileList.slice(i, i + batchSize);
    const res = await cloud.getTempFileURL({ fileList: batch });
    result.push(...res.fileList);
  }

  return {
    ok: true,
    fileList: result
  };
};
