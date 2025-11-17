import type { PluginOption } from 'vite'
import type { VitePluginVueDevToolsOptions as DevToolOptions } from 'vite-plugin-vue-devtools'
import VueDevTools from 'vite-plugin-vue-devtools'

export function createVueDevToolsPluginConfig(customConfig?: DevToolOptions): PluginOption {
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  // 在构建库时或 CI 环境中禁用 DevTools，避免 localStorage 访问错误
  return VueDevTools({
    launchEditor: 'code',
    ...customConfig,
  })
}
