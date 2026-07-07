import { attachDisplayImage } from '../../utils/cloud-image.js';

const app = getApp();

const ingredientIconMap = [
  // 蛋类
  { keywords: ['鸡蛋', '蛋清', '蛋黄', '皮蛋', '蛋'], icon: '/images/ing-egg.png' },
  // 花生
  { keywords: ['花生'], icon: '/images/ing-peanut.png' },
  // 蔬菜 - 青椒
  { keywords: ['青椒', '红椒', '柿子椒'], icon: '/images/ing-green-pepper.png' },
  // 辣椒
  { keywords: ['辣椒', '小米椒', '剁椒', '泡椒', '辣椒油', '红油', '辣椒粉', '辣椒面'], icon: '/images/ing-pepper.png' },
  // 胡萝卜
  { keywords: ['胡萝卜'], icon: '/images/ing-carrot.png' },
  // 香菜
  { keywords: ['香菜'], icon: '/images/ing-coriander.png' },
  // 葱类
  { keywords: ['葱', '韭菜', '蒜苗', '大葱'], icon: '/images/ing-scallion.png' },
  // 香料
  { keywords: ['花椒', '胡椒', '八角', '桂皮', '五香粉', '孜然粉', '花椒粉', '香叶'], icon: '/images/ing-spice.png' },
  // 芝麻
  { keywords: ['芝麻'], icon: '/images/ing-sesame.png' },
  // 干粉类
  { keywords: ['盐', '鸡精', '白糖', '冰糖', '红糖', '糖', '淀粉', '面粉', '胡椒粉'], icon: '/images/ing-salt.png' },
  // 酱料/醋/酒/油
  { keywords: ['酱油', '生抽', '老抽', '蒸鱼豉油', '甜面酱', '叉烧酱', '番茄酱', '豆瓣酱', '蚝油', '酱'], icon: '/images/ing-sauce.png' },
  { keywords: ['香醋', '白醋', '醋'], icon: '/images/ing-vinegar.png' },
  { keywords: ['料酒', '啤酒', '酒'], icon: '/images/ing-cooking-wine.png' },
  { keywords: ['香油', '麻油', '芝麻油'], icon: '/images/ing-sesame-oil.png' },
  { keywords: ['食用油', '黄油', '油'], icon: '/images/ing-oil.png' },
  // 姜蒜
  { keywords: ['姜'], icon: '/images/ing-ginger.png' },
  { keywords: ['蒜'], icon: '/images/ing-garlic.png' },
  // 肉类（放最后，避免"鸡精"等被误匹配）
  { keywords: ['鸡', '鸭', '排骨', '猪', '五花肉', '里脊', '肉馅', '肉末', '肥肠', '猪腰', '猪肚', '猪耳', '猪肝', '猪蹄', '牛', '牛腩', '牛蛙', '羊', '鱼', '鲈', '鲫', '带鱼', '鲢', '草鱼', '虾', '花甲', '海蜇', '海参', '花蛤', '蟹', '鸽', '乌鸡'], icon: '/images/ing-chicken.png' }
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

  editPrice: function () {
    wx.showModal({
      title: '修改价格',
      content: String(this.data.dish.price || 0),
      editable: true,
      placeholderText: '请输入新价格',
      success: res => {
        if (res.confirm) {
          const newPrice = Number(res.content);
          if (isNaN(newPrice) || newPrice < 0) {
            wx.showToast({ title: '价格无效', icon: 'none' });
            return;
          }

          wx.showLoading({ title: '修改中...' });
          wx.cloud.database().collection('dishes').doc(this.data.dish._id).update({
            data: { price: newPrice }
          }).then(() => {
            wx.hideLoading();
            this.setData({
              'dish.price': newPrice
            });
            wx.showToast({ title: '修改成功', icon: 'success' });
          }).catch(err => {
            wx.hideLoading();
            console.error('修改价格失败:', err);
            wx.showToast({ title: '修改失败', icon: 'none' });
          });
        }
      }
    });
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
        familyId: app.globalData.familyId,
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
