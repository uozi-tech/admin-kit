<script setup lang="ts">
import type { SelectorConfig } from '../../types'
import { Form, Modal, Select } from 'ant-design-vue'
import { get, isArray } from 'lodash-es'
import { computed, ref, watchEffect, withDefaults } from 'vue'
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
const selectedRowKeys = ref()
const selectedRows = ref([])
const options = computed(() => {
  return selectedRows.value.map(item => ({
    label: get(item, props.displayKey ?? props.valueKey),
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

watchEffect(() => {
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
})
</script>

<template>
  <div>
    <div @click="visible = true">
      <Select
        v-model:value="selectedRowKeys"
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
      />
    </Modal>
  </div>
</template>

<style scoped>
:deep(.selector) {
  display: none!important;
}
</style>
