import { attachDisplayImages } from '../../utils/cloud-image.js';

const app = getApp();

Page({
  data: {
    categories: ['特色', '冷菜', '热菜', '汤', '主食'],
    currentCategory: '特色',
    dishes: [],
    allDishes: [],
    searchText: ''
  },

  onLoad: async function (options) {
    const hasFamily = await app.checkFamily();
    if (hasFamily) {
      this.fetchDishes();
    }
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
          .where({ category, familyId: app.globalData.familyId })
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
        dishes: this.filterByKeyword(dishes, this.data.searchText)
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
      currentCategory: category
    });
    this.fetchDishes(category);
  },

  onSearchInput: function (e) {
    const searchText = e.detail.value;
    this.setData({
      searchText,
      dishes: this.filterByKeyword(this.data.allDishes, searchText)
    });
  },

  onSearch: function () {
    this.setData({
      dishes: this.filterByKeyword(this.data.allDishes, this.data.searchText)
    });
  },

  filterByKeyword: function (dishes, keyword) {
    const text = String(keyword || '').trim();
    if (!text) return dishes;

    return dishes.filter(item =>
      item.name.includes(text) || item.desc.includes(text)
    );
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
        familyId: app.globalData.familyId,
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
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.fetchDishes();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
