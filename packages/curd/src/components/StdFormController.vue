<script setup lang="tsx">
import type { Reactive } from 'vue'
import type { StdTableColumn } from '../types'
import { get, set } from 'lodash-es'
import { ref, watch } from 'vue'
import {
  StdCascader,
  StdCheckbox,
  StdDatePicker,
  StdInput,
  StdInputNumber,
  StdPassword,
  StdRangePicker,
  StdRate,
  StdSelect,
  StdSelector,
  StdSlider,
  StdSwitch,
  StdTimePicker,
  StdUpload,
} from '../components/form'
import { placeholder } from '../utils/helper'
import { isFunction, isPlainObject } from '../utils/util'
import StdTextarea from './form/StdTextarea.vue'

const p = defineProps<{
  formData: Reactive<Record<string, any>>
  column: StdTableColumn
  formConfigKey?: 'edit' | 'search'
}>()

function Render() {
  const { dataIndex } = p.column

  let formConfig = p.column.edit as any

  if (p.formConfigKey === 'search' && isPlainObject(p.column.search)) {
    formConfig = p.column.search
  }

  placeholder(p.column, formConfig)
  if (isFunction(formConfig?.type)) {
  // Support custom render function
    return formConfig?.type(p.formData, p.column, formConfig?.customComponent)
  }
  else if (isPlainObject(formConfig?.type) && formConfig?.type?.__name) {
  // Support custom component, but need to pass column to component and define model for it
    return (
      <formConfig.type
        v-model:value={p.formData[formConfig?.formItem?.name ?? dataIndex]}
        column={p.column}
        {...formConfig?.customComponent}
      />
    )
  }
  else {
    const valueKey = formConfig?.valueKey ?? formConfig?.formItem?.name ?? dataIndex
    const value = ref()

    // 接受外部数据
    watch(() => p.formData, (v) => {
      value.value = get(v, valueKey) ?? formConfig?.defaultValue
    }, { deep: true, immediate: true })

    // 回传 form 表单数据
    watch(value, (v) => {
      set(p.formData, valueKey, v)
    })

    switch (formConfig?.type) {
      case 'input':
        return <StdInput v-model:value={value.value} props={formConfig?.input} />
      case 'inputNumber':
        return <StdInputNumber v-model:value={value.value} props={formConfig?.inputNumber} />
      case 'textarea':
        return <StdTextarea v-model:value={value.value} props={formConfig?.textarea} />
      case 'password':
        return <StdPassword v-model:value={value.value} props={formConfig?.password} />
      case 'select':
        return (
          <StdSelect
            v-model:value={value.value}
            props={formConfig?.select}
          />
        )
      case 'cascader':
        return <StdCascader v-model:value={value.value} props={formConfig?.cascader} />
      case 'checkbox':
        return <StdCheckbox v-model:checked={value.value} props={formConfig?.checkbox} />
      case 'date':
      case 'datetime':
      case 'year':
      case 'month':
      case 'week':
        return (
          <StdDatePicker
            v-model:value={value.value}
            props={formConfig[formConfig?.type]}
            type={formConfig.type}
          />
        )
      case 'time':
        return (
          <StdTimePicker
            v-model:value={value.value}
            props={formConfig?.time as any}
          />
        )
      case 'dateRange':
      case 'datetimeRange':
      case 'yearRange':
      case 'monthRange':
      case 'weekRange':
      case 'timeRange': {
        const pickerType = formConfig?.type?.replace('Range', '')

        return (
          <StdRangePicker
            v-model:value={value.value}
            props={{ ...formConfig[formConfig?.type], placeholder: undefined }}
            type={pickerType}
          />
        )
      }
      case 'switch':
        return <StdSwitch v-model:checked={value.value} props={formConfig?.switch} />
      case 'slider':
        return (
          <div style="padding: 0 6px">
            <StdSlider v-model:value={value.value} props={formConfig?.slider} />
          </div>
        )
      case 'rate':
        return <StdRate v-model:value={value.value} props={formConfig?.rate} />
      case 'upload': {
        return <StdUpload v-model:value={value.value} />
      }
      case 'selector': {
        return <StdSelector v-model:value={value.value} {...formConfig?.selector} />
      }
      default:
        return null
    }
  }
}
</script>

<template>
  <Render />
</template>
