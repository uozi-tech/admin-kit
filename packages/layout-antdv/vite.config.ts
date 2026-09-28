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
      rolldownOptions: {
        output: {
          exports: 'named',
        },
        external: [
          'vue',
          'vue-router',
          'antdv-next',
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
      server: {
        deps: {
          // antdv-next pulls in @v-c packages with extensionless ESM
          // subpath imports; inline them so Vite resolves those.
          inline: [/[\\/]antdv-next[\\/]/, /[\\/]@v-c[\\/]/],
        },
      },
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
