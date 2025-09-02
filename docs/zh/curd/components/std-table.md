# StdTable 组件

StdTable 是一个增强的表格组件,基于 Ant Design Vue 的 Table 组件扩展，提供了搜索、排序、筛选等功能。

## 基础用法

<demo vue="../../../../demos/curd/std-table/basic.vue" title="基础表格" description="展示 StdTable 基础功能，包含数据展示、分页、搜索等"></demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import type { StdTableColumn } from '@uozi-admin/curd'

const loading = ref(false)

// 定义列配置
const columns: StdTableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '用户名',
    dataIndex: 'username',
    search: { // 启用搜索
      type: 'input',
      input: {
        placeholder: '请输入用户名'
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    customRender: ({ record }) => {
      return record.status === 1 ? '启用' : '禁用'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange'
    }
  }
]

// 模拟 API 接口
const getListApi = (params) => {
  console.log('API 参数:', params)
  
  // 模拟数据
  const mockData = [
    { id: 1, username: 'admin', email: 'admin@example.com', status: 1, created_at: '2024-01-15' },
    { id: 2, username: 'user1', email: 'user1@example.com', status: 1, created_at: '2024-01-16' },
    { id: 3, username: 'user2', email: 'user2@example.com', status: 0, created_at: '2024-01-17' }
  ]
  
  return Promise.resolve({
    data: mockData,
    total: mockData.length,
    current_page: params.page || 1,
    per_page: params.page_size || 10
  })
}

function onChange(pagination, filters, sorter) {
  console.log('表格变化:', pagination, filters, sorter)
}
</script>

<template>
  <StdTable
    :columns="columns"
    :get-list-api="getListApi"
    v-model:table-loading="loading"
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
| deleteConfirmConfig | 删除确认配置 | DeleteConfirmConfig | { mode: 'popconfirm' } |

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

<demo vue="../../../../demos/curd/std-table/selection.vue" title="表格选择" description="展示如何使用表格选择功能，支持单选和多选模式"></demo>

通过 rowSelectionType 配置选择模式:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Button, Space } from 'ant-design-vue'

const selectedKeys = ref([])
const selectedRows = ref([])

// 列配置
const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status', customRender: ({ record }) => record.status === 1 ? '启用' : '禁用' }
]

// 模拟 API
const getListApi = () => {
  return Promise.resolve({
    data: [
      { id: 1, username: 'admin', email: 'admin@example.com', status: 1 },
      { id: 2, username: 'user1', email: 'user1@example.com', status: 1 },
      { id: 3, username: 'user2', email: 'user2@example.com', status: 0 }
    ],
    total: 3
  })
}

// 批量操作
function handleBatchDelete() {
  if (selectedKeys.value.length === 0) {
    alert('请选择要删除的项目')
    return
  }
  console.log('批量删除:', selectedKeys.value)
}

function handleBatchEnable() {
  if (selectedKeys.value.length === 0) {
    alert('请选择要启用的项目')
    return
  }
  console.log('批量启用:', selectedKeys.value)
}
</script>

<template>
  <div>
    <!-- 批量操作按钮 -->
    <div style="margin-bottom: 16px;">
      <Space>
        <Button type="primary" @click="handleBatchDelete" :disabled="selectedKeys.length === 0">
          批量删除 ({{ selectedKeys.length }})
        </Button>
        <Button @click="handleBatchEnable" :disabled="selectedKeys.length === 0">
          批量启用 ({{ selectedKeys.length }})
        </Button>
      </Space>
    </div>

    <!-- 表格 -->
    <StdTable
      :columns="columns"
      :get-list-api="getListApi"
      v-model:selected-row-keys="selectedKeys"
      v-model:selected-rows="selectedRows"
      row-selection-type="checkbox"
    />

    <!-- 选中信息显示 -->
    <div style="margin-top: 16px;" v-if="selectedRows.length > 0">
      <h4>已选中项目:</h4>
      <ul>
        <li v-for="row in selectedRows" :key="row.id">
          {{ row.username }} ({{ row.email }})
        </li>
      </ul>
    </div>
  </div>
