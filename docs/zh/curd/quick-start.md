---
outline: deep
---

# 快速开始

本节将帮助你快速上手 CRUD 组件库，学会如何构建一个完整的数据管理页面。

## 核心概念

在开始之前，了解几个核心概念：

- **API 层** - 使用 `@uozi-admin/request` 定义数据接口
- **列定义** - 定义表格列、搜索字段和表单字段
- **CRUD 组件** - 提供完整的增删改查功能

## 安装

::: code-group
```bash [npm]
npm install @uozi-admin/curd
```

```bash [yarn]
yarn add @uozi-admin/curd
```

```bash [pnpm]
pnpm add @uozi-admin/curd
```
:::

## 配置

```ts
import { createCurdConfig } from '@uozi-admin/curd'
import { createApp } from 'vue'

createApp(App)
  .use(createCurdConfig({
    // 可选，如果你需要自定义分页
    listApi: {
      paginationMap: {
        params: {
          current: 'page',
          pageSize: 'page_size',
        },
        response: {
          total: 'total',
          current: 'current_page',
          pageSize: 'per_page',
          totalPages: 'total_pages',
        },
      },
    },
    // 可选，如果你需要自定义国际化
    i18n: {
      legacy: false,
      locale: 'zh-CN',
      fallbackLocale: 'en-US',
      messages: {
        'zh-CN': 'your-zh-CN-messages',
        'zh-HK': 'your-zh-HK-messages',
        'zh-TW': 'your-zh-TW-messages',
        'en-US': 'your-en-US-messages',
      },
    },
    // 可选
    time: {
      // 时间字段是否是 timestamp 类型
      timestamp: false,
    },
    // 可选
    selector: {
      // 忽略 '0' 的字符串
      omitZeroString: true,
    },
  }))
```

## 完整示例

下面通过一个用户管理页面，展示如何使用 CRUD 组件库：

### 1. 定义 API 接口

```ts
// src/api/user.ts
import { useCurdApi } from '@uozi-admin/request'

export const userApi = useCurdApi('/users')
```

### 2. 定义列配置

```ts
// src/views/user/columns.ts
import type { StdTableColumn } from '@uozi-admin/curd'

export const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' }, // 启用搜索
    form: {
      control: 'input',
      required: true
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    form: {
      control: 'input',
      required: true,
      rules: [{ type: 'email', message: '请输入正确的邮箱格式' }]
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: { control: 'select' },
    form: {
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    render: (value) => value === 1 ? '启用' : '禁用'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: { control: 'date-range' }
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
  />
</template>
```

这样就完成了一个功能完整的用户管理页面，包含：
- 数据列表展示
- 搜索功能
- 新增/编辑表单
- 删除功能
- 分页功能

## 独立的可编辑详情页

除了 StdCurd 的完整解决方案，你也可以单独使用 StdDetail 组件创建可编辑的详情页面：

```vue
<!-- src/views/user/detail.vue -->
<script setup lang="ts">
import { StdDetail } from '@uozi-admin/curd'
import { userApi } from '~/api/user'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        rules: [{ required: true, min: 3, max: 20 }]
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        rules: [
          { required: true },
          { type: 'email', message: '请输入有效邮箱' }
        ]
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'switch',
      switch: {
        checkedValue: 1,
        unCheckedValue: 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用'
      }
    },
    customRender: ({ value }) => value === 1 ? '启用' : '禁用'
  },
  {
    title: '个人简介',
    dataIndex: 'bio',
    edit: {
      type: 'textarea',
      textarea: { maxLength: 200, showCount: true }
    }
  },
  {
    title: 'ID',
    dataIndex: 'id'
    // 不设置 edit，此字段不可编辑
  }
]
</script>

<template>
  <StdDetail
    :id="userId"
    :api="userApi"
    :columns="columns"
    :editable="true"
  />
</template>
```

这个详情页面支持：
- 字段级别的编辑控制
- 表单验证
- 模式切换（查看/编辑）
- 自定义渲染

## 高级用法

### 自定义 API 配置

如果不使用 `@uozi-admin/request`，也可以手动定义 API：

```ts
// 手动定义 API
const api = {
  getList: (params) => {
    return fetch('/api/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then(res => res.json())
  },
  getItem: (id) => {
    return fetch(`/api/users/${id}`).then(res => res.json())
  },
  createItem: (data) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  updateItem: (id, data) => {
    return fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  deleteItem: (id) => {
    return fetch(`/api/users/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }
}
```

## 下一步

现在你已经学会了基础用法，可以继续学习：

- [基础概念](/zh/curd/basic-concepts) - 了解核心概念
- [列定义详解](/zh/curd/core/column) - 了解更多列配置选项
- [表单控件](/zh/curd/form-controls/input) - 学习各种表单控件的使用
- [自定义渲染](/zh/curd/advance/custom-render) - 实现复杂的自定义需求
- [全局配置](/zh/curd/advance/global-config) - 配置全局默认行为
