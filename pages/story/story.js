// pages/story/story.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有故事数据
    stories: [
      {
        id: 1,
        title: "7分钟的炼金术",
        copywriting: "信使被击杀，圣者遗物坠落，仅 7 分钟后 ZSMJ 重新打出 3800，向世人展示了他 7 分钟的炼金术。",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4"
      }
    ],
    // 当前显示的故事
    currentStory: null,
    // 视频卡片动画延迟时间（秒）
    videoCardDelay: 0,
    // 是否显示遮罩
    showOverlay: false,
    // 当前故事索引（用于随机切换）
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 随机选择一个故事
    this.randomStory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 获取视频上下文
    this.videoContext = wx.createVideoContext('storyVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时重置遮罩
    this.setData({ showOverlay: false })
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
    return {
      title: 'DotaMemos - 每一帧都是历史',
      path: '/pages/story/story',
      imageUrl: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  },

  /**
   * 视频开始播放
   */
  onVideoPlay() {
    // 视频开始播放时隐藏遮罩
    this.setData({ showOverlay: false })
  },

  /**
   * 视频播放结束
   */
  onVideoEnd() {
    // 视频结束时显示遮罩
    this.setData({ showOverlay: true })
  },

  /**
   * 随机选择一个故事
   */
  randomStory() {
    const stories = this.data.stories
    let newIndex

    // 确保不重复当前故事
    do {
      newIndex = Math.floor(Math.random() * stories.length)
    } while (newIndex === this.data.currentIndex && stories.length > 1)

    const currentStory = stories[newIndex]

    // 计算视频卡片动画开始时间
    // 文字初始延迟 + 文字动画时长 + 额外缓冲时间
    const initialDelay = 1.5  // 文字初始延迟 1.5s
    const textDuration = 1.6  // 文字动画时长 1.6s
    const bufferTime = 1.5  // 文字动画结束后额外缓冲 1.5s
    const videoCardDelay = initialDelay + textDuration + bufferTime

    this.setData({
      currentStory,
      videoCardDelay,
      currentIndex: newIndex,
      showOverlay: false
    })

    // 重置视频播放（下次自动播放）
    if (this.videoContext) {
      this.videoContext.stop()
    }
  },

  /**
   * 重播视频
   */
  replayVideo() {
    this.setData({ showOverlay: false })

    if (this.videoContext) {
      this.videoContext.seek(0)
      this.videoContext.play()
    }
  },

  /**
   * 跳转到收藏页面（shop）
   */
  goToCollect() {
    wx.showToast({
      title: '跳转到收藏页面...',
      icon: 'none'
    })

    // 模拟跳转，实际开发中传递故事ID
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/shop/shop?storyId=' + this.data.currentStory.id
      })
    }, 500)
  },

})