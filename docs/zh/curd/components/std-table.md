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

## 演示示例

<demo vue="../demos/curd/components/std-table.vue" />

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
