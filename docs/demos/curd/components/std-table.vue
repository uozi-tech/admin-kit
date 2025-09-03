<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdTable } from '@uozi-admin/curd'
import { Tag } from 'ant-design-vue'
import { h } from 'vue'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
    fixed: 'left',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ value }) =>
      h(Tag, {
        color: value === 1 ? 'green' : 'red',
      }, () => value === 1 ? '启用' : '禁用'),
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 150,
    customRender: ({ value }) =>
      value?.map(role => h(Tag, { color: 'blue', key: role }, () => role)),
  },
  {
    title: '最后活跃',
    dataIndex: 'last_active',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
    fixed: 'right',
  },
]
</script>

<template>
  <div>
    <h3>StdTable 组件示例</h3>
    <StdTable
      :get-list-api="userApi.getList"
      :columns="columns"
      :scroll="{ x: 1000 }"
      row-key="id"
    />
  </div>
</template>
