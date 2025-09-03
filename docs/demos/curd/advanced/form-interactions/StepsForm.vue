<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Button, message, Space, Step, Steps } from 'ant-design-vue'
import { computed, ref } from 'vue'

// 分步表单数据
const stepsFormData = ref<Record<string, any>>({})

const formRef = ref<InstanceType<typeof StdForm>>()

// 分步表单相关
const currentStep = ref(0)
const steps = [
  { title: '基本信息', key: 'basic' },
  { title: '详细信息', key: 'detail' },
  { title: '确认提交', key: 'confirm' },
]

// 分步表单列配置
const currentStepColumns = computed<StdTableColumn[]>(() => {
  const allColumns = {
    basic: [
      {
        title: '姓名',
        dataIndex: 'name',
        edit: {
          type: 'input',
          formItem: {
            required: true,
          },
          placeholder: '请输入姓名',
        },
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        edit: {
          type: 'input',
          formItem: {
            required: true,
          },
          placeholder: '请输入邮箱',
        },
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        edit: {
          type: 'input',
          formItem: {
            required: true,
          },
          placeholder: '请输入手机号',
        },
      },
    ],
    detail: [
      {
        title: '地址',
        dataIndex: 'address',
        edit: {
          type: 'textarea',
          formItem: {
            required: true,
          },
          placeholder: '请输入详细地址',
        },
      },
      {
        title: '职业',
        dataIndex: 'occupation',
        edit: {
          type: 'input',
          formItem: {
            required: true,
          },
          placeholder: '请输入职业',
        },
      },
      {
        title: '兴趣爱好',
        dataIndex: 'hobbies',
        edit: {
          type: 'checkboxGroup',
          formItem: {
            required: true,
          },
          checkboxGroup: {
            options: [
              { label: '阅读', value: 'reading' },
              { label: '运动', value: 'sports' },
              { label: '音乐', value: 'music' },
              { label: '旅行', value: 'travel' },
            ],
          },
        },
      },
    ],
    confirm: [],
  }

  if (steps[currentStep.value].key === 'confirm') {
    // 确认页面显示所有信息（只读）
    return [
      ...allColumns.basic.map(col => ({ ...col, edit: { ...col.edit, disabled: true } })),
      ...allColumns.detail.map(col => ({ ...col, edit: { ...col.edit, disabled: true } })),
    ]
  }

  return allColumns[steps[currentStep.value].key] || []
})

// 事件处理函数
function handleStepsSubmit() {
  message.success('分步表单提交成功')
  currentStep.value = 0 // 重置步骤
  stepsFormData.value = {}
}

// 分步表单操作
async function nextStep() {
  try {
    await formRef.value?.formRef?.validate()
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
    else {
      handleStepsSubmit()
    }
  }
  catch (error) {
    message.error('请填写完整表单')
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<template>
  <div>
    <h4>分步表单演示</h4>
    <Steps
      :current="currentStep"
      style="margin-bottom: 24px;"
    >
      <Step
        v-for="step in steps"
        :key="step.key"
        :title="step.title"
      />
    </Steps>

    <StdForm
      ref="formRef"
      :key="`steps-${currentStep}`"
      v-model:data="stepsFormData"
      :columns="currentStepColumns"
      :show-submit="currentStep === steps.length - 1"
      @submit="handleStepsSubmit"
    />

    <Space style="margin-top: 16px;">
      <Button
        v-if="currentStep > 0"
        @click="prevStep"
      >
        上一步
      </Button>
      <Button
        v-if="currentStep <= steps.length - 1"
        type="primary"
        @click="nextStep"
      >
        {{ currentStep === steps.length - 1 ? '提交' : '下一步' }}
      </Button>
    </Space>
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

:deep(.ant-steps) {
  max-width: 600px;
}
</style>
