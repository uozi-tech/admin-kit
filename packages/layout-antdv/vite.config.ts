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
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        output: {
          exports: 'named',
        },
        external: ['vue', 'ant-design-vue', 'lodash-es', '@ant-design/icons-vue', 'vue-router'],
      },
    },
    plugins: [
      dts({
        rollupTypes: true,
      }),
    ],
  },
})
