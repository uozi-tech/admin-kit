# 表单交互

表单交互功能让您能够创建智能的、响应式的表单，支持字段联动、条件显示、动态验证等高级特性。

## 字段联动

### 基础联动

通过监听字段值变化来控制其他字段的行为。

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { StdForm } from '@uozi-admin/curd'

const formData = ref({})

// 监听用户类型变化
watch(() => formData.value.user_type, (newType) => {
  if (newType === 'company') {
    // 企业用户显示企业相关字段
    formData.value.company_name = ''
    formData.value.business_license = ''
  } else {
    // 个人用户清空企业字段
    delete formData.value.company_name
    delete formData.value.business_license
  }
})

const columns = computed(() => [
  {
    title: '用户类型',
    dataIndex: 'user_type',
    form: {
      control: 'radioGroup',
      required: true,
      options: [
        { label: '个人用户', value: 'personal' },
        { label: '企业用户', value: 'company' }
      ]
    }
  },
  {
    title: '企业名称',
    dataIndex: 'company_name',
    form: {
      control: 'input',
      required: formData.value.user_type === 'company',
      hidden: formData.value.user_type !== 'company'
    }
  },
  {
    title: '营业执照号',
    dataIndex: 'business_license',
    form: {
      control: 'input',
      required: formData.value.user_type === 'company',
      hidden: formData.value.user_type !== 'company'
    }
  }
])
</script>

<template>
  <StdForm 
    v-model:form-data="formData"
    :columns="columns" 
  />
</template>
```

### 级联选择联动

省市区三级联动示例。

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { StdForm } from '@uozi-admin/curd'

const formData = ref({})
const cityOptions = ref([])
const districtOptions = ref([])

// 省份变化时更新城市选项
watch(() => formData.value.province, async (provinceCode) => {
  if (provinceCode) {
    const response = await fetch(`/api/cities?province=${provinceCode}`)
    cityOptions.value = await response.json()
    
    // 清空下级选择
    formData.value.city = undefined
    formData.value.district = undefined
    districtOptions.value = []
  }
})

// 城市变化时更新区县选项
watch(() => formData.value.city, async (cityCode) => {
  if (cityCode) {
    const response = await fetch(`/api/districts?city=${cityCode}`)
    districtOptions.value = await response.json()
    
    // 清空下级选择
    formData.value.district = undefined
  }
})

const columns = [
  {
    title: '省份',
    dataIndex: 'province',
    form: {
      control: 'select',
      required: true,
      options: [
        { label: '浙江省', value: 'zhejiang' },
        { label: '江苏省', value: 'jiangsu' }
      ]
    }
  },
  {
    title: '城市',
    dataIndex: 'city',
    form: {
      control: 'select',
      required: true,
      disabled: !formData.value.province,
      options: cityOptions.value,
      placeholder: formData.value.province ? '请选择城市' : '请先选择省份'
    }
  },
  {
    title: '区县',
    dataIndex: 'district',
    form: {
      control: 'select',
      required: true,
      disabled: !formData.value.city,
      options: districtOptions.value,
      placeholder: formData.value.city ? '请选择区县' : '请先选择城市'
    }
  }
]
</script>

<template>
  <StdForm 
    v-model:form-data="formData"
    :columns="columns" 
  />
</template>
```

## 条件显示

### 基于字段值的条件显示

```ts
const columns = computed(() => [
  {
    title: '是否有驾照',
    dataIndex: 'has_license',
    form: {
      control: 'switch',
      checkedChildren: '有',
      unCheckedChildren: '无'
    }
  },
  {
    title: '驾照类型',
    dataIndex: 'license_type',
    form: {
      control: 'select',
      required: formData.value.has_license,
      hidden: !formData.value.has_license,  // 条件显示
      options: [
        { label: 'C1', value: 'C1' },
        { label: 'C2', value: 'C2' },
        { label: 'B2', value: 'B2' }
      ]
    }
  },
  {
    title: '驾照到期日期',
    dataIndex: 'license_expire_date',
    form: {
      control: 'date',
      required: formData.value.has_license,
      hidden: !formData.value.has_license
    }
  }
])
```

### 复杂条件显示

```ts
const shouldShowAdvancedFields = computed(() => {
  return formData.value.user_level === 'advanced' && 
         formData.value.experience_years >= 5
})

const columns = computed(() => [
  {
    title: '用户等级',
    dataIndex: 'user_level',
    form: {
      control: 'select',
      options: [
        { label: '初级', value: 'beginner' },
        { label: '中级', value: 'intermediate' },
        { label: '高级', value: 'advanced' }
      ]
    }
  },
  {
    title: '工作年限',
    dataIndex: 'experience_years',
    form: {
      control: 'inputNumber',
      min: 0,
      max: 50
    }
  },
  {
    title: '专业技能',
    dataIndex: 'professional_skills',
    form: {
      control: 'checkboxGroup',
      hidden: !shouldShowAdvancedFields.value,  // 复杂条件
      options: [
        { label: '架构设计', value: 'architecture' },
        { label: '团队管理', value: 'management' },
        { label: '技术培训', value: 'training' }
      ]
    }
  }
])
```

## 动态验证

### 基于其他字段的验证

```ts
{
  title: '确认密码',
  dataIndex: 'confirm_password',
  form: {
    control: 'password',
    required: true,
    rules: [
      {
        validator: (rule, value) => {
          if (value && value !== formData.value.password) {
            return Promise.reject(new Error('两次输入的密码不一致'))
          }
          return Promise.resolve()
        }
      }
    ]
  }
}
```

### 异步验证

