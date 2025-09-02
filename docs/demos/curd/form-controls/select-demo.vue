<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Alert, Button, Card, Divider, message, Space } from 'ant-design-vue'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({
  // 基础选择器
  basicSelect: '',

  // 多选
  multipleSelect: [],

  // 可搜索
  searchableSelect: '',

  // 带清除按钮
  clearableSelect: '',

  // 标签模式
  tagSelect: [],

  // 远程数据
  remoteSelect: '',

  // 限制标签数量
  maxTagSelect: [],

  // 大尺寸
  largeSelect: '',

  // 小尺寸
  smallSelect: '',

  // 禁用状态
  disabledSelect: 'option1',

  // 加载状态
  loadingSelect: '',
})

// 基础选项数据
const basicOptions = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' },
  { label: '选项五', value: 'option5' },
]

// 多样化选项数据
const categoryOptions = [
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '移动开发', value: 'mobile' },
  { label: '数据分析', value: 'data' },
  { label: '产品设计', value: 'design' },
  { label: '项目管理', value: 'pm' },
]

// 技能选项
const skillOptions = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'node' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
]

// 模拟远程API
function remoteApi() {
  return Promise.resolve({
    data: [
      { id: 1, name: '北京市' },
      { id: 2, name: '上海市' },
      { id: 3, name: '广州市' },
      { id: 4, name: '深圳市' },
      { id: 5, name: '杭州市' },
    ],
  })
}

// 表单列配置
const columns: StdTableColumn[] = [
  {
    title: '基础选择器',
    dataIndex: 'basicSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '基础的下拉选择功能',
      },
      select: {
        options: basicOptions,
        placeholder: '请选择一个选项',
      },
    },
  },
  {
    title: '多选模式',
    dataIndex: 'multipleSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '可以选择多个选项',
      },
      select: {
        mode: 'multiple',
        options: categoryOptions,
        placeholder: '可以选择多个选项',
      },
    },
  },
  {
    title: '可搜索选择器',
    dataIndex: 'searchableSelect',
    search: true,
    edit: {
      type: 'select',
      formItem: {
        help: '可以输入关键字搜索选项',
      },
      select: {
        options: skillOptions,
        placeholder: '输入关键字搜索',
        optionFilterProp: 'label',
      },
    },
  },
  {
    title: '带清除按钮',
    dataIndex: 'clearableSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '可以快速清空已选择的内容',
      },
      select: {
        allowClear: true,
        options: basicOptions,
        placeholder: '选择后可清除',
      },
    },
  },
  {
    title: '标签模式',
    dataIndex: 'tagSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '可以输入自定义标签，也可选择预设选项',
      },
      select: {
        mode: 'tags',
        options: skillOptions,
        placeholder: '输入或选择标签',
      },
    },
  },
  {
    title: '远程数据',
    dataIndex: 'remoteSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '从API获取选项数据',
      },
      select: {
        remote: {
          api: remoteApi,
          valueKey: 'id',
          labelKey: 'name',
        },
        placeholder: '选项来自远程API',
      },
    },
  },
  {
    title: '限制标签数量',
    dataIndex: 'maxTagSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '最多显示3个标签，超出显示省略',
      },
      select: {
        mode: 'multiple',
        maxTagCount: 3,
        options: skillOptions,
        placeholder: '最多显示3个标签',
      },
    },
  },
  {
    title: '大尺寸选择器',
    dataIndex: 'largeSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '大尺寸的选择器',
      },
      select: {
        size: 'large',
        options: basicOptions,
        placeholder: '大尺寸选择器',
      },
    },
  },
  {
    title: '小尺寸选择器',
    dataIndex: 'smallSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '小尺寸的选择器',
      },
      select: {
        size: 'small',
        options: basicOptions,
        placeholder: '小尺寸选择器',
      },
    },
  },
  {
    title: '禁用状态',
    dataIndex: 'disabledSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '禁用状态不可操作',
      },
      select: {
        disabled: true,
        options: basicOptions,
      },
    },
  },
  {
    title: '加载状态',
    dataIndex: 'loadingSelect',
    edit: {
      type: 'select',
      formItem: {
        help: '显示加载状态',
      },
      select: {
        loading: true,
        options: basicOptions,
        placeholder: '加载中...',
      },
    },
  },
]

// 表单引用
const formRef = ref()

// 重置表单
function handleReset() {
  formData.value = {
    basicSelect: '',
    multipleSelect: [],
    searchableSelect: '',
    clearableSelect: '',
    tagSelect: [],
    remoteSelect: '',
    maxTagSelect: [],
    largeSelect: '',
    smallSelect: '',
    disabledSelect: 'option1',
    loadingSelect: '',
  }
  message.info('表单已重置')
}

// 填充示例数据
function fillSampleData() {
  formData.value = {
    basicSelect: 'option2',
    multipleSelect: ['frontend', 'backend'],
    searchableSelect: 'vue',
    clearableSelect: 'option3',
    tagSelect: ['js', 'vue', '自定义标签'],
    remoteSelect: 3,
    maxTagSelect: ['js', 'ts', 'vue', 'react', 'node'],
    largeSelect: 'option1',
    smallSelect: 'option4',
    disabledSelect: 'option1',
    loadingSelect: '',
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
      message="选择器控件演示"
      description="展示各种选择器的配置选项，包括单选、多选、搜索、标签模式、远程数据等功能。"
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
    <Card title="选择器控件展示">
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
        <h4>基础属性:</h4>
        <ul>
          <li><code>options</code>: 选项数据数组，格式 [{ label: string, value: any }]</li>
          <li><code>placeholder</code>: 占位符文本</li>
          <li><code>allowClear</code>: 是否显示清除按钮</li>
          <li><code>disabled</code>: 是否禁用</li>
          <li><code>loading</code>: 是否显示加载状态</li>
        </ul>

        <Divider />

        <h4>选择模式:</h4>
        <ul>
          <li><code>mode: undefined</code>: 单选模式（默认）</li>
          <li><code>mode: 'multiple'</code>: 多选模式</li>
          <li><code>mode: 'tags'</code>: 标签模式，可输入自定义标签</li>
        </ul>

        <Divider />

        <h4>搜索配置:</h4>
        <ul>
          <li><code>showSearch</code>: 是否可搜索</li>
          <li><code>optionFilterProp</code>: 搜索时过滤的选项属性</li>
        </ul>

        <Divider />

        <h4>远程数据:</h4>
        <ul>
          <li><code>remote.api</code>: 获取数据的API函数</li>
          <li><code>remote.valueKey</code>: 数据中作为value的字段名</li>
          <li><code>remote.labelKey</code>: 数据中作为label的字段名</li>
        </ul>

        <Divider />

        <h4>样式属性:</h4>
        <ul>
          <li><code>size</code>: 选择器尺寸 (large | middle | small)</li>
          <li><code>maxTagCount</code>: 多选模式下最大显示的标签数量</li>
        </ul>

        <div style="margin-top: 12px; padding: 8px; background: #f6f8fa; border-radius: 4px;">
          <strong>提示:</strong> 所有 Ant Design Vue Select 组件的属性都可以通过 <code>select</code> 配置项传递。
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
