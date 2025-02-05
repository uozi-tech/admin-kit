import { createApp } from 'vue'
import gettext from '~/language/gettext'
import router from '~/router'
import { store } from '~/store'
import App from './App.vue'
import './style.css'
import '@uozi-admin/curd/dist/index.css'
import '@uozi-admin/layout-antdv/dist/index.css'

createApp(App)
  .use(store)
  .use(gettext)
  .use(router)
  .mount('#app')
