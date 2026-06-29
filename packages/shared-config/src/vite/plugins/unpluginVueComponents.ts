import type { Options as VueComponentsOptions } from 'unplugin-vue-components'
import type { PluginOption } from 'vite'
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'

const dotGitPathRegex = /[\\/]\.git[\\/]/
const dotNuxtPathRegex = /[\\/]\.nuxt[\\/]/
const nodeModulesPathRegex = /[\\/]node_modules[\\/]/
const vueFileRegex = /\.vue$/
const vueQueryRegex = /\.vue\?vue/

export function createVueComponentsPluginConfig(customConfig?: VueComponentsOptions): PluginOption {
  return Components({
    extensions: ['vue'],
    include: [vueFileRegex, vueQueryRegex],
    dts: 'components.d.ts',
    exclude: [nodeModulesPathRegex, dotGitPathRegex, dotNuxtPathRegex],
    resolvers: [
      AntdvNextResolver(),
    ],
    ...customConfig,
  }) as PluginOption
}
