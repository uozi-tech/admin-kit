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
          'ant-design-vue',
          '@ant-design/icons-vue',
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
