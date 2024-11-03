import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { Options } from 'unplugin-vue-components/types'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export function createVueComponentsPluginConfig(customConfig?: Options): PluginOption {
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
