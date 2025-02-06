import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  overrides: {},
  pluginOptions: {
    autoImport: {
      dirs: [
        'src/composables',
        'src/components',
        'src/store',
      ],

    },
  },
})
