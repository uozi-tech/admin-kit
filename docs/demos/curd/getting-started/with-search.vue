<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { type: 'input' }, // 👈 添加搜索
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    }, // 👈 下拉搜索
  },
  { title: '邮箱', dataIndex: 'email' },
  { title: '创建时间', dataIndex: 'created_at' },
]
</script>

<template>
  <StdCurd
    :api="userApi"
    :columns="columns"
  />
</template>
