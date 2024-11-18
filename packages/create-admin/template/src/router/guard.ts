import NProgress from 'nprogress'
import router from '~/router/index'

import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _, next) => {
  NProgress.start()

  // TODO: check if user is logged in

  next()
})

router.afterEach(() => {
  NProgress.done()
})
