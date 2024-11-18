import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { PluginsCustomOptions } from './index'

export function createVueComponentsPluginConfig(customConfig?: PluginsCustomOptions['vueComponents']): PluginOption {
  return Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'components.d.ts',
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      AntDesignVueResolver({ importStyle: false }),
    ],
    ...customConfig,
  })
}
