import { createGettext } from 'vue3-gettext'
import i18n from './i18n.json'
import translations from './translations.json'

const gettext = createGettext({
  availableLanguages: i18n,
  defaultLanguage: 'zh_CN',
  translations,
  silent: true,
})

export const {
  $gettext,
  $pgettext,
  $ngettext,
  $npgettext,
} = gettext

export default gettext
