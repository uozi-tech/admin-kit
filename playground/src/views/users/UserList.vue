<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    search: {
      formItem: {
        name: 'name_fz',
      },
    },
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    search: true,
    edit: {
      type: 'inputNumber',
      formItem: { rules: [{ type: 'number', min: 0, max: 150 }] },
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    edit: {
      type: 'password',
      formItem: { rules: [{ required: true }] },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: true,
    edit: {
      type: 'select',
      select: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: -1 }] },
      formItem: { rules: [{ required: true }] },
    },
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]
</script>

<template>
  <StdCurd
    hide-header
    :api="userApi"
    :columns="columns"
    row-key="id"
  >
    <template #beforeSearch>
      <Button>
        按钮
      </Button>
    </template>
    <template #beforeTable>
      <Button>
        按钮
      </Button>
    </template>
  </StdCurd>
</template>
