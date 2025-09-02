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

  // Redirect old documentation URLs to new structure
  rewrites: {
    'zh/curd/introduction.md': 'zh/curd/index.md',
    'zh/curd/quick-start.md': 'zh/curd/getting-started.md',
    'zh/curd/basic-concepts.md': 'zh/curd/fundamentals/concepts.md',
    'zh/curd/std-column.md': 'zh/curd/fundamentals/configuration.md',
    'zh/curd/advance/batch-operations.md': 'zh/curd/advanced/batch-operations.md',
    'zh/curd/advance/custom-form-control.md': 'zh/curd/advanced/customization.md',
    'zh/curd/advance/custom-render.md': 'zh/curd/advanced/customization.md',
    'zh/curd/advance/form-linkage.md': 'zh/curd/advanced/form-interactions.md',
    'zh/curd/advance/global-config.md': 'zh/curd/fundamentals/configuration.md',
    'zh/curd/advance/i18n.md': 'zh/curd/advanced/internationalization.md',
    'zh/curd/core/api.md': 'zh/curd/fundamentals/configuration.md',
    'zh/curd/core/column.md': 'zh/curd/fundamentals/configuration.md',
    'zh/curd/core/form.md': 'zh/curd/components/std-form.md',
    'zh/curd/core/search.md': 'zh/curd/components/std-search.md',
    // Individual form control redirects to consolidated pages
    'zh/curd/form-controls/input.md': 'zh/curd/form-controls/basic-controls.md',
    'zh/curd/form-controls/textarea.md': 'zh/curd/form-controls/basic-controls.md',
    'zh/curd/form-controls/number.md': 'zh/curd/form-controls/basic-controls.md',
    'zh/curd/form-controls/password.md': 'zh/curd/form-controls/basic-controls.md',
    'zh/curd/form-controls/select.md': 'zh/curd/form-controls/selection-controls.md',
    'zh/curd/form-controls/radio-group.md': 'zh/curd/form-controls/selection-controls.md',
    'zh/curd/form-controls/checkbox-group.md': 'zh/curd/form-controls/selection-controls.md',
    'zh/curd/form-controls/cascader.md': 'zh/curd/form-controls/selection-controls.md',
    'zh/curd/form-controls/selector.md': 'zh/curd/form-controls/selection-controls.md',
    'zh/curd/form-controls/date.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/time.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/datetime.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/date-range.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/time-range.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/datetime-range.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/month.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/month-range.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/week.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/week-range.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/year.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/year-range.md': 'zh/curd/form-controls/date-controls.md',
    'zh/curd/form-controls/upload.md': 'zh/curd/form-controls/advanced-controls.md',
    'zh/curd/form-controls/switch.md': 'zh/curd/form-controls/advanced-controls.md',
    'zh/curd/form-controls/slider.md': 'zh/curd/form-controls/advanced-controls.md',
    'zh/curd/form-controls/rate.md': 'zh/curd/form-controls/advanced-controls.md',
    'zh/curd/form-controls/auto-complete.md': 'zh/curd/form-controls/advanced-controls.md',
  },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uozi-tech/admin-kit' },
    ],

    search: {
      provider: 'local',
    },
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
    optimizeDeps: {
      include: [
        'ant-design-vue',
        '@ant-design/icons-vue',
        '@uozi-admin/curd',
        'vue-router',
      ],
      exclude: ['@uozi-admin/curd'],
    },
    ssr: {
      noExternal: ['ant-design-vue', '@ant-design/icons-vue', '@uozi-admin/curd'],
    },
  },
})
