<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Alert, Button, Card, Divider, message, Space } from 'ant-design-vue'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({
  // 基础日期选择器
  basicDate: null,

  // 日期时间选择器
  datetime: null,

  // 时间选择器
  time: null,

  // 年份选择器
  year: null,

  // 月份选择器
  month: null,

  // 周选择器
  week: null,

  // 日期范围选择器
  dateRange: [],

  // 日期时间范围选择器
  datetimeRange: [],

  // 时间范围选择器
  timeRange: [],

  // 月份范围选择器
  monthRange: [],

  // 年份范围选择器
  yearRange: [],

  // 周范围选择器
  weekRange: [],

  // 自定义格式
  customFormat: null,

  // 禁用日期
  disabledDate: null,

  // 大尺寸
  largeDate: null,

  // 小尺寸
  smallDate: null,
})

// 禁用日期函数 - 禁用今天之前的日期
function disabledDateFunc(current) {
  return current && current < new Date().setHours(0, 0, 0, 0)
}

// 表单列配置
const columns: StdTableColumn[] = [
  {
    title: '基础日期选择',
    dataIndex: 'basicDate',
    edit: {
      type: 'date',
      formItem: {
        help: '基础的日期选择功能',
      },
      date: {
        placeholder: '请选择日期',
        format: 'YYYY-MM-DD',
      },
    },
  },
  {
    title: '日期时间选择',
    dataIndex: 'datetime',
    edit: {
      type: 'datetime',
      formItem: {
        help: '可以选择日期和时间',
      },
      datetime: {
        placeholder: '请选择日期和时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
      },
    },
  },
  {
    title: '时间选择',
    dataIndex: 'time',
    edit: {
      type: 'time',
      formItem: {
        help: '只选择时间',
      },
      time: {
        placeholder: '请选择时间',
        format: 'HH:mm:ss',
      },
    },
  },
  {
    title: '年份选择',
    dataIndex: 'year',
    edit: {
      type: 'year',
      formItem: {
        help: '只选择年份',
      },
      year: {
        placeholder: '请选择年份',
      },
    },
  },
  {
    title: '月份选择',
    dataIndex: 'month',
    edit: {
      type: 'month',
      formItem: {
        help: '选择年月',
      },
      month: {
        placeholder: '请选择月份',
      },
    },
  },
  {
    title: '周选择',
    dataIndex: 'week',
    edit: {
      type: 'week',
      formItem: {
        help: '选择周',
      },
      week: {
        placeholder: '请选择周',
      },
    },
  },
  {
    title: '日期范围',
    dataIndex: 'dateRange',
    edit: {
      type: 'dateRange',
      formItem: {
        help: '选择一个日期范围',
      },
      dateRange: {
        placeholder: ['开始日期', '结束日期'],
      },
    },
  },
  {
    title: '日期时间范围',
    dataIndex: 'datetimeRange',
    edit: {
      type: 'datetimeRange',
      formItem: {
        help: '选择包含时间的日期范围',
      },
      datetimeRange: {
        placeholder: ['开始时间', '结束时间'],
      },
    },
  },
  {
    title: '时间范围',
    dataIndex: 'timeRange',
    edit: {
      type: 'timeRange',
      formItem: {
        help: '选择时间范围',
      },
      timeRange: {
        placeholder: ['开始时间', '结束时间'],
      },
    },
  },
  {
    title: '月份范围',
    dataIndex: 'monthRange',
    edit: {
      type: 'monthRange',
      formItem: {
        help: '选择月份范围',
      },
      monthRange: {
        placeholder: ['开始月份', '结束月份'],
      },
    },
  },
  {
    title: '年份范围',
    dataIndex: 'yearRange',
    edit: {
      type: 'yearRange',
      formItem: {
        help: '选择年份范围',
      },
      yearRange: {
        placeholder: ['开始年份', '结束年份'],
      },
    },
  },
  {
    title: '周范围',
    dataIndex: 'weekRange',
    edit: {
      type: 'weekRange',
      formItem: {
        help: '选择周范围',
      },
      weekRange: {
        placeholder: ['开始周', '结束周'],
      },
    },
  },
  {
    title: '自定义格式',
    dataIndex: 'customFormat',
    edit: {
      type: 'date',
      formItem: {
        help: '自定义日期显示格式',
      },
      date: {
        placeholder: '自定义格式：年/月/日',
        format: 'YYYY/MM/DD',
      },
    },
  },
  {
    title: '禁用日期',
    dataIndex: 'disabledDate',
    edit: {
      type: 'date',
      formItem: {
        help: '禁用今天之前的日期',
      },
      date: {
        placeholder: '不能选择过去日期',
        disabledDate: disabledDateFunc,
      },
    },
  },
  {
    title: '大尺寸',
    dataIndex: 'largeDate',
    edit: {
      type: 'date',
      formItem: {
        help: '大尺寸的日期选择器',
      },
      date: {
        placeholder: '大尺寸',
        size: 'large',
      },
    },
  },
  {
    title: '小尺寸',
    dataIndex: 'smallDate',
    edit: {
      type: 'date',
      formItem: {
        help: '小尺寸的日期选择器',
      },
      date: {
        placeholder: '小尺寸',
        size: 'small',
      },
    },
  },
]

