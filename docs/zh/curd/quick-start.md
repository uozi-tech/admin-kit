---
outline: deep
---

# 快速开始

本节将通过 4 个渐进式的例子，帮助您从零开始掌握 CURD 组件库的使用方法。

## 🎯 学习目标

通过本节学习，您将掌握：
- 安装和配置 CURD 组件库
- 创建最简单的数据表格
- 添加搜索和表单功能
- 使用一站式 StdCurd 组件

## 🏗️ 核心理念

在开始之前，先理解 CURD 的核心设计理念：

### 📋 统一的列定义
一个配置对象同时定义：
- 📊 **表格列** - 如何在表格中显示数据
- 🔍 **搜索字段** - 如何搜索数据  
- 📝 **表单字段** - 如何编辑数据

### 🔗 API 驱动
通过标准的 API 接口自动处理：
- 📜 列表查询
- ➕ 数据新增
- ✏️ 数据编辑
- 🗑️ 数据删除

## 📦 第一步：安装和配置

### 安装依赖

::: code-group
```bash [pnpm (推荐)]
pnpm add @uozi-admin/curd @uozi-admin/request
```

```bash [npm]
npm install @uozi-admin/curd @uozi-admin/request
```

```bash [yarn]
yarn add @uozi-admin/curd @uozi-admin/request
```
:::

### 全局配置

在你的 `main.ts` 中添加配置：

```ts
import { createApp } from 'vue'
import { createCurdConfig } from '@uozi-admin/curd'
import App from './App.vue'

const app = createApp(App)

// 使用默认配置
app.use(createCurdConfig())

app.mount('#app')
```

## 🚀 第二步：创建你的第一个数据表格

让我们从最简单的只读表格开始：

### 定义 API

```ts
// src/api/user.ts
import { useCurdApi } from '@uozi-admin/request'

export const userApi = useCurdApi('/users')
```

### 定义列配置

```ts
// src/views/user/columns.ts
import type { StdTableColumn } from '@uozi-admin/curd'

export const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) => value === 1 ? '启用' : '禁用'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
  }
]
```

### 创建页面

```vue
<!-- src/views/user/index.vue -->
<script setup lang="ts">
import { StdTable } from '@uozi-admin/curd'
import { userApi } from '~/api/user'
import { columns } from './columns'
</script>

<template>
  <StdTable 
    :api="userApi"
    :columns="columns"
  />
</template>
```

🎉 **恭喜！** 你已经创建了第一个数据表格，具备了列表展示和分页功能。

## 🔍 第三步：添加搜索功能

现在让我们为表格添加搜索功能：

```ts
// 更新 columns.ts
export const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' }, // 👈 添加搜索配置
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: { 
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }, // 👈 添加下拉搜索
    customRender: ({ value }) => value === 1 ? '启用' : '禁用'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: { control: 'date-range' } // 👈 添加日期范围搜索
  }
]
```

```vue
<!-- 更新页面组件 -->
<template>
  <div>
    <StdSearch 
      :columns="columns" 
      :api="userApi"
      @search="handleSearch"
    />
    <StdTable 
      :api="userApi"
      :columns="columns"
      :search-params="searchParams"
    />
  </div>
</template>

<script setup lang="ts">
import { StdTable, StdSearch } from '@uozi-admin/curd'
import { ref } from 'vue'

const searchParams = ref({})

function handleSearch(params: any) {
  searchParams.value = params
}
</script>
```

✨ 现在你的表格具备了强大的搜索功能！

## 📝 第四步：添加表单功能

让我们添加新增和编辑功能：

```ts
// 继续更新 columns.ts
export const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' },
    form: { 
      control: 'input',
      required: true 
    } // 👈 添加表单配置
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    form: {
      control: 'input',
      required: true,
      rules: [
        { type: 'email', message: '请输入正确的邮箱格式' }
      ]
    } // 👈 添加验证规则
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: { 
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    form: {
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      defaultValue: 1
    }, // 👈 添加表单选择
    customRender: ({ value }) => value === 1 ? '启用' : '禁用'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: { control: 'date-range' }
    // 👆 创建时间通常不需要表单配置
  }
]
```

现在使用独立的表单组件：

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <Button @click="showAddForm = true">新增用户</Button>
    </div>
    
    <StdSearch 
      :columns="columns" 
      :api="userApi"
      @search="handleSearch"
    />
    
    <StdTable 
      :api="userApi"
      :columns="columns"
      :search-params="searchParams"
      @edit="handleEdit"
    />

    <!-- 新增/编辑表单弹窗 -->
    <Modal v-model:open="showAddForm" title="新增用户">
      <StdForm 
        :columns="columns"
        :api="userApi"
        @success="handleSuccess"
      />
    </Modal>

    <Modal v-model:open="showEditForm" title="编辑用户">
      <StdForm 
        :columns="columns"
        :api="userApi"
        :id="editId"
        @success="handleSuccess"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { StdTable, StdSearch, StdForm } from '@uozi-admin/curd'
