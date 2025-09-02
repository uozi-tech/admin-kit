---
outline: deep
---

# 快速开始

本指南将通过渐进式示例，帮助您快速掌握 CURD 组件库的使用方法。

## 📦 安装配置

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

在 `main.ts` 中添加配置：

```ts
import { createApp } from 'vue'
import { createCurdConfig } from '@uozi-admin/curd'
import App from './App.vue'

const app = createApp(App)

// 使用默认配置
app.use(createCurdConfig())

app.mount('#app')
```

## 🚀 第一个示例：只读表格

让我们从最简单的数据表格开始：

```vue
<script setup lang="ts">
import { StdTable } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

// 定义 API
const userApi = useCurdApi('/users')

// 定义列配置
const columns = [
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status' },
  { title: '创建时间', dataIndex: 'created_at' }
]
</script>

<template>
  <StdTable :api="userApi" :columns="columns" />
</template>
```

🎉 恭喜！您已经创建了第一个数据表格。

## 🔍 第二个示例：添加搜索

为表格添加搜索功能：

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' } // 👈 添加搜索
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
    } // 👈 下拉搜索
  },
  { title: '邮箱', dataIndex: 'email' },
  { title: '创建时间', dataIndex: 'created_at' }
]
</script>

<template>
  <StdCurd :api="userApi" :columns="columns" />
</template>
```

✨ 现在您的表格具备了搜索功能！

## 📝 第三个示例：完整 CRUD

添加新增、编辑、删除功能：

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')

const columns = [
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
      control: 'switch',
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
      defaultValue: 1
    } // 👈 表单使用开关控件
  },
  { title: '创建时间', dataIndex: 'created_at' }
]
</script>

<template>
  <StdCurd 
    title="用户管理"
    :api="userApi" 
    :columns="columns" 
  />
</template>
```

🎯 现在您拥有了功能完整的用户管理页面！

## ⚡ 第四个示例：高级定制

添加自定义渲染和高级功能：

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import { Tag } from 'ant-design-vue'
import { h } from 'vue'

const userApi = useCurdApi('/users')

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' },
    form: { control: 'input', required: true }
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    customRender: ({ value }) => 
      h('img', { src: value, style: 'width: 32px; height: 32px; border-radius: 50%;' }),
    form: {
      control: 'upload',
      accept: 'image/*',
      maxCount: 1
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) => 
      h(Tag, { color: value === 1 ? 'green' : 'red' }, 
        () => value === 1 ? '启用' : '禁用'),
    search: { 
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    form: {
      control: 'switch',
      checkedChildren: '启用',
      unCheckedChildren: '禁用'
    }
  },
  {
    title: '角色',
    dataIndex: 'roles',
    form: {
      control: 'checkboxGroup',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '编辑者', value: 'editor' },
        { label: '查看者', value: 'viewer' }
      ]
    }
  }
]
</script>

<template>
  <StdCurd 
    title="用户管理"
    :api="userApi" 
    :columns="columns"
    :table-props="{ 
      rowSelection: { type: 'checkbox' },
      scroll: { x: 800 }
    }"
  />
</template>
```

🚀 您已经掌握了 CURD 的核心功能！

## 🎓 下一步学习

恭喜完成快速入门！现在您可以：

### 📖 深入学习基础知识
- [核心概念](./fundamentals/concepts) - 理解设计理念和架构
- [配置指南](./fundamentals/configuration) - 掌握配置选项
- [使用示例](./fundamentals/examples) - 学习最佳实践

### 🧩 探索组件功能
- [StdCurd 组件](./components/std-curd) - 一站式解决方案详解
- [表单控件](./form-controls/basic-controls) - 丰富的表单控件

### ⚡ 学习高级特性
- [自定义扩展](./advanced/customization) - 个性化定制
- [表单交互](./advanced/form-interactions) - 复杂表单逻辑

## 🆘 常见问题

### API 格式不匹配怎么办？

如果后端 API 格式与标准不符，可以自定义配置：

```ts
app.use(createCurdConfig({
  listApi: {
    paginationMap: {
      params: {
        current: 'page',
        pageSize: 'page_size'
      },
      response: {
        total: 'total',
        current: 'current_page'
      }
    }
  }
}))
```

### 如何自定义表单控件？

可以传入自定义 Vue 组件：

```ts
{
  title: '自定义字段',
  dataIndex: 'custom',
  form: {
    control: MyCustomComponent
  }
}
```

### 需要更多帮助？

- 查看 [完整 API 文档](./api-reference)
- 浏览 [使用示例](./fundamentals/examples)
- 学习 [高级特性](./advanced/customization)

开始您的 CURD 开发之旅吧！🎉