# 🚀 快速启动指南

## 第一步：添加测试图片 ⚠️

**必须先完成这一步，否则无法预览！**

### 操作步骤：

1. 打开你的图片所在位置：
   ```
   D:\Developments\dota memos\01 Material\pictures\
   ```

2. 找到 `00.jpg` 文件

3. 复制到项目图片目录：
   ```
   D:\Codes\WechatMini\DotaMemos\Frontend\miniprogram\assets\images\
   ```

4. 重命名为：`void_01.jpg`

### 快速命令（在PowerShell中执行）：

```powershell
Copy-Item "D:\Developments\dota memos\01 Material\pictures\00.jpg" -Destination "miniprogram\assets\images\void_01.jpg"
```

---

## 第二步：安装依赖

```bash
npm install
```

---

## 第三步：在微信开发者工具中打开

1. 打开 **微信开发者工具**

2. 点击 **导入项目**

3. 选择项目目录：
   ```
   D:\Codes\WechatMini\DotaMemos\Frontend
   ```

4. AppID：选择 **测试号** 或使用你的小程序AppID

5. 点击 **导入**

---

## 第四步：构建npm（如果使用mobx）

如果后续需要状态管理：

1. 在微信开发者工具中，点击 **工具** → **构建npm**
2. 等待构建完成

---

## 第五步：预览效果 🎬

1. 点击 **编译** 按钮

2. 观看电影级的开场动画：
   - 0.3s - 渐变遮罩滑动
   - 1.5s - 标题"五秒钟的虚空"淡入
   - 2.2s - 第一段文案淡入
   - 3.0s - 第二段文案淡入
   - 4.5s - 完整动画结束

3. **建议：第一次预览时，全神贯注观看开场动画！**

---

## 常见问题

### Q1: 显示"图片加载失败"？

**A:** 检查图片是否正确放置在 `miniprogram/assets/images/void_01.jpg`

### Q2: 动画效果不流畅？

**A:** 
- 确保在真机上预览（模拟器性能有限）
- 检查图片大小是否过大（建议<500KB）

### Q3: 文案显示位置不对？

**A:** 
- 检查图片比例（建议9:16竖屏）
- 调整 `story.wxss` 中的 `margin-top` 和 `margin-bottom` 值

### Q4: 想调整动画速度？

**A:** 编辑 `story.ts` 中的 setTimeout 时间：
```typescript
// 标题显示时间（默认1500ms）
setTimeout(() => {
  this.setData({ showTitle: true });
}, 1500);  // ← 调整这个值
```

---

## 调试技巧

### 查看动画时间轴

在 `story.ts` 的 `onLoad` 中已有 console.log，可以在控制台查看动画触发时间。

### 跳过开场动画（快速调试）

如果想快速测试文案效果，可以临时修改 `story.wxss`：

```css
/* 注释掉这一行 */
/* animation: storyFadeIn 2.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s; */
```

### 调整电影遮罩高度

在 `story.wxss` 中修改：

```css
.cinema-mask-top {
  height: 15vh;  /* ← 调整上遮罩高度 */
}

.cinema-mask-bottom {
  height: 15vh;  /* ← 调整下遮罩高度 */
}
```

---

## 下一步优化方向

当你看到效果后，可以调整：

1. **文案位置**：修改 `margin-top` / `margin-bottom`
2. **文字大小**：修改 `font-size`
3. **动画速度**：修改 setTimeout 时间
4. **遮罩浓度**：修改 `rgba(0, 0, 0, 1)` 的透明度
5. **文字阴影**：修改 `text-shadow` 参数

---

## 🎬 享受你的电影级视觉体验！

如有任何问题，随时告诉我 😊

