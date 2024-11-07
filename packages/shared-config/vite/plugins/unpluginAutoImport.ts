import AutoImport from 'unplugin-auto-import/vite'
import type { PluginOption } from 'vite'
import { Options } from 'unplugin-auto-import/types'

export function createAutoImportPluginConfig(customConfig?: Options): PluginOption {
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
