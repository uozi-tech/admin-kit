<script setup lang="ts">
import { StdTableColumn } from '../types'
import { inject } from 'vue'
import { FormControllerRender } from '../renderers/FormControllerRender'
import { getColumnKey } from '../utils/util'

const props = defineProps<{
  labelAlign?: 'left' | 'right'
  columns: StdTableColumn[]
  layout?: 'horizontal' | 'vertical' | 'inline'
}>()

const formData = defineModel<Record<string, any>>('data', { default: {} })
const lang = inject('lang', 'en')

const formRef = ref()
defineExpose({
  'formRef': formRef,
})
</script>

<template>
  <AForm
    ref="formRef"
    :model="formData"
    label-width="auto"
    :label-align="labelAlign ?? 'left'"
    :layout="props.layout ?? 'vertical'"
  >
    <AFormItem
      v-for="c in props.columns"
      :key="getColumnKey(c)"
      :column="c"
      style="margin-bottom: 12px;"
      v-bind="c.edit?.formItem"
      :label="c.edit?.formItem?.label ?? c.title"
      :rules="c.edit?.formItem?.rules"
      :required="c.edit?.formItem?.required"
      :name="c.edit?.formItem?.name ?? c.dataIndex"
    >
      <FormControllerRender
        :lang="lang"
        :column="c"
        :form-data="formData"
      />
    </AFormItem>
  </AForm>
</template>
