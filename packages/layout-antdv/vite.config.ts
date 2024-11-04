import { createViteConfig } from '@uozi-admin/shared-config/vite'
import dts from "vite-plugin-dts";

export default createViteConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue', 'ant-design-vue', 'lodash-es', '@ant-design/icons-vue', 'vue-router'],
      },
    },
    plugins: [
      dts({
        include: ['./src/**/*.ts'],
      }),
    ]
  },
})
