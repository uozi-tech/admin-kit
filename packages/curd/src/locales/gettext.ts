import { createGettext } from 'vue3-gettext'
import i18n from './i18n.json'
import translations from './translations.json'

type Gettext = ReturnType<typeof createGettext>

export const gettext: Gettext = createGettext({
  availableLanguages: i18n,
  defaultLanguage: 'zh-cn',
  translations,
  silent: true,
})

export const $gettext: Gettext['$gettext'] = gettext.$gettext
export const $pgettext: Gettext['$pgettext'] = gettext.$pgettext
export const $ngettext: Gettext['$ngettext'] = gettext.$ngettext
export const $npgettext: Gettext['$npgettext'] = gettext.$npgettext
