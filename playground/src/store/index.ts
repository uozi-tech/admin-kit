import { createPinia } from 'pinia'
import { useSettingsStore } from './settings'

const store = createPinia()

export { store, useSettingsStore }
