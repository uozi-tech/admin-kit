# 批量操作

批量操作功能让您能够同时处理多条记录，提高数据管理效率。支持批量编辑、批量删除、批量导入导出等功能。

## 批量选择

### 基础批量选择

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { StdCurd } from '@uozi-admin/curd'
import { Button, Space, message } from 'ant-design-vue'

const selectedRowKeys = ref([])
const selectedRows = ref([])

const handleSelectionChange = (keys, rows) => {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status'
  }
]
</script>

<template>
  <div>
    <!-- 批量操作工具栏 -->
    <div v-if="selectedRowKeys.length > 0" style="margin-bottom: 16px;">
      <Space>
        <span>已选择 {{ selectedRowKeys.length }} 项</span>
        <Button @click="handleBatchEdit">批量编辑</Button>
        <Button danger @click="handleBatchDelete">批量删除</Button>
        <Button @click="handleBatchExport">批量导出</Button>
      </Space>
    </div>
    
    <StdCurd
      :api="userApi"
      :columns="columns"
      :table-props="{
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys,
          onChange: handleSelectionChange
        }
      }"
    />
  </div>
</template>
```

### 条件选择

```vue
<script setup lang="ts">
const selectAll = () => {
  // 选择当前页所有记录
  const allKeys = tableData.value.map(record => record.id)
  selectedRowKeys.value = allKeys
}

const selectByCondition = (condition) => {
  // 根据条件选择记录
  const filteredKeys = tableData.value
    .filter(record => condition(record))
    .map(record => record.id)
  selectedRowKeys.value = filteredKeys
}

const clearSelection = () => {
  selectedRowKeys.value = []
  selectedRows.value = []
}
</script>

<template>
  <div>
    <Space style="margin-bottom: 16px;">
      <Button @click="selectAll">选择全部</Button>
      <Button @click="selectByCondition(r => r.status === 'active')">
        选择活跃用户
      </Button>
      <Button @click="selectByCondition(r => r.created_at > lastWeek)">
        选择最近注册
      </Button>
      <Button @click="clearSelection">清空选择</Button>
    </Space>
    
    <!-- 表格组件 -->
  </div>
</template>
```

## 批量编辑

### 批量状态更新

```vue
<script setup lang="ts">
import { Modal, Select, message } from 'ant-design-vue'

const batchEditVisible = ref(false)
const batchEditForm = ref({
  status: undefined,
  category: undefined
})

const handleBatchEdit = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择要编辑的记录')
    return
  }
  batchEditVisible.value = true
}

const submitBatchEdit = async () => {
  try {
    const updates = {}
    
    // 只更新有值的字段
    if (batchEditForm.value.status !== undefined) {
      updates.status = batchEditForm.value.status
    }
    if (batchEditForm.value.category !== undefined) {
      updates.category = batchEditForm.value.category
    }
    
    if (Object.keys(updates).length === 0) {
      message.warning('请至少选择一个要更新的字段')
      return
    }
    
    // 批量更新 API 调用
    await fetch('/api/users/batch-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: selectedRowKeys.value,
        updates
      })
    })
    
    message.success(`成功更新 ${selectedRowKeys.value.length} 条记录`)
    batchEditVisible.value = false
    
    // 刷新表格
    refreshTable()
    
    // 清空选择
    clearSelection()
  } catch (error) {
    message.error('批量更新失败')
  }
}
</script>

<template>
  <!-- 批量编辑弹窗 -->
  <Modal
    v-model:open="batchEditVisible"
    title="批量编辑"
    @ok="submitBatchEdit"
  >
    <div style="padding: 16px 0;">
      <p>将对选中的 {{ selectedRowKeys.length }} 条记录进行批量更新</p>
      
      <div style="margin-bottom: 16px;">
        <label>状态：</label>
        <Select
          v-model:value="batchEditForm.status"
          placeholder="选择状态（不选择则不更新）"
          allowClear
          style="width: 200px;"
        >
          <SelectOption value="active">启用</SelectOption>
          <SelectOption value="inactive">禁用</SelectOption>
        </Select>
      </div>
      
      <div style="margin-bottom: 16px;">
        <label>分类：</label>
        <Select
          v-model:value="batchEditForm.category"
          placeholder="选择分类（不选择则不更新）"
          allowClear
          style="width: 200px;"
        >
          <SelectOption value="vip">VIP用户</SelectOption>
          <SelectOption value="normal">普通用户</SelectOption>
        </Select>
      </div>
    </div>
  </Modal>
