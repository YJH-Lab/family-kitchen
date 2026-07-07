// cloudfunctions/initFamily/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

function generateJoinCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const { familyName = '我的家庭厨房' } = event;

  try {
    // 1. Create family
    const familyId = 'fam_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const joinCode = generateJoinCode();

    await db.collection('families').add({
      data: {
        _id: familyId,
        name: familyName,
        creator: openid,
        joinCode: joinCode,
        members: [openid],
        createdAt: db.serverDate()
      }
    });

    // 2. Update user
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

    // 3. Copy default dishes to this family
    // Fetch dishes that don't have a familyId (the global defaults)
    const MAX_LIMIT = 100;
    const countResult = await db.collection('dishes').where({
      familyId: _.exists(false)
    }).count();
    
    const total = countResult.total;
    const batchTimes = Math.ceil(total / 100);
    
    let allDefaultDishes = [];
    for (let i = 0; i < batchTimes; i++) {
      const res = await db.collection('dishes').where({
        familyId: _.exists(false)
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      allDefaultDishes = allDefaultDishes.concat(res.data);
    }

    // Insert copies with familyId
    if (allDefaultDishes.length > 0) {
      const addPromises = allDefaultDishes.map(dish => {
        const { _id, _openid, ...dishData } = dish; // Remove original IDs
        return db.collection('dishes').add({
          data: {
            ...dishData,
            familyId: familyId,
            copiedAt: db.serverDate()
          }
        });
      });
      // Await all insertions (Cloud functions can handle quite a few concurrently)
      await Promise.all(addPromises);
    }

    return {
      success: true,
      familyId,
      joinCode,
      copiedDishesCount: allDefaultDishes.length
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: err.message
    };
  }
};
