# 快速开始

`@uozi-admin/layout-antdv` 是一个基于 Ant Design Vue 的后台布局组件库，提供了一套完整的后台管理系统布局解决方案。

## 安装

::: code-group
```bash [npm]
npm install @uozi-admin/layout-antdv
```

```bash [yarn]
yarn add @uozi-admin/layout-antdv
```

```bash [pnpm]
pnpm add @uozi-admin/layout-antdv
```
:::

## 基础用法

```vue
<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue'
import { AdminLayout } from '@uozi-admin/layout-antdv'

const sidebarItems = [
  {
    title: '首页',
    path: '/home',
    icon: HomeOutlined
  },
  {
    title: '用户管理',
    path: '/users',
    children: [
      {
        title: '用户列表',
        path: '/users/list'
      }
    ]
  }
]
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
