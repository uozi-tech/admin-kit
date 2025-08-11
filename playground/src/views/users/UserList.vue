<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { h, ref } from 'vue'
import { userApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: () =>
      '姓名',
    dataIndex: 'name',
    search: {
      formItem: {
        name: 'name_fz',
      },
    },
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
      col: { span: 12 },
    },
    hiddenInTable: true,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    search: true,
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
      col: { span: 12 },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
      col: { span: 12 },
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    search: true,
    edit: {
      type: 'select',
      select: { options: [{ label: '男', value: 1 }, { label: '女', value: -1 }] },
      formItem: { rules: [{ required: true }] },
    },
    batchEdit: true,
  },
  {
    title: '角色',
    dataIndex: 'role',
    search: true,
    edit: {
      type: 'select',
      select: { options: [{ label: '管理员', value: 1 }, { label: '普通用户', value: -1 }] },
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
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      formItem: { required: true },
      upload: {
        multiple: true,
      },
    },
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]

const selectedRowKeys = ref<any[]>([])
const visible = ref(false)
</script>

<template>
  <StdCurd
    v-model:selected-row-keys="selectedRowKeys"
    :api="userApi"
    :columns="columns"
    row-selection-type="checkbox"
    row-key="id"
    row-draggable
    :before-save="f => {
      console.log(f)
      return true
    }"
    :delete-confirm-config="{
      mode: 'modal',
      confirmText: 'DELETE',
      modalTitle: '删除用户',
      modalDescription: '此操作无法撤销。请输入 {confirmText} 来确认删除。',
    }"
    :search-form-extra-render="() => {
      return h('div')
    }"
  />
</template>
