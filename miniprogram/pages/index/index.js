// pages/index/index.js
import { attachDisplayImages } from '../../utils/cloud-image.js';

Page({
  data: {
    categories: ['特色', '冷菜', '热菜', '汤'],
    currentCategory: '特色',
    dishes: [],
    allDishes: [],
    searchText: ''
  },

  onLoad: function (options) {
    this.fetchDishes();
  },

  fetchDishes: async function (category = this.data.currentCategory) {
    wx.showLoading({ title: '加载中...' });

    const db = wx.cloud.database();
    const collection = db.collection('dishes');
    const pageSize = 20;
    let allData = [];
    let skip = 0;

    try {
      while (true) {
        const res = await collection
          .where({ category })
          .skip(skip)
          .limit(pageSize)
          .get();
        allData = allData.concat(res.data);
        if (res.data.length < pageSize) break;
        skip += pageSize;
      }

      const dishes = await attachDisplayImages(allData);
      wx.hideLoading();
      this.setData({
        allDishes: dishes,
        dishes
      });
    } catch (err) {
      wx.hideLoading();
      console.error('获取菜品列表失败：', err);
      wx.showToast({ title: '获取数据失败', icon: 'none' });
    }
  },

  switchCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      searchText: ''
    });
    this.fetchDishes(category);
  },

  onSearchInput: function (e) {
    this.setData({ searchText: e.detail.value });
  },

  onSearch: function () {
    const keyword = this.data.searchText.trim();
    if (!keyword) {
      this.setData({ dishes: this.data.allDishes });
      return;
    }
    const results = this.data.allDishes.filter(item =>
      item.name.includes(keyword) || item.desc.includes(keyword)
    );
    this.setData({ dishes: results });
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
        displayImage: dish.displayImage,
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
