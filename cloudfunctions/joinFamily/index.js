// cloudfunctions/joinFamily/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const { joinCode } = event;

  if (!joinCode) {
    return { success: false, error: '请输入加入码' };
  }

  try {
    // 1. Find family by joinCode
    const familyRes = await db.collection('families').where({ joinCode: String(joinCode) }).get();
    if (familyRes.data.length === 0) {
      return { success: false, error: '无效的加入码' };
    }

    const family = familyRes.data[0];
    const familyId = family._id;

    // 2. Add user to family members if not already there
    if (!family.members.includes(openid)) {
      await db.collection('families').doc(familyId).update({
        data: {
          members: _.push(openid)
        }
      });
    }

    // 3. Update user profile
    const userRes = await db.collection('users').where({ openid }).get();
    if (userRes.data.length > 0) {
      await db.collection('users').doc(userRes.data[0]._id).update({
        data: { familyId }
      });
    } else {
      await db.collection('users').add({
        data: {
          openid: openid,
          familyId: familyId,
          createdAt: db.serverDate()
        }
      });
    }

    return {
      success: true,
      familyId,
      familyName: family.name
    };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};
