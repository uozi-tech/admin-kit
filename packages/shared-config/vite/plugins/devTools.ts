import type { PluginOption } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { PluginsCustomOptions } from './index'

export function createVueDevToolsPluginConfig(customConfig?: PluginsCustomOptions['devTools']): PluginOption {
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  return VueDevTools(customConfig)
}
