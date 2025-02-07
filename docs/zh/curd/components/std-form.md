# StdForm 组件

StdForm 是一个基于 Ant Design Vue Form 的表单组件,支持多种表单控件和验证规则。

## 基础用法

```vue
<script setup lang="ts">
const formData = ref({})
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        required: true
      }
    }
  }
]
</script>

<template>
  <StdForm
    v-model:data="formData"
    :columns="columns"
    label-align="right"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | StdTableColumn[] | [] |
| labelAlign | 标签对齐方式 | 'left' \| 'right' | 'left' |
| layout | 布局方式 | 'horizontal' \| 'vertical' \| 'inline' | 'vertical' |

### Model

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表单数据 | object | {} |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 验证表单 | (payload: \{ name: string \| number \| string[] \| number[], status: boolean, errors: string[] \}) => void |

## 表单控件

StdForm 支持以下表单控件:

### Input 输入框
```vue
<script setup>
const column = {
  type: 'input',
  input: {
    maxLength: 20,
    placeholder: '请输入'
  }
}
</script>
```

### Select 选择器
```vue
<script setup>
const column = {
  type: 'select',
  select: {
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  }
}
</script>
```

### DatePicker 日期选择器
```vue
<script setup>
const column = {
  type: 'date',
  date: {
    format: 'YYYY-MM-DD'
  }
}
</script>
```

更多控件请参考[表单控件](../form-controls/input)章节。

## Slots

- 无

## Events

- `save`: 保存事件。