```ts
{
  title: '用户名',
  dataIndex: 'username',
  form: {
    control: 'input',
    required: true,
    rules: [
      {
        validator: async (rule, value) => {
          if (value) {
            const response = await fetch(`/api/check-username?username=${value}`)
            const result = await response.json()
            if (!result.available) {
              return Promise.reject(new Error('用户名已被占用'))
            }
          }
          return Promise.resolve()
        }
      }
    ]
  }
}
```

### 条件验证

```ts
{
  title: '邮箱',
  dataIndex: 'email',
  form: {
    control: 'input',
    // 只有当通知方式包含邮箱时才必填
    required: formData.value.notification_methods?.includes('email'),
    rules: [
      {
        validator: (rule, value) => {
          // 如果选择了邮箱通知，必须填写邮箱
          if (formData.value.notification_methods?.includes('email') && !value) {
            return Promise.reject(new Error('选择邮箱通知时，邮箱为必填项'))
          }
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return Promise.reject(new Error('请输入正确的邮箱格式'))
          }
          return Promise.resolve()
        }
      }
    ]
  }
}
```

## 表单状态管理

### 表单数据持久化

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { StdForm } from '@uozi-admin/curd'

const formData = ref({})

// 自动保存到 localStorage
watch(formData, (newData) => {
  localStorage.setItem('form-draft', JSON.stringify(newData))
}, { deep: true })

// 页面加载时恢复数据
onMounted(() => {
  const savedData = localStorage.getItem('form-draft')
  if (savedData) {
    formData.value = JSON.parse(savedData)
  }
})

// 提交成功后清除草稿
const handleSuccess = () => {
  localStorage.removeItem('form-draft')
}
</script>

<template>
  <StdForm 
    v-model:form-data="formData"
    :columns="columns"
    @success="handleSuccess"
  />
</template>
```

### 表单重置和恢复

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Space } from 'ant-design-vue'

const formRef = ref()
const initialData = ref({})

const saveInitialData = () => {
  initialData.value = { ...formData.value }
}

const resetForm = () => {
  formRef.value?.resetFields()
}

const restoreInitialData = () => {
  formData.value = { ...initialData.value }
}
</script>

<template>
  <div>
    <StdForm 
      ref="formRef"
      v-model:form-data="formData"
      :columns="columns"
      @mounted="saveInitialData"
    />
    
    <Space style="margin-top: 16px;">
      <Button @click="resetForm">重置表单</Button>
      <Button @click="restoreInitialData">恢复初始值</Button>
    </Space>
  </div>
</template>
```

## 高级交互示例

### 动态表单项

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'

const formData = ref({
  contacts: [{ name: '', phone: '' }]
})

const addContact = () => {
  formData.value.contacts.push({ name: '', phone: '' })
}

const removeContact = (index) => {
  formData.value.contacts.splice(index, 1)
}

const columns = computed(() => {
  const baseColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      form: { control: 'input', required: true }
    }
  ]
  
  // 动态生成联系人字段
  const contactColumns = formData.value.contacts.map((contact, index) => [
    {
      title: `联系人${index + 1}姓名`,
      dataIndex: `contacts.${index}.name`,
      form: {
        control: 'input',
        required: true,
        addonAfter: index > 0 ? h(Button, {
          type: 'text',
          icon: h(MinusCircleOutlined),
          onClick: () => removeContact(index)
        }) : null
      }
    },
    {
      title: `联系人${index + 1}电话`,
      dataIndex: `contacts.${index}.phone`,
      form: {
        control: 'input',
        required: true
      }
    }
  ]).flat()
  
  return [...baseColumns, ...contactColumns]
})
</script>

<template>
  <div>
    <StdForm 
      v-model:form-data="formData"
      :columns="columns"
    />
    
    <Button 
      type="dashed" 
      @click="addContact"
      style="width: 100%; margin-top: 16px;"
    >
      <PlusOutlined /> 添加联系人
    </Button>
  </div>
</template>
```

### 分步表单

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Steps, Button, Space } from 'ant-design-vue'

const currentStep = ref(0)
const formData = ref({})

const steps = [
  { title: '基本信息', key: 'basic' },
  { title: '详细信息', key: 'detail' },
  { title: '确认提交', key: 'confirm' }
]

const currentColumns = computed(() => {
  const allColumns = {
    basic: [
      {
        title: '姓名',
        dataIndex: 'name',
        form: { control: 'input', required: true }
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        form: { control: 'input', required: true }
      }
    ],
    detail: [
      {
        title: '地址',
        dataIndex: 'address',
        form: { control: 'textarea', required: true }
      },
      {
        title: '电话',
        dataIndex: 'phone',
        form: { control: 'input', required: true }
      }
    ],
    confirm: [
      // 确认页面显示所有信息
      ...allColumns.basic,
      ...allColumns.detail
    ]
  }
  
  return allColumns[steps[currentStep.value].key] || []
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<template>
  <div>
    <Steps :current="currentStep" style="margin-bottom: 24px;">
      <Step v-for="step in steps" :key="step.key" :title="step.title" />
    </Steps>
    
    <StdForm 
      v-model:form-data="formData"
      :columns="currentColumns"
      :show-submit="currentStep === steps.length - 1"
    />
    
    <Space style="margin-top: 16px;">
      <Button v-if="currentStep > 0" @click="prevStep">
        上一步
      </Button>
      <Button 
        v-if="currentStep < steps.length - 1" 
        type="primary" 
        @click="nextStep"
      >
        下一步
      </Button>
    </Space>
  </div>
</template>
```

## 相关内容

- [自定义扩展](./customization) - 自定义渲染和控件
- [批量操作](./batch-operations) - 批量编辑和删除
- [国际化](./internationalization) - 多语言支持