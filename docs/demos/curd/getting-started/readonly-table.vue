<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdTable } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

// 定义列配置
const columns: StdTableColumn[] = [
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status' },
  { title: '创建时间', dataIndex: 'created_at' },
]
</script>

<template>
  <StdTable
    :get-list-api="userApi.getList"
    :columns="columns"
    only-query
  />
</template>
