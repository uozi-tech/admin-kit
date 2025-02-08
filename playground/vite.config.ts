import { fileURLToPath } from 'node:url'
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  overrides: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '~layout-antdv': fileURLToPath(new URL('../packages/layout-antdv/src', import.meta.url)),
        '~curd': fileURLToPath(new URL('../packages/curd/src', import.meta.url)),
      },
    },
  },
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
