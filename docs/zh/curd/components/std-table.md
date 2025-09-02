# StdTable 组件

StdTable 是数据表格组件，提供列表展示、分页、排序、选择等功能。

## 基础用法

```vue
<template>
  <StdTable
    :api="userApi"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { StdTable } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')
const columns = [
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' }
]
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| api | API 接口对象 | StdApi | - |
| columns | 列配置 | StdTableColumn[] | - |
| searchParams | 搜索参数 | object | - |
| rowSelection | 行选择配置 | object | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| edit | 编辑行时触发 | (record: any) |
| delete | 删除行时触发 | (record: any) |

更多详细配置请参考完整 API 文档。