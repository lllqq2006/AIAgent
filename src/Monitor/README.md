# 校园低空安全卫士平台

基于 React + Vite + Tailwind CSS 的移动端 Web 应用。

## 快速启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

> 需要 Node.js 18+ 和 npm。

## 项目结构

```
src/
├── App.jsx                 # 根组件，管理认证状态与页面路由
├── main.jsx                # 应用入口
├── index.css               # 全局样式（Tailwind + 自定义动画）
└── components/
    ├── LoginPage.jsx        # 登录 / 注册页面
    ├── MainLayout.jsx       # 主布局（Header + 首页内容 + 底部导航）
    ├── ProfilePage.jsx      # 个人中心页面
    ├── ProfileEditPage.jsx  # 修改资料页面
    ├── AboutPage.jsx        # 关于我们页面
    ├── ReportPage.jsx       # 快速举报页面
    ├── TrackingPage.jsx     # 我的举报记录页面
    ├── EducationPage.jsx    # 安全知识教育页面
    ├── AgreementModal.jsx   # 用户服务协议弹窗
    ├── PrivacyModal.jsx     # 隐私政策弹窗
    └── Toast.jsx            # 轻提示组件
```

## 地图图片

将 `校园地图.png` 放到 `public/` 目录下，地图将自动显示在首页态势卡片中。
