# 全局配置

CURD 组件支持全局配置,可以统一设置 API 响应格式、分页参数等。

## 配置方式

```ts
import { createCurdConfig } from '@uozi-admin/curd'
import { createApp } from 'vue'

const app = createApp()

app.use(createCurdConfig({
  api: {
    // 分页字段映射
    paginationMap: {
      total: 'total',
      current: 'current_page',
      pageSize: 'per_page'
    },

    // 响应数据格式化
    responseFormat: (response) => {
      return {
        data: response.data,
        pagination: response.meta
      }
    },

    // 请求参数格式化
    requestFormat: (params) => {
      return params
    }
  }
}))
```

## 配置项

### api.paginationMap

该配置与 `responseFormat` 配置互斥，如果同时配置，则以 `responseFormat` 配置为准。

分页字段映射配置:

```ts
interface PaginationMap {
  total: string // 总数字段
  current: string // 当前页字段
  pageSize: string // 每页条数字段
  totalPages: string // 总页数字段
}
```

### api.responseFormat

响应数据格式化函数:

```ts
interface ResponseFormat {
  (response: any): {
    data: any[] // 列表数据
    pagination?: { // 分页信息
      total: number
      current: number
      pageSize: number
      totalPages: number
    }
  }
}
```

### api.requestFormat

请求参数格式化函数:

```ts
interface RequestFormat {
  (params: any): any
}
```
