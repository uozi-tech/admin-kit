<script setup lang="ts">
import type { SidebarItem } from '@uozi-admin/layout-antdv'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import {
  BarChartOutlined,
  BellOutlined,
  DashboardOutlined,
  DownOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { AdminLayout } from '@uozi-admin/layout-antdv'
import { Alert, Button, Card, Col, Dropdown, Menu, MenuDivider, MenuItem, message, Modal, Row, Space, Statistic, Tag } from 'ant-design-vue'
import { h, ref } from 'vue'

// 状态管理
const theme = ref<'light' | 'dark'>('light')

// 侧边栏菜单配置
const sidebarItems: SidebarItem[] = [
  {
    title: '工作台',
    name: 'dashboard',
    path: '/dashboard',
    icon: h(DashboardOutlined),
  },
  {
    title: '用户管理',
    name: 'users',
    path: '/users',
    icon: h(UserOutlined),
    children: [
      {
        title: '用户列表',
        name: 'users-list',
        path: '/users/list',
      },
      {
        title: '角色管理',
        name: 'users-roles',
        path: '/users/roles',
      },
      {
        title: '权限管理',
        name: 'users-permissions',
        path: '/users/permissions',
      },
    ],
  },
  {
    title: '内容管理',
    name: 'content',
    path: '/content',
    icon: h(FileTextOutlined),
    children: [
      {
        title: '文章管理',
        name: 'content-articles',
        path: '/content/articles',
      },
      {
        title: '分类管理',
        name: 'content-categories',
        path: '/content/categories',
      },
    ],
  },
  {
    title: '数据统计',
    name: 'statistics',
    path: '/statistics',
    icon: h(BarChartOutlined),
    children: [
      {
        title: '访问统计',
        name: 'statistics-visits',
        path: '/statistics/visits',
      },
      {
        title: '用户分析',
        name: 'statistics-users',
        path: '/statistics/users',
      },
      {
        title: '销售报表',
        name: 'statistics-sales',
        path: '/statistics/sales',
      },
    ],
  },
  {
    title: '数据管理',
    name: 'data',
    path: '/data',
    icon: h(TableOutlined),
  },
  {
    title: '系统设置',
    name: 'settings',
    path: '/settings',
    icon: h(SettingOutlined),
    children: [
      {
        title: '基础设置',
        name: 'settings-basic',
        path: '/settings/basic',
      },
      {
        title: '安全设置',
        name: 'settings-security',
        path: '/settings/security',
      },
    ],
  },
]

// 主题切换
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// 显示通知
function showNotification() {
  message.info('您有 3 条新消息')
}

// 用户菜单点击
function handleUserMenu(info: MenuInfo) {
  switch (info.key) {
    case 'profile':
      message.info('跳转到个人设置')
      break
    case 'settings':
      message.info('跳转到系统设置')
      break
    case 'logout':
      Modal.confirm({
        title: '确认退出',
        content: '您确定要退出系统吗？',
        onOk: () => {
          message.success('已退出系统')
        },
      })
      break
  }
}

// 其他操作
function showMessage() {
  message.success('操作成功！')
}

function showConfirm() {
  Modal.confirm({
    title: '确认操作',
    content: '这是一个确认对话框的演示',
    onOk: () => {
      message.info('已确认操作')
    },
  })
}
</script>

<template>
  <div>
    <AdminLayout
      site-title="高级管理后台"
      :sidebar-items="sidebarItems"
      :languages="{
        zh: '中文',
        en: 'English',
      }"
      current-language="zh"
      page-title="页面标题"
      :current-theme="theme"
      copyright="柚子星云 版权所有 2025"
      @toggle-theme="toggleTheme"
    >
      <!-- 自定义头部 -->
      <template #header-extra>
        <div style="margin-left: 8px;">
          <Space>
            <Button
              type="link"
              :icon="h(BellOutlined, { style: 'font-size: 16px;' })"
              @click="showNotification"
            />
            <Dropdown trigger="click">
              <Button>
                管理员
                <DownOutlined />
              </Button>
              <template #overlay>
                <Menu @click="handleUserMenu">
                  <MenuItem key="profile">
                    <UserOutlined />
                    个人设置
                  </MenuItem>
                  <MenuItem key="settings">
                    <SettingOutlined />
                    系统设置
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem key="logout">
                    <LogoutOutlined />
                    退出登录
                  </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </Space>
        </div>
      </template>

      <!-- 主内容区域 -->
      <div style="padding: 24px;">
        <Row :gutter="[16, 16]">
          <Col :span="24">
            <Card
              title="高级功能演示"
              :bordered="false"
            >
              <template #extra>
                <Space>
                  <Tag :color="theme === 'dark' ? 'blue' : 'green'">
                    {{ theme === 'dark' ? '暗色主题' : '亮色主题' }}
                  </Tag>
                </Space>
              </template>

              <Space
                direction="vertical"
                size="large"
                style="width: 100%;"
              >
                <Alert
                  message="功能特性"
                  description="这个高级演示展示了自定义头部、侧边栏底部、主题切换、状态管理等功能"
                  type="success"
                  show-icon
                />

                <Row :gutter="16">
                  <Col :span="8">
                    <Statistic
                      title="在线用户"
                      :value="1128"
                      :value-style="{ color: '#1890ff' }"
                    />
                  </Col>
                  <Col :span="8">
                    <Statistic
                      title="今日访问"
                      :value="3256"
                      :value-style="{ color: '#52c41a' }"
                    />
                  </Col>
                  <Col :span="8">
                    <Statistic
                      title="系统状态"
                      value="正常"
                      :value-style="{ color: '#f5222d' }"
                    />
                  </Col>
                </Row>

                <div>
                  <h4>操作演示</h4>
                  <Space wrap>
                    <Button @click="toggleTheme">
                      切换主题
                    </Button>
                    <Button
                      type="primary"
                      @click="showMessage"
                    >
                      显示消息
                    </Button>
                    <Button
                      danger
                      @click="showConfirm"
                    >
                      确认对话框
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  </div>
</template>

<style scoped>
.custom-header {
  height: 100%;
  background: var(--ant-primary-color-bg);
}

:deep(.ant-layout-sider-trigger) {
  position: absolute !important;
}
</style>
