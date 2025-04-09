# 💰 BillTracker 记账本 💸

一个基于 React 和 TypeScript 的移动端记账应用，帮助用户轻松记录和管理日常收支。从此告别"钱去哪了"的困惑，让你的钱包不再神秘消瘦！

> 💡 **有钱没钱，记账才能睡得香！**

## ✨ 技术栈

- **前端框架**: React 18.x ⚛️
- **构建工具**: Vite 5.x 🚀
- **语言**: TypeScript 5.x 📝
- **UI 组件库**: Zarm Design 2.8.2 🎨
- **路由**: React Router Dom 6.x 🧭
- **HTTP 请求**: Axios 📡
- **样式处理**: Less + CSS Modules 💅
- **移动端适配**: lib-flexible + postcss-pxtorem 📱
- **日期处理**: dayjs 📅
- **表单处理**: rc-form 📋
- **数据可视化**: ECharts 📊

## 🚀 安装与运行

### 环境要求

- Node.js 16.x 或更高 🟢
- npm 8.x 或更高 📦

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 开发模式运行

```bash
npm run dev
```

☕ 倒杯咖啡，代码正在热情启动中...

### 构建生产版本

```bash
npm run build
```

🔨 见证奇迹的时刻到了！

### 预览生产版本

```bash
npm run preview
```

👀 让我们看看成果如何！

## 📂 项目结构

```
billtracker-frontend/
├── public/                 # 静态资源 (这里静静地躺着一些文件)
├── src/                    # 源代码 (所有魔法发生的地方)
│   ├── apis/               # API接口定义 (和后端对话的小桥梁)
│   ├── assets/             # 静态资源 (图片、字体等华丽的装饰品)
│   ├── components/         # 可复用组件 (积木盒子里的小零件)
│   ├── pages/              # 页面组件 (每个页面都是一个小世界)
│   ├── router/             # 路由配置 (指引用户前进的路标)
│   ├── services/           # 服务层 (勤劳的小蜜蜂)
│   ├── types/              # TypeScript类型定义 (代码世界的法律条文)
│   ├── utils/              # 工具函数 (瑞士军刀集合)
│   ├── App.tsx             # 应用入口组件 (一切的起点)
│   ├── index.css           # 全局样式 (全局妆容)
│   └── main.tsx            # 应用入口文件 (项目的大门)
├── .gitignore              # Git忽略文件配置 (选择性失忆清单)
├── eslint.config.js        # ESLint配置 (代码风格警察)
├── index.html              # HTML模板 (网页的骨架)
├── package.json            # 项目依赖配置 (项目的菜单)
├── postcss.config.cjs      # PostCSS配置 (CSS的魔法棒)
├── tsconfig.json           # TypeScript配置 (TS的规则书)
├── tsconfig.node.json      # Node相关TypeScript配置 (又一本规则书)
├── vite.config.ts          # Vite配置 (构建工具的指挥棒)
└── vite-env.d.ts           # Vite环境类型声明 (环境的说明书)
```

## 🌟 功能特点

- 移动端友好的 UI 设计 📱 _(颜值即正义)_
- 收支记录的增删改查 💼 _(掌控每一分钱的去向)_
- 数据可视化统计图表 📊 _(让数据说话，比 Excel 好看多了)_
- 账单分类管理 🏷️ _(再也不用纠结钱花在哪了)_
- 用户认证与个人信息管理 🔐 _(安全第一，放心记账)_
- 响应式布局，适配各种移动设备 📲 _(从 iPhone mini 到 iPad Pro 都能优雅使用)_

> 🤔 **你知道吗？** 据研究，坚持记账的人比不记账的人平均每月能多存 15%的钱。开始记账，向"月光族"说再见！

## 💻 开发指南

### 样式开发

项目使用 Less 预处理器和 CSS Modules 进行样式开发，文件命名为`*.module.less`。移动端适配方案采用`lib-flexible`和`postcss-pxtorem`，设计稿基准宽度为 375px。

```less
// 示例：components/Button/index.module.less
.button {
  width: 100px; // 会被自动转换为rem单位
  height: 40px;
}
```

_CSS 也可以很优雅，就像写诗一样～_

### 路由配置

在`src/router`目录下配置路由。_就像是给应用画一张地图，告诉用户该怎么"逛"这个应用。_

### API 请求

使用 Axios 进行 API 请求，API 接口定义在`src/apis`目录下。项目已配置 API 代理，开发时会将`/api`开头的请求代理到`http://backend.com/api/`。

_前端和后端的通信就像谈恋爱，需要双方都理解彼此的语言～_

### 新增页面

1. 在`src/pages`目录下创建页面组件 _(新建一个数字世界的小房间)_
2. 在路由配置中添加新页面 _(给这个房间安装一个门)_
3. 如需 API 交互，在`src/apis`添加相应接口 _(教会它如何与外界交流)_

### 使用 UI 组件

项目使用 Zarm Design 作为 UI 组件库，已配置按需引入。

```tsx
import { Button } from "zarm";

function MyComponent() {
  return <Button theme="primary">按钮</Button>;
}
```

_就像乐高积木一样，组合出漂亮的界面！_

## 🚢 部署

### 构建生产版本

```bash
npm run build
```

构建后的文件将生成在`dist`目录下，可部署到任何静态文件服务器。_小应用即将启航，驶向互联网的大海！_

### 环境变量配置

在部署不同环境时，可以创建相应的环境变量文件：

- `.env`：默认环境变量 _(适用于所有场合的通用装备)_
- `.env.development`：开发环境变量 _(开发时的秘密配方)_
- `.env.production`：生产环境变量 _(正式登台的完美妆容)_

## 🌈 为什么要用 BillTracker？

- 👋 **告别纸质记账** - 再也不用担心账本丢失或算错账了
- 🔍 **一目了然** - 图表分析让你清楚知道钱都花在哪里
- 🧠 **减轻记忆负担** - 不用再靠大脑记住每一笔开销
- 💰 **养成理财习惯** - 明智消费，合理储蓄，财富增长
- 🌱 **环保无纸化** - 拯救小树，保护地球

> 💬 **用户反馈**: "自从用了这个记账本，我发现原来我每个月在奶茶上花了一部手机的钱！" —— 某前奶茶重度爱好者

## 📱 使用场景

- 🛒 **逛超市时** - 记录每一项购物支出
- 🍜 **吃饭结账时** - 快速记录餐饮费用
- 💼 **收到工资时** - 记录收入，规划预算
- 📊 **月底回顾时** - 分析本月消费，调整下月计划

---

_记账也可以很有趣，让我们一起让理财生活变得更美好！_ ✨

_本 README 文件由 AI 助手生成_
