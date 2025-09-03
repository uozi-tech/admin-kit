# StdSearch 组件

StdSearch 是搜索组件，根据列配置自动生成搜索表单，支持多种搜索控件。

## 基础用法

```vue
<template>
  <StdSearch
    :columns="columns"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
import { StdSearch } from '@uozi-admin/curd'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { type:'input' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type:'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
]

const handleReset = () => {
  console.log('重置搜索')
}
</script>
```

## 演示示例

<demo vue="../demos/curd/components/std-search.vue" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置 | StdTableColumn[] | - |
| initialValues | 初始搜索值 | object | - |
| collapsed | 是否折叠 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| search | 搜索时触发 | (params: object) |
| reset | 重置时触发 | () |

更多详细配置请参考完整 API 文档。