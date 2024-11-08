import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { $gettext } from '../gettext'
import { DashboardOutlined, HomeOutlined } from '@ant-design/icons-vue'

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
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: {
          icon: HomeOutlined,
          title: () => $gettext('About'),
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue'),
        meta: {
          icon: HomeOutlined,
          title: () => $gettext('User'),
        },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
