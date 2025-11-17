import type { PluginOption } from 'vite'
import type { VitePluginVueDevToolsOptions as DevToolOptions } from 'vite-plugin-vue-devtools'

export async function createVueDevToolsPluginConfig(customConfig?: DevToolOptions): Promise<PluginOption> {
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  // 使用动态导入避免在配置加载阶段就访问 localStorage
  // @vue/devtools-kit 在模块级别就会尝试访问 localStorage，导致 CI 环境报错
  const VueDevTools = await import('vite-plugin-vue-devtools').then(m => m.default)
  return VueDevTools({
    launchEditor: 'code',
    ...customConfig,
  })
}
