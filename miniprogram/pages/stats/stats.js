// pages/stats/stats.js
function pad(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function formatMoney(value) {
  return (Number(value) || 0).toFixed(2);
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getOrderTime(order) {
  if (order.createdAtLocal) return Number(order.createdAtLocal);
  if (order.createdAt instanceof Date) return order.createdAt.getTime();
  if (order.createdAt) return new Date(order.createdAt).getTime();
  return 0;
}

function getRange(mode, baseDate = new Date()) {
  const start = new Date(baseDate);
  start.setHours(0, 0, 0, 0);

  if (mode === 'week') {
    const day = start.getDay() || 7;
    start.setDate(start.getDate() - day + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return {
      start,
      end,
      title: '本周花费'
    };
  }

  if (mode === 'year') {
    start.setMonth(0, 1);
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + 1);
    return {
      start,
      end,
      title: `${start.getFullYear()} 年花费`
    };
  }

  start.setDate(1);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1);
  return {
    start,
    end,
    title: `${start.getFullYear()} 年 ${start.getMonth() + 1} 月花费`
  };
}

function getTrendBuckets(mode, range) {
  if (mode === 'week') {
    return Array.from({ length: 7 }).map((_, index) => {
      const start = new Date(range.start);
      start.setDate(range.start.getDate() + index);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      return { label: `${start.getMonth() + 1}/${start.getDate()}`, start, end, total: 0 };
    });
  }

  if (mode === 'year') {
    return Array.from({ length: 12 }).map((_, index) => {
      const start = new Date(range.start.getFullYear(), index, 1);
      const end = new Date(range.start.getFullYear(), index + 1, 1);
      return { label: `${index + 1}月`, start, end, total: 0 };
    });
  }

  const buckets = [];
  let current = new Date(range.start);
  let index = 1;
  while (current < range.end) {
    const start = new Date(current);
    const end = new Date(current);
    end.setDate(end.getDate() + 7);
    if (end > range.end) end.setTime(range.end.getTime());
    buckets.push({ label: `第${index}周`, start, end, total: 0 });
    current = end;
    index += 1;
  }
  return buckets;
}

Page({
  data: {
    activeMode: 'month',
    weekTabClass: '',
    monthTabClass: 'active',
    yearTabClass: '',
    orders: [],
    loading: true,
    isEmpty: false,
    hasTrend: false,
    hasRecent: false,
    periodTitle: '本月花费',
    totalAmount: '0.00',
    averageAmount: '0.00',
    orderCount: 0,
    trendItems: [],
    recentOrders: []
  },

  onShow: function () {
    this.fetchOrders();
  },

  switchMode: function (e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({
      activeMode: mode,
      weekTabClass: mode === 'week' ? 'active' : '',
      monthTabClass: mode === 'month' ? 'active' : '',
      yearTabClass: mode === 'year' ? 'active' : '',
      loading: true
    });
    this.fetchOrders();
  },

  fetchOrders: async function () {
    wx.showLoading({ title: '统计中...' });

    const db = wx.cloud.database();
    const _ = db.command;
    const range = getRange(this.data.activeMode);
    const pageSize = 20;
    let skip = 0;
    let orders = [];

    try {
      while (true) {
        const res = await db.collection('orders')
          .where({
            createdAtLocal: _.gte(range.start.getTime()).and(_.lt(range.end.getTime()))
          })
          .orderBy('createdAtLocal', 'desc')
          .skip(skip)
          .limit(pageSize)
          .get();

        orders = orders.concat(res.data || []);
        if (!res.data || res.data.length < pageSize) break;
        skip += pageSize;
      }

      wx.hideLoading();
      this.setData({ orders, loading: false });
      this.buildStats(orders, this.data.activeMode);
    } catch (err) {
      wx.hideLoading();
      console.error('获取消费统计失败：', err);
      this.setData({ loading: false });
      wx.showToast({
        title: '统计失败',
        icon: 'none'
      });
    }
  },

  buildStats: function (orders, mode) {
    const range = getRange(mode);
    const filtered = orders
      .map(order => Object.assign({}, order, { time: getOrderTime(order) }))
      .filter(order => order.time >= range.start.getTime() && order.time < range.end.getTime());

    const total = filtered.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
    const buckets = getTrendBuckets(mode, range);

    filtered.forEach(order => {
      const matched = buckets.find(bucket =>
        order.time >= bucket.start.getTime() && order.time < bucket.end.getTime()
      );
      if (matched) matched.total += Number(order.totalPrice) || 0;
    });

    const maxBucket = buckets.reduce((max, bucket) => Math.max(max, bucket.total), 0);
    const trendItems = filtered.length === 0 ? [] : buckets
      .filter(bucket => bucket.total > 0 || mode !== 'year')
      .map(bucket => ({
        label: bucket.label,
        amount: formatMoney(bucket.total),
        barStyle: `width: ${maxBucket > 0 ? Math.max(8, Math.round((bucket.total / maxBucket) * 100)) : 0}%;`
      }));

    const recentOrders = filtered.slice(0, 8).map(order => {
      const date = new Date(order.time);
      const itemNames = (order.items || []).map(item => item.name).join('、') || '家庭点餐';
      return {
        _id: order._id,
        dateText: formatDate(date),
        itemNames,
        totalText: formatMoney(order.totalPrice)
      };
    });

    this.setData({
      periodTitle: range.title,
      totalAmount: formatMoney(total),
      averageAmount: formatMoney(filtered.length ? total / filtered.length : 0),
      orderCount: filtered.length,
      isEmpty: !this.data.loading && filtered.length === 0,
      hasTrend: trendItems.length > 0,
      hasRecent: recentOrders.length > 0,
      trendItems,
      recentOrders
    });
  }
});
