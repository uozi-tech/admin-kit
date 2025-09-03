<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Col, message, Row } from 'ant-design-vue'
import { computed, ref } from 'vue'

// 用于强制重新渲染表单的键值
const conditionalFormKey = ref(0)
const complexFormKey = ref(0)

// 条件显示列配置
const conditionalColumns = computed<StdTableColumn[]>(() => [
  {
    title: '是否有驾照',
    dataIndex: 'has_license',
    edit: {
      type: 'switch',
      checkedChildren: '有',
      unCheckedChildren: '无',
      onChange: () => {
        conditionalFormKey.value++
      },
    },
  },
  {
    title: '驾照类型',
    dataIndex: 'license_type',
    edit: {
      type: 'select',
      formItem: {
        required: ({ formData }) => formData.has_license,
      },
      showInForm: ({ formData }) => formData.has_license,
      placeholder: '请选择驾照类型',
      select: {
        options: [
          { label: 'C1', value: 'C1' },
          { label: 'C2', value: 'C2' },
          { label: 'B2', value: 'B2' },
          { label: 'A2', value: 'A2' },
        ],
      },
    },
  },
  {
    title: '驾照到期日期',
    dataIndex: 'license_expire_date',
    edit: {
      type: 'date',
      formItem: {
        required: ({ formData }) => formData.has_license,
      },
      showInForm: ({ formData }) => formData.has_license,
      placeholder: '请选择到期日期',
    },
  },
])

const complexConditionalColumns = computed(() => [
  {
    title: '用户等级',
    dataIndex: 'user_level',
    edit: {
      type: 'select',
      placeholder: '请选择用户等级',
      select: {
        options: [
          { label: '初级', value: 'beginner' },
          { label: '中级', value: 'intermediate' },
          { label: '高级', value: 'advanced' },
        ],
        onChange: () => {
          complexFormKey.value++
        },
      },
    },
  },
  {
    title: '工作年限',
    dataIndex: 'experience_years',
    edit: {
      type: 'inputNumber',
      min: 0,
      max: 50,
      placeholder: '请输入工作年限',
      onChange: () => {
        complexFormKey.value++
      },
    },
  },
  {
    title: '专业技能',
    dataIndex: 'professional_skills',
    edit: {
      type: 'checkboxGroup',
      showInForm: ({ formData }) => formData.user_level === 'advanced' && (formData.experience_years) >= 5,
      checkboxGroup: {
        options: [
          { label: '架构设计', value: 'architecture' },
          { label: '团队管理', value: 'management' },
          { label: '技术培训', value: 'training' },
          { label: '项目管理', value: 'project_management' },
        ],
      },
    },
  },
  {
    title: '技术专长',
    dataIndex: 'specialties',
    edit: {
      type: 'textarea',
      showInForm: ({ formData }) => formData.user_level === 'advanced' && (formData.experience_years) >= 5,
      placeholder: '请详细描述您的技术专长',
    },
  },
] as StdTableColumn[])

// 事件处理函数
function handleConditionalSubmit(data) {
  message.success('条件显示表单提交成功')
}

function handleComplexSubmit(data) {
  message.success('复杂条件表单提交成功')
}
</script>

<template>
  <div>
    <h4>条件显示演示</h4>
    <Row :gutter="24">
      <Col :span="12">
        <h5>基于字段值的条件显示</h5>
        <StdForm
          :key="`conditional-${conditionalFormKey}`"
          :columns="conditionalColumns"
          :show-reset="true"
          @submit="handleConditionalSubmit"
        />
      </Col>
      <Col :span="12">
        <h5>复杂条件显示</h5>
        <StdForm
          :key="`complex-${complexFormKey}`"
          :columns="complexConditionalColumns"
          :show-reset="true"
          @submit="handleComplexSubmit"
        />
      </Col>
    </Row>
  </div>
</template>

<style scoped>
h4 {
  margin: 16px 0;
  color: #1890ff;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

h5 {
  margin: 12px 0;
  color: #666;
  font-weight: 500;
}

:deep(.ant-form) {
  margin-top: 16px;
}
</style>
