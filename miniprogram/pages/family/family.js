// pages/family/family.js
const app = getApp();

Page({
  data: {
    family: null,
    members: []
  },

  onLoad: async function () {
    wx.showLoading({ title: '加载中...' });
    const db = wx.cloud.database();
    const familyId = app.globalData.familyId;
    
    if (!familyId) {
      wx.hideLoading();
      return wx.showToast({ title: '尚未加入家庭', icon: 'none' });
    }
    
    try {
      const famRes = await db.collection('families').doc(familyId).get();
      const usersRes = await db.collection('users').where({ familyId }).get();
      
      const usersData = usersRes.data.map(user => ({
        ...user,
        shortId: (user.openid || '').slice(-4)
      }));
      
      this.setData({
        family: famRes.data,
        members: usersData
      });
      wx.hideLoading();
    } catch(err) {
      wx.hideLoading();
      wx.showToast({ title: '获取失败', icon: 'none' });
      console.error(err);
    }
  },

  onShareAppMessage: function () {
    if (!this.data.family) return {};
    return {
      title: `邀请你加入【${this.data.family.name}】`,
      path: `/pages/onboarding/onboarding?joinCode=${this.data.family.joinCode}`,
      imageUrl: '/images/ui-family.png' // Fallback image
    };
  }
});
