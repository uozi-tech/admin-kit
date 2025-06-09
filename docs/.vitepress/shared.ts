import type { DefaultTheme } from 'vitepress'
import * as path from 'node:path'
// import AutoImport from 'unplugin-auto-import/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
// import { createUnoCSSPluginConfig } from './unocss'

export default defineConfig({
  base: '/admin-kit/',
  title: 'Admin Kit',
  head: [
    ['link', { rel: 'icon', href: './logo.svg' }],
  ],

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uozi-tech/admin-kit' },
    ],
  } as DefaultTheme.Config,
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../demos'),
      })
    },
  },
  vite: {
    plugins: [
      // AutoImport({
      //   imports: ['vue', 'vue-router', 'pinia'],
      //   vueTemplate: true,
      //   eslintrc: {
      //     enabled: true,
      //   },
      // }),
      // Components({
      //   resolvers: [AntDesignVueResolver({ importStyle: false })],
      //   directoryAsNamespace: true,
      // }),
      // createUnoCSSPluginConfig(),
    ],
  },
})
