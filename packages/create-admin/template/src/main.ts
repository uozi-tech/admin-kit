import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import gettext from '~/language/gettext'
import store from '~/store'

createApp(App)
  .use(store)
  .use(gettext)
  .mount('#app')
