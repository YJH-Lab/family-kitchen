// pages/user/user.js
Page({
  data: {
    userInfo: {},
    orderStatusList: [
      { title: '待确认', icon: '/images/ui-order.png', badge: '', badgeClass: 'red', bgClass: 'bg-orange', url: '/pages/order/order' },
      { title: '已完成', icon: '/images/ui-check.png', badge: '', badgeClass: 'black', bgClass: 'bg-green', url: '/pages/orders/orders' },
      { title: '已记账', icon: '/images/ui-stats.png', badge: '', badgeClass: 'black', bgClass: 'bg-blue', url: '/pages/orders/orders' }
    ],
    menuGroups: [
      [
        { title: '消费统计', icon: '/images/ui-stats.png', extraText: '', url: '/pages/stats/stats' },
        { title: '新建菜谱', icon: '/images/ui-order.png', url: '/pages/create-dish/create-dish' },
        { title: '家庭成员', icon: '/images/ui-family.png', extraText: '', url: '/pages/family/family' }
      ],
      [
        { title: '设置', icon: '/images/ui-settings.png', url: '/pages/settings/settings' },
        { title: '帮助中心', icon: '/images/ui-help.png', url: '/pages/help/help' }
      ]
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
    
    this.fetchProfileData();
  },
  
  fetchProfileData: async function () {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getUserProfileData'
      });
      if (res.result && res.result.success) {
        const data = res.result.data;
        
        let orderStatusList = this.data.orderStatusList;
        orderStatusList[0].badge = data.pendingCount > 0 ? String(data.pendingCount) : '';
        orderStatusList[1].badge = data.completedCount > 0 ? String(data.completedCount) : '';
        orderStatusList[2].badge = data.accountedCount > 0 ? String(data.accountedCount) : '';

        let menuGroups = this.data.menuGroups;
        // 消费统计
        menuGroups[0][0].extraText = data.monthlyExpense > 0 ? `本月支出 ¥${data.monthlyExpense}` : '';
        // 家庭成员
        menuGroups[0][2].extraText = `共 ${data.memberCount} 位成员`;

        this.setData({ orderStatusList, menuGroups });
      }
    } catch (err) {
      console.error('获取个人中心数据失败', err);
    }
  },

  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
