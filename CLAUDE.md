@AGENTS.md

## ⚠️ 关键开发铁律（每次必须遵守）

- 每次只修改一个功能，禁止顺手改动其他无关代码
- 修改任何组件前，先确认不会影响其他页面引用它
- 涉及尺寸的样式，一律用 inline style 写死像素值；字体类名（font-weight、font-family）可用 Tailwind class
- 修改完成后，明确列出改了哪些文件的哪些行
- 删除任何代码前先说明原因并确认
- 不确定时先问，不要自行假设

---

## 品牌色彩（CSS 变量 — 全站统一引用，不得散落硬编码）

```css
--color-primary:    #1a3a6b   /* 导航栏、标题、主按钮 */
--color-accent:     #C9922A   /* 金色强调、图标、CTA 按钮 */
--color-bg:         #ffffff   /* 主内容区背景 */
--color-surface:    #f5f7fa   /* 卡片背景、分隔区块 */
--color-text:       #1a1a2e   /* 正文主色 */
--color-text-muted: #6b7a99   /* 次要文字、说明 */
--color-border:     #e5e7eb   /* 边框、分隔线 */
```

代码中引用示例：`style={{ color: '#1a3a6b' }}` 或 Tailwind 时写注释说明对应变量。

---

## 字体规范

- 标题：`font-family: 'Montserrat', sans-serif`（H1–H3）
- 正文：`font-family: 'Inter', sans-serif`
- 字号层级（inline style 写死）：
  - H1: 48px / font-weight: 700
  - H2: 36px / font-weight: 600
  - H3: 24px / font-weight: 600
  - 正文: 16px / font-weight: 400 / line-height: 1.7
- 规则：字体族和字重用 Tailwind class，字号和行高用 inline style

---

## 组件规范

| 属性 | 值 |
|---|---|
| 组件库 | shadcn/ui |
| 卡片圆角 | 12px |
| 按钮圆角 | 8px |
| 输入框圆角 | 8px |
| 卡片阴影 | `box-shadow: 0 2px 12px rgba(0,0,0,0.08)` |
| 页面左右 padding | 80px（桌面）/ 16px（手机） |
| Section 间距 | 80px padding |

---

## Logo 规范

- 导航栏：`style={{ height: '80px', width: 'auto' }}`
- 页脚：`style={{ height: '60px', width: 'auto' }}`
- 浅色背景用 `/logo-dark.png`，深色背景用 `/logo.png`
- 使用原生 `<img>` 标签 + inline style，避免 Next.js Image 缓存问题

---

## 按钮规范

| 类型 | 样式 |
|---|---|
| 主按钮 | 背景 `#1a3a6b`，白色文字，hover 加深 10% |
| 次按钮 | 边框 `#1a3a6b`，文字 `#1a3a6b`，hover 浅蓝背景 |
| 金色 CTA | 背景 `#C9922A`，白色文字（重要行动按钮） |
| 尺寸 | 固定高度 48px，padding: 0 24px |

---

## 图片规范

- 产品图：使用 Next.js `<Image>` 组件
- 产品主图比例：4:3
- 轮播图比例：16:9，全屏宽度
- 图片未加载时显示浅灰（`#f5f7fa`）占位块

---

## 导航栏规范

- 高度：70px（inline style）
- 背景：白色，底部 `border-bottom: 1px solid #e5e7eb`
- 布局：Logo 左，菜单右，`justify-content: space-between`
- 菜单文字：14px，font-weight: 500，颜色 `#1a1a2e`
- hover 颜色：`#1a3a6b`
- 移动端：汉堡菜单，点击展开侧边抽屉

---

## 产品卡片规范

- 白色背景，圆角 12px，边框 `1px solid #e5e7eb`
- hover：上移 4px（`translateY(-4px)`），阴影加深
- 图片区高度占卡片 60%，hover 时图片轻微放大（scale 1.05）
- 不显示价格；显示"View Details"和"Request Quote"双按钮

---

## 页面区块规范

| 区块 | 背景 | 说明 |
|---|---|---|
| Hero 轮播 | 深色图片 + `rgba(0,0,0,0.4)` 蒙层 | 3张图，5秒自动切换 |
| 产品分类 | `#f5f7fa` | 7大类，4列网格 |
| 公司介绍 | `#1a3a6b`（深蓝） | 白色文字，金色数字 |
| Why Choose Us | `#ffffff` | 4列图标卡片 |
| CTA | `#C9922A`（金色） | 白色文字，深色按钮 |
| 关于我们 | `#f5f7fa` | 浅灰背景 |

---

## 响应式断点

| 断点 | 宽度 | 产品网格 |
|---|---|---|
| 桌面 | ≥ 1024px | 3列（产品列表）/ 4列（分类） |
| 平板 | 768px–1023px | 2列 |
| 手机 | < 768px | 1列 |

---

## 7大产品分类（固定配置）

| 显示名称 | DB category 值 |
|---|---|
| Air Circulation Fan | Air Circulator |
| Traditional Fan | Traditional Fan |
| Tower Fan | Tower Fan |
| Evaporative Air Cooler | Cool Fan |
| Carbon Fiber Heater | Carbon Fiber Heater |
| Electrothermal Film Heater | Electrothermal Film Heater |
| PTC Ceramic Heater | Heater |

---

## 网站优化路线图（对标 Seemax，三点超越）

### 设计标杆
- 主要对标：**Seemax** (seemaxfan.com) — 同产品线优秀同行
- 学习：导航下拉菜单、首页大图分类卡片、实力数字、News 板块、联系方式突出
- 优势：用真实产品图、加筛选器、加产品对比（Seemax 均没有）

### 路线图（按优先级）

**第一优先级 — 核心信任建立**
1. 导航栏 Products 下拉菜单 — 悬停展开 7 大分类 ✅（分类已建）
2. About 页实力数字展示 — 4 个金色大数字
3. Why Choose Us — OEM/ODM / 质量认证 / 全球物流 / 端到端方案

**第二优先级 — 产品体验（超越 Seemax）**
4. 首页产品分类大图卡片 ✅（已完成）
5. 产品列表左侧筛选器 ✅（已完成）
6. 产品详情页：相关产品推荐 + 横向规格对比

**第三优先级 — SEO 和专业度**
7. News/Blog 板块 — 技术文章，植入 OEM/ODM 关键词
8. 后台文章管理

### 相比 Seemax 的三个超越点
1. **产品筛选器** — 他们没有，我们已做强筛选
2. **真实产品图** — 他们多占位图，我们用真图
3. **产品规格对比** — 他们没有，我们加横向对比表

### 联系方式强化（贯穿全站）
- 页脚：询价邮箱、业务联系人姓名
- 社交媒体：LinkedIn、Facebook、YouTube
- 每个产品页明显的 Request Quote 按钮
