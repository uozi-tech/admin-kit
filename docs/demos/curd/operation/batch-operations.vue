<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { datetimeRender, maskRender, StdCurd } from '@uozi-admin/curd'
import { Button, message } from 'ant-design-vue'
import { h, ref } from 'vue'
import { userApi } from '../mock/userApi'

enum UserStatus {
  Active = 1,
  Ban = -1,
}

const UserStatusMask = {
  [UserStatus.Active]: '激活',
  [UserStatus.Ban]: '禁用',
}

const selectedRowKeys = ref([])

const columns: StdTableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
      formItem: { required: true },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: { required: true },
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    search: true,
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
        options: [
          { label: '激活', value: UserStatus.Active },
          { label: '禁用', value: UserStatus.Ban },
        ],
      },
    },
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '激活', value: UserStatus.Active },
          { label: '禁用', value: UserStatus.Ban },
        ],
      },
      formItem: { required: true },
    },
    batchEdit: true, // 支持批量编辑
    customRender: maskRender(UserStatusMask),
  },
  {
    title: '用户角色',
    dataIndex: 'role',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
          { label: '访客', value: 'guest' },
        ],
      },
      formItem: { required: true },
    },
    batchEdit: true, // 支持批量编辑
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
    },
    customRender: datetimeRender,
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]

// 批量操作函数
function handleBatchActivate() {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择用户')
    return
  }
  console.log('批量激活用户:', selectedRowKeys.value)
  message.success(`已激活 ${selectedRowKeys.value.length} 个用户`)
  selectedRowKeys.value = []
}

function handleBatchDeactivate() {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择用户')
    return
  }
  console.log('批量禁用用户:', selectedRowKeys.value)
  message.success(`已禁用 ${selectedRowKeys.value.length} 个用户`)
  selectedRowKeys.value = []
}

function handleBatchExport() {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择用户')
    return
  }
  console.log('批量导出用户:', selectedRowKeys.value)
  message.success(`正在导出 ${selectedRowKeys.value.length} 个用户数据`)
}

function handleBatchDelete() {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择用户')
    return
  }
  console.log('批量删除用户:', selectedRowKeys.value)
  message.success(`已删除 ${selectedRowKeys.value.length} 个用户`)
  selectedRowKeys.value = []
}

// 自定义批量操作按钮
function batchOperations() {
  return h('div', { style: 'display: flex; gap: 8px; margin-bottom: 16px;' }, [
    h(Button, {
      type: 'primary',
      size: 'small',
      disabled: selectedRowKeys.value.length === 0,
      onClick: handleBatchActivate,
    }, () => `批量激活 (${selectedRowKeys.value.length})`),

    h(Button, {
      size: 'small',
      disabled: selectedRowKeys.value.length === 0,
      onClick: handleBatchDeactivate,
    }, () => `批量禁用 (${selectedRowKeys.value.length})`),

    h(Button, {
      size: 'small',
      disabled: selectedRowKeys.value.length === 0,
      onClick: handleBatchExport,
    }, () => `批量导出 (${selectedRowKeys.value.length})`),

    h(Button, {
      danger: true,
      size: 'small',
      disabled: selectedRowKeys.value.length === 0,
      onClick: handleBatchDelete,
    }, () => `批量删除 (${selectedRowKeys.value.length})`),
  ])
}
</script>

<template>
  <StdCurd
    v-model:selected-row-keys="selectedRowKeys"
    :columns="columns"
    :api="userApi"
    disable-router-query
    scroll-x="max-content"
    row-selection-type="checkbox"
    row-key="id"
    :table-extra-render="batchOperations"
  />
</template>
