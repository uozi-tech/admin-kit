import type { Options as VueOptions } from '@vitejs/plugin-vue'
import type { Options as JsxOptions } from '@vitejs/plugin-vue-jsx'
import type { UserConfig } from 'unocss'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { Options as VueComponentsOptions } from 'unplugin-vue-components'
import type { UserConfigExport } from 'vite'
import type { VitePluginVueDevToolsOptions as DevToolOptions } from 'vite-plugin-vue-devtools'

interface BaseVitestConfig {
  test?: unknown
}

type VitestConfig = typeof import('vitest/config')['UserConfig'] extends never
  ? BaseVitestConfig
  : typeof import('vitest/config')['UserConfig']

// 扩展 Vite 原生配置类型
declare module 'vite' {
  interface UserConfig extends UserConfigExport {
    test?: VitestUserConfig['test'] // 直接从 Vitest 类型中提取
  }
}

export interface UnocssOptions extends UserConfig {
  inspector?: boolean
  mode?: 'global' | 'per-module' | 'vue-scoped' | 'dist-chunk' | 'shadow-dom'
  transformCSS?: boolean | 'pre' | 'post'
  postcss?: boolean
  hmrTopLevelAwait?: boolean
  fetchMode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin'
}

export interface PluginsCustomOptions {
  vue?: VueOptions | false
  vueJsx?: JsxOptions | false
  autoImport?: AutoImportOptions | false
  vueComponents?: VueComponentsOptions | false
  unocss?: UnocssOptions | false
  devTools?: DevToolOptions | false
}
