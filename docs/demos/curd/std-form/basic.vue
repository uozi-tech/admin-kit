<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Alert, Button, Card, message, Space } from 'ant-design-vue'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({
  username: '',
  email: '',
  phone: '',
  age: null,
  status: 1,
  bio: '',
  gender: '',
  birthday: null,
  interests: [],
})

// 基础表单列配置
const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 20, message: '用户名长度在 3-20 个字符' },
        ],
      },
      input: {
        placeholder: '请输入用户名',
        maxlength: 20,
        allowClear: true,
      },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确的邮箱格式' },
        ],
      },
      input: {
        placeholder: '请输入邮箱地址',
        allowClear: true,
      },
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' },
        ],
      },
      input: {
        placeholder: '请输入手机号',
        maxlength: 11,
      },
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    edit: {
      type: 'inputNumber',
      formItem: {
        required: true,
      },
      number: {
        min: 18,
        max: 100,
        placeholder: '请输入年龄',
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'select',
      formItem: {
        required: true,
      },
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        placeholder: '请选择状态',
      },
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    edit: {
      type: 'radioGroup',
      formItem: {
        required: true,
      },
      radioGroup: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    },
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    edit: {
      type: 'date',
      date: {
        placeholder: '请选择生日',
        format: 'YYYY-MM-DD',
      },
    },
  },
  {
    title: '兴趣爱好',
    dataIndex: 'interests',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '阅读', value: 'reading' },
          { label: '运动', value: 'sports' },
          { label: '音乐', value: 'music' },
          { label: '旅行', value: 'travel' },
          { label: '编程', value: 'coding' },
        ],
      },
    },
  },
  {
    title: '个人简介',
    dataIndex: 'bio',
    edit: {
      type: 'textarea',
      textarea: {
        placeholder: '请输入个人简介',
        maxlength: 200,
        showCount: true,
        rows: 4,
      },
    },
  },
]

// 自定义表单行属性
const formRowProps = {
  gutter: 16,
  justify: 'start',
  align: 'top',
}

// 表单引用
const formRef = ref()

// 保存表单
function handleSave() {
  formRef.value?.validate().then(() => {
    console.log('表单数据:', formData.value)
    message.success('表单保存成功！')
  }).catch((error) => {
    console.error('表单验证失败:', error)
    message.error('请检查表单输入')
  })
}

// 重置表单
function handleReset() {
  formData.value = {
    username: '',
    email: '',
    phone: '',
    age: null,
    status: 1,
    bio: '',
    gender: '',
    birthday: null,
    interests: [],
  }
  message.info('表单已重置')
}

// 填充示例数据
function fillSampleData() {
  formData.value = {
    username: 'johnsmith',
    email: 'john.smith@example.com',
    phone: '13812345678',
    age: 28,
    status: 1,
    gender: 'male',
    birthday: '1995-06-15',
    interests: ['reading', 'coding', 'travel'],
    bio: '热爱技术的软件工程师，喜欢阅读和旅行。',
  }
  message.success('已填充示例数据')
}
</script>

<template>
  <div>
    <Alert
      message="StdForm 基础表单演示"
      description="这个示例展示了 StdForm 组件的基础用法，包含各种表单控件、验证规则和布局配置。"
      type="info"
      show-icon
      style="margin-bottom: 16px;"
    />

    <!-- 操作按钮 -->
    <Card
      size="small"
      style="margin-bottom: 16px;"
    >
      <Space>
        <Button
          type="primary"
          @click="handleSave"
        >
          保存表单
        </Button>
        <Button @click="handleReset">
          重置表单
        </Button>
        <Button
          type="dashed"
          @click="fillSampleData"
        >
          填充示例数据
        </Button>
      </Space>
    </Card>

    <!-- 表单 -->
    <Card title="用户信息表单">
      <StdForm
        ref="formRef"
        v-model:data="formData"
        :columns="columns"
        label-align="right"
        :form-row-props="formRowProps as any"
        layout="vertical"
      />
    </Card>

    <!-- 表单数据预览 -->
    <Card
      title="表单数据预览"
      size="small"
      style="margin-top: 16px;"
    >
      <pre style="background: #f6f8fa; padding: 12px; border-radius: 4px; overflow-x: auto;">{{ JSON.stringify(formData, null, 2) }}</pre>
    </Card>

    <!-- 功能说明 -->
    <Card
      title="功能特性"
      size="small"
      style="margin-top: 16px;"
    >
      <div style="line-height: 1.6;">
        <h4>包含的表单控件:</h4>
        <ul>
          <li><strong>输入框 (Input)</strong>: 用户名、邮箱、手机号</li>
          <li><strong>数字输入 (Number)</strong>: 年龄</li>
          <li><strong>选择器 (Select)</strong>: 状态</li>
          <li><strong>单选框组 (RadioGroup)</strong>: 性别</li>
          <li><strong>多选框组 (CheckboxGroup)</strong>: 兴趣爱好</li>
          <li><strong>日期选择 (Date)</strong>: 生日</li>
          <li><strong>文本域 (Textarea)</strong>: 个人简介</li>
        </ul>

        <h4>验证规则:</h4>
        <ul>
          <li>必填项验证</li>
          <li>长度限制验证</li>
          <li>邮箱格式验证</li>
          <li>手机号格式验证</li>
          <li>数字范围验证</li>
        </ul>
      </div>
    </Card>
  </div>
</template>

<style scoped>
:deep(.ant-card-head) {
  min-height: auto;
}

:deep(.ant-card-body) {
  padding: 16px;
}

:deep(.ant-form-item-label) {
  font-weight: 500;
}

pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}
</style>
