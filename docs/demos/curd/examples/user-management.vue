<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { datetimeRender, StdCurd } from '@uozi-admin/curd'
import { Avatar, Tag } from 'ant-design-vue'
import { h } from 'vue'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    customRender: ({ value }) =>
      h(Avatar, { src: value, size: 40 }),
    edit: {
      type: 'upload',
      upload: {
        accept: 'image/*',
      },
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    search: {
      type: 'input',
      placeholder: '请输入用户名',
    },
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名不能超过20个字符' },
        ],
      },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: {
      type: 'input',
      placeholder: '请输入邮箱',
    },
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { type: 'email', message: '请输入正确的邮箱格式' },
        ],
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    customRender: ({ value }) =>
      value?.map(role => h(Tag, { color: 'blue', key: role }, () => role)),
    search: {
      type: 'select',
      select: {
        mode: 'multiple',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑者', value: 'editor' },
          { label: '查看者', value: 'viewer' },
        ],
      },
    },
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
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) =>
      h(Tag, {
        color: value === 1 ? 'green' : 'red',
      }, () => value === 1 ? '启用' : '禁用'),
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
    },
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
      placeholder: ['开始日期', '结束日期'],
    },
    customRender: datetimeRender,
  },
  {
    title: '操作',
    dataIndex: 'actions',
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
