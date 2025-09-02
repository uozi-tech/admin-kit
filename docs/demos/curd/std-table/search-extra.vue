<script setup lang="ts">
import { ref, h } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Button, Space, message, Alert } from 'ant-design-vue'
import { DownloadOutlined, ReloadOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons-vue'

// 列配置
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: {
      type: 'input',
      input: { placeholder: '请输入用户名' }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: {
      type: 'input',
      input: { placeholder: '请输入邮箱' }
    }
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
        ],
        placeholder: '请选择状态'
      }
    },
    customRender: ({ record }) => record.status === 1 ? '启用' : '禁用'
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
      dateRange: {
        placeholder: ['开始日期', '结束日期']
      }
    }
  }
]

// 表格引用，用于刷新数据
const tableRef = ref()
const exportLoading = ref(false)

// 搜索表单扩展渲染函数
function extraRender(searchFormData, searchColumns, config) {
  return h('div', { style: 'display: flex; gap: 8px; flex-wrap: wrap; align-items: center;' }, [
    h(Button, {
      type: 'default',
      icon: h(DownloadOutlined),
      loading: exportLoading.value,
      onClick: () => handleExport(searchFormData)
    }, '导出数据'),
    h(Button, {
      type: 'default',
      icon: h(ReloadOutlined),
      onClick: () => handleRefresh()
    }, '重置筛选'),
    h(Button, {
      type: 'primary',
      icon: h(SearchOutlined),
      onClick: () => handleAdvancedSearch(searchFormData)
    }, '高级搜索'),
    h(Button, {
      type: 'dashed',
      icon: h(FilterOutlined),
      onClick: () => handleQuickFilter(searchFormData)
    }, '快速筛选')
  ])
}

// 模拟 API
const getListApi = (params) => {
  console.log('搜索参数:', params)
  
  // 模拟完整的用户数据
  let mockData = [
    { id: 1, username: 'admin', email: 'admin@example.com', status: 1, created_at: '2024-01-15' },
    { id: 2, username: 'user1', email: 'user1@example.com', status: 1, created_at: '2024-01-16' },
    { id: 3, username: 'user2', email: 'user2@example.com', status: 0, created_at: '2024-01-17' },
    { id: 4, username: 'manager', email: 'manager@example.com', status: 1, created_at: '2024-01-18' },
    { id: 5, username: 'guest', email: 'guest@example.com', status: 0, created_at: '2024-01-19' },
    { id: 6, username: 'developer', email: 'dev@example.com', status: 1, created_at: '2024-01-20' },
    { id: 7, username: 'tester', email: 'test@example.com', status: 1, created_at: '2024-01-21' },
    { id: 8, username: 'designer', email: 'design@example.com', status: 0, created_at: '2024-01-22' }
  ]

  // 模拟搜索过滤
  if (params.username) {
    mockData = mockData.filter(item => 
      item.username.toLowerCase().includes(params.username.toLowerCase())
    )
  }

  if (params.email) {
    mockData = mockData.filter(item => 
      item.email.toLowerCase().includes(params.email.toLowerCase())
    )
  }

  if (params.status !== undefined && params.status !== '') {
    mockData = mockData.filter(item => item.status === params.status)
  }

  return Promise.resolve({
    data: mockData,
    total: mockData.length
  })
}

// 自定义按钮处理函数
function handleExport(searchFormData) {
  exportLoading.value = true
  console.log('导出数据，搜索条件:', searchFormData)
  
  // 模拟导出过程
  setTimeout(() => {
    exportLoading.value = false
    message.success('数据导出完成！')
  }, 2000)
}

function handleRefresh() {
  // 重置搜索表单并刷新数据
  if (tableRef.value) {
    tableRef.value.resetSearch()
  }
  message.info('已重置筛选条件')
}

function handleAdvancedSearch(searchFormData) {
  console.log('打开高级搜索，当前条件:', searchFormData)
  message.info('打开高级搜索对话框（演示功能）')
  
  // 这里可以打开一个更复杂的搜索对话框
  // 例如日期范围、多条件组合等
}

function handleQuickFilter(searchFormData) {
  console.log('应用快速筛选，当前条件:', searchFormData)
  
  // 快速应用一些常用筛选条件
  if (tableRef.value) {
    // 模拟应用筛选: 只显示启用的用户
    tableRef.value.setSearchData({ status: 1 })
    message.success('已应用快速筛选：只显示启用用户')
  }
}
</script>

<template>
  <div>
    <Alert 
      message="搜索表单扩展演示" 
      description="这个示例展示了如何通过 searchFormExtraRender 属性在搜索表单中添加自定义按钮和功能。" 
      type="info" 
      show-icon 
      style="margin-bottom: 16px;"
    />

    <!-- 表格 -->
    <StdTable
      ref="tableRef"
      :columns="columns"
      :get-list-api="getListApi"
      :search-form-extra-render="extraRender"
    />

    <div style="margin-top: 16px; padding: 16px; background: #f6f8fa; border-radius: 6px;">
      <h4>功能说明:</h4>
      <ul>
        <li><strong>导出数据</strong>: 根据当前搜索条件导出筛选后的数据</li>
        <li><strong>重置筛选</strong>: 清空所有搜索条件并重新加载数据</li>
        <li><strong>高级搜索</strong>: 打开更复杂的搜索界面（演示功能）</li>
        <li><strong>快速筛选</strong>: 一键应用常用的筛选条件</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-form-item) {
  margin-bottom: 16px;
}
</style>