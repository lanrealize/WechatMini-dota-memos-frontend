/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    [key: string]: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}

