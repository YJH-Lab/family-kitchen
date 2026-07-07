import { attachDisplayImages } from '../../utils/cloud-image.js';

const app = getApp();

Page({
  data: {
    cartList: [],
    totalPrice: '0.00'
  },

  watcher: null,
  watcherReady: false,

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    this.initCartWatcher();
  },

  initCartWatcher: function () {
    const db = wx.cloud.database();

    // 已有活跃 watcher 就跳过
    if (this.watcher && this.watcherReady) return;

    // 先关闭已有 watcher，避免状态机冲突
    if (this.watcher) {
      try { this.watcher.close(); } catch (e) {}
      this.watcher = null;
    }
    this.watcherReady = false;

    wx.showLoading({ title: '同步中...' });

    // 监听 cart 集合
    this.watcher = db.collection('cart').where({ familyId: app.globalData.familyId }).watch({
      onChange: async snapshot => {
        this.watcherReady = true;
        wx.hideLoading();
        console.log('收到实时数据更新', snapshot.docs);

        const list = await attachDisplayImages(snapshot.docs);

        // 计算总价
        let total = 0;
        list.forEach(item => {
          total += (item.price * item.quantity);
        });

        // 等首次渲染完成后再更新，避免 "Expected updated data but get first rendering data"
        wx.nextTick(() => {
          this.setData({
            cartList: list,
            totalPrice: total.toFixed(2)
          });
        });
      },
      onError: err => {
        wx.hideLoading();
        console.error('监听购物车失败：', err);
      }
    });
  },

  deleteItem: function (e) {
    const id = e.currentTarget.dataset.id;
    const db = wx.cloud.database();

    // 调用 remove() 删除，数据变化会触发 watch 的 onChange 自动更新页面
    db.collection('cart').doc(id).remove({
      success: res => {
        wx.showToast({
          title: '已删除',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('删除失败：', err);
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        });
      }
    });
  },

  confirmSingleItem: async function (e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.cartList.find(i => i._id === id);
    if (!item) return;

    const db = wx.cloud.database();
    const now = new Date();

    wx.showLoading({ title: '确认中...', mask: true });

    try {
      await db.collection('orders').add({
        data: {
          orderNo: `FK${now.getTime()}`,
          items: [{
            dishId: item.dishId || item._id,
            name: item.name,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
            image: item.image,
            displayImage: item.displayImage
          }],
          totalPrice: (Number(item.price) * Number(item.quantity)).toFixed(2),
          itemCount: Number(item.quantity) || 1,
          status: 'completed',
          familyId: app.globalData.familyId,
          createdAt: db.serverDate(),
          createdAtLocal: now.getTime()
        }
      });

      await db.collection('cart').doc(id).remove();

      wx.hideLoading();
      wx.showToast({ title: '已确认', icon: 'success' });
    } catch (err) {
      wx.hideLoading();
      console.error('确认失败：', err);
      wx.showToast({ title: '确认失败', icon: 'none' });
    }
  },

  changeQuantity: function (e) {
    const id = e.currentTarget.dataset.id;
    const delta = Number(e.currentTarget.dataset.delta);
    const db = wx.cloud.database();
    const item = this.data.cartList.find(i => i._id === id);
    if (!item) return;

    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      db.collection('cart').doc(id).remove();
    } else {
      db.collection('cart').doc(id).update({
        data: { quantity: newQty }
      });
    }
  },

  confirmOrder: async function () {
    if (this.data.cartList.length === 0) return;

    const db = wx.cloud.database();
    const cartCollection = db.collection('cart');
    const now = new Date();
    const items = this.data.cartList.map(item => ({
      dishId: item.dishId || item._id,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      image: item.image,
      displayImage: item.displayImage
    }));

    wx.showLoading({
      title: '确认中...',
      mask: true
    });

    try {
      await db.collection('orders').add({
        data: {
          orderNo: `FK${now.getTime()}`,
          items,
          totalPrice: this.data.totalPrice,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          status: 'completed',
          familyId: app.globalData.familyId,
          createdAt: db.serverDate(),
          createdAtLocal: now.getTime()
        }
      });

      await Promise.all(
        this.data.cartList.map(item => cartCollection.doc(item._id).remove())
      );

      wx.hideLoading();
      wx.showToast({
        title: '订单已完成',
        icon: 'success'
      });
    } catch (err) {
      wx.hideLoading();
      console.error('确认订单失败：', err);
      wx.showToast({
        title: '确认失败，请重试',
        icon: 'none'
      });
    }
  },

  goToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  goToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },

  onHide: function () {
    if (this.watcher) {
      try { this.watcher.close(); } catch (e) {}
      this.watcher = null;
      this.watcherReady = false;
    }
  },

  onUnload: function () {
    if (this.watcher) {
      try { this.watcher.close(); } catch (e) {}
      this.watcher = null;
      this.watcherReady = false;
    }
  },

  onLoad: function (options) {},
  onReady: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
