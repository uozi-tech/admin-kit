import piniaPluginPersistState from 'pinia-plugin-persistedstate'

export * from './modules/settings'

export const store = createPinia()

store.use(piniaPluginPersistState)
