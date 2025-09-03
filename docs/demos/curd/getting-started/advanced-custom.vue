<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { Tag } from 'ant-design-vue'
import { h } from 'vue'
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
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    customRender: ({ value }) =>
      h('img', { src: value, style: 'width: 32px; height: 32px; border-radius: 50%;' }),
    edit: {
      type: 'upload',
      upload: {
        accept: 'image/*',
        maxCount: 1,
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) =>
      h(Tag, { color: value === 1 ? 'green' : 'red' }, () => value === 1 ? '启用' : '禁用'),
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
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑者', value: 'editor' },
          { label: '查看者', value: 'viewer' },
        ],
      },
    },
  },
]
</script>

<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
    :table-props="{
      rowSelection: { type: 'checkbox' },
      scroll: { x: 800 },
    }"
  />
</template>
