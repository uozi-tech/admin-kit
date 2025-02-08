# 配置说明

本文档详细介绍项目的各项配置选项。

## 环境变量配置

项目使用 `.env` 文件配置环境变量:

```bash
# API 根路径
VITE_API_ROOT=/api

# 开发环境代理目标
VITE_PROXY_TARGET=http://localhost:8080
```

支持的环境变量:

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| VITE_API_ROOT | API 请求根路径 | `/api` |
| VITE_PROXY_TARGET | 开发环境代理目标 | `http://localhost:8080` |

## Vite 配置

`vite.config.ts` 包含项目构建配置:

```ts
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // 插件配置
  plugins: [
    // Vue 支持
    vue(),

    // 自动导入 API
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: true
    }),

    // 自动导入组件
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),

    // 原子化 CSS
    Unocss()
  ],

  // 开发服务器配置
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET,
        changeOrigin: true
      }
    }
  },

  // 构建配置
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets'
  },

  // 解析配置
  resolve: {
    alias: {
      '~': '/src'
    }
  }
})
```

## TypeScript 配置

`tsconfig.json` 包含 TypeScript 配置:

```json
{
  "compilerOptions": {
    // 编译目标
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",

    // 严格模式
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    // JSX 支持
    "jsx": "preserve",

    // 路径解析
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    },

    // 类型定义
    "types": ["vite/client"]
  },

  // 包含的文件
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ]
}
```

## ESLint 配置

项目使用 `@antfu/eslint-config` 作为基础配置:

```js
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  // 忽略文件
  ignores: [
    'dist',
    'public',
    '*.d.ts'
  ]
}).overrideRules({
  // Vue 相关规则
  'vue/max-attributes-per-line': ['error', {
    singleline: { max: 1 },
    multiline: { max: 1 }
  }],
  'vue/first-attribute-linebreak': ['error', {
    singleline: 'beside',
    multiline: 'below'
  }],

  // TypeScript 相关规则
  'ts/no-use-before-define': 'off',

  // 其他规则
  'no-console': 'warn',
  'unused-imports/no-unused-vars': 'warn'
})
```

## 主题配置

通过 `src/store/settings.ts` 配置主题相关选项:

```ts
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // 主题模式
    theme: 'light', // 'light' | 'dark'

    // 国际化
    locale: 'zh-CN',

    // 布局设置
    layout: {
      // 侧边栏
      siderCollapsed: false,

      // 标签页
      showTabs: true
    }
  }),

  // 持久化
  persist: true
})
```

## 路由配置

`src/router/index.ts` 包含路由配置:

```ts
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/home.vue'),
          meta: {
            title: '首页',
            icon: 'home'
          }
        }
      ]
    },

    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
      meta: {
        title: '登录'
      }
    }
  ]
})
```

## 更多配置

- [Layout 组件配置](/zh/layout/quick-start)
- [CURD 组件配置](/zh/curd/quick-start)
- [Request 配置](/zh/request/quick-start)
