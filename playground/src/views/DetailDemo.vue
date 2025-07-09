<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdDetail } from '@uozi-admin/curd'
import { Card, Divider, message, Space } from 'ant-design-vue'
import { ref } from 'vue'

// 模拟数据
const sampleRecord = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  age: 28,
  status: 1,
  avatar: ['https://via.placeholder.com/100'],
  bio: '这是一个简介描述',
  createdAt: '2025-01-01',
  isVip: true,
  rating: 4.5,
  tags: [1, 2],
})

// 列配置
const columns: StdTableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    edit: {
      type: 'input',
      formItem: {
        rules: [{ required: true, min: 2, max: 20 }],
      },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        rules: [
          { required: true },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ],
      },
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    edit: {
      type: 'inputNumber',
      formItem: {
        rules: [{ type: 'number', min: 0, max: 150 }],
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
      formItem: { rules: [{ required: true }] },
    },
    customRender: ({ value }) => value === 1 ? '启用' : '禁用',
  },
  {
    title: 'VIP 状态',
    dataIndex: 'isVip',
    edit: {
      type: 'switch',
      switch: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
    },
    customRender: ({ value }) => value ? 'VIP 用户' : '普通用户',
  },
  {
    title: '评分',
    dataIndex: 'rating',
    edit: {
      type: 'rate',
      rate: { allowHalf: true },
    },
  },
  {
    title: '个人简介',
    dataIndex: 'bio',
    edit: {
      type: 'textarea',
      textarea: {
        maxlength: 200,
        showCount: true,
        rows: 4,
      },
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      upload: {
        listType: 'picture-card',
        maxCount: 1,
      },
    },
    customRender: ({ value }) => {
      if (value && value.length > 0) {
        return `<img src="${value[0]}" style="width: 50px; height: 50px; border-radius: 4px;" />`
      }
      return '-'
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    edit: {
      type: 'date',
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    // ID 字段不可编辑
  },
]

// 状态
const mode = ref<'view' | 'edit'>('view')
const loading = ref(false)

// 事件处理
function handleSave(data: any) {
  loading.value = true

  // 模拟 API 调用
  setTimeout(() => {
    sampleRecord.value = { ...data }
    loading.value = false
    message.success('保存成功！')
  }, 1000)
}

function handleCancel() {
  message.info('已取消编辑')
}

function handleEdit() {
  message.info('进入编辑模式')
}

// 受限编辑模式的列配置（只能编辑部分字段）
const restrictedEditableFields = ['name', 'bio', 'rating']
</script>

<template>
  <div style="padding: 24px;">
    <Space
      direction="vertical"
      size="large"
      style="width: 100%;"
    >
      <!-- 完全可编辑模式 -->
      <Card
        title="完全可编辑模式"
        size="small"
      >
        <StdDetail
          :record="sampleRecord"
          :columns="columns"
          :editable="true"
          :mode="mode"
          :loading="loading"
          @save="handleSave"
          @cancel="handleCancel"
          @edit="handleEdit"
          @update:mode="mode = $event"
        />
      </Card>

      <Divider />

      <!-- 受限编辑模式（只能编辑特定字段） -->
      <Card
        title="受限编辑模式（只能编辑姓名、简介、评分）"
        size="small"
      >
        <StdDetail
          :record="sampleRecord"
          :columns="columns"
          :editable="true"
          :editable-fields="restrictedEditableFields"
          @save="handleSave"
          @cancel="handleCancel"
          @edit="handleEdit"
        />
      </Card>

      <Divider />

      <!-- 只读模式 -->
      <Card
        title="只读模式"
        size="small"
      >
        <StdDetail
          :record="sampleRecord"
          :columns="columns"
          :editable="false"
        />
      </Card>
    </Space>
  </div>
</template>
