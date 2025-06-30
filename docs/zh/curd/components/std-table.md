# StdTable 组件

StdTable 是一个增强的表格组件,基于 Ant Design Vue 的 Table 组件扩展，提供了搜索、排序、筛选等功能。

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
    :get-list-api="getListApi"
    :table-loading="loading"
    @change="onChange"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | StdTableColumn[] | [] |
| getListApi | 接口配置 | StdApi['getList'] | - |
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
| rowDraggable | 是否开启行拖拽 | boolean | false |
| rowDraggableOptions | 行拖拽配置 | \{ onMove: (oldRow, newRow) => void, onEnd: ({target_id, direction, affected_ids}) => void \} | - |
| hideResetBtn | 隐藏重置按钮 | boolean | false |
| showSearchBtn | 显示搜索按钮 | boolean | false |
| searchFormExtraRender | 搜索表单额外渲染函数 | (searchFormData: any, searchColumns: StdTableColumn[], stdTableConfig: Record<any, any>) => VNode \| JSX.Element | - |

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
| view | 点击查看按钮时触发 | record |
| editItem | 点击编辑按钮时触发 | record |
| deleteItemTemporarily | 点击删除按钮时触发 | record |
| restoreItem | 点击恢复按钮时触发 | record |
| deleteItemPermanently | 点击彻底删除按钮时触发 | record |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| beforeSearch | 搜索区域前插槽 |
| beforeTable | 表格前插槽 |
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

### 搜索表单扩展渲染

通过 `searchFormExtraRender` 属性可以在搜索表单中添加自定义内容：

```vue
<script setup lang="ts">
import { h } from 'vue'
import { Button } from 'ant-design-vue'

function extraRender(searchFormData, searchColumns, config) {
  return h(Button, {
    type: 'primary',
    onClick: () => {
      console.log('搜索数据:', searchFormData)
    }
  }, '自定义按钮')
}
</script>

<template>
  <StdTable
    :columns="columns"
    :get-list-api="getListApi"
    :search-form-extra-render="extraRender"
  />
</template>
```

该函数接收三个参数：
- `searchFormData`: 当前搜索表单的数据
- `searchColumns`: 搜索列的配置
- `stdTableConfig`: StdTable 组件的配置

返回值应该是一个 Vue 虚拟节点 (VNode) 或 JSX 元素。
