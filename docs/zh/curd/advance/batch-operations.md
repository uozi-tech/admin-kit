# 批量操作

批量操作是数据管理中的常见需求，CURD组件提供了强大的批量操作支持。

## 基础配置

要启用批量操作，需要配置行选择功能：

```ts
<StdCurd
  v-model:selected-row-keys="selectedRowKeys"
  :columns="columns"
  :api="userApi"
  row-selection-type="checkbox"
  row-key="id"
/>
```

## 批量编辑

某些字段可以支持批量编辑，在列配置中设置 `batchEdit: true`：

```ts
{
  title: '状态',
  dataIndex: 'status',
  edit: {
    type: 'select',
    select: {
      options: [
        { label: '激活', value: 1 },
        { label: '禁用', value: -1 },
      ],
    },
  },
  batchEdit: true, // 启用批量编辑
}
```

## 自定义批量操作

可以通过 `table-extra-render` 插槽添加自定义批量操作按钮：

```vue
<template>
  <StdCurd
    v-model:selected-row-keys="selectedRowKeys"
    :columns="columns"
    :api="userApi"
    row-selection-type="checkbox"
    row-key="id"
    :table-extra-render="batchOperations"
  />
</template>

<script setup>
import { h } from 'vue'
import { Button, message } from 'ant-design-vue'

const selectedRowKeys = ref([])

const handleBatchActivate = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择用户')
    return
  }
  // 批量激活逻辑
  console.log('批量激活用户:', selectedRowKeys.value)
  message.success(`已激活 ${selectedRowKeys.value.length} 个用户`)
  selectedRowKeys.value = []
}

const batchOperations = () => {
  return h('div', { style: 'display: flex; gap: 8px; margin-bottom: 16px;' }, [
    h(Button, {
      type: 'primary',
      size: 'small',
      disabled: selectedRowKeys.value.length === 0,
      onClick: handleBatchActivate,
    }, () => `批量激活 (${selectedRowKeys.value.length})`),
  ])
}
</script>
```

## 完整演示

<demo vue="../demos/curd/operation/batch-operations.vue" title="批量操作示例" description="演示完整的批量操作功能，包括批量编辑、批量激活、批量导出等"></demo>
