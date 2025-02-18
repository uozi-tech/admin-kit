---
outline: deep
---

# 快速开始

本节将帮助你快速上手 CURD 组件库。

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

## 基础示例

下面是一个最简单的用户管理页面示例:

```vue
<script setup lang="ts">
import type { StdColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'

// 定义列配置
const columns: StdColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: true, // 启用搜索
    edit: {
      type: 'input',
      formItem: {
        required: true
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        rules: [{ type: 'email' }]
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    }
  }
]

// API 接口配置
const api = {
  getList: params => fetch('/api/users', { params }),
  getItem: id => fetch(`/api/users/${id}`),
  createItem: data => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateItem: (id, data) => fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteItem: id => fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
}
</script>

<template>
  <StdCurd
    title="用户管理"
    :columns="columns"
    :api="api"
  />
</template>
```

这个示例实现了:

1. 用户列表展示
2. 新增/编辑表单
3. 删除功能
4. 搜索功能

## 下一步

- 了解 [基础概念](./basic-concepts.md)
- 查看 [列配置](./core/column.md) 详细说明
- 探索更多 [组件](./components/std-curd.md)

## 特性

- 🚀 开箱即用的 CRUD 组件
- 📦 内置多种表单控件
- 🎨 可自定义的列渲染
- 🔍 支持搜索和筛选
- 📱 响应式设计
- 🌍 国际化支持

## 组件

- StdCurd - 完整的 CRUD 页面组件
- StdTable - 表格组件
- StdForm - 表单组件
- StdDetail - 详情组件
- StdSearch - 搜索组件

## 表单控件

内置丰富的表单控件:

- Input - 输入框
- InputNumber - 数字输入框
- Select - 选择器
- DatePicker - 日期选择器
- TimePicker - 时间选择器
- Switch - 开关
- Radio - 单选框
- Checkbox - 复选框
- ...
