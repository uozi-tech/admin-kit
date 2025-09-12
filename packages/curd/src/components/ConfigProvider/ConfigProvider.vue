<script setup lang="ts">
import type { I18nOptions } from 'vue-i18n'
import type { CurdConfigT } from '../../types'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'
import { assign, merge } from 'lodash-es'
import { onMounted, provide, reactive, watchEffect } from 'vue'
import { createI18n } from 'vue-i18n'
import { CURD_CONFIG_KEY, DEFAULT_CONFIG } from '../../composables'
import { useParentCurdConfig } from '../../composables/useCurdConfig'
import { setGlobalDateFormats } from '../../constants/format'

interface ConfigProviderProps {
  config?: Partial<CurdConfigT>
  initDayjs?: boolean
}

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  config: () => ({}),
  initDayjs: false,
})

onMounted(() => {
  if (props.initDayjs) {
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(relativeTime)
  }
})

// 获取父级配置（如果存在）
const parentConfig = useParentCurdConfig()

// 合并配置：父级配置 -> 默认配置 -> 当前props配置
const mergedConfig = reactive(DEFAULT_CONFIG)

watchEffect(() => {
  assign(mergedConfig, merge({}, DEFAULT_CONFIG, parentConfig, props.config))
})

// 监听配置变化并应用副作用
watchEffect(() => {
  // 应用全局日期格式配置
  if (mergedConfig.dateFormat) {
    setGlobalDateFormats(mergedConfig.dateFormat)
  }

  // 设置 i18n（如果配置了新的 i18n）
  if (mergedConfig.i18n && mergedConfig.i18n !== parentConfig.i18n) {
    createI18n(mergedConfig.i18n as I18nOptions)
  }
})

// 向子组件提供配置
provide(CURD_CONFIG_KEY, mergedConfig)
</script>

<template>
  <slot />
</template>
