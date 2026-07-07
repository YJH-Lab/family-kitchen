const app = getApp();

Page({
  data: {
    imagePath: '',
    name: '',
    categories: ['特色', '冷菜', '热菜', '汤', '主食'],
    categoryIndex: 0,
    price: '',
    desc: '',
    ingredients: [{ name: '', weight: '' }],
    steps: [{ step: 1, text: '' }]
  },

  chooseImage: function () {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imagePath: res.tempFiles[0].tempFilePath
        });
      }
    });
  },

  onCategoryChange: function (e) {
    this.setData({
      categoryIndex: e.detail.value
    });
  },

  addIngredient: function () {
    this.setData({
      ingredients: [...this.data.ingredients, { name: '', weight: '' }]
    });
  },

  removeIngredient: function (e) {
    const index = e.currentTarget.dataset.index;
    const ingredients = this.data.ingredients;
    ingredients.splice(index, 1);
    this.setData({ ingredients });
  },

  onIngNameInput: function (e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const ingredients = this.data.ingredients;
    ingredients[index].name = value;
    this.setData({ ingredients });
  },

  onIngWeightInput: function (e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const ingredients = this.data.ingredients;
    ingredients[index].weight = value;
    this.setData({ ingredients });
  },

  addStep: function () {
    const steps = this.data.steps;
    this.setData({
      steps: [...steps, { step: steps.length + 1, text: '' }]
    });
  },

  removeStep: function (e) {
    const index = e.currentTarget.dataset.index;
    const steps = this.data.steps;
    steps.splice(index, 1);
    // re-number steps
    steps.forEach((s, i) => s.step = i + 1);
    this.setData({ steps });
  },

  onStepInput: function (e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const steps = this.data.steps;
    steps[index].text = value;
    this.setData({ steps });
  },

  submitDish: async function () {
    const { imagePath, name, categoryIndex, categories, price, desc, ingredients, steps } = this.data;
    
    if (!name.trim()) return wx.showToast({ title: '请输入菜名', icon: 'none' });
    if (!price) return wx.showToast({ title: '请输入价格', icon: 'none' });
    
    wx.showLoading({ title: '发布中...', mask: true });
    
    let fileID = '';
    if (imagePath) {
      try {
        const cloudPath = `menus/${Date.now()}-${Math.floor(Math.random() * 1000)}.png`;
        const uploadRes = await wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: imagePath,
        });
        fileID = uploadRes.fileID;
      } catch (err) {
        wx.hideLoading();
        return wx.showToast({ title: '图片上传失败', icon: 'none' });
      }
    }

    // Clean up empty ingredients/steps
    const finalIngredients = ingredients.filter(i => i.name.trim() || i.weight.trim());
    const finalSteps = steps.filter(s => s.text.trim());
    // Re-number just in case
    finalSteps.forEach((s, i) => s.step = i + 1);

    const data = {
      name: name.trim(),
      category: categories[categoryIndex],
      price: Number(price) || 0,
      desc: desc.trim(),
      image: fileID,
      familyId: app.globalData.familyId,
      ingredients: finalIngredients,
      steps: finalSteps,
      createTime: wx.cloud.database().serverDate()
    };

    try {
      await wx.cloud.database().collection('dishes').add({ data });
      wx.hideLoading();
      wx.showToast({ title: '发布成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (err) {
      wx.hideLoading();
      console.error('发布失败', err);
      wx.showToast({ title: '发布失败', icon: 'none' });
    }
  }
});