import { Modal, Button } from 'ant-design-vue'
import { ref } from 'vue'

const showAddForm = ref(false)
const showEditForm = ref(false)
const editId = ref<number>()
const searchParams = ref({})

function handleSearch(params: any) {
  searchParams.value = params
}

function handleEdit(record: any) {
  editId.value = record.id
  showEditForm.value = true
}

function handleSuccess() {
  showAddForm.value = false
  showEditForm.value = false
  // 刷新表格...
}
</script>
```

🎯 现在你已经掌握了完整的 CRUD 功能！

## ⚡ 第五步：一站式解决方案

上面的步骤让你了解了各个组件的工作原理。在实际开发中，你可以使用 `StdCurd` 一站式解决方案：

<demo vue="../demos/curd/basic/basic.vue" title="基础示例" description="完整的CRUD功能，包含列表、搜索、新增、编辑、删除等"></demo>

仅仅几行代码，你就得到了一个功能完整的用户管理页面，包含：

✅ **数据列表展示** - 自动分页、排序  
✅ **智能搜索** - 根据列配置自动生成搜索表单  
✅ **表单操作** - 新增、编辑、删除  
✅ **数据验证** - 自动表单验证  
✅ **响应式设计** - 适配各种屏幕尺寸  
✅ **国际化支持** - 内置中英文

## 💪 高级配置示例

### 自定义全局配置

如果你的后端 API 格式不是标准格式，可以进行自定义配置：

```ts
// main.ts
app.use(createCurdConfig({
  // 自定义分页字段映射
  listApi: {
    paginationMap: {
      params: {
        current: 'page',      // 发送给后端的当前页字段名
        pageSize: 'page_size', // 发送给后端的每页条数字段名
      },
      response: {
        total: 'total',         // 后端返回的总数字段名
        current: 'current_page', // 后端返回的当前页字段名
        pageSize: 'per_page',   // 后端返回的每页条数字段名
        totalPages: 'total_pages', // 后端返回的总页数字段名
      },
    },
  },
  
  // 自定义国际化
  i18n: {
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
  },
  
  // 自定义日期格式
  dateFormat: {
    date: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
  },
}))
```

### 自定义 API 接口

如果不使用 `@uozi-admin/request`，也可以手动定义 API：

```ts
// 自定义 API 接口
const customApi = {
  getList: (params: any) => {
    return fetch('/api/users?' + new URLSearchParams(params))
      .then(res => res.json())
  },
  
  getItem: (id: string) => {
    return fetch(`/api/users/${id}`)
      .then(res => res.json())
  },
  
  createItem: (data: any) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  
  updateItem: (id: string, data: any) => {
    return fetch(`/api/users/${id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  
  deleteItem: (id: string) => {
    return fetch(`/api/users/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }
}
```

## 🚀 下一步学习指南

恭喜完成快速入门！现在你可以按照以下路径深入学习：

### 🔰 基础篇
- [基础概念](/zh/curd/basic-concepts) - 深入理解设计理念和核心概念

### 📚 核心功能
- [列配置详解](/zh/curd/core/column) - 掌握强大的列配置选项
- [表单配置](/zh/curd/core/form) - 学习表单验证和配置
- [搜索配置](/zh/curd/core/search) - 了解搜索功能的各种用法

### 🧩 组件详解  
- [StdCurd 组件](/zh/curd/components/std-curd) - 一站式解决方案
- [StdTable 组件](/zh/curd/components/std-table) - 数据表格组件
- [StdForm 组件](/zh/curd/components/std-form) - 表单组件

### 🎛️ 表单控件
- [基础控件](/zh/curd/form-controls/input) - 输入框、选择器等
- [日期时间](/zh/curd/form-controls/date) - 日期时间选择器
- [高级控件](/zh/curd/form-controls/selector) - 复杂选择器、上传等

### ⚡ 高级特性
- [表单联动](/zh/curd/advance/form-linkage) - 实现字段间的交互
- [自定义渲染](/zh/curd/advance/custom-render) - 个性化显示和交互  
- [批量操作](/zh/curd/advance/batch-operations) - 批量编辑和删除
- [国际化](/zh/curd/advance/i18n) - 多语言支持

选择你感兴趣的主题开始深入学习吧！🎓
