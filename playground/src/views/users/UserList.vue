<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { h } from 'vue'
import { userApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
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
    title: '状态',
    dataIndex: 'active',
    edit: {
      type: 'switch',
      switch: { checkedChildren: '启用', unCheckedChildren: '禁用' },
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      upload: {
        listType: 'picture-card',
        maxCount: 1,
        accept: 'image/*',
      },
    },
    customRender: ({ text }) => text ? h('img', { src: text, style: 'width: 40px; height: 40px; border-radius: 50%;' }) : '-',
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]
</script>

<template>
  <StdCurd
    :api="userApi"
    :columns="columns"
    row-key="id"
  />
</template>
