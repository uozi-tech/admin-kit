import { createCurdConfig } from '@uozi-admin/curd'
import { setAppConfig } from '@uozi-admin/layout-antdv'
import { createApp } from 'vue'
import gettext from '~/language/gettext'
import router from '~/router'
import { store } from '~/store'
import App from './App.vue'
import './style.css'
import '@uozi-admin/curd/dist/index.css'
import '@uozi-admin/layout-antdv/dist/index.css'
import 'virtual:uno.css'

setAppConfig({
  siteTitle: 'Uozi Admin',
  copyright: `Copyright © 2024 - ${new Date().getFullYear()} Uozi Tech`,
})

createApp(App)
  .use(createCurdConfig({
    listApi: {
      paginationMap: {
        params: {
          current: 'page',
          pageSize: 'page_size',
        },
        response: {
          total: 'total',
          current: 'current_page',
          pageSize: 'per_page',
          totalPages: 'total_pages',
        },
      },
    },
  }))
  .use(store)
  .use(gettext)
  .use(router)
  .mount('#app')
