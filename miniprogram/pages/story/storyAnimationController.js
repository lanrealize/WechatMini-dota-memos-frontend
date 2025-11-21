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
    
    // 开场动画结束后，显示电影遮罩并开始第一个场景
    this.addTimer(() => {
      this.page.setData({ showCinemaMask: true });
      
      // 电影遮罩动画完成后，开始第一个场景
      this.addTimer(() => {
        this.playScene(0);
      }, 1200 + 1000);  // 电影遮罩1.2s动画 + 1s间隔
    }, ANIMATION_CONFIG.CINEMA_MASK_SHOW_TIME);
  }

  /**
   * 播放开场动画（保持原有实现）
   */
  playOpeningAnimation() {
    const firstSceneImage = this.storyScenes[0].imageUrl;
    
    // 显示开场动画容器
    this.page.setData({
      showOpeningAnimation: true,
      openingAnimationImageUrl: firstSceneImage,
      currentSceneImageUrl: firstSceneImage  // 同时设置背景图
    });

    // T=500ms: 激活开场动画
    this.addTimer(() => {
      this.page.setData({
        openingAnimationClass: 'active',
        openingGradientClass: 'active'
      });
    }, ANIMATION_CONFIG.OPENING_DELAY);

    // T=4200ms: 移除开场遮罩
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

    // 设置场景图片和句子
    this.page.setData({
      currentSceneImageUrl: scene.imageUrl,
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
   * 切换到下一个场景
   * @param {number} nextSceneIndex - 下一个场景索引
   */
  transitionToNextScene(nextSceneIndex) {
    if (nextSceneIndex >= this.storyScenes.length) {
      this.endStory();
      return;
    }

    // 清空当前文字（场景切换时重置）
    this.page.setData({
      currentSentences: [],
      currentTitle: { text: '', show: false }
    });

    // 短暂延迟后播放下一个场景
    this.addTimer(() => {
      this.playScene(nextSceneIndex);
    }, 500);
  }

  /**
   * 故事结束
   */
  endStory() {
    console.log('🎬 故事播放完成');
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
