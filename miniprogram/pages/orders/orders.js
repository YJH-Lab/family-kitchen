function pad(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

const app = getApp();

function formatMoney(value) {
  return (Number(value) || 0).toFixed(2);
}

function getOrderTime(order) {
  if (order.createdAtLocal) return Number(order.createdAtLocal);
  if (order.createdAt instanceof Date) return order.createdAt.getTime();
  if (order.createdAt) return new Date(order.createdAt).getTime();
  return 0;
}

function formatDateTime(time) {
  if (!time) return '时间未知';
  const date = new Date(time);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

Page({
  data: {
    orders: [],
    loading: true,
    isEmpty: false,
    hasOrders: false,
    orderCount: 0,
    totalAmount: '0.00'
  },

  onShow: function () {
    this.fetchOrders();
  },

  fetchOrders: async function () {
    wx.showLoading({ title: '加载中...' });

    const db = wx.cloud.database();
    const pageSize = 20;
    let skip = 0;
    let orders = [];

    try {
      while (true) {
        const res = await db.collection('orders')
          .where({ familyId: app.globalData.familyId })
          .orderBy('createdAtLocal', 'desc')
          .skip(skip)
          .limit(pageSize)
          .get();

        orders = orders.concat(res.data || []);
        if (!res.data || res.data.length < pageSize) break;
        skip += pageSize;
      }

      const viewOrders = orders.map(order => {
        const itemList = order.items || [];
        const items = itemList.map(item => {
          const price = Number(item.price) || 0;
          const quantity = Number(item.quantity) || 1;
          return Object.assign({}, item, {
            quantity,
            subtotalText: formatMoney(price * quantity)
          });
        });

        return {
          _id: order._id,
          orderNo: order.orderNo || '家庭订单',
          dateText: formatDateTime(getOrderTime(order)),
          statusText: '已完成/已记账',
          itemCount: Number(order.itemCount) || items.reduce((sum, item) => sum + item.quantity, 0),
          totalText: formatMoney(order.totalPrice),
          totalValue: Number(order.totalPrice) || 0,
          items
        };
      });

      const total = viewOrders.reduce((sum, order) => sum + order.totalValue, 0);

      wx.hideLoading();
      this.setData({
        orders: viewOrders,
        loading: false,
        hasOrders: viewOrders.length > 0,
        isEmpty: viewOrders.length === 0,
        orderCount: viewOrders.length,
        totalAmount: formatMoney(total)
      });
    } catch (err) {
      wx.hideLoading();
      console.error('获取订单记录失败：', err);
      this.setData({ loading: false });
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  },

  deleteOrder: function (e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;

    const confirmBeforeDelete = wx.getStorageSync('familyKitchen.confirmBeforeDelete') !== false;
    if (!confirmBeforeDelete) {
      this.removeOrder(id);
      return;
    }

    wx.showModal({
      title: '删除订单',
      content: '确定删除这条订单记录吗？删除后消费统计会重新计算。',
      confirmText: '删除',
      confirmColor: '#d97845',
      success: res => {
        if (res.confirm) this.removeOrder(id);
      }
    });
  },

  removeOrder: async function (id) {
    wx.showLoading({
      title: '删除中...',
      mask: true
    });

    try {
      await wx.cloud.database().collection('orders').doc(id).remove();
      wx.hideLoading();
      wx.showToast({
        title: '已删除',
        icon: 'success'
      });
      this.fetchOrders();
    } catch (err) {
      wx.hideLoading();
      console.error('删除订单记录失败：', err);
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      });
    }
  },

  goToOrder: function () {
    wx.switchTab({
      url: '/pages/order/order'
    });
  },

  addDishToCart: function (e) {
    const dish = e.currentTarget.dataset.dish;
    if (!dish) return;

    const db = wx.cloud.database();
    wx.showLoading({ title: '添加中...', mask: true });

    db.collection('cart').add({
      data: {
        dishId: dish.dishId || '',
        name: dish.name,
        price: Number(dish.price) || 0,
        image: dish.image || '',
        displayImage: dish.displayImage || '',
        quantity: Number(dish.quantity) || 1,
        familyId: app.globalData.familyId,
        addTime: db.serverDate()
      },
      success: () => {
        wx.hideLoading();
        wx.showToast({ title: '已加入订单', icon: 'success' });
      },
      fail: err => {
        wx.hideLoading();
        console.error('加入购物车失败：', err);
        wx.showToast({ title: '添加失败', icon: 'none' });
      }
    });
  },

  reorderAll: function (e) {
    const index = e.currentTarget.dataset.orderIndex;
    const order = this.data.orders[index];
    if (!order || !order.items || order.items.length === 0) return;

    const db = wx.cloud.database();
    wx.showLoading({ title: '添加中...', mask: true });

    const tasks = order.items.map(item => {
      return db.collection('cart').add({
        data: {
          dishId: item.dishId || '',
          name: item.name,
          price: Number(item.price) || 0,
          image: item.image || '',
          displayImage: item.displayImage || '',
          quantity: Number(item.quantity) || 1,
          familyId: app.globalData.familyId,
          addTime: db.serverDate()
        }
      });
    });

    Promise.all(tasks).then(() => {
      wx.hideLoading();
      wx.showToast({ title: `已加入 ${order.items.length} 道菜`, icon: 'success' });
    }).catch(err => {
      wx.hideLoading();
      console.error('再来一单失败：', err);
      wx.showToast({ title: '添加失败', icon: 'none' });
    });
  }
});
