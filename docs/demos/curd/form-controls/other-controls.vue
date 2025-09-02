<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Alert, Button, Card, Divider, message, Space } from 'ant-design-vue'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({
  // 数字输入框
  number: undefined,

  // 滑块
  slider: 50,

  // 开关
  switch: true,

  // 评分
  rate: 0,

  // 多行文本
  textarea: '',

  // 单选框组
  radioGroup: '',

  // 多选框组
  checkboxGroup: [],

  // 级联选择
  cascader: [],

  // 自动完成
  autoComplete: '',

  // 文件上传
  upload: [],

  // 颜色选择器
  colorPicker: '#1890ff',
})

// 级联选择器数据
const cascaderOptions = [
  {
    value: 'frontend',
    label: '前端开发',
    children: [
      {
        value: 'vue',
        label: 'Vue.js',
        children: [
          { value: 'vue2', label: 'Vue 2' },
          { value: 'vue3', label: 'Vue 3' },
        ],
      },
      {
        value: 'react',
        label: 'React',
        children: [
          { value: 'react16', label: 'React 16' },
          { value: 'react17', label: 'React 17' },
          { value: 'react18', label: 'React 18' },
        ],
      },
    ],
  },
  {
    value: 'backend',
    label: '后端开发',
    children: [
      {
        value: 'nodejs',
        label: 'Node.js',
        children: [
          { value: 'express', label: 'Express' },
          { value: 'koa', label: 'Koa' },
          { value: 'nest', label: 'NestJS' },
        ],
      },
      {
        value: 'java',
        label: 'Java',
        children: [
          { value: 'spring', label: 'Spring' },
          { value: 'springboot', label: 'Spring Boot' },
        ],
      },
    ],
  },
]

// 自动完成数据源
const autoCompleteOptions = [
  { value: 'gmail.com' },
  { value: 'outlook.com' },
  { value: 'yahoo.com' },
  { value: 'hotmail.com' },
  { value: 'qq.com' },
  { value: '163.com' },
  { value: '126.com' },
]

// 表单列配置
const columns: StdTableColumn[] = [
  {
    title: '数字输入',
    dataIndex: 'number',
    edit: {
      type: 'inputNumber',
      formItem: {
        help: '只允许输入数字',
      },
      inputNumber: {
        min: 0,
        max: 100,
        step: 1,
        placeholder: '请输入数字',
      },
    },
  },
  {
    title: '滑块',
    dataIndex: 'slider',
    edit: {
      type: 'slider',
      formItem: {
        help: '拖拽滑块选择数值',
      },
      slider: {
        min: 0,
        max: 100,
        marks: {
          0: '0',
          25: '25',
          50: '50',
          75: '75',
          100: '100',
        },
      },
    },
  },
  {
    title: '开关',
    dataIndex: 'switch',
    edit: {
      type: 'switch',
      formItem: {
        help: '开关控制状态',
      },
      switch: {
        checkedChildren: '开启',
        unCheckedChildren: '关闭',
      },
    },
  },
  {
    title: '评分',
    dataIndex: 'rate',
    edit: {
      type: 'rate',
      formItem: {
        help: '点击星星进行评分',
      },
      rate: {
        allowHalf: true,
        count: 5,
      },
    },
  },
  {
    title: '多行文本',
    dataIndex: 'textarea',
    edit: {
      type: 'textarea',
      formItem: {
        help: '支持多行文本输入',
      },
      textarea: {
        placeholder: '请输入多行文本',
        rows: 4,
        maxlength: 500,
        showCount: true,
      },
    },
  },
  {
    title: '单选框组',
    dataIndex: 'radioGroup',
    edit: {
      type: 'radioGroup',
      formItem: {
        help: '单选择项目',
      },
      radioGroup: {
        options: [
          { label: '选项一', value: 'option1' },
          { label: '选项二', value: 'option2' },
          { label: '选项三', value: 'option3' },
        ],
      },
    },
  },
  {
    title: '多选框组',
    dataIndex: 'checkboxGroup',
    edit: {
      type: 'checkboxGroup',
      formItem: {
        help: '可以选择多个选项',
      },
      checkboxGroup: {
        options: [
          { label: 'JavaScript', value: 'js' },
          { label: 'TypeScript', value: 'ts' },
          { label: 'Vue.js', value: 'vue' },
          { label: 'React', value: 'react' },
        ],
      },
    },
  },
  {
    title: '级联选择',
    dataIndex: 'cascader',
    search: true,
    edit: {
      type: 'cascader',
      formItem: {
        help: '多级选择器',
      },
      cascader: {
        options: cascaderOptions,
        placeholder: '请选择技术栈',
      },
    },
  },
  {
    title: '文件上传',
    dataIndex: 'upload',
    edit: {
      type: 'upload',
      formItem: {
        help: '支持文件上传',
      },
      upload: {
        action: '/api/upload',
        listType: 'text',
        multiple: true,
        beforeUpload: () => {
          message.info('这是演示环境，不会真实上传文件')
          return false // 阻止真实上传
        },
      },
    },
  },
]

