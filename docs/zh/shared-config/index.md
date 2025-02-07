# 共享配置

`@uozi-admin/shared-config` 是一个用于简化 UOZI Admin 项目配置的工具包，提供了开箱即用的 Vite 配置和常用插件配置。

## 安装

```bash
# NPM
npm install @uozi-admin/shared-config -D

# YARN
yarn add @uozi-admin/shared-config -D

# PNPM
pnpm add @uozi-admin/shared-config -D
```

## 基础用法

在 `vite.config.ts` 中使用:

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig()
```

这将自动配置:
- Vue 3 支持
- TypeScript 支持
- JSX/TSX 支持
- API 自动导入
- 组件自动导入
- UnoCSS 支持
- Vue DevTools 支持
- 开发服务器代理配置
- 常用构建优化
