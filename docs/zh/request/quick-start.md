# Request

`@uozi-admin/request` 是一个基于 Axios 封装的 HTTP 请求库，提供了更简单的接口调用方式和完整的类型支持。核心目的为快速生成 CURD 接口。

## 安装

::: code-group
```bash [npm]
npm install @uozi-admin/request -D
```

```bash [yarn]
yarn add @uozi-admin/request -D
```

```bash [pnpm]
pnpm add @uozi-admin/request -D
```
:::

## 基础用法

### HTTP 请求

```ts
import { http } from '@uozi-admin/request'

// GET 请求
const data = await http.get('/api/users', {
  params: { page: 1 }
})

// POST 请求
const result = await http.post('/api/users', {
  username: 'admin',
  password: '123456'
})

// PUT 请求
await http.put('/api/users/1', {
  username: 'new name'
})

// DELETE 请求
await http.delete('/api/users/1')

// PATCH 请求
await http.patch('/api/users/1', {
  status: 1
})
```

### 全局配置

:::warning ⚠️ 提示
需要在 `app.mount` 之前配置，否则会报错。
:::

::: details 默认配置
```json
{
  "baseURL": "/api",
  "timeout": 5000,
  "headers": {
    "Content-Type": "application/json"
  }
}
```
:::

```ts
import { createApp } from 'vue'
import { setRequestConfig } from '@uozi-admin/request'

setRequestConfig({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

## CURD 接口

提供了统一的 CURD 接口封装:

```ts
import { useCurdApi } from '@uozi-admin/request'

// 创建 CURD API
const userApi = useCurdApi('/users')

// 获取列表
const { data, pagination } = await userApi.getList({
  page: 1,
  status: 1
})

// 获取详情
const detail = await userApi.getItem(1)

// 创建
await userApi.createItem({
  username: 'admin',
  password: '123456'
})

// 更新
await userApi.updateItem(1, {
  username: 'new name'
})

// 删除
await userApi.deleteItem(1)

// 恢复
await userApi.restoreItem(1)
```

## 拦截器

可以设置请求和响应拦截器:

```ts
import { useAxios } from '@uozi-admin/request'

const { setRequestInterceptor, setResponseInterceptor } = useAxios()

// 请求拦截器
setRequestInterceptor(
  (config) => {
    // 在发送请求之前做些什么
    config.headers.token = 'xxx'
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
setResponseInterceptor(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
```

## 扩展 CURD API

有两种方式可以扩展 CURD API 添加自定义方法:

**创建时扩展**

```ts
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users', {
  newApi: () => []
})
```

**通过 `extendCurdApi` 扩展**

```ts
import { extendCurdApi, useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')

// 扩展 API
const extendedApi = extendCurdApi(userApi, {
  // 添加自定义方法
  async exportUser(id: number) {
    return http.get(`/users/${id}/export`)
  },

  async importUsers(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return http.post('/users/import', formData)
  }
})
```

## TypeScript 支持

完整的类型定义支持:

```ts
interface UserInfo {
  id: number
  username: string
  email: string
}

// 指定响应数据类型
const { data } = await http.get<UserInfo[]>('/api/users')

// CURD API 类型
const userApi = useCurdApi<UserInfo>('/users')
const users = await userApi.getList()
```
