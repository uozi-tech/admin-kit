<script setup lang="ts">
import type { SidebarItem } from '@uozi-admin/layout-antdv'
import { HomeOutlined, SettingOutlined, TableOutlined, UserOutlined } from '@ant-design/icons-vue'
import { AdminLayout } from '@uozi-admin/layout-antdv'
import { Alert, Card, Space, Tag } from 'ant-design-vue'
import { h } from 'vue'

const sidebarItems: SidebarItem[] = [
  {
    title: '首页',
    name: 'home',
    path: '/home',
    icon: h(HomeOutlined),
  },
  {
    title: '用户管理',
    path: '/users',
    name: 'users',
    icon: h(UserOutlined),
    children: [
      {
        title: '用户列表',
        name: 'users-list',
        path: '/users/list',
      },
      {
        title: '用户权限',
        name: 'users-permissions',
        path: '/users/permissions',
      },
    ],
  },
  {
    title: '数据管理',
    path: '/data',
    name: 'data',
    icon: h(TableOutlined),
    children: [
      {
        title: '数据列表',
        name: 'data-list',
        path: '/data/list',
      },
      {
        title: '数据分析',
        name: 'data-analysis',
        path: '/data/analysis',
      },
    ],
  },
  {
    title: '系统设置',
    path: '/settings',
    name: 'settings',
    icon: h(SettingOutlined),
  },
]
</script>

<template>
  <div>
    <AdminLayout
      site-title="管理后台"
      :sidebar-items="sidebarItems"
      :languages="{
        zh: '中文',
        en: 'English',
      }"
      current-language="zh"
      page-title="页面标题"
      copyright="柚子星云 版权所有 2025"
    >
      <div>
        <Card title="欢迎使用 Admin Layout">
          <p>这是一个基础的布局演示，展示了 AdminLayout 组件的基本用法。</p>
          <Space
            direction="vertical"
            size="middle"
            style="width: 100%;"
          >
            <Alert
              message="布局特性"
              description="支持侧边栏导航、响应式设计、主题切换等功能"
              type="info"
              show-icon
            />
            <div>
              <Tag color="blue">
                Vue 3
              </Tag>
              <Tag color="green">
                TypeScript
              </Tag>
              <Tag color="orange">
                Ant Design Vue
              </Tag>
            </div>
          </Space>
        </Card>
      </div>
    </AdminLayout>
  </div>
</template>
