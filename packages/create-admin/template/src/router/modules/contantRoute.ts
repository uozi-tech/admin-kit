import { RouteRecordRaw } from 'vue-router'

export const constantRoute: RouteRecordRaw = [
  {
    path: '/',
    name: 'home',
    component: () => import('~/views/home/index.vue'),
  },
]
