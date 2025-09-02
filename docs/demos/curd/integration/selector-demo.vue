<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

// 模拟部门API
const departmentApi = {
  getList: (params = {}) => {
    const mockDepartments = [
      { id: 1, name: '技术部', code: 'tech', manager: '张三' },
      { id: 2, name: '产品部', code: 'product', manager: '李四' },
      { id: 3, name: '运营部', code: 'operation', manager: '王五' },
      { id: 4, name: '销售部', code: 'sales', manager: '赵六' },
      { id: 5, name: '财务部', code: 'finance', manager: '钱七' },
    ]
    return Promise.resolve({
      data: mockDepartments,
      pagination: { total: mockDepartments.length, current_page: 1, per_page: 10 },
    })
  },
}

// 模拟角色API
const roleApi = {
  getList: (params = {}) => {
    const mockRoles = [
      { id: 1, name: '超级管理员', code: 'super_admin', permissions: ['*'] },
      { id: 2, name: '管理员', code: 'admin', permissions: ['user.read', 'user.write'] },
      { id: 3, name: '编辑者', code: 'editor', permissions: ['content.write'] },
      { id: 4, name: '查看者', code: 'viewer', permissions: ['*.read'] },
    ]
    return Promise.resolve({
      data: mockRoles,
      pagination: { total: mockRoles.length, current_page: 1, per_page: 10 },
    })
  },
}

const columns = [
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
    title: '部门',
    dataIndex: 'departmentId',
    search: {
      type: 'selector',
      selector: {
        getListApi: departmentApi.getList,
        columns: [
          { title: '部门名称', dataIndex: 'name' },
          { title: '部门编码', dataIndex: 'code' },
          { title: '负责人', dataIndex: 'manager' },
        ],
        valueKey: 'id',
        displayKey: 'name',
        title: '选择部门',
      },
      formItem: {
        label: '所属部门',
      },
    },
    edit: {
      type: 'selector',
      selector: {
        getListApi: departmentApi.getList,
        columns: [
          { title: '部门名称', dataIndex: 'name' },
          { title: '部门编码', dataIndex: 'code' },
          { title: '负责人', dataIndex: 'manager' },
        ],
        valueKey: 'id',
        displayKey: 'name',
        title: '选择部门',
        searchable: true,
        searchFields: ['name', 'code'],
      },
      formItem: { required: true },
    },
    customRender: ({ value }) => {
      // 实际项目中应该通过API获取部门名称
      const deptMap = {
        1: '技术部',
        2: '产品部',
        3: '运营部',
        4: '销售部',
        5: '财务部',
      }
      return deptMap[value] || '-'
    },
  },
  {
    title: '角色',
    dataIndex: 'roleIds',
    edit: {
      type: 'selector',
      selector: {
        getListApi: roleApi.getList,
        columns: [
          { title: '角色名称', dataIndex: 'name' },
          { title: '角色编码', dataIndex: 'code' },
          { title: '权限', dataIndex: 'permissions', customRender: ({ value }) => value.join(', ') },
        ],
        valueKey: 'id',
        displayKey: 'name',
        title: '选择角色',
        multiple: true, // 支持多选
        searchable: true,
        searchFields: ['name', 'code'],
      },
      formItem: { required: true },
    },
    customRender: ({ value = [] }) => {
      // 实际项目中应该通过API获取角色名称
      const roleMap = {
        1: '超级管理员',
        2: '管理员',
        3: '编辑者',
        4: '查看者',
      }
      return Array.isArray(value)
        ? value.map(id => roleMap[id]).filter(Boolean).join(', ') || '-'
        : '-'
    },
  },
  {
    title: '直属上级',
    dataIndex: 'managerId',
    edit: {
      type: 'selector',
      selector: {
        getListApi: userApi.getList,
        columns: [
          { title: '姓名', dataIndex: 'name' },
          { title: '邮箱', dataIndex: 'email' },
          { title: '手机号', dataIndex: 'phone' },
        ],
        valueKey: 'id',
        displayKey: 'name',
        title: '选择上级',
        searchable: true,
        searchFields: ['name', 'email'],
        filterCurrentRow: true, // 过滤当前行，避免自己选择自己
      },
    },
    customRender: ({ value, record }) => {
      // 这里应该通过API获取上级姓名，简化演示直接显示ID
      return value ? `上级用户${value}` : '-'
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
