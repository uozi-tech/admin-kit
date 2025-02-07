# StdTable 组件

StdTable 是一个增强的表格组件,基于 Ant Design Vue 的 Table 组件扩展,提供了搜索、排序、筛选等功能。

## 基础用法

```vue
<script setup lang="ts">
const loading = ref(false)

function onChange(pagination, filters, sorter) {
  // 处理表格变化
  console.log(pagination, filters, sorter)
}
</script>

<template>
  <StdTable
    :columns="columns"
    :api="api"
    :table-loading="loading"
    @change="onChange"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | StdColumn[] | [] |
| api | 接口配置 | StdApi | - |
| tableProps | antd table 配置 | TableProps | {} |
| customQueryParams | 自定义查询参数(同步到路由) | Record<string, any> | {} |
| overwriteParams | 覆盖查询参数(不同步到路由，优先级最高) | Record<string, any> | {} |
| rowSelectionType | 选择类型 | 'checkbox' \| 'radio' | - |
| refreshConfig | 刷新配置 | \{ timestamp: number, reset: boolean \} | - |
| disableSearch | 禁用搜索 | boolean | false |
| disableRouterQuery | 禁用路由参数 | boolean | false |
| disableEdit | 禁用编辑 | boolean | false |
| disableDelete | 禁用删除 | boolean | false |
| disableTrash | 禁用软删除 | boolean | false |
| onlyQuery | 仅查询 | boolean | false |
| isTrash | 是否显示回收站 | boolean | false |

### Model

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableLoading | 表格加载状态 | boolean | false |
| selectedRowKeys | 选中的行 | (string \| number)[] | [] |
| selectedRows | 选中的行 | Record<string \| number, any>[] | [] |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 分页、排序、筛选变化时触发 | (pagination, filters, sorter) |
| read | 点击查看按钮时触发 | record |
| editItem | 点击编辑按钮时触发 | record |
| deleteItemTemporarily | 点击删除按钮时触发 | record |
| restoreItem | 点击恢复按钮时触发 | record |
| deleteItemPermanently | 点击彻底删除按钮时触发 | record |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| beforeActions | 操作列前插槽 |
| afterActions | 操作列后插槽 |

## 功能特性

### 自动加载数据

组件会自动调用 api.getList 方法加载数据,支持以下参数:

- page: 当前页码
- page_size: 每页条数
- sort_by: 排序字段
- order: 排序方式
- ...其他搜索条件

### 路由参数同步

默认会将查询参数同步到路由 query 中,可通过 disableRouterQuery 禁用。

### 表格选择

通过 rowSelectionType 配置选择模式:

```vue
<template>
  <StdTable
    v-model:selected-row-keys="selectedKeys"
    v-model:selected-rows="selectedRows"
    row-selection-type="checkbox"
  />
</template>
```
