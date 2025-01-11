import type { RouteRecordRaw } from 'vue-router'

export const PATH_DASHBOARD = '/dashboard'

export const constantRoute: RouteRecordRaw = [
  {
    path: '/',
    name: 'home',
    component: () => import('~/views/home/index.vue'),
  },
]
