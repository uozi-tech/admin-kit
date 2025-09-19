<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { ConfigProvider, StdCurd } from '@uozi-admin/curd'
import { ref } from 'vue'

const userApi = {
  getList: async (p) => {
    console.log(p)
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
  getItem: async () => {
    return {
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
    }
  },
  updateItem: async (id, data) => {
    console.log(data)
    return {
      id: 1,
      name: '张三',
      mobile: '13800138000',
      email: 'zhangsan@example.com',
    }
  },
}

const columns: StdTableColumn[] = [
  {
    title: () =>
      '姓名',
    dataIndex: 'name',
    search: {
      type: 'selector',
      formItem: {
        name: 'name_fz',
      },
      selector: {
        getListApi: userApi.getList,
        columns: [{ title: '姓名', dataIndex: 'name' }],
        valueKey: 'id',
        displayKey: 'name',
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
      disabled: true,
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
      defaultValue: 1,
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
      select: {
        options: [{ label: '启用', value: 1 }, { label: '禁用', value: -1 }],
        defaultValue: 1,
      },
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
        multiple: false,
        beforeUpload: () => {
          // 阻止自动上传
          return false
        },
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

const customQueryParams = ref({
  name: '张三',
  role: 1,
})
</script>

<template>
  <ConfigProvider :config="{ modal: { width: 800 } }">
    <AButton @click="customQueryParams.role = -1">
      {{ customQueryParams.role }}
    </AButton>
    <StdCurd
      v-model:selected-row-keys="selectedRowKeys"
      :api="userApi"
      :columns="columns"
      row-selection-type="checkbox"
      row-key="id"
      row-draggable
      :custom-query-params="customQueryParams"
    >
      <template #col-name="{ record }">
        <span class="text-red-500">{{ record.name }}</span>
      </template>
    </StdCurd>
  </ConfigProvider>
</template>
