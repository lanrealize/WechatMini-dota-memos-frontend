// pages/story/storyAnimationController.js

const { ANIMATION_CONFIG } = require('./storyData');

/**
 * 故事动画控制器
 * 负责管理：开场动画 → 多场景播放 → 逐句文字动画
 */
class StoryAnimationController {
  constructor(page, storyScenes) {
    this.page = page;
    this.storyScenes = storyScenes;
    this.timers = [];
    this.currentSceneIndex = -1;
    this.isPlaying = false;
    this.sceneStartTime = 0;  // 当前场景的绝对开始时间
  }

  /**
   * 添加定时器（统一管理）
   */
  addTimer(callback, delay) {
    const timer = setTimeout(() => {
      callback();
      this.timers = this.timers.filter(t => t !== timer);
    }, delay);
    
    this.timers.push(timer);
    return timer;
  }

  /**
   * 清理所有定时器
   */
  clearAllTimers() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }

  /**
   * 启动完整故事流程
   */
  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // 播放开场动画
    this.playOpeningAnimation();
    
    // 开场动画结束后，电影遮罩和第一个场景同时开始
    this.addTimer(() => {
      // 同时触发：电影遮罩淡入 + 第一个场景（标题出现）
      this.page.setData({ showCinemaMask: true });
      this.playScene(0);
    }, ANIMATION_CONFIG.CINEMA_MASK_SHOW_TIME);
  }

  /**
   * 播放开场动画
   */
  playOpeningAnimation() {
    const firstSceneImage = this.storyScenes[0].imageUrl;
    
    const newImageAnim = wx.createAnimation({ duration: 0 });
    newImageAnim.opacity(1).step();
    
    const oldImageAnim = wx.createAnimation({ duration: 0 });
    oldImageAnim.opacity(0).step();
    
    this.page.setData({
      showOpeningAnimation: true,
      openingAnimationImageUrl: firstSceneImage,
      currentSceneImageUrl: firstSceneImage,
      newImageAnimation: newImageAnim.export(),
      oldImageAnimation: oldImageAnim.export()
    });

    this.addTimer(() => {
      this.page.setData({
        openingAnimationClass: 'active',
        openingGradientClass: 'active'
      });
    }, ANIMATION_CONFIG.OPENING_DELAY);

    this.addTimer(() => {
      this.page.setData({
        showOpeningAnimation: false
      });
    }, ANIMATION_CONFIG.OPENING_END_TIME);
  }

  /**
   * 播放指定场景
   * @param {number} sceneIndex - 场景索引
   */
  playScene(sceneIndex) {
    if (sceneIndex >= this.storyScenes.length) {
      this.endStory();
      return;
    }

    this.currentSceneIndex = sceneIndex;
    const scene = this.storyScenes[sceneIndex];
    
    // 准备场景数据
    const sentencesData = scene.sentences.map(sentence => ({
      id: sentence.id,
      segments: sentence.segments.map(seg => ({
        text: seg.text,
        type: seg.type,
        color: seg.color,
        show: false  // 初始状态
      }))
    }));

    // 设置句子数据（图片已在transitionToNextScene中设置好）
    this.page.setData({
      currentSentences: sentencesData,
      // 仅第一张图显示标题
      currentTitle: scene.title ? {
        text: scene.title.text,
        show: false
      } : { text: '', show: false }
    });

    // 播放标题（如果有）
    if (scene.title) {
      this.addTimer(() => {
        this.page.setData({
          'currentTitle.show': true
        });
      }, scene.title.showAt);
    }

    // 播放所有句子
    scene.sentences.forEach((sentence, sentenceIndex) => {
      this.playSentence(sentence, sentenceIndex);
    });

    // 场景结束后切换到下一个
    this.addTimer(() => {
      this.transitionToNextScene(sceneIndex + 1);
    }, scene.totalDuration);
  }

  /**
   * 播放单个句子
   * @param {Object} sentence - 句子数据
   * @param {number} sentenceIndex - 句子在当前场景中的索引
   */
  playSentence(sentence, sentenceIndex) {
    sentence.segments.forEach((segment, segmentIndex) => {
      // 计算延迟：句子基础延迟 + 段落的stagger延迟
      const segmentDelay = segment.staggerDelay || 0;
      const totalDelay = sentence.showAt + segmentDelay;
      
      this.addTimer(() => {
        this.page.setData({
          [`currentSentences[${sentenceIndex}].segments[${segmentIndex}].show`]: true
        });
      }, totalDelay);
    });
  }

  /**
   * 切换到下一个场景（带交叉溶解效果）
   * @param {number} nextSceneIndex - 下一个场景索引
   */
  transitionToNextScene(nextSceneIndex) {
    if (nextSceneIndex >= this.storyScenes.length) {
      this.endStory();
      return;
    }

    const nextScene = this.storyScenes[nextSceneIndex];

    // ===== 1. 文字和当前图片一起淡出（1200ms）=====
    const currentSentences = this.page.data.currentSentences;
    const hiddenSentences = currentSentences.map(sentence => ({
      ...sentence,
      segments: sentence.segments.map(seg => ({ ...seg, show: false }))
    }));
    
    // 当前图片淡出
    const currentImageFadeOut = wx.createAnimation({ 
      duration: 1200, 
      timingFunction: 'ease-in-out' 
    });
    currentImageFadeOut.opacity(0).step();
    
    this.page.setData({
      currentSentences: hiddenSentences,
      'currentTitle.show': false,
      newImageAnimation: currentImageFadeOut.export()
    });

    // ===== 2. 淡出完成后，准备新图片 =====
    this.addTimer(() => {
      const newImageAnim = wx.createAnimation({ duration: 0 });
      newImageAnim.opacity(0).step();
      
      this.page.setData({
        currentSceneImageUrl: nextScene.imageUrl,
        newImageAnimation: newImageAnim.export()
      });

      // ===== 3. 新图片淡入（1000ms）=====
      this.addTimer(() => {
        const newFadeIn = wx.createAnimation({ 
          duration: 1000, 
          timingFunction: 'ease-in-out' 
        });
        newFadeIn.opacity(1).step();
        
        this.page.setData({
          newImageAnimation: newFadeIn.export()
        });

        // ===== 4. 淡入完成后，播放新场景 =====
        this.addTimer(() => {
          this.playScene(nextSceneIndex);
        }, 1000 + 200);  // 1000ms淡入 + 200ms短暂停留
      }, 200);
    }, 1200);  // 等待淡出完成
  }

  /**
   * 故事结束
   */
  endStory() {
    // TODO: 显示落幕效果和选项（重播、分享、购买）
  }

  /**
   * 销毁控制器
   */
  destroy() {
    this.clearAllTimers();
    this.page = null;
    this.storyScenes = null;
  }
}

module.exports = {
  StoryAnimationController
};
