<script setup lang="ts">
import type { SelectConfig } from '../../types'
import { Select } from 'ant-design-vue'
import { isNumber } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import { getPopupContainer } from '../../utils'

const p = defineProps<{
  props?: Omit<SelectConfig, 'defaultValue'>
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<SelectConfig['value']>('value')

const options = ref()

const isNumberValue = computed(() => isNumber(value.value))

async function computedOptions() {
  if (p.props?.remote) {
    const { valueKey, labelKey, api } = p.props.remote
    const resp = await api()
    options.value = resp.data.map(item => ({
      label: item[labelKey],
      value: isNumberValue.value ? Number(item[valueKey]) : item[valueKey],
    }))
    return
  }
  if (p.props?.mask) {
    options.value = Object.entries(p.props.mask).map(([v, label]) => ({
      label,
      value: isNumberValue.value ? Number(v) : v,
    }))
    return
  }
  options.value = p.props?.options
}

watch([value, () => p.props], computedOptions, { immediate: true, deep: true })
</script>

<template>
  <Select
    v-model:value="value as any"
    class="min-w-180px"
    :dropdown-match-select-width="false"
    :get-popup-container="getPopupContainer"
    allow-clear
    :placeholder
    :disabled
    v-bind="props"
    :default-value="undefined"
    :options="options"
  />
</template>
