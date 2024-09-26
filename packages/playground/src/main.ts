import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import { router } from './router'
import { store, useSettingsStore } from './store'
import gettext from './gettext.ts'

createApp(App).use(gettext).use(store).use(router).mount('#app')

const settings = useSettingsStore()

gettext.current = settings.language || 'zh_CN'
