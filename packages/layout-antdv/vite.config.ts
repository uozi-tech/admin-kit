import { fileURLToPath, URL } from 'node:url'
import { createViteConfig } from '@uozi-admin/shared-config'
import dts from 'vite-plugin-dts'

export default createViteConfig({
  overrides: {
    resolve: {
      alias: {
        '~layout-antdv': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
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
          'ant-design-vue',
          '@ant-design/icons-vue',
          'lodash-es',
        ],
      },
    },
    plugins: [
      dts(),
    ],
  },
  pluginOptions: {
    vueComponents: false,
    autoImport: false,
    unocss: {
      mode: 'vue-scoped',
    },
  },
})
