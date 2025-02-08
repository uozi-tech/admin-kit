# 快速开始

## 创建项目

使用以下命令快速创建一个新的 UOZI Admin 项目:

```bash
# NPM
npm create uozi-admin@latest

# Yarn
yarn create uozi-admin

# PNPM
pnpm create uozi-admin
```

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

- 查看[项目结构](/zh/cli/project-structure)了解详细的目录说明
- 查看[配置说明](/zh/cli/configuration)了解项目配置选项
- 访问 [CURD 组件](/zh/curd/quick-start)和 [Layout 组件](/zh/layout/quick-start)了解核心功能
