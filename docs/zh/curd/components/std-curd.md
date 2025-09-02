# StdCurd 组件

StdCurd 是一站式 CRUD 解决方案，集成了表格、搜索、表单等所有功能，适合快速构建标准的数据管理页面。

## 基础用法

```vue
<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { control: 'input' },
    form: { control: 'input', required: true }
  }
]
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 页面标题 | string | - |
| api | API 接口对象 | StdApi | - |
| columns | 列配置 | StdTableColumn[] | - |
| tableProps | 表格组件属性 | object | - |
| formProps | 表单组件属性 | object | - |
| searchProps | 搜索组件属性 | object | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| success | 操作成功时触发 | (type: string, data: any) |
| error | 操作失败时触发 | (error: Error) |

更多详细配置请参考完整 API 文档。