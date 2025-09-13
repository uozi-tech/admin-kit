# StdForm 组件

StdForm 是表单组件，用于数据的新增和编辑，支持各种表单控件和验证规则。

## 基础用法

```vue
<template>
  <StdForm :columns="columns" />
</template>

<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: { 
      type:'input',
      formItem: {
        required: true,
      },
    },
  }
]
</script>
```

## 演示示例

<demo vue="../demos/curd/components/std-form.vue" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| **基础配置** | | | |
| columns | 列配置 | StdTableColumn[] | - |
| mode | 表单模式 | 'add' \| 'edit' | - |
| layout | 表单布局 | 'horizontal' \| 'vertical' \| 'inline' | - |
| labelAlign | 标签对齐方式 | 'left' \| 'right' | - |
| **表单属性** | | | |
| formClass | 表单样式类 | string \| string[] \| Record<string, boolean> | - |
| formRowProps | 表单行属性 | RowProps | `{ gutter: 16 }` |
| errors | 错误信息 | Record<string, string> | - |
| **数据绑定** | | | |
| data | 表单数据（v-model） | Record<string, any> | `reactive({})` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| success | 保存成功时触发 | (data: any) |
| error | 保存失败时触发 | (error: Error) |

更多详细配置请参考完整 API 文档。