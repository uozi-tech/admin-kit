import type { PluginOption } from 'vite'
import vue, { Options as VueOptions } from '@vitejs/plugin-vue'
import vueJsx, { Options as JsxOptions } from '@vitejs/plugin-vue-jsx'
import { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { Options as VueComponentsOptions } from 'unplugin-vue-components'
import { VitePluginConfig as UnocssOptions } from './unocss'
import { VitePluginVueDevToolsOptions as DevToolOptions } from 'vite-plugin-vue-devtools'

import { createVueDevToolsPluginConfig } from './devTools'
import { createUnoCSSPluginConfig } from './unocss'
import { createAutoImportPluginConfig } from './unpluginAutoImport'
import { createVueComponentsPluginConfig } from './unpluginVueComponents'

export interface PluginsCustomOptions {
  vue?: VueOptions
  vueJsx?: JsxOptions
  autoImport?: AutoImportOptions
  vueComponents?: VueComponentsOptions
  unocss?: UnocssOptions
  devTools?: DevToolOptions
}

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
  vitePlugins.push(vueJsx(pluginOptions.vueJsx))

  // Add the unplugin-auto-import plugin.
  // https://github.com/antfu/unplugin-auto-import
  vitePlugins.push(createAutoImportPluginConfig(pluginOptions.autoImport))

  // Add the unplugin-vue-components plugin.
  // https://github.com/antfu/unplugin-vue-components
  vitePlugins.push(createVueComponentsPluginConfig(pluginOptions.vueComponents))

  // Add the UnoCSS plugin.
  vitePlugins.push(createUnoCSSPluginConfig(pluginOptions.unocss))

  // Add the vue dev tools plugin
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  vitePlugins.push(createVueDevToolsPluginConfig(pluginOptions.devTools))

  return vitePlugins
}
