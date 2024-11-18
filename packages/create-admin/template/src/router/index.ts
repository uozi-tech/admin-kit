import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/layouts/BaseLayout.vue'),
    children: [],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
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

router.beforeEach(async (to, _, next) => {
  NProgress.start()

  next({ path: '/login', query: { redirect: to.fullPath } })
})

router.afterEach(() => {
  NProgress.done()
})

export default router
