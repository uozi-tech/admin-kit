import { fileURLToPath, URL } from 'node:url'
import { createViteConfig } from '@uozi-admin/shared-config'
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default createViteConfig({
  overrides: ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
      server: {
        port: Number(env.VITE_PORT) || 6001,
        proxy: {
          '/api': {
            target: env.VITE_PROXY_TARGET || 'http://localhost:9003',
            changeOrigin: true,
            secure: false,
            ws: true,
            rewrite: path => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  },
  pluginOptions: {
    devTools: false,
    autoImport: {
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '~/language/gettext': [
            '$gettext',
            '$pgettext',
            '$ngettext',
            '$npgettext',
          ],
        },
      ],
    },
  },
})
