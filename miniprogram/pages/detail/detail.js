// pages/detail/detail.js
import { attachDisplayImage } from '../../utils/cloud-image.js';

const ingredientIconMap = [
  { keywords: ['鸡', '鸭', '肉', '排骨', '牛', '羊', '鱼', '虾'], icon: '/images/ing-chicken.png' },
  { keywords: ['花生'], icon: '/images/ing-peanut.png' },
  { keywords: ['辣椒', '椒'], icon: '/images/ing-pepper.png' },
  { keywords: ['花椒', '胡椒'], icon: '/images/ing-spice.png' },
  { keywords: ['盐', '糖', '淀粉', '面粉'], icon: '/images/ing-salt.png' },
  { keywords: ['葱', '韭菜', '香菜'], icon: '/images/ing-scallion.png' },
  { keywords: ['姜'], icon: '/images/ing-ginger.png' },
  { keywords: ['蒜'], icon: '/images/ing-garlic.png' },
  { keywords: ['酱', '醋', '料酒', '油', '汁'], icon: '/images/ing-sauce.png' }
];

function getIngredientIcon(name = '') {
  const matched = ingredientIconMap.find(item =>
    item.keywords.some(keyword => name.includes(keyword))
  );
  return matched ? matched.icon : '/images/ing-generic.png';
}

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
      success: async res => {
        const dish = await attachDisplayImage(res.data);
        dish.ingredients = (dish.ingredients || []).map(item => ({
          ...item,
          icon: getIngredientIcon(item.name)
        }));

        wx.hideLoading();
        this.setData({
          dish
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
        displayImage: dish.displayImage,
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
        imageUrl: this.data.dish.displayImage
      };
    }
  }
});
