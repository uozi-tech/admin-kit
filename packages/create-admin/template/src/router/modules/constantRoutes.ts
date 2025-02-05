import type { RouteRecordRaw } from 'vue-router'

export const PATH_LOGIN = '/login'
export const PATH_ERROR = '/error/:code'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: PATH_LOGIN,
    name: 'login',
    component: () => import('~/pages/login/index.vue'),
    meta: {
      title: () => $gettext('Login'),
    },
  },
  {
    path: PATH_ERROR,
    name: 'error',
    component: () => import('~/pages/error/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/error/404',
  },
]
