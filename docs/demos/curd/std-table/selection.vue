<script setup lang="ts">
import { ref } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Button, Space, message, Alert } from 'ant-design-vue'

const selectedKeys = ref([])
const selectedRows = ref([])

// 列配置
const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  { 
    title: '状态', 
    dataIndex: 'status', 
    customRender: ({ record }) => record.status === 1 ? '启用' : '禁用' 
  }
]

// 模拟 API
const getListApi = () => {
  return Promise.resolve({
    data: [
      { id: 1, username: 'admin', email: 'admin@example.com', status: 1 },
      { id: 2, username: 'user1', email: 'user1@example.com', status: 1 },
      { id: 3, username: 'user2', email: 'user2@example.com', status: 0 },
      { id: 4, username: 'manager', email: 'manager@example.com', status: 1 },
      { id: 5, username: 'guest', email: 'guest@example.com', status: 0 }
    ],
    total: 5
  })
}

// 批量操作
function handleBatchDelete() {
  if (selectedKeys.value.length === 0) {
    message.warning('请选择要删除的项目')
    return
  }
  console.log('批量删除:', selectedKeys.value)
  message.success(`已删除 ${selectedKeys.value.length} 个项目`)
  // 模拟删除后清空选择
  selectedKeys.value = []
  selectedRows.value = []
}

function handleBatchEnable() {
  if (selectedKeys.value.length === 0) {
    message.warning('请选择要启用的项目')
    return
  }
  console.log('批量启用:', selectedKeys.value)
  message.success(`已启用 ${selectedKeys.value.length} 个项目`)
}

function handleBatchDisable() {
  if (selectedKeys.value.length === 0) {
    message.warning('请选择要禁用的项目')
    return
  }
  console.log('批量禁用:', selectedKeys.value)
  message.success(`已禁用 ${selectedKeys.value.length} 个项目`)
}

function clearSelection() {
  selectedKeys.value = []
  selectedRows.value = []
  message.info('已清空选择')
}
</script>

<template>
  <div>
    <Alert 
      message="表格选择演示" 
      description="点击复选框选择行，然后使用批量操作按钮进行操作。选中的数据会实时显示在下方。" 
      type="info" 
      show-icon 
      style="margin-bottom: 16px;"
    />

    <!-- 批量操作按钮 -->
    <div style="margin-bottom: 16px;">
      <Space>
        <Button 
          type="primary" 
          danger 
          @click="handleBatchDelete" 
          :disabled="selectedKeys.length === 0"
        >
          批量删除 ({{ selectedKeys.length }})
        </Button>
        <Button 
          type="primary" 
          @click="handleBatchEnable" 
          :disabled="selectedKeys.length === 0"
        >
          批量启用 ({{ selectedKeys.length }})
        </Button>
        <Button 
          @click="handleBatchDisable" 
          :disabled="selectedKeys.length === 0"
        >
          批量禁用 ({{ selectedKeys.length }})
        </Button>
        <Button 
          @click="clearSelection" 
          :disabled="selectedKeys.length === 0"
        >
          清空选择
        </Button>
      </Space>
    </div>

    <!-- 表格 -->
    <StdTable
      :columns="columns"
      :get-list-api="getListApi"
      v-model:selected-row-keys="selectedKeys"
      v-model:selected-rows="selectedRows"
      row-selection-type="checkbox"
    />

    <!-- 选中信息显示 -->
    <div style="margin-top: 16px;" v-if="selectedRows.length > 0">
      <h4>已选中 {{ selectedRows.length }} 个项目:</h4>
      <div style="background: #f6f8fa; padding: 12px; border-radius: 6px;">
        <div v-for="row in selectedRows" :key="row.id" style="margin-bottom: 8px; padding: 8px; background: white; border-radius: 4px;">
          <strong>{{ row.username }}</strong> - {{ row.email }} 
          <span :style="{ color: row.status === 1 ? '#52c41a' : '#ff4d4f', marginLeft: '8px' }">
            ({{ row.status === 1 ? '启用' : '禁用' }})
          </span>
        </div>
      </div>
    </div>

    <!-- 无选择时的提示 -->
    <div style="margin-top: 16px;" v-else>
      <Alert 
        message="暂未选择任何项目" 
        description="请点击表格行前的复选框来选择项目" 
        type="info" 
        show-icon 
      />
    </div>
  </div>
</template>

<style scoped>
.ant-alert {
  border-radius: 6px;
}
</style>