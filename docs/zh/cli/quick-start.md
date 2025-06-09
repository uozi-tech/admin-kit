# CLI 快速开始

UOZI Admin CLI 是一个强大的脚手架工具，帮助你快速创建和配置后台管理项目。

## 特性

- 🚀 **一键创建** - 快速生成项目模板
- 🔧 **交互式配置** - 友好的配置向导
- 📦 **多包管理器支持** - 支持 npm、yarn、pnpm
- 🎯 **最佳实践** - 内置推荐配置
- 🔄 **持续更新** - 模板保持最新

## 系统要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 或 **pnpm** >= 7.0.0 或 **yarn** >= 1.22.0

## 创建项目

使用以下命令快速创建一个新的 UOZI Admin 项目:

```bash
# NPM
npm create uozi-admin@latest my-admin

# Yarn
yarn create uozi-admin my-admin

# PNPM（推荐）
pnpm create uozi-admin my-admin
```

> 💡 **提示**: 推荐使用 pnpm，它具有更快的安装速度和更好的磁盘空间利用率。

## 交互式配置

执行创建命令后，CLI 会引导你完成以下配置:

### 1. 项目名称

```bash
✨ Project name: › my-admin-project
```

输入项目名称，默认为 `uozi-admin-project`。此名称将用作:
- 项目目录名
- package.json 中的 name 字段

### 2. 目录确认

如果目标目录已存在，CLI 会询问如何处理:

```bash
Target directory "my-admin-project" is not empty. Please choose how to proceed:
❯ Remove existing files and continue
  Cancel operation
  Ignore files and continue
```

### 3. 包名确认

如果项目名称不符合 npm 包命名规范，CLI 会要求输入一个有效的包名:

```bash
Package name: › my-admin-project
```

### 4. 包管理器选择

```bash
Choose a package manager:
❯ npm
  yarn
  pnpm
```

选择你偏好的包管理器，推荐使用 pnpm。

## 项目初始化

项目创建完成后，你会看到如下提示:

```bash
✔ Project has been created successfully.

Done. Now run:

  cd my-admin-project
  pnpm install
  pnpm dev
```

按照提示执行命令来启动项目:

1. 进入项目目录:
```bash
cd my-admin-project
```

2. 安装依赖:
```bash
pnpm install
```

3. 启动开发服务器:
```bash
pnpm dev
```

现在你可以通过 `http://localhost:5173` 访问你的项目。

## 项目结构预览

成功创建的项目包含以下核心文件和目录:

```
my-admin-project/
├── src/
│   ├── api/           # API 接口
│   ├── components/    # 公共组件
│   ├── router/        # 路由配置
│   ├── store/         # 状态管理
│   ├── views/         # 页面组件
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── .env              # 环境变量
├── index.html        # HTML 模板
├── package.json      # 项目配置
├── tsconfig.json     # TypeScript 配置
└── vite.config.ts    # Vite 配置
```

## 下一步

项目创建成功后，建议按以下顺序学习：

### 📚 了解项目
1. [项目结构](/zh/cli/project-structure) - 了解详细的目录说明
2. [配置说明](/zh/cli/configuration) - 了解项目配置选项

### 🚀 开始开发
1. [入门指南](/zh/getting-started) - 完整的开发教程
2. [Request 库](/zh/request/quick-start) - 学习 API 层的使用
3. [CRUD 组件](/zh/curd/quick-start) - 构建数据管理页面
4. [Layout 组件](/zh/layout/quick-start) - 自定义页面布局

### 🔧 进阶配置
1. [共享配置](/zh/shared-config/quick-start) - 优化开发体验
2. [全局配置](/zh/curd/advance/global-config) - 统一配置管理

## 常见问题

### 创建失败怎么办？

1. **检查网络连接** - 确保能正常访问 npm 仓库
2. **更新 Node.js** - 确保版本 >= 18.0.0
3. **清理缓存** - 运行 `npm cache clean --force`
4. **使用镜像** - 设置国内镜像源

```bash
# 设置 npm 镜像
npm config set registry https://registry.npmmirror.com

# 设置 pnpm 镜像
pnpm config set registry https://registry.npmmirror.com
```

### 如何更新模板？

```bash
# 更新到最新版本
npm create uozi-admin@latest
```

### 支持哪些功能？

创建的项目包含：
- ✅ Vue 3 + TypeScript
- ✅ Vite 构建工具
- ✅ Ant Design Vue UI 库
- ✅ Vue Router 路由管理
- ✅ Pinia 状态管理
- ✅ UnoCSS 原子化 CSS
- ✅ ESLint + Prettier 代码规范
- ✅ 国际化支持
- ✅ Mock 数据支持
