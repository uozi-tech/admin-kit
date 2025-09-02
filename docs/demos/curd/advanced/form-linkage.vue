<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    search: true,
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '个人用户', value: 'individual' },
          { label: '企业用户', value: 'company' },
        ],
      },
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    edit: {
      type: 'input',
      formItem: {
        rules: [
          {
            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/i,
            message: '请输入有效的身份证号码',
          },
        ],
      },
      showInForm: ({ formData }) => formData.userType === 'individual',
    },
  },
  {
    title: '企业名称',
    dataIndex: 'companyName',
    edit: {
      type: 'input',
      showInForm: ({ formData }) => formData.userType === 'company',
      formItem: {
        required: ({ formData }) => formData.userType === 'company',
      },
    },
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'businessLicense',
    edit: {
      type: 'input',
      showInForm: ({ formData }) => formData.userType === 'company',
      formItem: {
        rules: [
          {
            pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
            message: '请输入有效的统一社会信用代码',
          },
        ],
      },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { type: 'email', message: '请输入有效的邮箱地址' },
        ],
      },
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号码',
          },
        ],
      },
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
    :columns="columns"
    :api="userApi"
    disable-router-query
    scroll-x="max-content"
  />
</template>
