// pages/index/index.js
Page({
  data: {
    categories: ['特色', '冷菜', '热菜', '汤'],
    currentCategory: '特色',
    dishes: [],
    allDishes: []
  },

  onLoad: function (options) {
    this.fetchDishes();
  },

  fetchDishes: function () {
    wx.showLoading({
      title: '加载中...',
    });

    const db = wx.cloud.database();
    db.collection('dishes').get({
      success: res => {
        wx.hideLoading();
        this.setData({
          allDishes: res.data,
          dishes: res.data // 默认显示所有，或者根据需要可以过滤
        });

        // 如果想初始只显示 '特色'，可以取消下面注释：
        // this.filterDishes('特色');
      },
      fail: err => {
        wx.hideLoading();
        console.error('获取菜品列表失败：', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      }
    });
  },

  switchCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });

    // 简单的本地过滤逻辑
    this.filterDishes(category);
  },

  filterDishes: function(category) {
    // 假设如果分类是'特色'显示全部，其他按照 category 字段过滤
    // 根据实际业务逻辑调整
    if (category === '特色') {
      this.setData({ dishes: this.data.allDishes });
    } else {
      const filtered = this.data.allDishes.filter(item => item.category === category);
      this.setData({ dishes: filtered });
    }
  },

  goToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  addToCart: function (e) {
    const dish = e.currentTarget.dataset.item;
    const db = wx.cloud.database();
    const cartCollection = db.collection('cart');

    wx.showLoading({
      title: '添加中...',
      mask: true
    });

    // 写入购物车集合
    cartCollection.add({
      data: {
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: 1,
        addTime: db.serverDate()
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '已加入订单',
          icon: 'success',
          duration: 2000
        });
      },
      fail: err => {
        wx.hideLoading();
        console.error('加入购物车失败：', err);
        wx.showToast({
          title: '添加失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.fetchDishes();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
