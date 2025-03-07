import type { PluginOption } from 'vite'
import type { PluginsCustomOptions } from '../../types'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { createVueDevToolsPluginConfig } from './devTools'
import { createUnoCSSPluginConfig } from './unocss'
import { createAutoImportPluginConfig } from './unpluginAutoImport'
import { createVueComponentsPluginConfig } from './unpluginVueComponents'

export function configVitePlugins(pluginOptions: PluginsCustomOptions = {}): (PluginOption | PluginOption[])[] {
  const vitePlugins: (PluginOption | PluginOption[])[] = []

  // Add the Vue plugin.
  vitePlugins.push(vue({
    script: {
      defineModel: true,
    },
    ...pluginOptions.vue,
  }))

  // Add the Vue JSX plugin.
  pluginOptions.vueJsx !== false && vitePlugins.push(vueJsx(pluginOptions.vueJsx))

  // Add the unplugin-auto-import plugin.
  // https://github.com/antfu/unplugin-auto-import
  pluginOptions.autoImport !== false && vitePlugins.push(createAutoImportPluginConfig(pluginOptions.autoImport))

  // Add the unplugin-vue-components plugin.
  // https://github.com/antfu/unplugin-vue-components
  pluginOptions.vueComponents !== false && vitePlugins.push(createVueComponentsPluginConfig(pluginOptions.vueComponents))

  // Add the UnoCSS plugin.
  pluginOptions.unocss !== false && vitePlugins.push(createUnoCSSPluginConfig(pluginOptions.unocss))

  // Add the vue dev tools plugin
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  pluginOptions.devTools !== false && vitePlugins.push(createVueDevToolsPluginConfig(pluginOptions.devTools))

  return vitePlugins
}
