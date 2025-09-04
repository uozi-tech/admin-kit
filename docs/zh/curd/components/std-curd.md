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
    search: { type:'input' },
    edit: { 
      type:'input', 
      formItem: { required: true } 
    }
  }
]
</script>
```

## 自定义列渲染

StdCurd 支持通过 slot 自定义表格列的渲染内容，用法与 StdTable 相同。使用 `#col-{dataIndex}` 格式的 slot 来自定义特定列的渲染。

列 slot 会自动透传到内部的 StdTable 组件，支持所有 StdTable 的列渲染功能。

具体使用参考 [StdTable 自定义列渲染](/zh/curd/components/std-table#自定义列渲染)。

## 演示示例

<demo vue="../demos/curd/components/std-curd.vue" />

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