// 表单引用
const formRef = ref()

// 重置表单
function handleReset() {
  formData.value = {
    number: undefined,
    slider: 50,
    switch: true,
    rate: 0,
    textarea: '',
    radioGroup: '',
    checkboxGroup: [],
    cascader: [],
    autoComplete: '',
    upload: [],
    colorPicker: '#1890ff',
  }
  message.info('表单已重置')
}

// 填充示例数据
function fillSampleData() {
  formData.value = {
    number: 42,
    slider: 75,
    switch: false,
    rate: 4.5,
    textarea: '这是一段示例文本。\n支持多行输入。\n可以输入比较长的内容。',
    radioGroup: 'option2',
    checkboxGroup: ['js', 'vue'],
    cascader: ['frontend', 'vue', 'vue3'],
    autoComplete: 'user@gmail.com',
    upload: [],
    colorPicker: '#ff4d4f',
  }
  message.success('已填充示例数据')
}

// 显示表单数据
function showFormData() {
  console.log('当前表单数据:', formData.value)
  message.info('表单数据已输出到控制台')
}
</script>

<template>
  <div>
    <Alert
      message="其他表单控件演示"
      description="展示数字输入、滑块、开关、评分、文本域、单选/多选框组、级联选择、自动完成、文件上传等控件。"
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
        <Button @click="handleReset">
          重置表单
        </Button>
        <Button
          type="dashed"
          @click="fillSampleData"
        >
          填充示例数据
        </Button>
        <Button
          type="primary"
          @click="showFormData"
        >
          查看数据
        </Button>
      </Space>
    </Card>

    <!-- 表单 -->
    <Card title="其他表单控件展示">
      <StdForm
        ref="formRef"
        v-model:data="formData"
        :columns="columns"
        label-align="right"
        layout="vertical"
      />
    </Card>

    <!-- 配置说明 -->
    <Card
      title="配置参数说明"
      size="small"
      style="margin-top: 16px;"
    >
      <div style="line-height: 1.6;">
        <h4>数值类控件:</h4>
        <ul>
          <li><code>number</code>: 数字输入框，支持 min、max、step 等属性</li>
          <li><code>slider</code>: 滑块，支持范围、刻度、步长等配置</li>
          <li><code>rate</code>: 评分组件，支持半星、自定义数量等</li>
        </ul>

        <Divider />

        <h4>状态类控件:</h4>
        <ul>
          <li><code>switch</code>: 开关，支持自定义开启/关闭文案</li>
          <li><code>radioGroup</code>: 单选框组，从多个选项中选择一个</li>
          <li><code>checkboxGroup</code>: 多选框组，可以选择多个选项</li>
        </ul>

        <Divider />

        <h4>文本类控件:</h4>
        <ul>
          <li><code>textarea</code>: 多行文本输入，支持行数、字数统计等</li>
          <li><code>autoComplete</code>: 自动完成输入框，提供输入建议</li>
        </ul>

        <Divider />

        <h4>选择类控件:</h4>
        <ul>
          <li><code>cascader</code>: 级联选择器，多级分类选择</li>
        </ul>

        <Divider />

        <h4>文件类控件:</h4>
        <ul>
          <li><code>upload</code>: 文件上传，支持多文件、拖拽等</li>
        </ul>

        <div style="margin-top: 12px; padding: 8px; background: #f6f8fa; border-radius: 4px;">
          <strong>提示:</strong> 每个控件的详细配置参数请参考对应的 Ant Design Vue 组件文档。
        </div>
      </div>
    </Card>

    <!-- 表单数据预览 -->
    <Card
      title="表单数据预览"
      size="small"
      style="margin-top: 16px;"
    >
      <pre style="background: #f6f8fa; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 12px;">{{ JSON.stringify(formData, null, 2) }}</pre>
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

:deep(.ant-form-item-explain) {
  font-size: 12px;
  color: #666;
}

pre {
  margin: 0;
  line-height: 1.4;
}
</style>
