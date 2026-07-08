import { attachDisplayImages } from '../../utils/cloud-image.js';

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
      
      let usersData = usersRes.data.map(user => ({
        ...user,
        shortId: (user.openid || '').slice(-4)
      }));
      
      // 使用云图片转换工具，将 cloud:// 协议转为临时 HTTP 链接，避免平台渲染报错
      usersData = await attachDisplayImages(usersData, 'avatarUrl');
      usersData = usersData.map(user => {
        let displayAvatar = user.displayImage;
        // 如果转换失败或者为空，默认返回了商品占位图，这里替换回头像占位图
        if (!displayAvatar || displayAvatar === '/images/default-goods-image.png') {
          // 如果原图是 http 链接，直接使用；否则使用头像默认图
          displayAvatar = (user.avatarUrl && !user.avatarUrl.startsWith('cloud://')) 
            ? user.avatarUrl 
            : '/images/ui-avatar.png';
        }
        return { ...user, displayAvatar };
      });
      
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