// 表单引用
const formRef = ref()

// 重置表单
function handleReset() {
  formData.value = {
    basicDate: null,
    datetime: null,
    time: null,
    year: null,
    month: null,
    week: null,
    dateRange: [],
    datetimeRange: [],
    timeRange: [],
    monthRange: [],
    yearRange: [],
    weekRange: [],
    customFormat: null,
    disabledDate: null,
    largeDate: null,
    smallDate: null,
  }
  message.info('表单已重置')
}

// 填充示例数据
function fillSampleData() {
  formData.value = {
    basicDate: '2024-06-15',
    datetime: '2024-06-15 14:30:00',
    time: '14:30:00',
    year: '2024',
    month: '2024-06',
    week: '2024-24th',
    dateRange: ['2024-06-01', '2024-06-30'],
    datetimeRange: ['2024-06-01 09:00:00', '2024-06-30 18:00:00'],
    timeRange: ['09:00:00', '18:00:00'],
    monthRange: ['2024-01', '2024-12'],
    yearRange: ['2020', '2024'],
    weekRange: ['2024-1st', '2024-52nd'],
    customFormat: '2024-06-15',
    disabledDate: '2024-12-25',
    largeDate: '2024-06-15',
    smallDate: '2024-06-15',
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
      message="日期时间控件演示"
      description="展示各种日期时间选择器的配置选项，包括单日期、范围日期、时间选择等功能。"
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
    <Card title="日期时间控件展示">
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
        <h4>控件类型:</h4>
        <ul>
          <li><code>date</code>: 日期选择器</li>
          <li><code>datetime</code>: 日期时间选择器</li>
          <li><code>time</code>: 时间选择器</li>
          <li><code>year</code>: 年份选择器</li>
          <li><code>month</code>: 月份选择器</li>
          <li><code>week</code>: 周选择器</li>
        </ul>

        <Divider />

        <h4>范围选择器:</h4>
        <ul>
          <li><code>dateRange</code>: 日期范围选择器</li>
          <li><code>datetimeRange</code>: 日期时间范围选择器</li>
          <li><code>timeRange</code>: 时间范围选择器</li>
          <li><code>monthRange</code>: 月份范围选择器</li>
          <li><code>yearRange</code>: 年份范围选择器</li>
          <li><code>weekRange</code>: 周范围选择器</li>
        </ul>

        <Divider />

        <h4>常用属性:</h4>
        <ul>
          <li><code>placeholder</code>: 占位符文本（范围选择器为数组）</li>
          <li><code>format</code>: 日期格式化字符串</li>
          <li><code>showTime</code>: 是否显示时间选择（仅日期选择器）</li>
          <li><code>disabledDate</code>: 禁用日期的判断函数</li>
          <li><code>size</code>: 控件尺寸 (large | middle | small)</li>
        </ul>

        <Divider />

        <h4>格式化示例:</h4>
        <ul>
          <li><code>YYYY-MM-DD</code>: 2024-06-15</li>
          <li><code>YYYY/MM/DD</code>: 2024/06/15</li>
          <li><code>YYYY-MM-DD HH:mm:ss</code>: 2024-06-15 14:30:00</li>
          <li><code>HH:mm:ss</code>: 14:30:00</li>
          <li><code>YYYY</code>: 2024</li>
          <li><code>YYYY-MM</code>: 2024-06</li>
        </ul>

        <div style="margin-top: 12px; padding: 8px; background: #f6f8fa; border-radius: 4px;">
          <strong>提示:</strong> 所有 Ant Design Vue DatePicker 组件的属性都可以通过对应的配置项传递。
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
