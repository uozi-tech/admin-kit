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
          'xlsx',
          'ant-design-vue',
          'ant-design-vue/es/config-provider/context',
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
