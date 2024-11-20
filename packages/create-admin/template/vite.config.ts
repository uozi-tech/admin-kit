import { createViteConfig } from '@uozi-admin/shared-config'

// https://vite.dev/config/
export default createViteConfig({
  override: {},
  plugins: {
    autoImport: {
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '~/language/gettext': [
            '$gettext',
            '$pgettext',
            '$ngettext',
            '$npgettext',
          ],
        },
      ],
    },
    unocss: {
      shortcuts: {
        'common-bg': 'bg-gray-100 dark:bg-gray-900',
        'bg-base': 'bg-white dark:bg-[#141414]',
      },
    },
  },
})
