# 接口配置

CURD 组件需要配置标准的增删改查接口来实现数据操作。

:::tip
推荐使用 [@uozi-admin/request](/zh/request/quick-start) 来生成 CURD API。
:::

## 基础接口

```ts
interface StdApi {
  // 获取列表
  getList: (params: Record<string, any>) => Promise<{
    data: any[]
    pagination?: {
      total: number
      current: number
      pageSize: number
    }
  }>

  // 获取详情
  getItem: (id: string | number) => Promise<any>

  // 新增
  createItem: (data: Record<string, any>) => Promise<any>

  // 更新
  updateItem: (id: string | number, data: Record<string, any>) => Promise<any>

  // 删除
  deleteItem: (id: string | number) => Promise<any>
}
```

## 请求参数

### getList

列表接口的请求参数:

```ts
interface ListParams {
  page: number // 当前页码
  page_size: number // 每页条数
  sort_by?: string // 排序字段
  order?: 'asc' | 'desc' // 排序方向
  [key: string]: any // 其他搜索条件
}
```

### getItem

详情接口需要传入记录 ID:

```ts
function getItem(id: string | number): Promise<any>
```

### createItem

新增接口的请求数据:

```ts
function createItem(data: {
  [key: string]: any // 表单数据
}): Promise<any>
```

### updateItem

更新接口需要传入记录 ID 和更新数据:

```ts
function updateItem(
  id: string | number,
  data: {
    [key: string]: any // 表单数据
  }
): Promise<any>
```

### deleteItem

删除接口需要传入记录 ID:

```ts
function deleteItem(id: string | number): Promise<any>
```

## 响应格式

### getList

列表接口的响应格式:

```ts
interface ListResponse {
  data: any[] // 数据列表
  pagination?: {
    total: number // 总条数
    current: number // 当前页码
    pageSize: number // 每页条数
  }
}
```

### 其他接口

其他接口的响应格式没有特殊要求,建议返回:

```ts
interface Response {
  code: number // 状态码
  message: string // 提示信息
  data?: any // 响应数据
}
```

## 使用示例

```ts
import type { UserInfo } from '@/types/user'
// api/user.ts
import { request } from '@/utils/request'

export const userApi = {
  // 获取用户列表
  getList: (params: Record<string, any>) => {
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
  },

  // 获取用户详情
  getItem: (id: number) => {
    return request<{
      data: UserInfo
    }>({
      url: `/api/users/${id}`,
      method: 'GET'
    })
  },

  // 创建用户
  createItem: (data: Partial<UserInfo>) => {
    return request({
      url: '/api/users',
      method: 'POST',
      data
    })
  },

  // 更新用户
  updateItem: (id: number, data: Partial<UserInfo>) => {
    return request({
      url: `/api/users/${id}`,
      method: 'PUT',
      data
    })
  },

  // 删除用户
  deleteItem: (id: number) => {
    return request({
      url: `/api/users/${id}`,
      method: 'DELETE'
    })
  }
}
```

## 接口不满足要求？

实际开发中，接口可能是已有的，或者后端不配合，接口无法满足 CURD 组件的数据格式要求。

不用担心，我们提供了全局配置对接口数据格式进行转换，具体配置请参考 [全局配置](../advance/global-config.md)。
