@AGENTS.md

## Bilin Stone 设计规范

### 品牌色彩
- 主色：深蓝 #1a3a6b（导航栏、标题、按钮）
- 辅色：金色 #C9922A（强调、图标、下划线）
- 背景：白色 #ffffff（主内容区）
- 浅灰：#f5f7fa（卡片背景、分隔区块）
- 文字主色：#1a1a2e
- 文字次色：#6b7a99

### 字体规范
- 标题字体：font-family: 'Montserrat', sans-serif（大标题）
- 正文字体：font-family: 'Inter', sans-serif（内容）
- 标题层级：
  - H1: 48px / font-weight: 700
  - H2: 36px / font-weight: 600
  - H3: 24px / font-weight: 600
  - 正文: 16px / font-weight: 400 / line-height: 1.7

### 组件规范
- 组件库：shadcn/ui，保持简洁专业风格
- 圆角：卡片 12px，按钮 8px，输入框 8px
- 阴影：卡片用 box-shadow: 0 2px 12px rgba(0,0,0,0.08)
- 间距：页面左右 padding 80px（桌面），16px（手机）
- 分区间距：section 之间 80px padding

### Logo 规范
- 导航栏 Logo：style={{ height: '80px', width: 'auto' }}
- 页脚 Logo：style={{ height: '60px', width: 'auto' }}
- 浅色背景用 /logo-dark.png
- 深色背景用 /logo.png
- 永远用 inline style 固定像素，不用 Tailwind class

### 按钮规范
- 主按钮：背景 #1a3a6b，文字白色，hover 时加深10%
- 次按钮：边框 #1a3a6b，文字 #1a3a6b，hover 背景浅蓝
- 金色按钮：背景 #C9922A，文字白色（用于重要CTA）
- 所有按钮固定高度 48px，padding 0 24px

### 图片规范
- 全部使用 Next.js 的 <Image> 组件
- 产品主图比例：4:3
- 轮播图比例：16:9，全屏宽度
- 图片未加载时显示浅灰占位块

### 导航栏规范
- 高度固定 70px
- 背景白色，底部细线 border-bottom: 1px solid #e5e7eb
- Logo 在左，菜单在右，flex justify-between
- 菜单文字：14px，font-weight: 500，颜色 #1a1a2e
- 菜单 hover：颜色变为 #1a3a6b
- 移动端：汉堡菜单，点击展开

### 产品卡片规范
- 白色背景，圆角 12px，细边框 1px solid #e5e7eb
- hover 时：上移 4px，阴影加深
- 图片占卡片高度 60%，下方显示产品名和分类
- 不显示价格，显示"Request Quote"按钮

### 页面区块规范
- 首页 Hero：全屏轮播图，图片上叠加深色蒙层 rgba(0,0,0,0.4)
- 产品展示区：白色背景，3列网格（桌面），1列（手机）
- 关于我们区：浅灰背景 #f5f7fa
- CTA 区块：深蓝背景 #1a3a6b，白色文字，金色按钮

### 响应式断点
- 桌面：>= 1024px（3列产品网格）
- 平板：768px - 1023px（2列）
- 手机：< 768px（1列）

### 开发规范
- 每次只修改一个功能，完成后检查其他页面未受影响
- 尺寸用固定像素 style={{}} 不用 Tailwind class
- 新增页面必须包含导航栏和页脚
- 参考设计风格：Dyson、Daikin、Midea Global 官网
- 颜色不要硬编码，从上面品牌色中取

## Bilin Stone 网站优化路线图（对标 Seemax + 超越）

### 设计参考标杆
主要对标：Seemax (seemaxfan.com) — 同产品线优秀同行
学习其：导航下拉菜单、首页大图分类卡片、实力数字展示、
        News/Blog 板块、突出的联系方式

### 整体设计方向
- 风格：专业、简洁、国际化 B2B 制造商形象
- 强调 OEM/ODM 能力和供货实力（B2B买家最关心）
- 品牌色：深蓝 #1a3a6b + 金色 #C9922A
- 用真实产品图（这是相比 Seemax 的优势）

### 功能模块路线图（按优先级）

第一优先级（核心信任建立）：
1. 导航栏 Products 下拉菜单 — 悬停展开7大分类
2. About 实力数字展示 — Since 2016 / 产品型号数 / 
   生产基地 / 全球网络（4个金色大数字）
3. Why Choose Us 板块 — 4个核心优势卡片：
   OEM/ODM Capability / Quality Certified / 
   Global Logistics / End-to-End Solutions

第二优先级（产品体验，超越 Seemax）：
4. 首页产品分类大图卡片 — 7大类，每类大图+描述+数量
5. 产品列表页左侧筛选器 — 按大类/功率/控制方式筛选
   （Seemax 没有筛选器，这是我们的超越点）
6. 产品详情页增强 — 相关产品推荐 + 产品对比功能
   （Seemax 没有对比功能，这是我们的超越点）

第三优先级（SEO 和专业度）：
7. News/Blog 板块 — 发布产品技术文章
   文章自然植入 OEM/ODM 关键词做 SEO
8. 后台文章管理 — 发布/编辑/删除文章

### 联系方式强化（贯穿全站）
- 页脚突出：询价邮箱、业务联系人姓名
- 社交媒体图标：LinkedIn、Facebook、YouTube
- 每个产品页都有明显的 Request Quote 按钮

### 相比 Seemax 的三个超越点（重点打造）
1. 产品筛选器 — 他们没有，我们要做强筛选
2. 真实产品图 — 他们很多占位图，我们用真图
3. 产品对比 — 他们没有，我们加横向规格对比

### 开发原则
- 每次只做一个模块，完成后浏览器检查再继续
- 所有尺寸用 inline style 固定像素
- 新模块必须响应式（桌面/平板/手机）
- 保持与现有页面风格一致