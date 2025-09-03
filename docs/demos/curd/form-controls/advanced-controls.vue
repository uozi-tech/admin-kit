<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '文件上传',
    dataIndex: 'upload',
    edit: {
      type: 'upload',
      action: '/api/upload',
      accept: 'image/*',
      maxCount: 3,
      listType: 'picture-card',
    },
  },
  {
    title: '评分',
    dataIndex: 'rate',
    edit: {
      type: 'rate',
      allowHalf: true,
      count: 5,
    },
  },
  {
    title: '滑块',
    dataIndex: 'slider',
    edit: {
      type: 'slider',
      min: 0,
      max: 100,
      marks: {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: '100°C',
      },
    },
  },
]

function handleSuccess(data) {
  console.log('表单提交成功:', data)
}
</script>

<template>
  <div style="max-width: 600px; margin: 0 auto;">
    <h3>高级表单控件示例</h3>
    <StdForm
      :api="userApi"
      :columns="columns"
      @success="handleSuccess"
    />
  </div>
</template>
