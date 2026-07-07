App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-d7gcfpwmc6468882a',
        traceUser: true,
      });
      this.initPromise = this.initUser();
    }
  },

  initUser: async function () {
    try {
      const loginRes = await wx.cloud.callFunction({ name: 'login' });
      const openid = loginRes.result.openid;
      this.globalData.openid = openid;

      const db = wx.cloud.database();
      const userRes = await db.collection('users').where({ openid }).get();
      
      if (userRes.data && userRes.data.length > 0) {
        const userRec = userRes.data[0];
        if (userRec.familyId) {
          this.globalData.familyId = userRec.familyId;
        }
        this.globalData.userInfo = {
          avatarUrl: userRec.avatarUrl || '',
          nickName: userRec.nickName || ''
        };
      } else {
        this.globalData.familyId = null;
      }
    } catch (err) {
      console.error('Init user failed:', err);
    }
  },

  checkFamily: async function() {
    await this.initPromise;
    if (!this.globalData.familyId) {
      wx.redirectTo({ url: '/pages/onboarding/onboarding' });
      return false;
    }
    return true;
  },

  globalData: {
    userInfo: null,
    openid: null,
    familyId: null
  }
});
