import { createViteConfig } from '@uozi-admin/shared-config/vite'
import dts from 'vite-plugin-dts'

export default createViteConfig({
  overrides: {
    build: {
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
        external: ['vue', 'ant-design-vue', 'lodash-es', '@ant-design/icons-vue'],
      },
    },
    plugins: [
      dts({
        entryRoot: './src',
        include: ['./src/**/*.ts'],
      }),
    ],
  },
})
