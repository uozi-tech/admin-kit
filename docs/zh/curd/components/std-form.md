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

// 自定义表单行属性
const formRowProps = {
  gutter: 16,
  justify: 'start',
  align: 'top'
}
</script>

<template>
  <StdForm
    v-model:data="formData"
    :columns="columns"
    label-align="right"
    :form-row-props="formRowProps"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | StdTableColumn[] | [] |
| labelAlign | 标签对齐方式 | 'left' \| 'right' | 'left' |
| formRowProps | Row 组件属性，用于自定义表单布局 | RowProps | - |
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

## 字段联动

StdForm 支持字段间的联动功能，当依赖字段值发生变化时自动更新其他字段：

### 示例：身份证号联动出生日期和性别

```typescript
import { set } from 'lodash-es'

const columns = [
  {
    title: '身份证号',
    dataIndex: 'idCard',
    edit: {
      type: 'input',
      formItem: { required: true }
    }
  },
  {
    title: '出生日期',
    dataIndex: 'birthDate',
    edit: {
      type: 'date',
      dependencies: ['idCard'],
      onChange: (value, formData, dependencies) => {
        const idCard = dependencies.idCard
        if (idCard && idCard.length === 18) {
          // 从身份证号提取出生日期
          const year = idCard.substring(6, 10)
          const month = idCard.substring(10, 12)
          const day = idCard.substring(12, 14)
          const birthDate = `${year}-${month}-${day}`
          
          // 手动更新出生日期字段
          set(formData, 'birthDate', birthDate)
          
          // 提取性别信息
          const genderCode = parseInt(idCard.substring(16, 17))
          const gender = genderCode % 2 === 0 ? 'female' : 'male'
          
          // 手动更新性别字段
          set(formData, 'gender', gender)
        }
      }
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    }
  }
]
```

### 联动配置说明

- `dependencies`: 依赖的字段名称数组
- `onChange`: 联动处理函数，接收当前字段值、完整表单数据和依赖字段值，需要在函数内部手动更新 formData

更多联动功能请参考[表单联动](../advance/form-linkage)章节。

## Slots

- 无

## Events

- `save`: 保存事件。
