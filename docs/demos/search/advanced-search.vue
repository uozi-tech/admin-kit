<script setup lang="ts">
import { datetimeRender, maskRender, StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

enum UserStatus {
  Active = 1,
  Ban = -1,
  Pending = 0,
}

const UserStatusMask = {
  [UserStatus.Active]: '激活',
  [UserStatus.Ban]: '禁用',
  [UserStatus.Pending]: '待审核',
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    search: {
      type: 'input',
      input: {
        placeholder: '请输入姓名进行模糊搜索',
        allowClear: true,
      },
      formItem: {
        label: '用户姓名',
        help: '支持模糊匹配',
      },
    },
    edit: {
      type: 'input',
      formItem: { required: true },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: {
      type: 'input',
      input: {
        placeholder: '请输入邮箱地址',
        allowClear: true,
      },
      formItem: {
        label: '邮箱地址',
        rules: [{ type: 'email', message: '请输入有效的邮箱地址' }],
      },
    },
    edit: {
      type: 'input',
      formItem: { required: true },
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    search: {
      type: 'input',
      input: {
        placeholder: '请输入手机号',
        allowClear: true,
      },
      formItem: {
        label: '手机号码',
      },
    },
    edit: {
      type: 'input',
      formItem: { required: true },
    },
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        placeholder: '请选择用户状态',
        options: [
          { label: '全部', value: '' },
          { label: '激活', value: UserStatus.Active },
          { label: '禁用', value: UserStatus.Ban },
          { label: '待审核', value: UserStatus.Pending },
        ],
        allowClear: true,
      },
      formItem: {
        label: '状态筛选',
      },
    },
    edit: {
      type: 'select',
      select: {
        options: Object.entries(UserStatusMask).map(([value, label]) => ({
          label,
          value: Number(value),
        })),
      },
      formItem: { required: true },
    },
    customRender: maskRender(UserStatusMask),
  },
  {
    title: '年龄范围',
    dataIndex: 'age',
    search: {
      type: 'inputNumber',
      inputNumber: {
        min: 0,
        max: 150,
        placeholder: '年龄',
      },
      formItem: {
        label: '年龄筛选',
        help: '输入具体年龄进行精确匹配',
      },
    },
    edit: {
      type: 'inputNumber',
      inputNumber: { min: 0, max: 150 },
    },
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
      dateRange: {
        format: 'YYYY-MM-DD',
        placeholder: ['开始日期', '结束日期'],
      },
      formItem: {
        label: '注册时间范围',
        name: ['created_start', 'created_end'],
      },
    },
    customRender: datetimeRender,
  },
  {
    title: '最后活跃时间',
    dataIndex: 'last_active',
    search: {
      type: 'datetimeRange',
      datetimeRange: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
      },
      formItem: {
        label: '活跃时间范围',
        name: ['active_start', 'active_end'],
      },
    },
    customRender: datetimeRender,
    hiddenInEdit: true,
  },
  {
    title: '用户标签',
    dataIndex: 'tags',
    search: {
      type: 'select',
      select: {
        mode: 'multiple',
        placeholder: '请选择标签',
        options: [
          { label: 'VIP用户', value: 'vip' },
          { label: '新用户', value: 'new' },
          { label: '活跃用户', value: 'active' },
          { label: '高价值用户', value: 'high-value' },
        ],
        allowClear: true,
      },
      formItem: {
        label: '标签筛选',
        help: '可选择多个标签进行组合筛选',
      },
    },
    hiddenInTable: true,
    hiddenInEdit: true,
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
    :search-form-props="{
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }"
  />
</template>
