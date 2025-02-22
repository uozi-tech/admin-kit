# 全局配置

CURD 组件支持全局配置,可以统一设置 API 响应格式、分页参数等。

::: details 默认配置

```json
{
  "listApi": {
    "paginationPath": "$.pagination",
    "paginationMap": {
      "total": "total",
      "current": "current",
      "pageSize": "pageSize",
      "totalPages": "totalPages"
    }
  },
  "i18n": {
    "locale": "zh-CN",
    "fallbackLocale": "en-US",
    "messages": {
      "zh-CN": {}, // 中文语言包
      "zh-HK": {}, // 繁体中文语言包
      "zh-TW": {}, // 简体中文语言包
      "en-US": {} // 英文语言包
    }
  }
}
```

:::

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
    },

    // 时间戳配置
    time: {
      timestamp: true
    }
  }
}))
```

## 配置项

### 分页配置

**分页数据在响应 data 中的路径:**

默认 `$.pagination`，如果需要自定义分页数据在响应 data 中的路径，可以通过 `paginationPath` 配置。

**分页字段映射配置:**

```ts
interface PaginationMap {
  total: string // 总数字段
  current: string // 当前页字段
  pageSize: string // 每页条数字段
  totalPages: string // 总页数字段
}
```

### 响应数据格式化

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

### 请求参数格式化

请求参数格式化函数:

```ts
interface RequestFormat {
  (params: any): any
}
```
