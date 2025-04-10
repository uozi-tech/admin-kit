import { useI18n } from 'vue-i18n'

export function getFormErrors() {
  const { t } = useI18n()
  return {
    required: () => t('This field should not be empty'),
    email: () => t('This field should be a valid email address'),
    db_unique: () => t('This value is already taken'),
    hostname: () => t('This field should be a valid hostname'),
    safety_text: () => t('This field should only contain letters, unicode characters, numbers, and -_.'),
  }
}
