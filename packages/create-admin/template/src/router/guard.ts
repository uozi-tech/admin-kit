import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from '~/router/index'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _, next) => {
  NProgress.start()

  // TODO: check if user is logged in

  next()
})

router.afterEach(() => {
  NProgress.done()
})
