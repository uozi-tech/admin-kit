<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import type { StdTableColumn } from '../types'
import { FormItem } from 'ant-design-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getFormErrors } from '../constants/formErrors'

const props = defineProps<Props>()
const FormErrors = getFormErrors()
const { t } = useI18n()
export interface Props {
  dataIndex?: StdTableColumn['dataIndex']
  label?: string
  extra?: string
  hint?: string | (() => string)
  error?: {
    [key: string]: string
  }
  required?: boolean
  noValidate?: boolean
}

const tag = computed(() => {
  return props.error?.[props.dataIndex!.toString()] ?? ''
})

// const valid_status = computed(() => {
//   if (tag.value)
//     return 'error'
//   else return 'success'
// })

const help = computed(() => {
  const rules = tag.value.split(',')

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
    :name="dataIndex as string"
    :label="label"
    :help="help"
    :rules="{ required, validator }"
    :validate-status="tag ? 'error' : undefined"
    :auto-link="false"
  >
    <slot />
  </FormItem>
</template>

<style scoped lang="less">

</style>
