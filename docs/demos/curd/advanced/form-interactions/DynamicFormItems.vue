<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { StdForm } from '@uozi-admin/curd'
import { Button, message } from 'ant-design-vue'
import { computed, h, ref } from 'vue'

// 用于强制重新渲染表单的键值
const dynamicFormKey = ref(0)

// 动态表单数据
const dynamicFormData = ref({
  name: '',
  contacts: [{ name: '', phone: '' }],
})

// 动态表单项列配置
const dynamicFormColumns = computed<StdTableColumn[]>(() => {
  const baseColumns: StdTableColumn[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      edit: {
        type: 'input',
        required: true,
        placeholder: '请输入姓名',
      },
    },
  ]

  // 动态生成联系人字段
  const contactColumns = dynamicFormData.value.contacts.map((contact, index) => [
    {
      title: `联系人${index + 1}姓名`,
      dataIndex: `contacts[${index}].name`,
      edit: {
        type: 'input',
        formItem: {
          required: true,
        },
        placeholder: '请输入联系人姓名',
        input: {
          addonAfter: index > 0
            ? h(Button, {
                type: 'text',
                size: 'small',
                icon: h(MinusCircleOutlined),
                onClick: () => removeContact(index),
              })
            : null,
        },
      },
    },
    {
      title: `联系人${index + 1}电话`,
      dataIndex: `contacts[${index}].phone`,
      edit: {
        type: 'input',
        formItem: {
          required: true,
        },
        placeholder: '请输入联系人电话',
      },
    },
  ]).flat() as StdTableColumn[]

  return [...baseColumns, ...contactColumns]
})

// 事件处理函数
function handleDynamicSubmit(data) {
  message.success('动态表单提交成功')
}

// 动态表单项操作
function addContact() {
  dynamicFormData.value.contacts.push({ name: '', phone: '' })
  dynamicFormKey.value++
}

function removeContact(index) {
  dynamicFormData.value.contacts.splice(index, 1)
  dynamicFormKey.value++
}
</script>

<template>
  <div>
    <h4>动态表单项演示</h4>
    <StdForm
      :key="`dynamic-${dynamicFormKey}`"
      v-model:form-data="dynamicFormData"
      :columns="dynamicFormColumns"
      :show-reset="true"
      @submit="handleDynamicSubmit"
    />

    <Button
      type="dashed"
      style="width: 100%; margin-top: 16px;"
      @click="addContact"
    >
      <PlusOutlined /> 添加联系人
    </Button>
  </div>
</template>

<style scoped>
h4 {
  margin: 16px 0;
  color: #1890ff;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

:deep(.ant-form) {
  margin-top: 16px;
}
</style>