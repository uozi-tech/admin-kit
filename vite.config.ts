import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let config = {}
  if (command === 'serve') {
    // 开发环境
    config = {
      root: './packages/playground',
    };
  } else {
    // 构建环境
    config = {
      root: './packages/admin-layout-antdv',
      build: {
        outDir: 'dist',
      },
    };
  }
  return {
    ...config,
    plugins: [
      vue(),
      UnoCSS(),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false })],
        directoryAsNamespace: true,
      }),
      AutoImport({
        imports: ['vue'],
        vueTemplate: true,
        eslintrc: {
          enabled: true,
        },
      }),
    ],
  }
})
