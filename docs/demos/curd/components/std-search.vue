<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdSearch } from '@uozi-admin/curd'
import { ref } from 'vue'

const searchValue = ref({})

const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: {
      type: 'input',
      placeholder: '请输入用户名',
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: {
      type: 'input',
      placeholder: '请输入邮箱',
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      placeholder: '请选择状态',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    search: {
      type: 'select',
      mode: 'multiple',
      placeholder: '请选择角色',
      select: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑者', value: 'editor' },
          { label: '查看者', value: 'viewer' },
        ],
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
      placeholder: ['开始日期', '结束日期'],
    },
  },
]

function handleSearch(values) {
  searchValue.value = values
}

function handleReset() {
  searchValue.value = {}
}
</script>

<template>
  <div>
    <h3>StdSearch 组件示例</h3>
    <StdSearch
      v-model:data="searchValue"
      :columns="columns"
      @search="handleSearch"
      @reset="handleReset"
    />

    <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 6px;">
      <h4>当前搜索值:</h4>
      <pre>{{ JSON.stringify(searchValue, null, 2) }}</pre>
    </div>
  </div>
</template>
