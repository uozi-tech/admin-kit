<script setup lang="ts">
import type { StdTableColumn } from '../types'
import { Col, Form, FormItem, Row } from 'ant-design-vue'
import { getColumnKey, getSearchLabel } from '../utils'
import FormControllerRender from './StdFormController.vue'

defineProps<{
  columns: StdTableColumn[]
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })

function getConfig(c: StdTableColumn) {
  if (c.search === false) {
    return null
  }
  if (c.search === true) {
    return c.edit
  }
  if (typeof c.search === 'object' && !c.search.type) {
    c.search.type = c.edit?.type
  }
  return c.search
}
</script>

<template>
  <Form
    class="flex flex-wrap gap-y-4"
    :model="formData"
    label-width="auto"
    layout="inline"
  >
    <Row>
      <Col
        v-for="c in columns"
        :key="getColumnKey(c)"
        v-bind="getConfig(c)?.col"
      >
        <FormItem
          :label="getSearchLabel(c)"
          :name="`${getConfig(c)?.formItem?.name ?? c.dataIndex}__search`"
        >
          <FormControllerRender
            v-model:form-data="formData"
            :column="c"
            :form-config-key="c.search === true ? 'edit' : 'search'"
          />
        </FormItem>
      </Col>
    </Row>
    <slot
      name="extra"
      :form-data="formData"
    />
  </Form>
</template>

<style scoped>
</style>
