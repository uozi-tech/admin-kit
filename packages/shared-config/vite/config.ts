import { URL, fileURLToPath } from 'node:url'
import { loadEnv, UserConfig } from 'vite'
import { configVitePlugins, PluginsCustomOptions } from './plugins'

export async function createApplicationViteConfig(mode: string, root: string, pluginsOptions: PluginsCustomOptions) {
  const env = loadEnv(mode, root, '')
  const plugins = configVitePlugins(pluginsOptions)

  const applicationConfig: UserConfig = {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('src', import.meta.url)),
      },
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue',
        '.less',
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'border-radius-base': '5px',
          },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:9000',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace('/api', ''),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },
    plugins,
  }
  return applicationConfig
}
