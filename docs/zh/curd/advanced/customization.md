# 自定义扩展

CURD 组件库提供了强大的自定义能力，支持自定义渲染、自定义表单控件、主题定制等高级功能。

## 自定义渲染

### 表格单元格自定义渲染

使用 `customRender` 函数自定义表格单元格的显示内容。

```ts
import { h } from 'vue'
import { Tag, Avatar, Button, Space } from 'ant-design-vue'

const columns = [
  {
    title: '用户信息',
    dataIndex: 'user',
    customRender: ({ value, record }) => {
      return h('div', { class: 'user-info' }, [
        h(Avatar, { src: value.avatar, size: 32 }),
        h('div', { class: 'user-details' }, [
          h('div', { class: 'username' }, value.name),
          h('div', { class: 'email' }, value.email)
        ])
      ])
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) => {
      const statusConfig = {
        active: { color: 'green', text: '活跃' },
        inactive: { color: 'red', text: '非活跃' },
        pending: { color: 'orange', text: '待审核' }
      }
      const config = statusConfig[value]
      return h(Tag, { color: config.color }, () => config.text)
    }
  }
]
```

### JSX 语法支持

如果项目支持 JSX，可以使用更直观的语法：

```tsx
const columns = [
  {
    title: '操作',
    dataIndex: 'actions',
    customRender: ({ record }) => (
      <Space>
        <Button type="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>
        <Button type="link" danger onClick={() => handleDelete(record)}>
          删除
        </Button>
      </Space>
    )
  }
]
```

### 复杂渲染示例

```ts
{
  title: '商品信息',
  dataIndex: 'product',
  customRender: ({ value, record }) => {
    return h('div', { class: 'product-card' }, [
      // 商品图片
      h('img', {
        src: value.image,
        style: 'width: 60px; height: 60px; object-fit: cover; border-radius: 4px;'
      }),
      
      // 商品详情
      h('div', { class: 'product-info' }, [
        h('div', { class: 'product-name' }, value.name),
        h('div', { class: 'product-price' }, `¥${value.price}`),
        h('div', { class: 'product-stock' }, [
          '库存: ',
          h('span', {
            style: value.stock > 0 ? 'color: green;' : 'color: red;'
          }, value.stock)
        ])
      ])
    ])
  }
}
```

## 自定义表单控件

### 创建自定义控件

```vue
<!-- CustomRangeInput.vue -->
<template>
  <div class="custom-range-input">
    <InputNumber
      v-model:value="minValue"
      placeholder="最小值"
      @change="handleChange"
    />
    <span class="separator">-</span>
    <InputNumber
      v-model:value="maxValue"
      placeholder="最大值"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { InputNumber } from 'ant-design-vue'

interface Props {
  value?: [number, number]
}

interface Emits {
  (e: 'update:value', value: [number, number]): void
  (e: 'change', value: [number, number]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const minValue = ref(props.value?.[0])
const maxValue = ref(props.value?.[1])

watch(() => props.value, (newValue) => {
  minValue.value = newValue?.[0]
  maxValue.value = newValue?.[1]
}, { immediate: true })

const handleChange = () => {
  const value = [minValue.value, maxValue.value] as [number, number]
  emit('update:value', value)
  emit('change', value)
}
</script>

<style scoped>
.custom-range-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.separator {
  color: #999;
}
</style>
```

### 使用自定义控件

```ts
import CustomRangeInput from './CustomRangeInput.vue'

const columns = [
  {
    title: '价格范围',
    dataIndex: 'price_range',
    form: {
      control: CustomRangeInput,  // 使用自定义组件
      required: true
    }
  }
]
```

### 函数式自定义控件

```ts
{
  title: '复杂字段',
  dataIndex: 'complex_field',
  form: {
    control: (formData, column, config) => {
      return h('div', [
        h(Input, {
          value: formData.complex_field?.text,
          placeholder: '输入文本',
          onInput: (e) => {
            formData.complex_field = {
              ...formData.complex_field,
              text: e.target.value
            }
          }
        }),
        h(Select, {
          value: formData.complex_field?.type,
          placeholder: '选择类型',
          options: [
            { label: '类型A', value: 'A' },
            { label: '类型B', value: 'B' }
          ],
          onChange: (value) => {
            formData.complex_field = {
              ...formData.complex_field,
              type: value
            }
          }
        })
      ])
    }
  }
}
```

## 主题定制

### CSS 变量定制

```css
/* 自定义主题色 */
:root {
  --curd-primary-color: #1890ff;
  --curd-success-color: #52c41a;
  --curd-warning-color: #faad14;
  --curd-error-color: #f5222d;
  
  /* 表格样式 */
  --curd-table-header-bg: #fafafa;
  --curd-table-row-hover-bg: #f5f5f5;
  
  /* 表单样式 */
  --curd-form-item-margin-bottom: 24px;
  --curd-form-label-color: #000000d9;
}
```

### 组件样式覆盖

