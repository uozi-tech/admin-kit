import type { RouteRecordRaw } from 'vue-router'
import {
  AppstoreOutlined,
  DashboardOutlined,
  FileTextOutlined,
  MessageOutlined,
  OrderedListOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { createRouter, createWebHistory } from 'vue-router'
import { $gettext } from '../gettext'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('../layout/BaseLayout.vue'),
    meta: {
      title: () => $gettext('Home'),
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
          icon: DashboardOutlined,
          title: () => $gettext('Dashboard'),
        },
      },
      // 用户管理
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/users/UserList.vue'),
        meta: {
          icon: UserOutlined,
          title: () => $gettext('User Management'),
        },
      },
      // 产品管理
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/products/ProductList.vue'),
        meta: {
          icon: ShoppingOutlined,
          title: () => $gettext('Product Management'),
        },
      },
      // 订单管理
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/orders/OrderList.vue'),
        meta: {
          icon: OrderedListOutlined,
          title: () => $gettext('Order Management'),
        },
      },
      // 文章管理
      {
        path: '/posts',
        name: 'posts',
        component: () => import('../views/posts/PostList.vue'),
        meta: {
          icon: FileTextOutlined,
          title: () => $gettext('Post Management'),
        },
      },
      // 评论管理
      {
        path: '/comments',
        name: 'comments',
        component: () => import('../views/comments/CommentList.vue'),
        meta: {
          icon: MessageOutlined,
          title: () => $gettext('Comment Management'),
        },
      },
      // 标签管理
      {
        path: '/tags',
        name: 'tags',
        component: () => import('../views/tags/TagList.vue'),
        meta: {
          icon: TagsOutlined,
          title: () => $gettext('Tag Management'),
        },
      },
      // 分类管理
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/categories/CategoryList.vue'),
        meta: {
          icon: AppstoreOutlined,
          title: () => $gettext('Category Management'),
        },
      },
      // 系统设置
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/settings/SystemSettings.vue'),
        meta: {
          icon: SettingOutlined,
          title: () => $gettext('System Settings'),
        },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
