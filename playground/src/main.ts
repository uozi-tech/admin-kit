import { createCurdConfig } from '@uozi-admin/curd'
import { createApp } from 'vue'
import App from './App.vue'
import gettext from './gettext'
import { router } from './router'
import { store, useSettingsStore } from './store'
import './style.css'
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
  .use(gettext)
  .use(store)
  .use(router)
  .mount('#app')

const settings = useSettingsStore()

gettext.current = settings.language || 'zh_CN'
