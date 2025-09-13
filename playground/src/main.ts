import { createCosyProCurd } from '@uozi-admin/curd'
import { createApp } from 'vue'
import App from './App.vue'
import gettext from './gettext'
import { router } from './router'
import { store, useSettingsStore } from './store'
import './style.css'
import 'virtual:uno.css'
import '@uozi-admin/curd/dist/index.css'
import '@uozi-admin/layout-antdv/dist/index.css'

createApp(App)
  .use(createCosyProCurd({
    search: {
      showSearchBtn: true,
    },
  }))
  .use(gettext)
  .use(store)
  .use(router)
  .mount('#app')

const settings = useSettingsStore()

gettext.current = settings.language || 'zh_CN'
