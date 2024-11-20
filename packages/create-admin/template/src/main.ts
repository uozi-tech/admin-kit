import { createApp } from 'vue'
import './style.css'

import App from './App.vue'

import store from '~/store'
import gettext from '~/language/gettext'
import router from '~/router'

createApp(App)
  .use(store)
  .use(gettext)
  .use(router)
  .mount('#app')
