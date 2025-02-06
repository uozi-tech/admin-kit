import type { Options as VueComponentsOptions } from 'unplugin-vue-components'
import type { PluginOption } from 'vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function createVueComponentsPluginConfig(customConfig?: VueComponentsOptions): PluginOption {
  return Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'components.d.ts',
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      AntDesignVueResolver({ importStyle: false, resolveIcons: true }),
    ],
    ...customConfig,
  })
}
