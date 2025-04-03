import { createCurdConfig } from '@uozi-admin/curd'
import { setAppConfig } from '@uozi-admin/layout-antdv'
import { createApp } from 'vue'
import gettext from '~/language/gettext'
import router from '~/router'
import { store } from '~/store'
import App from './App.vue'
import './style.css'
import '@uozi-admin/curd/dist/index.css'
import '@uozi-admin/layout-antdv/dist/index.css'
import 'virtual:uno.css'

setAppConfig({
  siteTitle: 'Uozi Admin',
  copyright: `Copyright © 2024 - ${new Date().getFullYear()} Uozi Tech`,
})

createApp(App)
  .use(createCurdConfig({
    // 可选，如果你需要自定义分页字段
    listApi: {
      paginationMap: {
        params: {
          current: 'page',
          pageSize: 'page_size',
        },
        response: {
          total: 'total',
          current: 'current_page',
          pageSize: 'per_page',
          totalPages: 'total_pages',
        },
      },
    },
    // 可选，如果你需要自定义国际化
    // i18n: {
    //   legacy: false,
    //   locale: 'zh-CN',
    //   fallbackLocale: 'en-US',
    //   messages: {
    //     'zh-CN': 'your-zh-CN-messages',
    //     'zh-HK': 'your-zh-HK-messages',
    //     'zh-TW': 'your-zh-TW-messages',
    //     'en-US': 'your-en-US-messages',
    //   },
    // },
    // 可选
    time: {
      // 时间字段是否是 timestamp 类型
      timestamp: true,
    },
    // 可选
    selector: {
      // 忽略 '0' 的字符串
      omitZeroString: true,
    },
  }))
  .use(store)
  .use(gettext)
  .use(router)
  .mount('#app')
