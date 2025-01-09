import { createGettext } from 'vue3-gettext'
import i18n from './i18n.json'
import translations from './translations.json'

export const gettext = createGettext({
  availableLanguages: i18n,
  defaultLanguage: 'zh-cn',
  translations,
  silent: true,
})

export const {
  $gettext,
  $pgettext,
  $ngettext,
  $npgettext,
} = gettext
