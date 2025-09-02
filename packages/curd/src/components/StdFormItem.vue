<script setup lang="ts">
import type { FormItemProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { StdTableColumn } from '../types'
import { FormItem } from 'ant-design-vue'
import { computed } from 'vue'
import { useLocale } from '../composables'
import { getFormErrors } from '../constants/formErrors'
import { getDataIndexStr } from '../utils'

export interface Props {
  dataIndex?: StdTableColumn['dataIndex']
  label?: string
  extra?: string
  hint?: string | (() => string)
  error?: string
  required?: boolean
  noValidate?: boolean
  formItem?: FormItemProps
}

const props = defineProps<Props>()
const FormErrors = getFormErrors()
const { t } = useLocale()

const help = computed(() => {
  const rules = props.error?.split(',')
  if (!rules)
    return props.hint

  for (const rule of rules) {
    if (FormErrors[rule])
      return FormErrors[rule]()
  }

  return props.hint
})

async function validator(_: Rule, value: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (props.required && !props.noValidate && (!value && value !== 0)) {
      reject(help.value ?? t('This field should not be empty'))

      return
    }

    resolve(true)
  })
}
</script>

<template>
  <FormItem
    :name="getDataIndexStr(dataIndex)"
    :label="label"
    :help="help"
    :rules="{ required, validator }"
    :validate-status="error ? 'error' : undefined"
    :auto-link="false"
    v-bind="formItem"
  >
    <slot />
  </FormItem>
</template>

<style lang="less" scoped>
:deep(.ant-form-item-control-input) {
  min-height: 0;
}
</style>
