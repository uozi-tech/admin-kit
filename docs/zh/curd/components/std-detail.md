# StdDetail 组件

StdDetail 是一个用于展示数据详情的组件,基于 Ant Design Vue 的 Descriptions 组件。

## 基础用法

```vue
<script setup lang="ts">
const detailData = {
  username: 'admin',
  email: 'admin@example.com',
  status: 1
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text }) => text === 1 ? '启用' : '禁用'
  }
]
</script>

<template>
  <StdDetail
    :record="detailData"
    :columns="columns"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| record | 详情数据 | object | {} |
| columns | 列配置 | StdColumn[] | [] |

## 功能特性

### 自动过滤

会自动过滤掉以下列:
- dataIndex 为 'actions' 的列
- hiddenInDetail 为 true 的列

### 自定义渲染

支持通过 customRender 自定义渲染内容:

```vue
<script setup>
const column = {
  title: '状态',
  dataIndex: 'status',
  customRender: ({ text }) => {
    return text === 1
      ? h(Tag, { color: 'success' }, () => '启用')
      : h(Tag, { color: 'error' }, () => '禁用')
  }
}
</script>
```

### 数据转换

支持通过 dataIndex 读取嵌套数据:

```vue
<script setup>
const column = {
  title: '部门',
  dataIndex: ['dept', 'name'] // 读取 record.dept.name
}
</script>
```

## Props

- `record`: 当前行的数据对象。
- `columns`: 列配置数组，定义详情展示的字段。
- `detailProps`: 同 Description 组件属性

## Slots

- 无
