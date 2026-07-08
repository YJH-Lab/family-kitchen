import { attachDisplayImages } from '../../utils/cloud-image.js';

const app = getApp();

// 分类 → 标签映射
const CATEGORY_TAG_MAP = {
  '特色': { tag: '招牌', tagClass: 'tag-signature' },
  '热菜': { tag: '热卖', tagClass: 'tag-hot' },
  '主食': { tag: '新品', tagClass: 'tag-new' }
};

const DEFAULT_PREVIEW = '/images/default-goods-image.png';

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 0,
    loading: false,
    categories: ['特色', '冷菜', '热菜', '汤', '主食'],
    categoryList: [
      { name: '特色', previewImage: DEFAULT_PREVIEW },
      { name: '冷菜', previewImage: DEFAULT_PREVIEW },
      { name: '热菜', previewImage: DEFAULT_PREVIEW },
      { name: '汤',   previewImage: DEFAULT_PREVIEW },
      { name: '主食', previewImage: DEFAULT_PREVIEW }
    ],
    currentCategory: '特色',
    dishes: [],
    allDishes: [],
    searchText: ''
  },

  onLoad: async function (options) {
    this.initNavBarHeight();
    const hasFamily = await app.checkFamily();
    if (hasFamily) {
      this.fetchDishes();
      this.fetchCategoryPreviews();
    }
  },

  /**
   * 计算自定义导航栏高度，自动适配状态栏 + 胶囊按钮
   */
  initNavBarHeight: function () {
    try {
      const sysInfo = wx.getSystemInfoSync();
      const statusBarHeight = sysInfo.statusBarHeight || 20;
      // 初始估算高度，防止首屏高度跳变：状态栏高度 + 内容区大约120rpx的物理像素高度
      const navBarHeight = statusBarHeight + (120 * sysInfo.windowWidth / 750);
      this.setData({ statusBarHeight, navBarHeight });
    } catch (e) {
      this.setData({ statusBarHeight: 20, navBarHeight: 80 });
    }
  },

  /**
   * 为每个分类获取第一道菜的图片作为分类图标
   */
  fetchCategoryPreviews: async function () {
    const db = wx.cloud.database();
    const familyId = app.globalData.familyId;
    const categories = this.data.categories;

    const updatedList = await Promise.all(
      categories.map(async (catName) => {
        try {
          const res = await db.collection('dishes')
            .where({ category: catName, familyId })
            .limit(1)
            .get();

          if (res.data && res.data.length > 0) {
            const withImages = await attachDisplayImages([res.data[0]]);
            return {
              name: catName,
              previewImage: withImages[0].displayImage || DEFAULT_PREVIEW
            };
          }
        } catch (e) {
          console.warn('获取分类预览图失败：', catName, e);
        }
        return { name: catName, previewImage: DEFAULT_PREVIEW };
      })
    );

    this.setData({ categoryList: updatedList });
  },

  fetchDishes: async function (category = this.data.currentCategory) {
    this.setData({ loading: true });
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
      const taggedDishes = this.attachTags(dishes, category);

      wx.hideLoading();
      this.setData({
        loading: false,
        allDishes: taggedDishes,
        dishes: this.filterByKeyword(taggedDishes, this.data.searchText)
      });
    } catch (err) {
      wx.hideLoading();
      this.setData({ loading: false });
      console.error('获取菜品列表失败：', err);
      wx.showToast({ title: '获取数据失败', icon: 'none' });
    }
  },

  attachTags: function (dishes, category) {
    const tagInfo = CATEGORY_TAG_MAP[category];
    if (!tagInfo) return dishes;
    return dishes.map(dish => Object.assign({}, dish, tagInfo));
  },

  switchCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    if (category === this.data.currentCategory) return;
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
      item.name.includes(text) || (item.desc && item.desc.includes(text))
    );
  },

  scrollToRecommend: function () {
    if (this.data.currentCategory !== '特色') {
      this.setData({ currentCategory: '特色' });
      this.fetchDishes('特色');
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

  onReady: function () {
    // 准确测量自定义导航栏的实际渲染高度，确保搜索栏不会被遮挡
    const query = wx.createSelectorQuery();
    query.select('.custom-nav').boundingClientRect();
    query.exec((res) => {
      if (res[0] && res[0].height) {
        this.setData({ navBarHeight: res[0].height });
      }
    });
  },
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
