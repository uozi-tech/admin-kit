<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '日期选择',
    dataIndex: 'date',
    edit: {
      type: 'date',
      placeholder: '请选择日期',
    },
  },
  {
    title: '日期范围',
    dataIndex: 'date_range',
    edit: {
      type: 'dateRange',
      placeholder: ['开始日期', '结束日期'],
    },
  },
  {
    title: '时间选择',
    dataIndex: 'time',
    edit: {
      type: 'time',
      placeholder: '请选择时间',
    },
  },
  {
    title: '日期时间',
    dataIndex: 'datetime',
    edit: {
      type: 'datetime',
      placeholder: '请选择日期时间',
      showTime: true,
    },
  },
  {
    title: '月份选择',
    dataIndex: 'month',
    edit: {
      type: 'month',
      placeholder: '请选择月份',
    },
  },
  {
    title: '年份选择',
    dataIndex: 'year',
    edit: {
      type: 'year',
      placeholder: '请选择年份',
    },
  },
  {
    title: '周选择',
    dataIndex: 'week',
    edit: {
      type: 'week',
      placeholder: '请选择周',
    },
  },
]

function handleSuccess(data) {
  console.log('表单提交成功:', data)
}
</script>

<template>
  <div style="max-width: 600px; margin: 0 auto;">
    <h3>日期时间控件示例</h3>
    <StdForm
      :api="userApi"
      :columns="columns"
      @success="handleSuccess"
    />
  </div>
</template>
