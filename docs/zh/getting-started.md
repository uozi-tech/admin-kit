---
outline: deep
---

# 入门指南

欢迎使用 UOZI Admin！本指南将帮助你快速上手，从零开始构建一个完整的后台管理系统。

## 🎯 学习目标

通过本指南，你将学会：
- 创建一个新的 UOZI Admin 项目
- 理解框架的核心概念
- 构建你的第一个数据管理页面
- 掌握常用的开发模式

## 📋 前置要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 或 **pnpm** >= 7.0.0
- 基础的 **Vue 3** 和 **TypeScript** 知识

## 🚀 第一步：创建项目

使用官方脚手架创建一个新项目：

```bash
# 使用 npm
npm create uozi-admin@latest my-admin

# 使用 pnpm（推荐）
pnpm create uozi-admin my-admin

# 使用 yarn
yarn create uozi-admin my-admin
```

按照提示完成项目配置，然后启动开发服务器：

```bash
cd my-admin
pnpm install
pnpm dev
```

🎉 恭喜！你的第一个 UOZI Admin 项目已经运行起来了。

## 📁 项目结构

让我们了解一下项目的基本结构：

```
my-admin/
├── src/
│   ├── api/          # API 接口定义
│   │   └── user.ts   # 用户相关接口
│   ├── views/        # 页面组件
│   │   └── user/     # 用户管理页面
│   ├── router/       # 路由配置
│   ├── store/        # 状态管理
│   ├── language/     # 国际化文件
│   └── main.ts       # 应用入口
├── public/           # 静态资源
└── package.json      # 项目配置
```

## 🧩 核心概念

UOZI Admin 基于几个核心概念构建：

### 1. API 层

使用拦截器预处理响应数据：

```ts
// interceptor.ts
import { useAxios } from '@uozi-admin/request'

const { setRequestInterceptor, setResponseInterceptor } = useAxios()

export function serviceInterceptor() {
  // 其他逻辑...

  setResponseInterceptor(
    (response) => {
      // 必须返回 response.data, 否则 CURD 组件无法正常运行
      return Promise.resolve(response.data)
    },
    async (error) => {
      return Promise.reject(error.response.data)
    },
  )
}
```

使用 `@uozi-admin/request` 定义数据接口：

```ts
// src/api/user.ts
import { useCurdApi } from '@uozi-admin/request'

// 自动生成 CRUD 接口
export const userApi = useCurdApi('/users')
```

### 2. 列定义
定义数据的展示和编辑方式：

```ts
// src/views/user/columns.ts
import type { StdTableColumn } from '@uozi-admin/curd'

export const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' },  // 搜索配置
    form: { control: 'input', required: true }  // 表单配置
  }
]
```

### 3. 页面组件
使用 `StdCurd` 组件快速构建页面：

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

## 🛠️ 第二步：构建第一个页面

让我们一步步构建一个用户管理页面：

### 1. 定义 API 接口

```ts
// src/api/user.ts
import { useCurdApi } from '@uozi-admin/request'

export interface User {
  id: number
  username: string
  email: string
  status: number
  created_at: string
}

export const userApi = useCurdApi<User>('/users')
```

### 2. 定义列配置

```ts
// src/views/user/columns.ts
import type { StdTableColumn } from '@uozi-admin/curd'
import type { User } from '~/api/user'

export const columns: StdTableColumn<User>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '用户名',
    dataIndex: 'username',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { min: 3, max: 20, message: '用户名长度为 3-20 个字符' }
        ]
      }
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { type: 'email', message: '请输入正确的邮箱格式' }
        ]
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: true,
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    customRender: ({ text: value }) => {
      return value === 1 ? 
        '<span style="color: green">启用</span>' : 
        '<span style="color: red">禁用</span>'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: { type: 'date-range' }
  }
]
```

### 3. 创建页面组件

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
    :create-btn="true"
    :edit-btn="true"
    :delete-btn="true"
  />
</template>
```

### 4. 配置路由

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/users',
    name: 'Users',
    component: () => import('~/views/user/index.vue'),
    meta: {
      title: '用户管理'
    }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

## 🎨 第三步：自定义样式

你可以通过多种方式自定义页面样式：

### 1. 自定义列渲染

```ts
// 在列定义中添加自定义渲染
{
  title: '头像',
  dataIndex: 'avatar',
  customRender: ({ text: value }) => {
    return `<img src="${value}" style="width: 40px; height: 40px; border-radius: 50%" />`
  }
}
```

### 2. 自定义操作按钮

```vue
<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
  >
    <!-- 自定义操作列 -->
    <template #beforeActions="{ record }">
      <a-button type="link" @click="viewProfile(record.id)">
        查看详情
      </a-button>
      <a-button type="link" @click="resetPassword(record.id)">
        重置密码
      </a-button>
    </template>
  </StdCurd>
</template>
```

## 🔧 第四步：配置和优化

### 1. 全局配置

在 `main.ts` 中配置全局选项：

```ts
// src/main.ts
import { createCurdConfig } from '@uozi-admin/curd'
import { setRequestConfig } from '@uozi-admin/request'

// 配置请求
setRequestConfig({
  baseURL: '/api',
  timeout: 10000
})

// 配置 CRUD
app.use(createCurdConfig({
  listApi: {
    paginationMap: {
      params: {
        current: 'page',
        pageSize: 'page_size'
      },
      response: {
        total: 'total',
        current: 'current_page',
        pageSize: 'per_page'
      }
    }
  }
}))
```

### 2. 请求拦截器

```ts
// src/utils/request.ts
import { useAxios } from '@uozi-admin/request'

const { setRequestInterceptor, setResponseInterceptor } = useAxios()

// 请求拦截器
setRequestInterceptor(
  (config) => {
    // 添加认证 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
setResponseInterceptor(
  (response) => {
    return response.data
  },
  (error) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // 跳转到登录页
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## 📚 下一步学习

恭喜！你已经掌握了 UOZI Admin 的基础用法。接下来可以深入学习：

### 🌟 基础进阶
- [Request 库详解](/zh/request/quick-start) - 深入了解 API 层
- [CRUD 组件详解](/zh/curd/quick-start) - 掌握更多组件功能
- [布局系统](/zh/layout/quick-start) - 自定义页面布局

### 🔧 高级功能
- [表单控件](/zh/curd/form-controls/input) - 学习各种表单控件
- [自定义渲染](/zh/curd/advance/custom-render) - 实现复杂的自定义需求
- [国际化](/zh/curd/advance/i18n) - 多语言支持

### 🎯 最佳实践
- [项目结构](/zh/cli/project-structure) - 推荐的项目组织方式
- [全局配置](/zh/curd/advance/global-config) - 统一配置管理

## 🤝 获得帮助

如果你在使用过程中遇到问题：

- 📖 查看 [完整文档](/zh/overview)
- 🐛 提交 [Issue](https://github.com/uozi-tech/admin-kit/issues)
- 💬 参与 [讨论](https://github.com/uozi-tech/admin-kit/discussions)

## 🎉 总结

通过本指南，你已经：

✅ 创建了第一个 UOZI Admin 项目  
✅ 理解了框架的核心概念  
✅ 构建了一个完整的数据管理页面  
✅ 学会了基本的配置和自定义  

现在你可以开始构建自己的后台管理系统了！