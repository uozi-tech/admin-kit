import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  pluginOptions: {
    vueComponents: false,
    autoImport: false,
  },
})
