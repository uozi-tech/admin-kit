# 全局配置

CURD 组件支持全局配置,可以统一设置 API 响应格式、分页参数、日期格式等。

::: details 默认配置

```js
{
  listApi: {
    paginationPath: '$.pagination',
    paginationMap: {
      params: {
        current: 'page',
        pageSize: 'page_size'
      },
      response: {
        current: 'page',
        pageSize: 'page_size',
        total: 'total',
        totalPages: 'total_pages'
      }
    },
  },
  i18n: {
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages: {
      "zh-CN": {}, // 中文语言包
      "zh-HK": {}, // 繁体中文语言包
      "zh-TW": {}, // 简体中文语言包
      "en-US": {} // 英文语言包
    }
  },
  time: {
    timestamp: false
  },
  dateFormat: {
    date: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    time: 'HH:mm:ss',
    year: 'YYYY',
    month: 'YYYY-MM',
    week: 'YYYY-wo'
  },
  selector: {
    omitZeroString: true
  },
  deleteConfirmConfig: {
    mode: 'popconfirm',
    valueKey: 'id'
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
      params: {
        current: 'page',
        pageSize: 'page_size'
      },
      response: {
        current: 'page',
        pageSize: 'page_size',
        total: 'total',
        totalPages: 'total_pages'
      }
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
  },

  // 日期格式配置
  dateFormat: {
    date: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    time: 'HH:mm:ss',
    year: 'YYYY',
    month: 'YYYY-MM',
    week: 'YYYY-wo'
  },
  
  // 选择器配置
  selector: {
    omitZeroString: true
  },
  
  // 删除确认配置
  deleteConfirmConfig: {
    mode: 'modal', // 全局设置为 modal 模式
    valueKey: 'name' // 全局设置确认输入字段
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

### 时间戳配置

如果项目的后端使用的是时间戳，可以通过 `time` 配置来统一设置时间戳配置。

时间戳配置:

```ts
interface TimeT {
  timestamp: boolean
}
```

### 选择器配置

选择器全局配置:

```ts
interface SelectorConfig {
  omitZeroString: boolean // 是否过滤掉"0"字符串值，默认为true
}
```

### 删除确认配置

删除确认全局配置:

```ts
interface DeleteConfirmConfig {
  mode?: 'popconfirm' | 'modal' // 删除确认模式，默认为 'popconfirm'
  valueKey?: string // 用于确认输入的记录字段（仅 modal 模式有效），默认为 'id'
}
```

**配置说明:**

- `mode`: 删除确认模式
  - `'popconfirm'`: 使用 Ant Design Vue 的 Popconfirm 组件进行删除确认
  - `'modal'`: 使用模态框进行删除确认，用户需要输入指定内容才能确认删除
- `valueKey`: 在 Modal 模式下，用户需要输入记录中此字段的值才能确认删除

**注意:** 组件级别的 `deleteConfirmConfig` 配置会覆盖全局配置。

### 日期格式配置

日期格式全局配置:

```ts
interface DateFormatConfig {
  date?: string      // 日期格式，默认为 'YYYY-MM-DD'
  datetime?: string  // 日期时间格式，默认为 'YYYY-MM-DD HH:mm:ss'
  time?: string      // 时间格式，默认为 'HH:mm:ss'
  year?: string      // 年份格式，默认为 'YYYY'
  month?: string     // 月份格式，默认为 'YYYY-MM'
  week?: string      // 周格式，默认为 'YYYY-wo'
}
```

**配置说明:**

- `date`: 日期选择器的默认格式
- `datetime`: 日期时间选择器的默认格式
- `time`: 时间选择器的默认格式
- `year`: 年份选择器的默认格式
- `month`: 月份选择器的默认格式
- `week`: 周选择器的默认格式

**动态格式使用:**

配置后，可以通过 `Format` 对象动态获取当前的格式配置：

```ts
import { Format, setGlobalDateFormats, getDateFormat } from '@uozi-admin/curd'

// 动态获取格式
console.log(Format.date)     // 输出当前日期格式
console.log(Format.datetime) // 输出当前日期时间格式

// 运行时修改格式
setGlobalDateFormats({
  date: 'DD/MM/YYYY',
  datetime: 'DD/MM/YYYY HH:mm'
})

// 获取特定格式
const dateFormat = getDateFormat('date')
```