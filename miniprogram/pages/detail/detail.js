// pages/detail/detail.js
Page({
  data: {
    dish: null,
    count: 1
  },

  onLoad: function (options) {
    const id = options.id;
    if (id) {
      this.fetchDishDetail(id);
    } else {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
    }
  },

  fetchDishDetail: function (id) {
    wx.showLoading({
      title: '加载中...',
    });

    const db = wx.cloud.database();
    db.collection('dishes').doc(id).get({
      success: res => {
        wx.hideLoading();
        this.setData({
          dish: res.data
        });
      },
      fail: err => {
        wx.hideLoading();
        console.error('获取菜品详情失败：', err);
        wx.showToast({
          title: '获取详情失败',
          icon: 'none'
        });
      }
    });
  },

  increaseCount: function () {
    this.setData({
      count: this.data.count + 1
    });
  },

  decreaseCount: function () {
    if (this.data.count > 1) {
      this.setData({
        count: this.data.count - 1
      });
    }
  },

  addToCart: function () {
    if (!this.data.dish) return;

    const dish = this.data.dish;
    const db = wx.cloud.database();
    const cartCollection = db.collection('cart');

    wx.showLoading({
      title: '添加中...',
      mask: true
    });

    cartCollection.add({
      data: {
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: this.data.count,
        addTime: db.serverDate()
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '成功加入购物车',
          icon: 'success',
          duration: 2000
        });

        // 可选：添加成功后将数量重置为 1
        this.setData({ count: 1 });
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

  scrollToRecipe: function () {
    wx.pageScrollTo({
      selector: '#recipe-section',
      duration: 300
    });
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    if (this.data.dish) {
      return {
        title: this.data.dish.name,
        path: `/pages/detail/detail?id=${this.data.dish._id}`,
        imageUrl: this.data.dish.image
      };
    }
  }
});