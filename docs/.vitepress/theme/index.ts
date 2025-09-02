import type { Theme } from 'vitepress'
import { createCurdConfig } from '@uozi-admin/curd'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
// import 'virtual:uno.css'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // 配置CURD组件的i18n
    app.use(createCurdConfig({}))

    // 在 SSR 环境中使用 createMemoryHistory，在客户端使用 createWebHistory
    const history = typeof window !== 'undefined'
      ? createWebHistory()
      : createMemoryHistory()

    app.use(createRouter({
      history,
      routes: [],
    }))
  },
} satisfies Theme
