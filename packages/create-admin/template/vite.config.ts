import { createViteConfig } from '@uozi-admin/shared-config'

// https://vite.dev/config/
export default createViteConfig({
  overrides: {},
  pluginOptions: {
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
  },
})
