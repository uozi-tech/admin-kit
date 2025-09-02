<script setup lang="ts">
import { StdCurd, datetimeRender } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'
import { computed } from 'vue'

// 根据屏幕尺寸动态调整列配置
const columns = computed(() => [
  {
    title: '姓名',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
      formItem: { required: true },
    },
    width: 120,
    fixed: 'left', // 在小屏幕上固定左侧
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: { required: true },
    },
    width: 200,
    responsive: ['md'], // 只在中等屏幕以上显示
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    search: true,
    edit: {
      type: 'input',
      formItem: { required: true },
    },
    width: 140,
    responsive: ['sm'], // 只在小屏幕以上显示
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '激活', value: 1 },
          { label: '禁用', value: -1 },
        ],
      },
    },
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '激活', value: 1 },
          { label: '禁用', value: -1 },
        ],
      },
      formItem: { required: true },
    },
    width: 80,
    customRender: ({ value }) => value === 1 ? '激活' : '禁用',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    edit: {
      type: 'inputNumber',
      inputNumber: { min: 0, max: 150 },
    },
    width: 80,
    responsive: ['lg'], // 只在大屏幕以上显示
  },
  {
    title: '角色',
    dataIndex: 'role',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '用户', value: 'user' },
        ],
      },
    },
    width: 100,
    responsive: ['lg'], // 只在大屏幕以上显示
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
    },
    customRender: datetimeRender,
    width: 160,
    responsive: ['xl'], // 只在超大屏幕显示
  },
  {
    title: '最后活跃',
    dataIndex: 'last_active',
    customRender: datetimeRender,
    hiddenInEdit: true,
    width: 160,
    responsive: ['xxl'], // 只在极大屏幕显示
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 150,
    fixed: 'right', // 在小屏幕上固定右侧
  },
])
</script>

<template>
  <StdCurd
    :columns="columns"
    :api="userApi"
    disable-router-query
    :scroll="{ x: 'max-content' }"
    :table-props="{
      size: 'small',
    }"
    :search-form-props="{
      layout: 'vertical',
    }"
  />
</template>

<style scoped>
/* 移动端优化样式 */
@media (max-width: 768px) {
  :deep(.ant-table-thead > tr > th) {
    font-size: 12px;
    padding: 8px 4px;
  }
  
  :deep(.ant-table-tbody > tr > td) {
    font-size: 12px;
    padding: 8px 4px;
  }
  
  :deep(.ant-form-item) {
    margin-bottom: 8px;
  }
}

/* 平板端优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.ant-table-thead > tr > th) {
    font-size: 13px;
  }
  
  :deep(.ant-table-tbody > tr > td) {
    font-size: 13px;
  }
}
</style>