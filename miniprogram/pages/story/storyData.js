// pages/story/storyData.js

/**
 * 故事数据配置
 * 每个场景包含：图片、停留时长、句子列表
 */

const STORY_SCENES = [
  // ===== 第1张图：开篇 =====
  {
    id: 'scene_1',
    imageUrl: '/assets/images/void_01.png',
    totalDuration: 7000,  // 这张图总停留7秒
    
    // 标题（特殊处理）
    title: {
      text: '五秒钟的虚空',
      showAt: 0,  // 相对于该场景开始的时间
      duration: 1200
    },
    
    // 句子列表
    sentences: [
      {
        id: 's1_1',
        showAt: 2200,
        duration: 1200,
        segments: [
          { text: '虚空假面的大招', type: 'body-primary', color: 'white-primary' }
        ]
      },
      {
        id: 's1_2',
        showAt: 4400,
        duration: 1200,
        segments: [
          { text: '提供 ', type: 'body-primary', color: 'white-primary' },
          { text: '5', type: 'emphasis-number', color: 'white-pure', staggerDelay: 0 },
          { text: ' 秒的时间结界', type: 'body-primary', color: 'white-primary' }
        ]
      }
    ]
  },

  // ===== 第2张图：现实对比 =====
  {
    id: 'scene_2',
    imageUrl: '/assets/images/void_02.png',
    totalDuration: 6000,
    
    sentences: [
      {
        id: 's2_1',
        showAt: 0,
        duration: 1200,
        segments: [
          { text: '在现实里', type: 'body-primary', color: 'white-secondary' }
        ]
      },
      {
        id: 's2_2',
        showAt: 2200,
        duration: 1200,
        segments: [
          { text: '这只够你眨眼', type: 'body-primary', color: 'white-secondary' }
        ]
      },
      {
        id: 's2_3',
        showAt: 4400,
        duration: 1200,
        segments: [
          { text: '3', type: 'emphasis-number', color: 'white-pure', staggerDelay: 0 },
          { text: ' 次', type: 'body-secondary', color: 'white-secondary' }
        ]
      }
    ]
  },

  // ===== 第3张图：Dota世界的震撼 =====
  {
    id: 'scene_3',
    imageUrl: '/assets/images/void_03.png',
    totalDuration: 13000,
    
    sentences: [
      {
        id: 's3_1',
        showAt: 0,
        duration: 1200,
        segments: [
          { text: '但在 Dota 的职业赛场', type: 'body-primary', color: 'white-primary' }
        ]
      },
      {
        id: 's3_2',
        showAt: 2200,
        duration: 1200,
        segments: [
          { text: '5', type: 'emphasis-number', color: 'white-pure', staggerDelay: 0 },
          { text: ' 秒足够', type: 'body-primary', color: 'white-primary' }
        ]
      },
      {
        id: 's3_3',
        showAt: 4400,
        duration: 1200,
        segments: [
          { text: '打出 ', type: 'body-secondary', color: 'white-secondary' },
          { text: '20+', type: 'emphasis-keyword', color: 'white-pure', staggerDelay: 100 },
          { text: ' 次普攻', type: 'body-secondary', color: 'white-secondary' }
        ]
      },
      {
        id: 's3_4',
        showAt: 6600,
        duration: 1200,
        segments: [
          { text: '造成 ', type: 'body-secondary', color: 'white-secondary' },
          { text: '4000+', type: 'emphasis-keyword', color: 'white-pure', staggerDelay: 100 },
          { text: ' 伤害', type: 'body-secondary', color: 'white-secondary' }
        ]
      },
      {
        id: 's3_5',
        showAt: 8800,
        duration: 1200,
        segments: [
          { text: '杀死三个英雄', type: 'body-primary', color: 'white-primary' }
        ]
      },
      {
        id: 's3_6',
        showAt: 11000,
        duration: 1200,
        segments: [
          { text: '赢下世界冠军', type: 'body-primary', color: 'white-primary' }
        ]
      }
    ]
  }
];

/**
 * 动画配置
 */
const ANIMATION_CONFIG = {
  // 开场动画（第一张图之前）
  OPENING_DELAY: 500,
  OPENING_DURATION: 2500,
  OPENING_END_TIME: 4200,
  
  // 电影遮罩
  CINEMA_MASK_SHOW_TIME: 4300,
  
  // 文字动画通用配置
  TEXT_ANIMATION_DURATION: 1200,  // 每段文字的动画时长
  TEXT_STAGGER_DEFAULT: 200,       // segments之间的默认间隔
  
  // 场景切换
  SCENE_TRANSITION_DURATION: 1000
};

module.exports = {
  STORY_SCENES,
  ANIMATION_CONFIG
};

