<script setup lang="ts">
import type { StdFormConfig, StdTableColumn } from '../types'
import { Form, FormItem } from 'ant-design-vue'
import { getColumnKey } from '../utils/util'
import FormControllerRender from './StdFormController.vue'

defineProps<{
  columns: StdTableColumn[]
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })

function getConfig(c: StdTableColumn) {
  if (c.search === true) {
    return c.edit
  }
  return c.search as StdFormConfig
}
</script>

<template>
  <Form
    class="flex flex-wrap gap-y-4"
    :model="formData"
    label-width="auto"
    layout="inline"
  >
    <FormItem
      v-for="c in columns"
      :key="getColumnKey(c)"
      :label="getConfig(c)?.formItem?.label ?? c.title"
      :name="`${getConfig(c)?.formItem?.name ?? c.dataIndex}__search`"
    >
      <FormControllerRender
        v-model:form-data="formData"
        :column="c"
        :form-config-key="c.search === true ? 'edit' : 'search'"
      />
    </FormItem>
    <slot
      name="extra"
      :form-data="formData"
    />
  </Form>
</template>

<style scoped>
</style>
