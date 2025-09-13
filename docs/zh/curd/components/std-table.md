# StdTable 组件

StdTable 是数据表格组件，提供列表展示、分页、排序、选择等功能。

## 基础用法

```vue
<template>
  <StdTable
    :get-list-api="userApi.getList"
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

## 自定义列渲染

### 通过 Ant Design Vue 原有的 customRender 渲染

```vue
<script setup lang="ts">
const columns = [
  { 
    title: '邮箱', 
    dataIndex: 'email',
    customRender: ({ value }) => {
      return h('a', { href: `mailto:${value}` }, value)
    }
  },
]
</script>
```

### 通过 slot 自定义列渲染

StdTable 支持通过 slot 自定义列的渲染内容。你可以使用 `#col-{dataIndex}` 格式的 slot 来自定义特定列的渲染。

```vue
<template>
  <StdTable
    :get-list-api="userApi.getList"
    :columns="columns"
  >
    <!-- 自定义用户名列渲染 -->
    <template #col-username="{ record, text }">
      <a-tag color="blue">{{ text }}</a-tag>
    </template>
    
    <!-- 自定义邮箱列渲染 -->
    <template #col-email="{ record, text }">
      <a :href="`mailto:${text}`">{{ text }}</a>
    </template>
    
    <!-- 自定义状态列渲染 -->
    <template #col-status="{ record, text }">
      <a-badge 
        :status="text === 1 ? 'success' : 'error'"
        :text="text === 1 ? '启用' : '禁用'"
      />
    </template>
  </StdTable>
</template>
```

<demo vue="../demos/curd/components/std-table-slots.vue" />

### Slot 参数

每个列 slot 都会接收以下参数：

- `record`: 当前行的完整数据对象
- `text`: 当前列的值（等同于 `record[dataIndex]`）
- `value`: 当前列的值（等同于 `record[dataIndex]`）
- `column`: 当前列的配置对象
- `index`: 当前行的索引

### 优先级

如果同时定义了 `customRender` 函数和对应的列 slot，`customRender` 函数会优先生效。

## 插槽（Slots）

### 结构插槽

StdTable 提供了多个插槽来自定义表格的不同部分：

```vue
<template>
  <StdTable
    :get-list-api="api.getList"
    :columns="columns"
  >
    <!-- 搜索相关插槽 -->
    <template #beforeSearch>
      <div>搜索表单前的自定义内容</div>
    </template>

    <template #search-actions-left>
      <a-button>自定义搜索按钮</a-button>
    </template>

    <template #searchFormAction="{ formData }">
      <a-button @click="handleCustomAction(formData)">自定义操作</a-button>
    </template>

    <!-- 表格相关插槽 -->
    <template #beforeTable>
      <div>表格前的自定义内容</div>
    </template>

    <!-- 操作列插槽 -->
    <template #beforeActions="{ record, column }">
      <a-button size="small" type="link">自定义操作</a-button>
    </template>

    <template #afterActions="{ record, column }">
      <a-button size="small" type="link">更多操作</a-button>
    </template>

    <!-- 自定义列渲染 -->
    <template #col-status="{ record, text }">
      <a-badge
        :status="text === 1 ? 'success' : 'error'"
        :text="text === 1 ? '启用' : '禁用'"
      />
    </template>
  </StdTable>
</template>
```

### 插槽参数

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| beforeSearch | - | 搜索表单前的自定义内容 |
| search-actions-left | - | 搜索操作按钮左侧的自定义内容 |
| searchFormAction | `{ formData }` | 搜索表单操作区域的自定义内容 |
| beforeTable | - | 表格前的自定义内容 |
| beforeActions | `{ record, column }` | 操作列前的自定义操作按钮 |
| afterActions | `{ record, column }` | 操作列后的自定义操作按钮 |
| col-\{dataIndex\} | `{ record, text, value, column, index }` | 自定义列渲染内容 |

### 列插槽参数详解

每个 `col-{dataIndex}` 插槽都会接收以下参数：

- **record**: `any` - 当前行的完整数据对象
- **text**: `any` - 当前列的值（等同于 `record[dataIndex]`）
- **value**: `any` - 当前列的值（等同于 `record[dataIndex]`）
- **column**: `StdTableColumn` - 当前列的配置对象
- **index**: `number` - 当前行的索引

## 演示示例

<demo vue="../demos/curd/components/std-table.vue" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| **基础配置** | | | |
| getListApi | 获取列表的 API 方法 | CurdApi['getList'] | - |
| columns | 列配置 | StdTableColumn[] | - |
| **表格属性** | | | |
| tableProps | 表格组件属性 | TableProps | - |
| **查询参数** | | | |
| customQueryParams | 自定义查询参数 | Record<string, any> | - |
| overwriteParams | 覆盖查询参数 | Record<string, any> | - |
| **表格选择** | | | |
| rowSelectionType | 选择类型 | 'checkbox' \| 'radio' | - |
| rowSelection | 表格行选择配置 | TableRowSelection | - |
| **功能开关** | | | |
| disableRouterQuery | 禁用路由查询 | boolean | false |
| disableView | 禁用查看功能 | boolean | false |
| disableEdit | 禁用编辑功能 | boolean | false |
| disableSearch | 禁用搜索功能 | boolean | false |
| disableDelete | 禁用删除功能 | boolean | false |
| disableTrash | 禁用回收站功能 | boolean | false |
| **拖拽功能** | | | |
| rowDraggable | 启用行拖拽 | boolean | false |
| rowDraggableOptions | 拖拽配置 | object | - |
| **UI 显示控制** | | | |
| hideResetBtn | 隐藏重置按钮 | boolean | false |
| showSearchBtn | 显示搜索按钮 | boolean | undefined |
| **扩展渲染** | | | |
| searchFormExtraRender | 搜索表单扩展渲染 | function | - |
| **删除确认配置** | | | |
| deleteConfirmConfig | 删除确认配置 | DeleteConfirmConfig | - |
| **刷新配置** | | | |
| refreshConfig | 刷新配置 | { timestamp: number, reset?: boolean } | - |
| onlyQuery | 仅查询模式 | boolean | false |
| isTrash | 是否为回收站模式 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| edit | 编辑行时触发 | (record: any) |
| delete | 删除行时触发 | (record: any) |

更多详细配置请参考完整 API 文档。
