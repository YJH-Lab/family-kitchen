const app = getApp();

Page({
  data: {
    defaultStatsRange: 'month',
    confirmBeforeDelete: true
  },

  onLoad: function () {
    const defaultStatsRange = wx.getStorageSync('familyKitchen.defaultStatsRange') || 'month';
    const confirmBeforeDelete = wx.getStorageSync('familyKitchen.confirmBeforeDelete') !== false;

    this.setData({
      defaultStatsRange,
      confirmBeforeDelete
    });
  },

  setStatsRange: function (e) {
    const mode = e.currentTarget.dataset.mode || 'month';
    wx.setStorageSync('familyKitchen.defaultStatsRange', mode);
    this.setData({ defaultStatsRange: mode });
    wx.showToast({
      title: '已保存',
      icon: 'success'
    });
  },

  toggleConfirmBeforeDelete: function (e) {
    const value = !!e.detail.value;
    wx.setStorageSync('familyKitchen.confirmBeforeDelete', value);
    this.setData({ confirmBeforeDelete: value });
  },

  clearCart: function () {
    wx.showModal({
      title: '清空当前订单',
      content: '确定清空还没确认的购物车菜品吗？已完成的订单记录不会受影响。',
      confirmText: '清空',
      confirmColor: '#d97845',
      success: async res => {
        if (!res.confirm) return;

        wx.showLoading({
          title: '清空中...',
          mask: true
        });

        try {
          const db = wx.cloud.database();
          const pageSize = 20;
          let removed = 0;

          while (true) {
            const cartRes = await db.collection('cart').where({ familyId: app.globalData.familyId }).limit(pageSize).get();
            const list = cartRes.data || [];
            if (list.length === 0) break;

            await Promise.all(list.map(item => db.collection('cart').doc(item._id).remove()));
            removed += list.length;
            if (list.length < pageSize) break;
          }

          wx.hideLoading();
          wx.showToast({
            title: removed > 0 ? '已清空' : '当前为空',
            icon: 'success'
          });
        } catch (err) {
          wx.hideLoading();
          console.error('清空当前订单失败：', err);
          wx.showToast({
            title: '清空失败',
            icon: 'none'
          });
        }
      }
    });
  },

  clearCache: function () {
    const defaultStatsRange = wx.getStorageSync('familyKitchen.defaultStatsRange') || 'month';
    const confirmBeforeDelete = wx.getStorageSync('familyKitchen.confirmBeforeDelete') !== false;

    wx.clearStorageSync();
    wx.setStorageSync('familyKitchen.defaultStatsRange', defaultStatsRange);
    wx.setStorageSync('familyKitchen.confirmBeforeDelete', confirmBeforeDelete);

    wx.showToast({
      title: '已清理',
      icon: 'success'
    });
  }
});
