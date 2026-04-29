/// <reference types="vite/client" />

import { createViteConfig } from '@uozi-admin/shared-config'
import dts from 'vite-plugin-dts'

export default createViteConfig({
  overrides: {
    build: {
      cssCodeSplit: true,
      lib: {
        entry: 'src/index.ts',
        name: 'Bundle',
        fileName: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          exports: 'named',
        },
        external: [
          'vue',
          'vue-router',
          'vue3-gettext',
          'vue-i18n',
          'xlsx',
          'antdv-next',
          'antdv-next/config-provider/context',
          '@antdv-next/icons',
          'lodash-es',
        ],
      },
    },
    plugins: [
      dts({
        entryRoot: 'src',
        rollupTypes: false,
      }),
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['../../vitest.setup.ts'],
    },
  },
  pluginOptions: {
    vueComponents: false,
    autoImport: false,
    devTools: false, // 禁用 DevTools，避免在构建库时访问 localStorage
    unocss: {
      mode: 'vue-scoped',
    },
  },
})
