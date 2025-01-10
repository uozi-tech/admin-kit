<script setup lang="ts">
import type { Languages, LanguageValue } from '../props'
import { Select, SelectOption } from 'ant-design-vue'
import { isArray, isObject } from 'lodash-es'
import { computed, ref } from 'vue'

const props = defineProps<{
  currentLanguage?: LanguageValue
  languages?: Languages
}>()

const emit = defineEmits(['changeLanguage'])

const AvailableLanguages = computed(() => {
  if (isArray(props.languages)) {
    // 格式化为 key-value 对象
    const languageMap: Record<string, LanguageValue> = {}
    props.languages.forEach((language) => {
      languageMap[language] = language
    })
    return languageMap
  }
  if (isObject(props.languages))
    return props.languages

  return {}
})

const currentSelectedLanguage = ref(props.currentLanguage)

function changeLanguage() {
  document.documentElement.setAttribute('lang', currentSelectedLanguage.value as string)
  emit('changeLanguage', currentSelectedLanguage.value)
}
</script>

<template>
  <Select
    v-model:value="currentSelectedLanguage"
    size="small"
    class="min-w-60px"
    :dropdown-match-select-width="false"
    @select="changeLanguage"
  >
    <SelectOption
      v-for="(language, key) in AvailableLanguages"
      :key="key"
      :value="key"
    >
      {{ language }}
    </SelectOption>
  </Select>
</template>

<style scoped>
:deep(.ant-select-dropdown .ant-select-item) {
  min-height: 24px !important;
  padding: 2px 12px !important;
}
</style>
