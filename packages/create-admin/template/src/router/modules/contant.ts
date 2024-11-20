import { RouteRecordRaw } from 'vue-router'
import { PATH_ERROR, PATH_LOGIN } from '~/constants/routes'

export const constantRoutes: RouteRecordRaw[] = [
  {
  path: PATH_LOGIN,
  name: 'login',
  component: () => import('~/pages/login/index.vue'),
  meta: {
    title: () => $gettext('Login')
  }
}, {
  path: PATH_ERROR,
  name: 'error',
  component: () => import('~/pages/error/index.vue')
}, {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '/error/404'
}
]
