import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  overrides: {},
  pluginOptions: {
    vueComponents: false,
    autoImport: false,
  },
})
