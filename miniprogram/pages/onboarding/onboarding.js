// pages/onboarding/onboarding.js
const app = getApp();

Page({
  data: {},
  onLoad: function(options) {
    if (options.joinCode) {
      this.joinWithCode(options.joinCode);
    }
  },
  createFamily: function() {
    wx.showModal({
      title: '创建家庭',
      content: '请输入您的家庭名称',
      editable: true,
      placeholderText: '例如：李雷家的厨房',
      success: async res => {
        if (res.confirm && res.content) {
          wx.showLoading({ title: '创建中...', mask: true });
          try {
            const result = await wx.cloud.callFunction({
              name: 'initFamily',
              data: { familyName: res.content }
            });
            if (result.result.success) {
              app.globalData.familyId = result.result.familyId;
              wx.hideLoading();
              wx.showToast({ title: '创建成功', icon: 'success' });
              setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 1500);
            } else {
              throw new Error(result.result.error);
            }
          } catch(err) {
            wx.hideLoading();
            wx.showToast({ title: '创建失败', icon: 'none' });
          }
        }
      }
    });
  },
  showJoinModal: function() {
    wx.showModal({
      title: '加入家庭',
      content: '请输入6位加入码',
      editable: true,
      placeholderText: '请输入加入码',
      success: res => {
        if (res.confirm && res.content) {
          this.joinWithCode(res.content);
        }
      }
    });
  },
  joinWithCode: async function(code) {
    wx.showLoading({ title: '验证中...', mask: true });
    try {
      const result = await wx.cloud.callFunction({
        name: 'joinFamily',
        data: { joinCode: code }
      });
      if (result.result.success) {
        app.globalData.familyId = result.result.familyId;
        wx.hideLoading();
        wx.showToast({ title: '加入成功', icon: 'success' });
        setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 1500);
      } else {
        throw new Error(result.result.error);
      }
    } catch(err) {
      wx.hideLoading();
      wx.showToast({ title: err.message || '加入失败', icon: 'none' });
    }
  }
});
