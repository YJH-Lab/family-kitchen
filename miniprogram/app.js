App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-d7gcfpwmc6468882a',
        traceUser: true,
      });

      // 执行数据库初始化脚本
      this.initDatabase();
    }
  },

  initDatabase: function () {
    const db = wx.cloud.database();
    const dishesCollection = db.collection('dishes');

    dishesCollection.count().then(res => {
      if (res.total === 0) {
        console.log('dishes 集合为空，开始插入测试数据...');

        const testData = [
          {
            name: '宫保鸡丁',
            price: 38,
            desc: '经典四川菜，麻辣鲜香，鸡肉滑嫩。',
            category: '热菜',
            image: 'https://dummyimage.com/600x400/82B28B/fff&text=Dish',
            ingredients: [
              { name: '鸡胸肉', weight: '200g' },
              { name: '花生米', weight: '50g' },
              { name: '干辣椒', weight: '10g' }
            ],
            steps: [
              { step: 1, text: '鸡肉切丁，用料酒和淀粉腌制。' },
              { step: 2, text: '干辣椒切段，备好花椒。' },
              { step: 3, text: '热锅凉油，滑熟鸡丁后捞出。' },
              { step: 4, text: '爆香辣椒花椒，下鸡丁翻炒，调入糖醋汁，最后加花生米出锅。' }
            ]
          },
          {
            name: '酸辣土豆丝',
            price: 18,
            desc: '家常快手菜，酸辣开胃，口感脆爽。',
            category: '素菜',
            image: 'https://dummyimage.com/600x400/82B28B/fff&text=Dish',
            ingredients: [
              { name: '土豆', weight: '300g' },
              { name: '干辣椒', weight: '5g' },
              { name: '青椒', weight: '30g' }
            ],
            steps: [
              { step: 1, text: '土豆去皮切细丝，过凉水洗去淀粉。' },
              { step: 2, text: '干辣椒切段，青椒切丝。' },
              { step: 3, text: '热锅凉油，爆香干辣椒。' },
              { step: 4, text: '大火快速翻炒土豆丝，加盐和白醋调味，放入青椒丝出锅。' }
            ]
          }
        ];

        testData.forEach(item => {
          dishesCollection.add({
            data: item,
            success: function (res) {
              console.log('插入测试数据成功，ID：', res._id);
            },
            fail: function (err) {
              console.error('插入测试数据失败：', err);
            }
          });
        });
      } else {
        console.log('dishes 集合已有数据，跳过初始化。');
      }
    }).catch(err => {
      console.error('检查 dishes 集合失败：', err);
    });
  },

  globalData: {
    userInfo: null
  }
});