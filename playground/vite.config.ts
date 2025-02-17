import { fileURLToPath } from 'node:url'
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  overrides: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 10067,
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
