<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'

const columns: StdTableColumn[] = [
  {
    title: '文件上传',
    dataIndex: 'upload',
    edit: {
      type: 'upload',
      upload: {
        action: '/api/upload',
        accept: 'image/*',
        maxCount: 3,
        listType: 'picture-card',
      },
    },
  },
  {
    title: '评分',
    dataIndex: 'rate',
    edit: {
      type: 'rate',
      rate: {
        allowHalf: true,
        count: 5,
      },
    },
  },
  {
    title: '滑块',
    dataIndex: 'slider',
    edit: {
      type: 'slider',
      slider: {
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
  },
]
</script>

<template>
  <div style="margin: 0 auto;">
    <h3>高级表单控件示例</h3>
    <StdForm :columns="columns" />
  </div>
</template>
