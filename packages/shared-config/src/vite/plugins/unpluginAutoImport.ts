import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export function createAutoImportPluginConfig(customConfig?: AutoImportOptions): PluginOption {
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
    vueTemplate: true,
    eslintrc: {
      enabled: true,
      // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
      filepath: './.eslint-auto-import.mjs',
    },
    ...customConfig,
  })
}
