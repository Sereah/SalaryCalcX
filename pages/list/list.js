// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vBeforeAllSalaryPreTax: "",
    vAfterAllSalaryPreTax: "",
    vBeforeYearProvidentFund: "",
    vAfterYearProvidentFund: "",
    vBeforeMonthProvidentFund: "",
    vAfterMonthProvidentFund: "",
    vBeforeSocialBase: "",
    vAfterSocialBase: "",
    vBeforeYearGold: "",
    vAfterYearGold: "",
    vBeforeAllSalaryAfterTax: "",
    vAfterAllSalaryAfterTax: "",
    back_image: "/assert/index/返回2.png",
    back_image_default: "/assert/index/返回2.png",
    back_image_active: "/assert/index/返回2_active.png",
  },

  tapBack: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  touchBackStart: function () {
    this.setData({
      back_image: this.data.back_image_active,
    })
  },

  touchBackEnd: function () {
    this.setData({
      back_image: this.data.back_image_default,
    })
  },

  tapCalcx: function () {
    wx.switchTab({
      url: '/pages/book/book',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      vBeforeAllSalaryPreTax: getApp().globalData.__beforeAllSalaryPreTax,
      vAfterAllSalaryPreTax: getApp().globalData.__afterAllSalaryPreTax,
      vBeforeYearProvidentFund: getApp().globalData.__beforeYearProvidentFund,
      vAfterYearProvidentFund: getApp().globalData.__afterYearProvidentFund,
      vBeforeMonthProvidentFund: getApp().globalData.__beforeMonthProvidentFund,
      vAfterMonthProvidentFund: getApp().globalData.__afterMonthProvidentFund,
      vBeforeSocialBase: getApp().globalData.__beforeSocialBase,
      vAfterSocialBase: getApp().globalData.__afterSocialBase,
      vBeforeYearGold: getApp().globalData.__beforeYearGold,
      vAfterYearGold: getApp().globalData.__afterYearGold,
      vBeforeAllSalaryAfterTax: getApp().globalData.__beforeAllSalaryAfterTax,
      vAfterAllSalaryAfterTax: getApp().globalData.__afterAllSalaryAfterTax,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})