<script setup lang="ts">
import type { SelectorConfig } from '../../types'
import { Form, Modal, Select } from 'ant-design-vue'
import { get, isArray } from 'lodash-es'
import { computed, nextTick, ref, watchEffect, withDefaults } from 'vue'
import StdTable from '../StdTable.vue'

const props = withDefaults(
  defineProps<SelectorConfig & { placeholder?: string | number }>(),
  {
    valueKey: 'id',
    selectionType: 'radio',
  },
)
const value = defineModel<any>('value')

const dataColumns = computed(() => {
  return props.columns.filter(item => item.pure)
})

Form.useInjectFormItemContext()

const visible = ref(false)
const selectedRowKeys = ref<any[]>([])
const selectedRows = ref<any[]>([])
const options = computed(() => {
  return selectedRows.value.map(item => ({
    label: props.labelRender ? props.labelRender(item) : get(item, props.displayKey ?? props.valueKey),
    value: get(item, props.valueKey),
  }))
})

function setValue() {
  if (props.selectionType === 'radio') {
    value.value = selectedRowKeys.value[0]
  }
  else {
    value.value = selectedRowKeys.value
  }
  visible.value = false
}

function removeValue(v) {
  if (props.selectionType === 'radio') {
    value.value = undefined
  }
  else {
    value.value = value.value.filter(item => item !== v)
  }
}

watchEffect(async () => {
  if (props.selectionType === 'checkbox') {
    if (!isArray(value.value)) {
      if (value.value) {
        value.value = [value.value]
      }
      else {
        value.value = []
      }
    }
    selectedRowKeys.value = value.value
  }
  else {
    selectedRowKeys.value = []
  }
  await nextTick()
  if (value.value.length > 0) {
    const { data } = await props.getListApi?.({ ...props.overwriteParams, id: value.value })
    selectedRows.value = data
  }
})

function clickInput() {
  if (props.disabled) {
    return
  }
  visible.value = true
}
</script>

<template>
  <div>
    <div @click="clickInput">
      <Select
        v-model:value="value"
        :disabled
        class="min-w-184px"
        :options="options"
        :dropdown-menu-style="{ display: 'none' }"
        mode="tags"
        popup-class-name="selector"
        :get-popup-container="node => node.parentNode"
        @deselect="removeValue"
      />
    </div>
    <Modal
      v-model:open="visible"
      :mask="false"
      :cancel-text="$gettext('Close')"
      :ok-text="$gettext('Ok')"
      :title="$gettext('Selector')"
      :width="modalWidth || 800"
      destroy-on-close
      @ok="setValue"
    >
      {{ tips }}
      <StdTable
        v-model:selected-row-keys="selectedRowKeys"
        v-model:selected-rows="selectedRows"
        :columns="dataColumns"
        :get-list-api="getListApi"
        only-query
        disable-router-query
        :row-selection-type="selectionType"
        :table-props="{
          rowKey: props.valueKey,
          ...tableProps,
        }"
        :overwrite-params="overwriteParams"
      />
    </Modal>
  </div>
</template>

<style scoped>
:deep(.selector) {
  display: none!important;
}
</style>
