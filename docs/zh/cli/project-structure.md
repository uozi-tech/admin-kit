# 项目结构

本文档详细介绍使用 CLI 创建的项目目录结构和主要文件的作用。

## 完整目录结构

```
my-admin-project/
├── src/                    # 源代码目录
│   ├── api/               # API 接口定义
│   │   └── user.ts       # 用户相关接口
│   ├── assets/            # 静态资源
│   │   └── images/       # 图片资源
│   ├── components/        # 公共组件
│   │   └── HelloWorld.vue
│   ├── constants/         # 常量定义
│   ├── hooks/             # 自定义 Hooks
│   ├── layouts/           # 布局组件
│   ├── router/            # 路由配置
│   │   └── index.ts      # 路由定义
│   ├── store/             # 状态管理
│   │   ├── index.ts      # Store 入口
│   │   └── settings.ts   # 设置状态
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── public/                # 静态资源目录
├── .env                   # 环境变量
├── .eslintrc.js          # ESLint 配置
├── .gitignore            # Git 忽略文件
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

## 核心目录说明

### src/api

API 接口定义目录，推荐使用 `@uozi-admin/request` 提供的工具函数:

```ts
// src/api/user.ts
import { useCurdApi } from '@uozi-admin/request'

// 创建标准 CRUD 接口
export const userApi = useCurdApi('/user')
```

### src/layouts

布局组件目录，使用 `@uozi-admin/layout-antdv` 提供的布局组件:

```vue
<!-- src/layouts/default.vue -->
<script setup lang="ts">
import { AdminLayout } from '@uozi-admin/layout-antdv'
import { sidebarItems } from './config'
</script>

<template>
  <AdminLayout
    site-title="管理后台"
    :sidebar-items="sidebarItems"
  >
    <router-view />
  </AdminLayout>
</template>
```

### src/router

路由配置目录，基于 Vue Router:

```ts
// src/router/index.ts
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
          component: () => import('../views/home.vue')
        }
      ]
    }
  ]
})
```

### src/store

状态管理目录，使用 Pinia:

```ts
// src/store/settings.ts
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'light',
    locale: 'zh-CN'
  }),
  persist: true
})
```

### src/views

页面组件目录，推荐使用 `@uozi-admin/curd` 提供的组件快速开发 CRUD 页面:

```vue
<!-- src/views/user/index.vue -->
<script setup lang="ts">
import { userApi } from '~/api/user'
import { StdCurd } from '@uozi-admin/curd'
import { columns } from './columns'
</script>

<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
  />
</template>
```

## 配置文件说明

### package.json

定义项目依赖和脚本:

```json
{
  "scripts": {
    "dev": "vite", // 开发服务器
    "build": "vite build", // 构建生产版本
    "preview": "vite preview", // 预览构建结果
    "lint": "eslint .", // 代码检查
    "typecheck": "vue-tsc --noEmit" // 类型检查
  }
}
```

### vite.config.ts

Vite 构建工具配置，包含插件、代理等设置。详见[配置说明](./configuration#vite-配置)。

### tsconfig.json

TypeScript 配置，包含类型检查规则。详见[配置说明](./configuration#typescript-配置)。

## 最佳实践

1. **API 接口管理**
   - 按模块组织接口文件
   - 使用 `@uozi-admin/request` 提供的工具函数
   - 定义完整的类型

2. **状态管理**
   - 按功能模块拆分 store
   - 使用 `storeToRefs` 保持响应性
   - 合理使用持久化存储

3. **路由组织**
   - 使用路由懒加载
   - 实现权限控制
   - 保持路由结构清晰

4. **组件开发**
   - 充分利用 `@uozi-admin/curd` 提供的组件
   - 遵循组件设计原则
   - 编写完整的类型定义