</template>
```

### 搜索表单扩展渲染

<demo vue="../../../../demos/curd/std-table/search-extra.vue" title="搜索表单扩展" description="展示如何在搜索表单中添加自定义按钮和内容"></demo>

通过 `searchFormExtraRender` 属性可以在搜索表单中添加自定义内容：

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Button, Space, message } from 'ant-design-vue'
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons-vue'

// 列配置
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: {
      type: 'input',
      input: { placeholder: '请输入用户名' }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    customRender: ({ record }) => record.status === 1 ? '启用' : '禁用'
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange'
    }
  }
]

// 表格引用，用于刷新数据
const tableRef = ref()

// 搜索表单扩展渲染函数
function extraRender(searchFormData, searchColumns, config) {
  return h(Space, {}, [
    h(Button, {
      type: 'default',
      icon: h(DownloadOutlined),
      onClick: () => handleExport(searchFormData)
    }, '导出数据'),
    h(Button, {
      type: 'default',
      icon: h(ReloadOutlined),
      onClick: () => handleRefresh()
    }, '重置筛选'),
    h(Button, {
      type: 'primary',
      onClick: () => handleAdvancedSearch(searchFormData)
    }, '高级搜索')
  ])
}

// 模拟 API
const getListApi = (params) => {
  console.log('搜索参数:', params)
  return Promise.resolve({
    data: [
      { id: 1, username: 'admin', status: 1, created_at: '2024-01-15' },
      { id: 2, username: 'user1', status: 1, created_at: '2024-01-16' },
      { id: 3, username: 'user2', status: 0, created_at: '2024-01-17' }
    ],
    total: 3
  })
}

// 自定义按钮处理函数
function handleExport(searchFormData) {
  console.log('导出数据，搜索条件:', searchFormData)
  message.success('开始导出数据...')
}

function handleRefresh() {
  // 重置搜索表单并刷新数据
  if (tableRef.value) {
    tableRef.value.resetSearch()
  }
  message.info('已重置筛选条件')
}

function handleAdvancedSearch(searchFormData) {
  console.log('打开高级搜索，当前条件:', searchFormData)
  message.info('打开高级搜索对话框')
}
</script>

<template>
  <StdTable
    ref="tableRef"
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

## 删除确认配置

<demo vue="../../../../demos/curd/std-table/delete-confirm.vue" title="删除确认" description="展示不同的删除确认模式，包含 Popconfirm 和 Modal 两种方式"></demo>

StdTable 组件支持两种删除确认模式：

### 1. Popconfirm 模式（默认）

使用 Ant Design Vue 的 Popconfirm 组件进行删除确认：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Space, Button, message } from 'ant-design-vue'

const confirmMode = ref('popconfirm')

// 列配置，包含操作列
const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 120,
    customRender: ({ record }) => {
      // StdTable 会自动渲染删除按钮
      return undefined
    }
  }
]

// 模拟数据
const mockData = [
  { id: 1, name: 'admin', email: 'admin@example.com' },
  { id: 2, name: 'user1', email: 'user1@example.com' },
  { id: 3, name: 'user2', email: 'user2@example.com' }
]

const getListApi = () => Promise.resolve({ data: mockData, total: mockData.length })

// 删除 API
const deleteApi = (id) => {
  console.log('删除项目:', id)
  message.success(`删除成功: ID ${id}`)
  return Promise.resolve()
}

// 动态切换确认模式
function switchMode(mode) {
  confirmMode.value = mode
}
</script>

<template>
  <div>
    <!-- 模式切换按钮 -->
    <div style="margin-bottom: 16px;">
      <Space>
        <Button 
          :type="confirmMode === 'popconfirm' ? 'primary' : 'default'"
          @click="switchMode('popconfirm')"
        >
          Popconfirm 模式
        </Button>
        <Button 
          :type="confirmMode === 'modal' ? 'primary' : 'default'"
          @click="switchMode('modal')"
        >
          Modal 模式
        </Button>
      </Space>
    </div>

    <!-- 表格 -->
    <StdTable
      :key="confirmMode"
      :columns="columns"
      :get-list-api="getListApi"
      :delete-item-api="deleteApi"
      :delete-confirm-config="{
        mode: confirmMode,
        valueKey: confirmMode === 'modal' ? 'name' : 'id'
      }"
    />

    <!-- 说明文字 -->
    <div style="margin-top: 16px; padding: 16px; background: #f6f8fa; border-radius: 6px;">
      <h4>当前模式: {{ confirmMode === 'popconfirm' ? 'Popconfirm 模式' : 'Modal 模式' }}</h4>
      <p v-if="confirmMode === 'popconfirm'">
        点击删除按钮会弹出气泡确认框，直接确认即可删除
      </p>
      <p v-else>
        点击删除按钮会弹出对话框，需要输入用户名才能确认删除，提供更高的安全性
      </p>
    </div>
  </div>
</template>
```

### 2. Modal 模式

使用模态框进行删除确认，用户需要输入指定内容才能确认删除：

```vue
<template>
  <StdTable
    :columns="columns"
    :get-list-api="getListApi"
    :delete-confirm-config="{
      mode: 'modal',
      valueKey: 'name'  // 用于确认输入的字段，默认为 'id'
    }"
  />
</template>
```

### DeleteConfirmConfig 配置项

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 删除确认模式 | 'popconfirm' \| 'modal' | 'popconfirm' |
| valueKey | 用于确认输入的记录字段（仅 modal 模式有效） | string | 'id' |

在 Modal 模式下，用户需要输入记录中 `valueKey` 字段的值才能确认删除，这提供了更高的安全性，防止误删除重要数据。例如，如果设置 `valueKey: 'name'`，用户需要输入记录的名称才能确认删除。