</template>
```

### 批量表单编辑

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'

const batchFormColumns = [
  {
    title: '状态',
    dataIndex: 'status',
    form: {
      control: 'select',
      options: [
        { label: '不修改', value: null },
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' }
      ],
      defaultValue: null
    }
  },
  {
    title: '用户等级',
    dataIndex: 'level',
    form: {
      control: 'select',
      options: [
        { label: '不修改', value: null },
        { label: 'VIP', value: 'vip' },
        { label: '普通', value: 'normal' }
      ],
      defaultValue: null
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    form: {
      control: 'textarea',
      placeholder: '批量添加备注（为空则不修改）'
    }
  }
]

const handleBatchFormSubmit = async (formData) => {
  // 过滤掉空值字段
  const updates = Object.entries(formData)
    .filter(([key, value]) => value !== null && value !== undefined && value !== '')
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  
  if (Object.keys(updates).length === 0) {
    message.warning('请至少填写一个要更新的字段')
    return
  }
  
  // 执行批量更新
  await batchUpdateRecords(selectedRowKeys.value, updates)
}
</script>

<template>
  <Modal
    v-model:open="batchEditVisible"
    title="批量编辑表单"
    width="600px"
  >
    <StdForm
      :columns="batchFormColumns"
      @submit="handleBatchFormSubmit"
      :show-reset="true"
    />
  </Modal>
</template>
```

## 批量删除

### 安全的批量删除

```vue
<script setup lang="ts">
import { Modal, Progress } from 'ant-design-vue'

const batchDeleteVisible = ref(false)
const deleteProgress = ref(0)
const isDeleting = ref(false)

const handleBatchDelete = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择要删除的记录')
    return
  }
  
  Modal.confirm({
    title: '确认批量删除',
    content: `您确定要删除选中的 ${selectedRowKeys.value.length} 条记录吗？此操作不可恢复。`,
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: () => executeBatchDelete()
  })
}

const executeBatchDelete = async () => {
  isDeleting.value = true
  deleteProgress.value = 0
  
  try {
    const total = selectedRowKeys.value.length
    const batchSize = 10 // 每批处理10条
    
    for (let i = 0; i < total; i += batchSize) {
      const batch = selectedRowKeys.value.slice(i, i + batchSize)
      
      // 批量删除当前批次
      await fetch('/api/users/batch-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: batch })
      })
      
      // 更新进度
      deleteProgress.value = Math.min(100, ((i + batchSize) / total) * 100)
    }
    
    message.success(`成功删除 ${total} 条记录`)
    
    // 刷新表格和清空选择
    refreshTable()
    clearSelection()
    
  } catch (error) {
    message.error('批量删除失败')
  } finally {
    isDeleting.value = false
    deleteProgress.value = 0
  }
}
</script>

<template>
  <!-- 删除进度提示 -->
  <Modal
    v-model:open="isDeleting"
    title="正在删除"
    :closable="false"
    :footer="null"
  >
    <div style="text-align: center; padding: 20px;">
      <Progress :percent="deleteProgress" />
      <p style="margin-top: 16px;">正在删除记录，请稍候...</p>
    </div>
  </Modal>
</template>
```

### 软删除和恢复

```vue
<script setup lang="ts">
const handleSoftDelete = async () => {
  try {
    await fetch('/api/users/soft-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: selectedRowKeys.value
      })
    })
    
    message.success('记录已移至回收站')
    refreshTable()
    clearSelection()
  } catch (error) {
    message.error('操作失败')
  }
}

const handleRestore = async () => {
  try {
    await fetch('/api/users/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: selectedRowKeys.value
      })
    })
    
    message.success('记录已恢复')
    refreshTable()
    clearSelection()
  } catch (error) {
    message.error('恢复失败')
  }
}
</script>

<template>
  <Space>
    <Button danger @click="handleSoftDelete">
      移至回收站
    </Button>
    <Button @click="handleRestore">
      恢复记录
    </Button>
  </Space>
</template>
```

## 批量导入导出

### 批量导出

```vue
<script setup lang="ts">
import { DownloadOutlined } from '@ant-design/icons-vue'

const handleBatchExport = async () => {
  try {
    const response = await fetch('/api/users/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: selectedRowKeys.value,
        format: 'xlsx'
      })
    })
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users_${new Date().toISOString().slice(0, 10)}.xlsx`
    a.click()
    window.URL.revokeObjectURL(url)
    
    message.success('导出成功')
  } catch (error) {
    message.error('导出失败')
  }
}

