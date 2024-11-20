import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import { constantRoutes } from './modules/contant'
import { PATH_DASHBOARD } from '~/constants/routes'
import {HomeOutlined} from "@ant-design/icons-vue";

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/layouts/BaseLayout.vue'),
    redirect: PATH_DASHBOARD,
    meta: {
      title: () => $gettext('Home'),
    },
    children: [
      {
        path: PATH_DASHBOARD,
        name: 'dashboard',
        component: () => import('~/pages/dashboard/index.vue'),
        meta: {
          title: () => $gettext('Dashboard'),
          icon: HomeOutlined
        }
      },
    ],
  },
  ...constantRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition)
      return savedPosition
    else if (to.hash)
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    else
      return {
        top: 0,
        left: 0,
      }
  },
})

export default router
