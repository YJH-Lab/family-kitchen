// cloudfunctions/getUserProfileData/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    // 1. 获取用户信息和对应的 familyId
    const userRes = await db.collection('users').where({ openid }).get();
    if (userRes.data.length === 0 || !userRes.data[0].familyId) {
      return {
        success: true,
        data: {
          memberCount: 0,
          pendingCount: 0,
          completedCount: 0,
          accountedCount: 0,
          monthlyExpense: '0.00'
        }
      };
    }

    const familyId = userRes.data[0].familyId;

    // 2. 获取家庭成员数
    let memberCount = 1;
    const familyRes = await db.collection('families').doc(familyId).get();
    if (familyRes.data && familyRes.data.members) {
      memberCount = familyRes.data.members.length;
    }

    // 3. 获取订单状态角标统计
    const [pendingRes, completedRes, accountedRes] = await Promise.all([
      db.collection('orders').where({ familyId, status: 'pending' }).count(),
      db.collection('orders').where({ familyId, status: 'completed' }).count(),
      db.collection('orders').where({ familyId, status: 'accounted' }).count()
    ]);

    // 4. 计算本月总支出
    const now = new Date();
    // 获取当月1号0点和下月1号0点的毫秒时间戳
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();

    const expenseRes = await db.collection('orders')
      .where({
        familyId,
        createdAtLocal: _.gte(startOfMonth).and(_.lt(startOfNextMonth))
      })
      .limit(1000)
      .get();
    
    // 在服务端遍历求和，防止 totalPrice 存成了字符串导致直接 sum 出错
    let monthlyExpense = 0;
    if (expenseRes.data && expenseRes.data.length > 0) {
      expenseRes.data.forEach(order => {
        let price = Number(order.totalPrice);
        if (!isNaN(price)) {
          monthlyExpense += price;
        }
      });
    }

    return {
      success: true,
      data: {
        memberCount,
        pendingCount: pendingRes.total,
        completedCount: completedRes.total,
        accountedCount: accountedRes.total,
        monthlyExpense: monthlyExpense.toFixed(2)
      }
    };

  } catch (error) {
    console.error('获取个人中心数据失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
