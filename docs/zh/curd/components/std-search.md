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

## 插槽（Slots）

StdSearch 组件提供了插槽来自定义搜索表单的额外内容：

```vue
<template>
  <StdSearch
    :columns="columns"
    @reset="handleReset"
  >
    <!-- 搜索操作按钮左侧插槽 -->
    <template #search-actions-left>
      <a-button>自定义按钮</a-button>
    </template>

    <!-- 搜索表单额外内容插槽 -->
    <template #extra="{ formData }">
      <a-button @click="handleExport(formData)">导出</a-button>
      <a-button @click="handleImport">导入</a-button>
    </template>
  </StdSearch>
</template>

<script setup lang="ts">
const handleExport = (formData: any) => {
  console.log('导出数据', formData)
}

const handleImport = () => {
  console.log('导入数据')
}
</script>
```

### 插槽参数

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| search-actions-left | - | 搜索操作按钮左侧的自定义内容 |
| extra | `{ formData }` | 搜索表单右侧额外的自定义内容，通常用于放置导出、导入等操作按钮 |

### 参数说明

- **formData**: `Record<string, any>` - 当前搜索表单的数据对象，包含所有搜索字段的值

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