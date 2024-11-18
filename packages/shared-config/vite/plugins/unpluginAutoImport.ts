import AutoImport from 'unplugin-auto-import/vite'
import type { PluginOption } from 'vite'
import { PluginsCustomOptions } from './index'

export function createAutoImportPluginConfig(customConfig?: PluginsCustomOptions['autoImport']): PluginOption {
  // https://github.com/antfu/unplugin-auto-import
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
    ],
    ignoreDts: [
      /^ignore_/,
    ],
    dirs: [
      'src/composables',
      'src/components',
      'src/store',
    ],
    vueTemplate: true,
    eslintrc: {
      enabled: true,
      // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
      filepath: './.eslint-auto-import.mjs',
    },
    ...customConfig,
  })
}
