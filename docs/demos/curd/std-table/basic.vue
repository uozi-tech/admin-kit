<script setup lang="ts">
import { ref } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import type { StdTableColumn } from '@uozi-admin/curd'

const loading = ref(false)

// 定义列配置
const columns: StdTableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '用户名',
    dataIndex: 'username',
    search: { // 启用搜索
      type: 'input',
      input: {
        placeholder: '请输入用户名'
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    customRender: ({ record }) => {
      return record.status === 1 ? '启用' : '禁用'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange'
    }
  }
]

// 模拟 API 接口
const getListApi = (params) => {
  console.log('API 参数:', params)
  
  // 模拟数据
  let mockData = [
    { id: 1, username: 'admin', email: 'admin@example.com', status: 1, created_at: '2024-01-15' },
    { id: 2, username: 'user1', email: 'user1@example.com', status: 1, created_at: '2024-01-16' },
    { id: 3, username: 'user2', email: 'user2@example.com', status: 0, created_at: '2024-01-17' },
    { id: 4, username: 'manager', email: 'manager@example.com', status: 1, created_at: '2024-01-18' },
    { id: 5, username: 'guest', email: 'guest@example.com', status: 0, created_at: '2024-01-19' }
  ]

  // 模拟搜索过滤
  if (params.username) {
    mockData = mockData.filter(item => 
      item.username.toLowerCase().includes(params.username.toLowerCase())
    )
  }

  if (params.status !== undefined && params.status !== '') {
    mockData = mockData.filter(item => item.status === params.status)
  }

  // 模拟分页
  const pageSize = params.page_size || 10
  const currentPage = params.page || 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = mockData.slice(startIndex, endIndex)
  
  return Promise.resolve({
    data: paginatedData,
    total: mockData.length,
    current_page: currentPage,
    per_page: pageSize
  })
}

function onChange(pagination, filters, sorter) {
  console.log('表格变化:', pagination, filters, sorter)
}
</script>

<template>
  <StdTable
    :columns="columns"
    :get-list-api="getListApi"
    v-model:table-loading="loading"
    @change="onChange"
  />
</template>