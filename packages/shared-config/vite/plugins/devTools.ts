import type { PluginOption } from 'vite'
import type { VitePluginVueDevToolsOptions as DevToolOptions } from 'vite-plugin-vue-devtools'
import VueDevTools from 'vite-plugin-vue-devtools'

export function createVueDevToolsPluginConfig(customConfig?: DevToolOptions): PluginOption {
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  return VueDevTools(customConfig)
}
