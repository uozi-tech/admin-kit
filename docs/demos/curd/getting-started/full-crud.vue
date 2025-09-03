<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { type: 'input' },
    edit: {
      type: 'input',
      formItem: {
        required: true,
      },
    }, // 👈 添加表单配置
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { type: 'email', message: '请输入正确的邮箱格式' },
        ],
      },
    }, // 👈 添加验证规则
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
    edit: {
      type: 'switch',
      switch: {
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        defaultValue: 1,
      },
    }, // 👈 表单使用开关控件
  },
  { title: '创建时间', dataIndex: 'created_at' },
]
</script>

<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
  />
</template>
