import type { Options as VueComponentsOptions } from 'unplugin-vue-components'
import type { PluginOption } from 'vite'
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'

export function createVueComponentsPluginConfig(customConfig?: VueComponentsOptions): PluginOption {
  return Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'components.d.ts',
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      AntdvNextResolver(),
    ],
    ...customConfig,
  }) as PluginOption
}
