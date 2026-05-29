// pages/order/order.js
import { attachDisplayImages } from '../../utils/cloud-image.js';

Page({
  data: {
    cartList: [],
    totalPrice: 0
  },

  watcher: null, // 保存监听器引用

  onShow: function () {
    this.initCartWatcher();
  },

  initCartWatcher: function () {
    const db = wx.cloud.database();

    wx.showLoading({ title: '同步中...' });

    // 监听 cart 集合
    this.watcher = db.collection('cart').watch({
      onChange: async snapshot => {
        wx.hideLoading();
        console.log('收到实时数据更新', snapshot.docs);

        const list = await attachDisplayImages(snapshot.docs);

        // 计算总价
        let total = 0;
        list.forEach(item => {
          total += (item.price * item.quantity);
        });

        // 渲染到页面
        this.setData({
          cartList: list,
          totalPrice: total
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

  checkout: async function () {
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
      title: '结算中...',
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
          createdAt: db.serverDate(),
          createdAtLocal: now.getTime()
        }
      });

      await Promise.all(
        this.data.cartList.map(item => cartCollection.doc(item._id).remove())
      );

      wx.hideLoading();
      wx.showToast({
        title: '已记录本次点餐',
        icon: 'success'
      });
    } catch (err) {
      wx.hideLoading();
      console.error('结算失败：', err);
      wx.showToast({
        title: '结算失败，请重试',
        icon: 'none'
      });
    }
  },

  goToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onHide: function () {
    // 页面隐藏时关闭监听，防止内存泄漏
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  },

  onUnload: function () {
    // 页面卸载时关闭监听，防止内存泄漏
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  },

  onLoad: function (options) {},
  onReady: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});
