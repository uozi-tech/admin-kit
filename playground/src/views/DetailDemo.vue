<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdDetail } from '@uozi-admin/curd'
import { Card, Divider, message, Space } from 'ant-design-vue'
import { ref } from 'vue'

// 模拟 API
const mockApi = {
  getItem: (id: string) => {
    return Promise.resolve({
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
  },
  updateItem: (id: string, data: any) => {
    console.log('更新数据:', id, data)
    return Promise.resolve(data)
  },
}

// 手动控制的记录数据
const manualRecord = ref({
  id: 2,
  name: '李四',
  email: 'lisi@example.com',
  age: 25,
  status: 0,
  bio: '手动传入的数据',
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
      <!-- 通过 API 自动获取数据的可编辑模式 -->
      <Card
        title="通过 API 自动获取数据的可编辑模式"
        size="small"
      >
        <StdDetail
          id="1"
          :api="mockApi"
          :columns="columns"
          :editable="true"
        />
      </Card>

      <Divider />

      <!-- 手动传入数据的受限编辑模式 -->
      <Card
        title="手动传入数据的受限编辑模式（只能编辑姓名、简介、评分）"
        size="small"
      >
        <StdDetail
          v-model:record="manualRecord"
          :columns="columns"
          :editable="true"
          :editable-fields="restrictedEditableFields"
        />
      </Card>

      <Divider />

      <!-- 只读模式 -->
      <Card
        title="只读模式"
        size="small"
      >
        <StdDetail
          v-model:record="manualRecord"
          :columns="columns"
          :editable="false"
        />
      </Card>
    </Space>
  </div>
</template>
