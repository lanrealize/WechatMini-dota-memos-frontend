// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'Shop Page',
    products: [
      { id: 1, name: 'Dota 英雄手办', price: 199, image: '' },
      { id: 2, name: 'Dota T恤', price: 89, image: '' },
      { id: 3, name: 'Dota 鼠标垫', price: 59, image: '' },
      { id: 4, name: 'Dota 纪念币', price: 299, image: '' }
    ]
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

  },

  /**
   * 返回故事页面
   */
  goToStory() {
    wx.navigateBack()
  },

  /**
   * 购买商品
   */
  buyProduct(e) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.products.find(p => p.id === productId)
    wx.showModal({
      title: '确认购买',
      content: `确定要购买 ${product.name} 吗？价格：${product.price}元`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '购买成功',
            icon: 'success'
          })
        }
      }
    })
  }
})