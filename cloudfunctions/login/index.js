// cloudfunctions/login/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  // 如果带有 updateProfile 动作，则用云函数管理员权限直接更新资料
  if (event.action === 'updateProfile') {
    const { avatarUrl, nickName } = event;
    const userRes = await db.collection('users').where({ openid }).get();
    
    if (userRes.data.length > 0) {
      await db.collection('users').doc(userRes.data[0]._id).update({
        data: { avatarUrl, nickName }
      });
    } else {
      await db.collection('users').add({
        data: {
          openid,
          avatarUrl,
          nickName,
          createdAt: db.serverDate()
        }
      });
    }
    return { success: true };
  }

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};
