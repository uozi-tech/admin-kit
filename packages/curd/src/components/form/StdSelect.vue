<script setup lang="ts">
import type { SelectConfig } from '../../types'
import { Select } from 'antdv-next'
import { ref, watch } from 'vue'
import { getPopupContainer } from '../../utils'
import { isFunction } from 'lodash-es';

const p = defineProps<{
  props?: Omit<SelectConfig, 'defaultValue'>
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<SelectConfig['value']>('value')

const options = ref()

async function computedOptions() {
  if (p.props?.remote) {
    const { valueKey, labelKey, api } = p.props.remote
    const resp = await api()
    options.value = resp.data.map(item => ({
      label: item[labelKey],
      value: item[valueKey],
    }))
    return
  }
  if (p.props?.mask) {
    options.value = Object.entries(p.props.mask).map(([v, label]) => ({
      label: isFunction(label) ? label() : label,
      value: p.props?.maskIsNumberKey ? Number(v) : v,
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
    :styles="{
      root: {
        minWidth: '120px',
        width: '100%',
      },
    }"
    :dropdown-match-select-width="false"
    :get-popup-container="getPopupContainer"
    allow-clear
    :placeholder
    :disabled
    v-bind="props"
    :options="options"
  />
</template>
