import { createApp } from 'vue'
import gettext from '~/language/gettext'

import router from '~/router'

import store from '~/store'
import App from './App.vue'
import './style.css'

createApp(App)
  .use(store)
  .use(gettext)
  .use(router)
  .mount('#app')
