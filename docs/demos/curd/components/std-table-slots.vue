<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { MailOutlined, PhoneOutlined, UserOutlined } from '@antdv-next/icons'
import { StdTable } from '@uozi-admin/curd'
import { Avatar, Badge, Space, Tag } from 'antdv-next'

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 1,
    role: 'admin',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    score: 95,
    tags: ['VIP', '认证用户'],
    created_at: '2024-01-15',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138001',
    status: 0,
    role: 'user',
    avatar: '',
    score: 78,
    tags: ['新用户'],
    created_at: '2024-02-20',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138002',
    status: 1,
    role: 'editor',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    score: 82,
    tags: ['活跃用户', '内容创作者'],
    created_at: '2024-03-10',
  },
]

// Mock API
const userApi = {
  getList: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟网络延迟
    return {
      data: mockUsers,
      pagination: {
        total: mockUsers.length,
        current: 1,
        pageSize: 20,
      },
    }
  },
}

const columns: StdTableColumn[] = [
  {
    title: '用户信息',
    dataIndex: 'name',
    width: 200,
    // 注意：这里不使用 customRender，让 slot 生效
  },
  {
    title: '联系方式',
    dataIndex: 'email',
    width: 250,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 120,
  },
  {
    title: '评分',
    dataIndex: 'score',
    width: 150,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 150,
  },
]

function getRoleColor(role: string) {
  const colors = {
    admin: 'red',
    editor: 'blue',
    user: 'default',
  }
  return colors[role] || 'default'
}

function getRoleName(role: string) {
  const names = {
    admin: '管理员',
    editor: '编辑员',
    user: '普通用户',
  }
  return names[role] || role
}
</script>

<template>
  <div>
    <h3>列 Slot 渲染示例</h3>
    <p>通过 slot 自定义列的渲染方式，实现更丰富的展示效果。</p>

    <StdTable
      :get-list-api="userApi.getList"
      :columns="columns"
      row-key="id"
      :scroll="{ x: 1200 }"
    >
      <!-- 用户信息列：头像 + 姓名 -->
      <template #col-name="{ record, text }">
        <div class="flex items-center gap-3">
          <Avatar
            v-if="record.avatar"
            :src="record.avatar"
            :size="32"
          />
          <Avatar
            v-else
            :size="32"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>
          <div>
            <div class="font-medium">
              {{ text }}
            </div>
            <div class="text-xs text-gray-500">
              ID: {{ record.id }}
            </div>
          </div>
        </div>
      </template>

      <!-- 联系方式列：邮箱 + 电话 -->
      <template #col-email="{ record, text }">
        <Space
          orientation="vertical"
          size="small"
        >
          <a
            :href="`mailto:${text}`"
            class="flex items-center gap-1"
          >
            <MailOutlined class="text-blue-500" />
            {{ text }}
          </a>
          <a
            :href="`tel:${record.phone}`"
            class="flex items-center gap-1"
          >
            <PhoneOutlined class="text-green-500" />
            {{ record.phone }}
          </a>
        </Space>
      </template>

      <!-- 状态列：带颜色的状态徽章 -->
      <template #col-status="{ text }">
        <Badge
          :status="text === 1 ? 'success' : 'error'"
          :text="text === 1 ? '启用' : '禁用'"
        />
      </template>

      <!-- 角色列：带颜色的标签 -->
      <template #col-role="{ text }">
        <Tag :color="getRoleColor(text)">
          {{ getRoleName(text) }}
        </Tag>
      </template>

      <!-- 评分列：进度条 + 数字 -->
      <template #col-score="{ text }">
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-gray-200 rounded-full h-2">
            <div
              class="h-2 rounded-full transition-all duration-300"
              :class="text >= 90 ? 'bg-green-500' : text >= 70 ? 'bg-yellow-500' : 'bg-red-500'"
              :style="{ width: `${text}%` }"
            />
          </div>
          <span class="text-sm font-medium w-8">{{ text }}</span>
        </div>
      </template>

      <!-- 标签列：多个标签 -->
      <template #col-tags="{ text }">
        <Space wrap>
          <Tag
            v-for="tag in text"
            :key="tag"
            :color="tag === 'VIP' ? 'gold' : tag === '认证用户' ? 'green' : 'blue'"
          >
            {{ tag }}
          </Tag>
        </Space>
      </template>

      <!-- 创建时间列：格式化显示 -->
      <template #col-created_at="{ text }">
        <div class="text-center">
          <div class="text-sm">
            {{ text }}
          </div>
          <div class="text-xs text-gray-500">
            {{ Math.floor((Date.now() - new Date(text).getTime()) / (1000 * 60 * 60 * 24)) }} 天前
          </div>
        </div>
      </template>
    </StdTable>

    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
      <h4 class="text-blue-800 font-medium mb-2">
        💡 使用说明
      </h4>
      <ul class="text-blue-700 text-sm space-y-1">
        <li>• 使用 <code>#col-{dataIndex}</code> 格式定义列 slot</li>
        <li>• 每个 slot 接收 <code>record</code>、<code>text</code>、<code>value</code>、<code>column</code>、<code>index</code> 参数</li>
        <li>• 如果同时定义了 <code>customRender</code> 和 slot，<code>customRender</code> 优先生效</li>
        <li>• 支持在 slot 中使用任意 Vue 组件和逻辑</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
code {
  background-color: rgba(175, 184, 193, 0.2);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}
</style>
