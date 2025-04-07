# StdCurd 增删改查

StdCurd 是一个完整的 CRUD 页面组件，集成了列表、搜索、新增、编辑、删除等功能。

## 基础用法

```vue
<script setup lang="ts">
import type { StdColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'

const columns: StdColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: true
  }
]

const api = {
  getList: params => fetch('/api/users', { params }),
  getItem: id => fetch(`/api/users/${id}`),
  createItem: data => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateItem: (id, data) => fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteItem: id => fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
}
</script>

<template>
  <StdCurd
    title="用户管理"
    :columns="columns"
    :api="api"
  />
</template>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| formRowProps | 表单 Row 组件属性，用于自定义表单布局 | RowProps | - |
| columns | 列配置 | StdColumn[] | [] |
| api | 接口配置 | StdApi | - |
| rowKey | 行数据的 key | string | 'id' |
| modalWidth | 弹窗宽度 | number \| string | 520 |
| scrollX | 表格横向滚动 | number \| string | - |
| scrollY | 表格纵向滚动 | number \| string | - |
| disableView | 禁用查看 | boolean | false |
| disableAdd | 禁用新增 | boolean | false |
| disableEdit | 禁用编辑 | boolean | false |
| disableDelete | 禁用删除 | boolean | false |
| disableSearch | 禁用搜索 | boolean | false |
| disableExport | 禁用导出 | boolean | false |
| disableTrash | 禁用回收站 | boolean | false |
| disableRouterQuery | 禁用路由参数 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| add | 点击新增按钮时触发 | - |
| read | 点击查看按钮时触发 | record: 行数据 |
| editItem | 点击编辑按钮时触发 | record: 行数据 |
| deleteItem | 点击删除按钮时触发 | record: 行数据 |

## 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| titleRight | 标题右侧区域 | - |
| beforeListActions | 列表操作前的区域 | - |
| afterListActions | 列表操作后的区域 | - |
| beforeActions | 操作列前的区域 | { record } |
| afterActions | 操作列后的区域 | { record } |
| beforeForm | 编辑器表单上方的区域 | { record } |
| afterForm | 编辑器表单下方的区域 | { record } |

## 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 刷新表格数据 | (reset?: boolean) |

## 完整示例

```vue
<script setup lang="ts">
import type { StdColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const curdRef = ref()
const columns: StdColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '全部', value: '' },
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    }
  }
]

const api = {
  getList: params => fetch('/api/users', { params }),
  getItem: id => fetch(`/api/users/${id}`),
  createItem: data => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateItem: (id, data) => fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteItem: id => fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
}

function handleExport(record) {
  message.success('导出成功')
}

// 调用组件方法示例
function refreshTable() {
  curdRef.value?.refresh()
}
</script>

<template>
  <StdCurd
    ref="curdRef"
    title="用户管理"
    :columns="columns"
    :api="api"
    :modal-width="800"
    :scroll-x="1200"
  >
    <template #titleRight>
      <Button @click="refreshTable">
        刷新
      </Button>
    </template>

    <template #afterActions="{ record }">
      <Button
        type="link"
        @click="handleExport(record)"
      >
        导出
      </Button>
    </template>
  </StdCurd>
</template>
```
