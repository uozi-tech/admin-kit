import { createGettext } from 'vue3-gettext'
import i18n from './language/i18n.json'
import translations from './language/translations.json'

const gettext = createGettext({
  availableLanguages: i18n,
  defaultLanguage: 'zh_CN',
  translations,
  silent: true,
})

export const { $gettext, $pgettext, $ngettext, $npgettext } = gettext

export default gettext
