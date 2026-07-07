Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/images/tab-home.png',
        selectedIconPath: '/images/tab-home-active.png'
      },
      {
        pagePath: '/pages/order/order',
        text: '订单',
        iconPath: '/images/tab-order.png',
        selectedIconPath: '/images/tab-order-active.png'
      },
      {
        pagePath: '/pages/user/user',
        text: '我的',
        iconPath: '/images/tab-user.png',
        selectedIconPath: '/images/tab-user-active.png'
      }
    ]
  },

  methods: {
    switchTab: function (e) {
      const index = e.currentTarget.dataset.index;
      const path = e.currentTarget.dataset.path;

      wx.switchTab({ url: path });
      this.setData({ selected: index });
    }
  }
});
