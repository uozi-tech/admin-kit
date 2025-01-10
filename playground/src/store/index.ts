import { useSettingsStore } from './settings'
import { createPinia } from 'pinia'

const store = createPinia()

export { store, useSettingsStore }
