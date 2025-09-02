<script setup lang="ts">
import { ref, reactive } from 'vue'
import { StdTable } from '@uozi-admin/curd'
import { Space, Button, message, Alert, Card, Radio } from 'ant-design-vue'

const confirmMode = ref('popconfirm')
const tableData = reactive([
  { id: 1, name: 'admin', email: 'admin@example.com', role: '管理员' },
  { id: 2, name: 'user1', email: 'user1@example.com', role: '用户' },
  { id: 3, name: 'user2', email: 'user2@example.com', role: '用户' },
  { id: 4, name: 'manager', email: 'manager@example.com', role: '经理' },
  { id: 5, name: 'guest', email: 'guest@example.com', role: '访客' }
])

// 列配置，包含操作列
const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '角色', dataIndex: 'role' }
  // 操作列由 StdTable 自动生成
]

const getListApi = () => Promise.resolve({ 
  data: tableData, 
  total: tableData.length 
})

// 删除 API
const deleteApi = (id) => {
  console.log('删除项目:', id)
  
  // 从数据中移除项目
  const index = tableData.findIndex(item => item.id === id)
  if (index > -1) {
    const deletedItem = tableData[index]
    tableData.splice(index, 1)
    message.success(`删除成功: ${deletedItem.name}`)
  }
  
  return Promise.resolve()
}

// 动态切换确认模式
function switchMode(mode) {
  confirmMode.value = mode
}

// 重置数据
function resetData() {
  tableData.splice(0)
  tableData.push(
    { id: 1, name: 'admin', email: 'admin@example.com', role: '管理员' },
    { id: 2, name: 'user1', email: 'user1@example.com', role: '用户' },
    { id: 3, name: 'user2', email: 'user2@example.com', role: '用户' },
    { id: 4, name: 'manager', email: 'manager@example.com', role: '经理' },
    { id: 5, name: 'guest', email: 'guest@example.com', role: '访客' }
  )
  message.info('数据已重置')
}
</script>

<template>
  <div>
    <Alert 
      message="删除确认演示" 
      description="这个示例展示了两种不同的删除确认模式。Popconfirm 模式适合快速删除，Modal 模式提供更高的安全性。" 
      type="info" 
      show-icon 
      style="margin-bottom: 16px;"
    />

    <!-- 模式选择 -->
    <Card title="删除确认模式" size="small" style="margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
        <Radio.Group 
          v-model:value="confirmMode" 
          button-style="solid"
        >
          <Radio.Button value="popconfirm">Popconfirm 模式</Radio.Button>
          <Radio.Button value="modal">Modal 模式</Radio.Button>
        </Radio.Group>
        
        <Button @click="resetData">重置数据</Button>
      </div>
      
      <div style="margin-top: 12px; padding: 8px; background: #f6f8fa; border-radius: 4px; font-size: 12px;">
        <strong>当前模式: {{ confirmMode === 'popconfirm' ? 'Popconfirm 模式' : 'Modal 模式' }}</strong>
        <br>
        <span v-if="confirmMode === 'popconfirm'">
          点击删除按钮会弹出气泡确认框，直接确认即可删除
        </span>
        <span v-else>
          点击删除按钮会弹出对话框，需要输入 <strong>用户名</strong> 才能确认删除，提供更高的安全性
        </span>
      </div>
    </Card>

    <!-- 表格 -->
    <StdTable
      :key="confirmMode"
      :columns="columns"
      :get-list-api="getListApi"
      :delete-item-api="deleteApi"
      :delete-confirm-config="{
        mode: confirmMode,
        valueKey: confirmMode === 'modal' ? 'name' : 'id'
      }"
    />

    <!-- 说明信息 -->
    <Card title="功能说明" size="small" style="margin-top: 16px;">
      <div style="line-height: 1.6;">
        <h4>Popconfirm 模式:</h4>
        <ul>
          <li>快速删除，适合日常操作</li>
          <li>弹出气泡确认框</li>
          <li>一键确认删除</li>
        </ul>
        
        <h4>Modal 模式:</h4>
        <ul>
          <li>安全删除，适合重要数据</li>
          <li>弹出模态对话框</li>
          <li>需要输入确认信息（用户名）</li>
          <li>防止误删除操作</li>
        </ul>
        
        <div style="margin-top: 12px; padding: 8px; background: #fff2e8; border-radius: 4px; border-left: 3px solid #fa8c16;">
          <strong>提示:</strong> 在 Modal 模式下，用户需要输入要删除记录的用户名来确认删除操作。
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
:deep(.ant-card-head) {
  min-height: auto;
}

:deep(.ant-card-body) {
  padding: 16px;
}

:deep(.ant-alert) {
  border-radius: 6px;
}
</style>