// pages/story/story.js
const { StoryAnimationController } = require('./storyAnimationController');
const { STORY_SCENES } = require('./storyData');
const navigationHelper = require('../../utils/navigationHelper');

Page({
  data: {
    // 开场动画控制
    showOpeningAnimation: false,
    openingAnimationImageUrl: '',
    openingAnimationClass: '',
    openingGradientClass: '',
    
    // 电影遮罩显示控制
    showCinemaMask: false,
    
    // 标题垂直位置
    titleTopPosition: 0,

    // 当前场景图片
    currentSceneImageUrl: '',
    imageTransitioning: false,

    // 当前标题（仅第一张图显示）
    currentTitle: {
      text: '',
      show: false
    },

    // 当前句子列表
    currentSentences: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取胶囊按钮信息，计算标题位置
    const navInfo = navigationHelper.getNavigationInfo();
    const titleCenterY = navInfo.menuTop + (navInfo.menuHeight / 2);
    
    this.setData({
      titleTopPosition: titleCenterY
    });

    // 初始化动画控制器
    this.animationController = new StoryAnimationController(this, STORY_SCENES);
    this.animationController.start();
  },

  /**
   * 图片加载完成
   */
  onImageLoad: function(e) {
    // 图片加载成功
  },

  /**
   * 图片加载失败
   */
  onImageError: function(e) {
    console.error('❌ 图片加载失败', e.detail);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 销毁动画控制器
    if (this.animationController) {
      this.animationController.destroy();
      this.animationController = null;
    }
  }
})
