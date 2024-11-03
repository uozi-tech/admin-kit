import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { createVueDevToolsPluginConfig } from './devTools'
import { createUnoCSSPluginConfig } from './unocss'
import { createAutoImportPluginConfig } from './unpluginAutoImport'
import { createVueComponentsPluginConfig } from './unpluginVueComponents'

export function configVitePlugins(): (PluginOption | PluginOption[])[] {
  const vitePlugins: (PluginOption | PluginOption[])[] = []

  // Add the Vue plugin.
  vitePlugins.push(vue({
    script: {
      defineModel: true,
    },
  }))

  // Add the Vue JSX plugin.
  vitePlugins.push(vueJsx())

  // Add the unplugin-auto-import plugin.
  // https://github.com/antfu/unplugin-auto-import
  vitePlugins.push(createAutoImportPluginConfig())

  // Add the unplugin-vue-components plugin.
  // https://github.com/antfu/unplugin-vue-components
  vitePlugins.push(createVueComponentsPluginConfig())

  // Add the UnoCSS plugin.
  vitePlugins.push(createUnoCSSPluginConfig())

  // Add the vue dev tools plugin
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  vitePlugins.push(createVueDevToolsPluginConfig())

  return vitePlugins
}
