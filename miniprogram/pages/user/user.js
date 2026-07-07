// pages/user/user.js
Page({
  data: {
    userInfo: {},
    orderStatusList: [
      { title: '待确认', icon: '/images/ui-order.png', url: '/pages/order/order' },
      { title: '已完成', icon: '/images/ui-check.png', url: '/pages/orders/orders' },
      { title: '已记账', icon: '/images/ui-stats.png', url: '/pages/orders/orders' }
    ],
    menuList: [
      { title: '消费统计', icon: '/images/ui-stats.png', group: 'family', url: '/pages/stats/stats' },
      { title: '新建菜谱', icon: '/images/ui-order.png', group: 'family', url: '/pages/create-dish/create-dish' },
      { title: '家庭成员', icon: '/images/ui-family.png', group: 'family', groupEnd: true, url: '/pages/family/family' },
      { title: '设置', icon: '/images/ui-settings.png', group: 'settings', groupStart: true, url: '/pages/settings/settings' },
      { title: '帮助中心', icon: '/images/ui-help.png', group: 'settings', url: '/pages/help/help' }
    ]
  },
  openMenu: function (e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;

    this.openPage(url);
  },
  openOrders: function () {
    this.openPage('/pages/orders/orders');
  },
  goToProfile: function () {
    wx.navigateTo({ url: '/pages/profile/profile' });
  },
  openPage: function (url) {
    const tabPages = ['/pages/index/index', '/pages/order/order', '/pages/user/user'];
    const method = tabPages.includes(url) ? 'switchTab' : 'navigateTo';

    wx[method]({ url });
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    const app = getApp();
    this.setData({
      userInfo: app.globalData.userInfo || {}
    });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
