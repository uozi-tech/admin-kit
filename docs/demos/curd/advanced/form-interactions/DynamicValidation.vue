<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Button, message } from 'ant-design-vue'
import { computed, ref } from 'vue'

// 用于强制重新渲染表单的键值
const validationFormKey = ref(0)

// 表单数据
const validationFormData = ref<Record<string, any>>({})

const formRef = ref<InstanceType<typeof StdForm>>()

// 动态验证列配置
const validationColumns = computed(() => [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          {
            validator: async (rule, value) => {
              if (value && value.length < 3) {
                return Promise.reject(new Error('用户名至少3个字符'))
              }
              if (value && value.length > 20) {
                return Promise.reject(new Error('用户名最多20个字符'))
              }
              // 模拟异步验证
              if (value === 'admin' || value === 'administrator') {
                return Promise.reject(new Error('用户名已被占用'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
      placeholder: '请输入用户名',
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    edit: {
      type: 'password',
      formItem: {
        required: true,
        rules: [
          {
            validator: (rule, value) => {
              if (value && value.length < 6) {
                return Promise.reject(new Error('密码至少6位'))
              }
              return Promise.resolve()
            },
            trigger: 'blur',
          },
        ],
      },
      placeholder: '请输入密码',
    },
  },
  {
    title: '确认密码',
    dataIndex: 'confirm_password',
    edit: {
      type: 'password',
      formItem: {
        required: true,
        rules: [
          {
            validator: (rule, value) => {
              if (value && value !== validationFormData.value.password) {
                return Promise.reject(new Error('两次输入的密码不一致'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
      placeholder: '请再次输入密码',
    },
  },
  {
    title: '通知方式',
    dataIndex: 'notification_methods',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '邮箱', value: 'email' },
          { label: '短信', value: 'sms' },
          { label: '微信', value: 'wechat' },
        ],
      },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      placeholder: '请输入邮箱地址',
      formItem: {
        required: ({ formData }) => formData.notification_methods?.includes('email'),
        rules: [
          {
            validator: (rule, value) => {
              const hasEmailNotification = validationFormData.value.notification_methods?.includes('email')
              if (hasEmailNotification && !value) {
                return Promise.reject(new Error('选择邮箱通知时，邮箱为必填项'))
              }
              if (value && !/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value)) {
                return Promise.reject(new Error('请输入正确的邮箱格式'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
    },
  },
] as StdTableColumn[])

// 事件处理函数
function handleValidationSubmit() {
  formRef.value?.formRef?.validate().then(() => {
    message.success('验证表单提交成功')
  }).catch(() => {
    message.error('请填写完整表单')
  })
}
</script>

<template>
  <div>
    <h4>动态验证演示</h4>
    <StdForm
      ref="formRef"
      :key="`validation-${validationFormKey}`"
      v-model:data="validationFormData"
      :columns="validationColumns"
      :show-reset="true"
    />
    <Button
      type="primary"
      @click="handleValidationSubmit"
    >
      提交
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
