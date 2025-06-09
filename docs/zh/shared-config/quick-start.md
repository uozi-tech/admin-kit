# Shared Config 快速开始

`@uozi-admin/shared-config` 是一个用于简化 UOZI Admin 项目配置的工具包，提供了开箱即用的 Vite 配置和常用插件配置。

## 特性

- 🚀 **零配置** - 开箱即用的 Vite 配置
- 🔧 **高度可定制** - 支持自定义配置覆盖
- 📦 **插件集成** - 内置常用 Vite 插件
- 🎯 **TypeScript** - 完整的类型支持
- ⚡ **性能优化** - 内置构建优化配置
- 🔄 **热更新** - 优化的开发体验

## 安装

::: code-group
```bash [npm]
npm install @uozi-admin/shared-config -D
```

```bash [yarn]
yarn add @uozi-admin/shared-config -D
```

```bash [pnpm]
pnpm add @uozi-admin/shared-config -D
```
:::

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

## 自定义配置

### 基础自定义

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  // 自定义服务器配置
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  
  // 自定义构建配置
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### 添加自定义插件

```ts
import { createViteConfig } from '@uozi-admin/shared-config'
import { defineConfig } from 'vite'
import somePlugin from 'vite-plugin-something'

export default defineConfig((env) => {
  const config = createViteConfig({
    // 基础配置
  })(env)
  
  // 添加自定义插件
  config.plugins?.push(somePlugin())
  
  return config
})
```

### 环境变量配置

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  // 定义环境变量
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
```

## 代理配置

### API 代理

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: 'http://localhost:9000',
        changeOrigin: true
      }
    }
  }
})
```

### 多环境代理

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

const getProxyConfig = (mode: string) => {
  const configs = {
    development: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    },
    staging: {
      '/api': {
        target: 'https://staging-api.example.com',
        changeOrigin: true
      }
    }
  }
  
  return configs[mode as keyof typeof configs] || {}
}

export default createViteConfig((env) => ({
  server: {
    proxy: getProxyConfig(env.mode)
  }
}))
```

## 构建优化

### 分包策略

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 Vue 相关库打包到一个 chunk
          vue: ['vue', 'vue-router', 'pinia'],
          // 将 Ant Design Vue 单独打包
          antd: ['ant-design-vue'],
          // 将工具库打包到一个 chunk
          utils: ['lodash-es', 'dayjs']
        }
      }
    }
  }
})
```

### 压缩配置

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  build: {
    // 启用 gzip 压缩
    reportCompressedSize: true,
    // 设置 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

## 类型定义

### 环境变量类型

```ts
// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_UPLOAD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 配置类型

```ts
import type { UserConfig } from 'vite'
import { createViteConfig } from '@uozi-admin/shared-config'

const config: UserConfig = {
  // 配置项会有完整的类型提示
}

export default createViteConfig(config)
```

## 常见问题

### 如何禁用某个内置插件？

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  // 通过插件配置禁用
  plugins: [
    // 自定义插件配置
  ]
})
```

### 如何修改自动导入配置？

```ts
import { createViteConfig } from '@uozi-admin/shared-config'
import AutoImport from 'unplugin-auto-import/vite'

export default createViteConfig({
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        // 添加自定义导入
        {
          '@/utils': ['formatDate', 'formatCurrency']
        }
      ]
    })
  ]
})
```

## 下一步

- [Vite 配置](/zh/shared-config/vite-config) - 了解详细的 Vite 配置
- [插件配置](/zh/shared-config/plugins) - 学习插件配置选项
- [构建优化](/zh/shared-config/build-optimization) - 优化构建性能
- [环境配置](/zh/shared-config/environment) - 多环境配置管理
