<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { ref } from 'vue'

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
    sorter: true,
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
      col: { span: 12 },
    },
  },
  {
    title: '日期范围',
    dataIndex: 'date_range',
    search: {
      type: 'dateRange',
    },
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
    title: '创建时间',
    dataIndex: 'created_at',
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]

const selectedRowKeys = ref<any[]>([])
const visible = ref(false)

const userApi = {
  getList: async () => {
    return {
      data: [{
        id: 1,
        name: '张三',
        mobile: '13800138000',
        email: 'zhangsan@example.com',
        gender: 1,
        role: 1,
        age: 20,
        password: '123456',
        status: 1,
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        created_at: '2021-01-01',
      }, {
        id: 2,
        name: '李四',
        mobile: '13800138001',
        email: 'lisi@example.com',
        gender: -1,
        role: -1,
        age: 21,
        password: '123456',
        status: -1,
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        created_at: '2021-01-02',
      }],
      pagination: {
        total: 0,
      },
    }
  },
}
</script>

<template>
  <StdCurd
    v-model:selected-row-keys="selectedRowKeys"
    :api="userApi"
    :columns="columns"
    row-selection-type="checkbox"
    row-key="id"
    row-draggable
  >
    <template #col-name="{ record }">
      <span class="text-red-500">{{ record.name }}</span>
    </template>
  </StdCurd>
</template>
