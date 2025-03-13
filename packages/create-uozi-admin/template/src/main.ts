import { createCurdConfig } from '@uozi-admin/curd'
import { createApp } from 'vue'
import gettext from '~/language/gettext'
import router from '~/router'
import { store } from '~/store'
import App from './App.vue'
import './style.css'
import '@uozi-admin/curd/dist/index.css'
import '@uozi-admin/layout-antdv/dist/index.css'
import 'virtual:uno.css'

createApp(App)
  .use(createCurdConfig({
    listApi: {
      paginationMap: {
        total: 'total',
        current: 'current_page',
        pageSize: 'per_page',
        totalPages: 'total_pages',
      },
    },
  }))
  .use(store)
  .use(gettext)
  .use(router)
  .mount('#app')
