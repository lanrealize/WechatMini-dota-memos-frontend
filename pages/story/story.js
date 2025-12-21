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
      },
      {
        id: 2,
        title: "百万梦境缠绕",
        copywriting: "DreamCoil 百万梦境缠绕，全球流极限守高，那一年我们见证了战术的巅峰与团队的奇迹。",
        videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4"
      },
      {
        id: 3,
        title: "泉水前的剑舞",
        copywriting: "剑刃风暴在泉水前旋转，无敌斩的光芒划破黑暗，这一刻，他不仅是英雄，更是传奇本身。",
        videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4"
      },
      {
        id: 4,
        title: "Roshan的赌注",
        copywriting: "全员买活，Roshan团灭，胜利的天平在最后30秒内完成了180度的逆转。",
        videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4"
      }
    ],
    // 当前显示的故事
    currentStory: null,
    // 文案字符数组（用于逐字动画）
    textChars: [],
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
   * 呼吸节奏分组：短-长-短交替，创造韵律感
   * 使用节奏模式：2字 → 4字 → 2字 → 3字 → 循环
   */
  splitTextBreathing(text) {
    const result = []
    let groupIndex = 0
    let i = 0

    // 呼吸节奏模式：短-长-短-中
    const rhythmPattern = [2, 4, 2, 3]
    let patternIndex = 0

    while (i < text.length) {
      const char = text[i]
      let group = ''
      let charCount = 0
      let targetLength = rhythmPattern[patternIndex]

      // 如果遇到英文单词或数字，单独成组
      if (/[a-zA-Z0-9]/.test(char)) {
        while (i < text.length && /[a-zA-Z0-9]/.test(text[i])) {
          group += text[i]
          i++
        }
        result.push({ char: group, index: groupIndex++ })
        patternIndex = (patternIndex + 1) % rhythmPattern.length
        continue
      }

      // 收集目标长度的字符
      while (i < text.length && charCount < targetLength) {
        const currentChar = text[i]

        // 遇到英文或数字就停止，留给下一轮处理
        if (/[a-zA-Z0-9]/.test(currentChar)) {
          break
        }

        group += currentChar
        i++

        // 标点符号不计入长度，但会包含在组内
        if (!/[，。、？！,.?!；;：: ]/.test(currentChar)) {
          charCount++
        }

        // 如果遇到句末标点，提前结束本组
        if (/[，。！？,.!?]/.test(currentChar)) {
          break
        }
      }

      if (group) {
        result.push({ char: group, index: groupIndex++ })
        patternIndex = (patternIndex + 1) % rhythmPattern.length
      }
    }

    return result
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

    // 使用呼吸节奏分组
    const textChars = this.splitTextBreathing(currentStory.copywriting)

    // 动态计算视频卡片动画开始时间
    // 最后一组的延迟 + 单组动画时长 + 额外缓冲时间
    const lastGroupDelay = (textChars.length - 1) * 0.15  // 每组延迟 0.15s
    const singleCharDuration = 1  // 单组动画时长 1s
    const bufferTime = 0.3  // 额外缓冲 0.3s
    const videoCardDelay = lastGroupDelay + singleCharDuration + bufferTime

    this.setData({
      currentStory,
      textChars,
      videoCardDelay,  // 传递给 WXML 使用
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