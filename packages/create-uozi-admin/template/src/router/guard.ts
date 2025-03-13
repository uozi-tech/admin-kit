import type { Router } from 'vue-router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

export function setupRouterGuard(router: Router) {
  NProgress.configure({ showSpinner: false })

  router.beforeEach(async (to, _, next) => {
    NProgress.start()

    // TODO: check if user is logged in

    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
