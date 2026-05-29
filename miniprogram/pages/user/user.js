// pages/user/user.js
Page({
  data: {
    orderStatusList: [
      { title: '待付款', icon: '/images/ui-wallet.png' },
      { title: '进行中', icon: '/images/ui-clock.png' },
      { title: '完成了', icon: '/images/ui-check.png' }
    ],
    menuList: [
      { title: '地址管理', icon: '/images/ui-location.png', group: 'family' },
      { title: '优惠券', icon: '/images/ui-coupon.png', group: 'family' },
      { title: '家庭成员', icon: '/images/ui-family.png', group: 'family' },
      { title: '消费统计', icon: '/images/ui-stats.png', group: 'family', url: '/pages/stats/stats', groupEnd: true },
      { title: '设置', icon: '/images/ui-settings.png', group: 'settings', groupStart: true },
      { title: '帮助中心', icon: '/images/ui-help.png', group: 'settings' }
    ]
  },
  openMenu: function (e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;

    wx.navigateTo({ url });
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