const handleExportAll = async () => {
  try {
    const response = await fetch('/api/users/export-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filters: currentFilters.value, // 当前搜索条件
        format: 'xlsx'
      })
    })
    
    // 处理文件下载...
  } catch (error) {
    message.error('导出失败')
  }
}
</script>

<template>
  <Space>
    <Button 
      :disabled="selectedRowKeys.length === 0"
      @click="handleBatchExport"
    >
      <DownloadOutlined /> 导出选中
    </Button>
    <Button @click="handleExportAll">
      <DownloadOutlined /> 导出全部
    </Button>
  </Space>
</template>
```

### 批量导入

```vue
<script setup lang="ts">
import { Upload, Progress, Table } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue'

const importVisible = ref(false)
const importProgress = ref(0)
const importResult = ref(null)

const handleImport = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    importProgress.value = 0
    
    const response = await fetch('/api/users/import', {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        importProgress.value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
      }
    })
    
    const result = await response.json()
    importResult.value = result
    
    message.success(`导入完成：成功 ${result.success} 条，失败 ${result.failed} 条`)
    
    if (result.success > 0) {
      refreshTable()
    }
    
  } catch (error) {
    message.error('导入失败')
  }
}

const importResultColumns = [
  { title: '行号', dataIndex: 'row' },
  { title: '状态', dataIndex: 'status' },
  { title: '错误信息', dataIndex: 'error' }
]
</script>

<template>
  <div>
    <Button @click="importVisible = true">
      批量导入
    </Button>
    
    <Modal
      v-model:open="importVisible"
      title="批量导入用户"
      width="800px"
    >
      <div style="margin-bottom: 16px;">
        <Upload.Dragger
          :before-upload="handleImport"
          accept=".xlsx,.xls,.csv"
          :show-upload-list="false"
        >
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p class="ant-upload-hint">
            支持 Excel (.xlsx, .xls) 和 CSV 格式
          </p>
        </Upload.Dragger>
      </div>
      
      <!-- 导入进度 -->
      <div v-if="importProgress > 0 && importProgress < 100">
        <Progress :percent="importProgress" />
        <p>正在导入，请稍候...</p>
      </div>
      
      <!-- 导入结果 -->
      <div v-if="importResult">
        <h4>导入结果</h4>
        <p>
          总计：{{ importResult.total }} 条，
          成功：{{ importResult.success }} 条，
          失败：{{ importResult.failed }} 条
        </p>
        
        <!-- 错误详情 -->
        <div v-if="importResult.errors?.length > 0">
          <h5>错误详情：</h5>
          <Table
            :columns="importResultColumns"
            :data-source="importResult.errors"
            :pagination="false"
            size="small"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
```

## 进度跟踪和错误处理

### 批量操作进度跟踪

```vue
<script setup lang="ts">
const batchOperationStatus = ref({
  isRunning: false,
  total: 0,
  completed: 0,
  failed: 0,
  errors: []
})

const executeBatchOperation = async (operation, items) => {
  batchOperationStatus.value = {
    isRunning: true,
    total: items.length,
    completed: 0,
    failed: 0,
    errors: []
  }
  
  const batchSize = 5 // 并发处理5个
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    
    // 并发处理当前批次
    const promises = batch.map(async (item, index) => {
      try {
        await operation(item)
        batchOperationStatus.value.completed++
      } catch (error) {
        batchOperationStatus.value.failed++
        batchOperationStatus.value.errors.push({
          item,
          error: error.message,
          index: i + index
        })
      }
    })
    
    await Promise.all(promises)
  }
  
  batchOperationStatus.value.isRunning = false
}
</script>

<template>
  <!-- 进度显示 -->
  <Modal
    v-model:open="batchOperationStatus.isRunning"
    title="批量操作进度"
    :closable="false"
    :footer="null"
  >
    <div style="padding: 20px;">
      <Progress 
        :percent="Math.round((batchOperationStatus.completed + batchOperationStatus.failed) / batchOperationStatus.total * 100)"
      />
      <div style="margin-top: 16px;">
        <p>总计：{{ batchOperationStatus.total }}</p>
        <p>已完成：{{ batchOperationStatus.completed }}</p>
        <p>失败：{{ batchOperationStatus.failed }}</p>
      </div>
    </div>
  </Modal>
</template>
```

## 相关内容

- [自定义扩展](./customization) - 自定义渲染和控件
- [表单交互](./form-interactions) - 表单联动和验证
- [国际化](./internationalization) - 多语言支持