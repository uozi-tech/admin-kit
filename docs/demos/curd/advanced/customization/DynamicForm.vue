<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { message, RadioButton, RadioGroup } from 'ant-design-vue'
import { computed, ref } from 'vue'

const formType = ref('personal')
const formData = ref({})

// 动态表单列配置
const dynamicFormColumns = computed(() => {
  const baseColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      edit: {
        type: 'input',
        required: true,
        placeholder: '请输入姓名',
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      edit: {
        type: 'input',
        required: true,
        placeholder: '请输入手机号',
        rules: [
          { required: true, message: '请输入手机号' },
          { validator: phoneValidator },
        ],
      },
    },
  ]

  if (formType.value === 'personal') {
    return [
      ...baseColumns,
      {
        title: '身份证号',
        dataIndex: 'id_card',
        edit: {
          type: 'input',
          required: true,
          placeholder: '请输入身份证号',
        },
      },
      {
        title: '性别',
        dataIndex: 'gender',
        edit: {
          type: 'radioGroup',
          radioGroup: {
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ],
          },
        },
      },
    ] as StdTableColumn[]
  }

  if (formType.value === 'company') {
    return [
      ...baseColumns,
      {
        title: '营业执照号',
        dataIndex: 'business_license',
        edit: {
          type: 'input',
          required: true,
          placeholder: '请输入营业执照号',
        },
      },
      {
        title: '企业类型',
        dataIndex: 'company_type',
        edit: {
          type: 'select',
          options: [
            { label: '有限责任公司', value: 'llc' },
            { label: '股份有限公司', value: 'corp' },
            { label: '个体工商户', value: 'individual' },
          ],
        },
      },
    ] as StdTableColumn[]
  }

  return baseColumns as StdTableColumn[]
})

// 手机号验证器
function phoneValidator(rule: any, value: string) {
  if (value && !/^1[3-9]\d{9}$/.test(value)) {
    return Promise.reject(new Error('请输入正确的手机号格式'))
  }
  return Promise.resolve()
}

function handleFormSubmit(formData) {
  message.success('表单提交成功')
}

function handleDynamicFormSubmit(formData) {
  message.success(`${formType.value === 'personal' ? '个人' : '企业'}用户信息提交成功`)
}

function handleFormTypeChange() {
  message.info(`切换到${formType.value === 'personal' ? '个人' : '企业'}用户表单`)
}
</script>

<template>
  <h4>动态表单演示</h4>
  <RadioGroup
    v-model:value="formType"
    style="margin-bottom: 16px;"
    @change="handleFormTypeChange"
  >
    <RadioButton value="personal">
      个人用户
    </RadioButton>
    <RadioButton value="company">
      企业用户
    </RadioButton>
  </RadioGroup>

  <StdForm
    :key="formType"
    v-model:data="formData"
    :columns="dynamicFormColumns"
    @submit="handleDynamicFormSubmit"
  />
</template>
