import type { UserConfig } from 'vite'
import type { PluginsCustomOptions } from '../types'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { configVitePlugins } from './plugins'

export async function createApplicationViteConfig(mode: string, root: string, pluginsOptions: PluginsCustomOptions): Promise<UserConfig> {
  const env = loadEnv(mode, root, '')
  const plugins = configVitePlugins(pluginsOptions)

  const applicationConfig: UserConfig = {
    resolve: {
      alias: {
        '~': resolve(root, 'src'),
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
          rewrite: path => path.replace(env.VITE_API_ROOT || '/api', ''),
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
