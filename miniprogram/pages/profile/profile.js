// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    avatarUrl: '',
    nickName: '',
    isAvatarChanged: false
  },

  onLoad: function () {
    const userInfo = app.globalData.userInfo || {};
    this.setData({
      avatarUrl: userInfo.avatarUrl || '',
      nickName: userInfo.nickName || ''
    });
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
      isAvatarChanged: true
    });
  },

  onInputNickname(e) {
    this.setData({
      nickName: e.detail.value
    });
  },

  saveProfile: async function () {
    const { avatarUrl, nickName, isAvatarChanged } = this.data;
    
    if (!avatarUrl || avatarUrl === '/images/ui-avatar.png') {
      return wx.showToast({ title: '请选择头像', icon: 'none' });
    }
    if (!nickName || !nickName.trim()) {
      return wx.showToast({ title: '请输入昵称', icon: 'none' });
    }

    wx.showLoading({ title: '保存中...', mask: true });

    try {
      let finalAvatarUrl = avatarUrl;
      const db = wx.cloud.database();
      
      // 如果头像有更新，且是本地临时文件路径，则上传到云存储
      if (isAvatarChanged && !avatarUrl.startsWith('cloud://')) {
        const cloudPath = `avatars/${app.globalData.openid}_${Date.now()}.jpg`;
        const uploadRes = await wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: avatarUrl
        });
        finalAvatarUrl = uploadRes.fileID;
      }

      // 使用云函数更新 users 表（绕过客户端无 _openid 导致的权限问题）
      await wx.cloud.callFunction({
        name: 'login',
        data: {
          action: 'updateProfile',
          avatarUrl: finalAvatarUrl,
          nickName: nickName.trim()
        }
      });

      // 更新全局状态
      app.globalData.userInfo = {
        avatarUrl: finalAvatarUrl,
        nickName: nickName.trim()
      };

      wx.hideLoading();
      wx.showToast({ title: '保存成功', icon: 'success' });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);

    } catch (err) {
      console.error('保存资料失败:', err);
      wx.hideLoading();
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  }
});
