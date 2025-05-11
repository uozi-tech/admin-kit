import { createCosyProCurd } from '@uozi-admin/curd'
import { createApp } from 'vue'
import App from './App.vue'
import gettext from './gettext'
import { router } from './router'
import { store, useSettingsStore } from './store'
import './style.css'
import 'virtual:uno.css'

createApp(App)
  .use(createCosyProCurd())
  .use(gettext)
  .use(store)
  .use(router)
  .mount('#app')

const settings = useSettingsStore()

gettext.current = settings.language || 'zh_CN'
