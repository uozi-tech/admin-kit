# 最佳实践

本文介绍使用 CURD 组件的一些最佳实践。

## 目录结构

推荐的项目目录结构:

```
src/
  ├── api/                # API 接口
  │   └── user.ts        # 用户相关接口
  ├── views/             # 页面组件
  │   └── user/
  │       ├── columns.ts # 列配置
  │       └── index.vue  # 页面组件
  └── types/             # 类型定义
      └── user.d.ts      # 用户相关类型
```

## API 封装

推荐使用 [@uozi-admin/request](../../request/index.md) 来封装 CURD API 请求。

```ts
import { useCurdApi } from '@uozi-admin/request'

export const userApi = useCurdApi('/api/users')
```

也可以自行封装:

```ts
// api/user.ts
import type { UserInfo } from '@/types/user'
import type { CurdApi } from '@uozi-admin/curd'
import { request } from '@/utils/request'

export function getUserList(params: Record<string, any>) {
  return request<{
    data: UserInfo[]
    pagination: {
      total: number
      current: number
      pageSize: number
    }
  }>({
    url: '/api/users',
    method: 'GET',
    params
  })
}

export function getUserDetail(id: number | string) {
  return request<{
    data: UserInfo
  }>({
    url: `/api/users/${id}`,
    method: 'GET'
  })
}

// 导出统一的 API 对象
export const userApi: CurdApi = {
  getList: getUserList,
  getItem: getUserDetail,
  createItem: createUser,
  updateItem: updateUser,
  deleteItem: deleteUser
}
```

## 类型定义

```ts
// types/user.d.ts
export interface UserInfo {
  id: number
  username: string
  email: string
  status: number
  created_at: string
  updated_at: string
}

export interface UserSearchParams {
  username?: string
  email?: string
  status?: number
  created_at?: [string, string]
  page?: number
  page_size?: number
}
```

## 列配置

推荐将列配置单独提取为文件:

```ts
import type { UserInfo } from '@/types/user'
// views/user/columns.ts
import type { StdColumn } from '@uozi-admin/curd'

export const userColumns: StdColumn<UserInfo>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
        ]
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入邮箱' },
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
    customRender: ({ text }) => text === 1 ? '启用' : '禁用'
  }
]
```

## 页面组件

```vue
<!-- views/user/index.vue -->
<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { userApi } from '@/api/user'
import { message } from 'ant-design-vue'
import { userColumns } from './columns'

// 自定义操作
async function handleExport(record: UserInfo) {
  try {
    await exportUser(record.id)
    message.success('导出成功')
  }
  catch (error) {
    message.error('导出失败')
  }
}
</script>

<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="userColumns"
  >
    <template #afterActions="{ record }">
      <Button @click="handleExport(record)">
        导出
      </Button>
    </template>
  </StdCurd>
</template>
```

## 最佳实践建议

1. **类型安全**
   - 为 API 请求和响应定义类型
   - 为列配置添加泛型约束
   - 使用 TypeScript 的类型检查

2. **代码组织**
   - API 接口统一管理
   - 列配置单独维护
   - 类型定义集中管理

3. **错误处理**
   - API 调用添加 try-catch
   - 统一的错误提示
   - 合理的错误状态展示

4. **性能优化**
   - 合理使用 v-model 避免不必要的双向绑定
   - 大数据量时使用虚拟滚动
   - 按需加载组件和数据

5. **用户体验**
   - 添加适当的加载状态
   - 操作后的反馈提示
   - 表单验证的及时反馈