```css
/* 自定义表格样式 */
.std-table {
  .ant-table-thead > tr > th {
    background-color: var(--curd-table-header-bg);
    font-weight: 600;
  }
  
  .ant-table-tbody > tr:hover > td {
    background-color: var(--curd-table-row-hover-bg);
  }
}

/* 自定义表单样式 */
.std-form {
  .ant-form-item {
    margin-bottom: var(--curd-form-item-margin-bottom);
  }
  
  .ant-form-item-label > label {
    color: var(--curd-form-label-color);
  }
}
```

### 全局样式配置

```ts
// main.ts
import { createCurdConfig } from '@uozi-admin/curd'

app.use(createCurdConfig({
  theme: {
    // 主题色配置
    primaryColor: '#1890ff',
    
    // 组件默认样式
    table: {
      size: 'middle',
      bordered: true,
      showSorterTooltip: false
    },
    
    form: {
      layout: 'vertical',
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  }
}))
```

## 扩展点和插件

### 自定义验证器

```ts
// 创建自定义验证器
const phoneValidator = (rule: any, value: string) => {
  if (value && !/^1[3-9]\d{9}$/.test(value)) {
    return Promise.reject(new Error('请输入正确的手机号格式'))
  }
  return Promise.resolve()
}

// 使用自定义验证器
{
  title: '手机号',
  dataIndex: 'phone',
  form: {
    control: 'input',
    rules: [
      { required: true, message: '请输入手机号' },
      { validator: phoneValidator }
    ]
  }
}
```

### 自定义格式化器

```ts
// 金额格式化器
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(value)
}

// 使用格式化器
{
  title: '金额',
  dataIndex: 'amount',
  customRender: ({ value }) => formatCurrency(value),
  form: {
    control: 'inputNumber',
    formatter: (value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    parser: (value) => value.replace(/¥\s?|(,*)/g, '')
  }
}
```

### 自定义操作按钮

```ts
// 创建自定义操作组件
const CustomActions = ({ record, onEdit, onDelete, onView }) => {
  return h(Space, [
    h(Button, {
      type: 'link',
      size: 'small',
      onClick: () => onView(record)
    }, '查看'),
    
    record.editable && h(Button, {
      type: 'link',
      size: 'small',
      onClick: () => onEdit(record)
    }, '编辑'),
    
    record.deletable && h(Button, {
      type: 'link',
      size: 'small',
      danger: true,
      onClick: () => onDelete(record)
    }, '删除')
  ].filter(Boolean))
}

// 使用自定义操作
const columns = [
  // ... 其他列配置
  {
    title: '操作',
    dataIndex: 'actions',
    width: 200,
    customRender: ({ record }) => h(CustomActions, {
      record,
      onEdit: handleEdit,
      onDelete: handleDelete,
      onView: handleView
    })
  }
]
```

## 高级定制示例

### 可编辑表格

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Input, Button, Space } from 'ant-design-vue'
import { h } from 'vue'

const editingKey = ref('')
const dataSource = ref([])

const isEditing = (record) => record.key === editingKey.value

const edit = (key) => {
  editingKey.value = key
}

const cancel = () => {
  editingKey.value = ''
}

const save = async (key) => {
  // 保存逻辑
  editingKey.value = ''
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    customRender: ({ value, record }) => {
      if (isEditing(record)) {
        return h(Input, {
          value: value,
          onInput: (e) => record.name = e.target.value
        })
      }
      return value
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    customRender: ({ value, record }) => {
      if (isEditing(record)) {
        return h(InputNumber, {
          value: value,
          onChange: (val) => record.age = val
        })
      }
      return value
    }
  },
  {
    title: '操作',
    dataIndex: 'actions',
    customRender: ({ record }) => {
      if (isEditing(record)) {
        return h(Space, [
          h(Button, {
            type: 'link',
            onClick: () => save(record.key)
          }, '保存'),
          h(Button, {
            type: 'link',
            onClick: cancel
          }, '取消')
        ])
      }
      
      return h(Button, {
        type: 'link',
        onClick: () => edit(record.key)
      }, '编辑')
    }
  }
]
</script>

<template>
  <StdTable
    :columns="columns"
    :data-source="dataSource"
    :pagination="false"
  />
</template>
```

### 动态表单

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { StdForm } from '@uozi-admin/curd'

const formType = ref('personal')

const columns = computed(() => {
  const baseColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      form: { control: 'input', required: true }
    }
  ]
  
  if (formType.value === 'personal') {
    return [
      ...baseColumns,
      {
        title: '身份证号',
        dataIndex: 'id_card',
        form: { control: 'input', required: true }
      }
    ]
  }
  
  if (formType.value === 'company') {
    return [
      ...baseColumns,
      {
        title: '营业执照号',
        dataIndex: 'business_license',
        form: { control: 'input', required: true }
      }
    ]
  }
  
  return baseColumns
})
</script>

<template>
  <div>
    <RadioGroup v-model:value="formType" style="margin-bottom: 16px;">
      <Radio value="personal">个人</Radio>
      <Radio value="company">企业</Radio>
    </RadioGroup>
    
    <StdForm :columns="columns" />
  </div>
</template>
```

## 相关内容

- [表单交互](./form-interactions) - 表单联动和验证
- [批量操作](./batch-operations) - 批量编辑和删除
- [国际化](./internationalization) - 多语言支持