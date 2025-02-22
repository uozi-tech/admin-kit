<script setup lang="ts">
import type { SelectorConfig } from '../../types'
import { Form, Modal, Select } from 'ant-design-vue'
import { get, isArray } from 'lodash-es'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import StdTable from '../StdTable.vue'

const props = withDefaults(
  defineProps<SelectorConfig & { placeholder?: string | number }>(),
  {
    valueKey: 'id',
    selectionType: 'radio',
  },
)
const emit = defineEmits<{
  (e: 'selectedRecords', records: any[]): void
}>()
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

const { t } = useI18n()

function setValue() {
  if (props.selectionType === 'radio') {
    value.value = selectedRowKeys.value[0]
  }
  else {
    value.value = selectedRowKeys.value
  }
  visible.value = false
  emit('selectedRecords', selectedRows.value)
}

function removeValue(v) {
  if (props.selectionType === 'radio') {
    value.value = undefined
  }
  else {
    value.value = value.value.filter(item => item !== v)
  }
}

async function init() {
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
  const preloadIds: any[] = []
  if (isArray(value.value)) {
    preloadIds.push(...value.value.filter(item => item))
  }
  else {
    // filter out null, undefined
    if (value.value) {
      preloadIds.push(value.value)
    }
  }
  if (preloadIds.length > 0) {
    const { data } = await props.getListApi?.({ ...props.overwriteParams, id: preloadIds })
    selectedRows.value = data
  }
}

watch(() => {
  return {
    value: value.value,
    props,
  }
}, init, { deep: true })

onMounted(init)

function clickInput() {
  if (props.disabled) {
    return
  }
  visible.value = true
}

const computedValue = computed({
  get() {
    if (isArray(value.value)) {
      return value.value
    }
    else if (value.value) {
      return [value.value]
    }
    else {
      return []
    }
  },
  set(v) {
    value.value = v
  },
})
</script>

<template>
  <div>
    <div @click="clickInput">
      <Select
        v-model:value="computedValue"
        :disabled
        class="min-w-184px"
        :options="options"
        :dropdown-menu-style="{ display: 'none' }"
        mode="tags"
        :placeholder="placeholder"
        popup-class-name="selector"
        :get-popup-container="node => node.parentNode"
        @deselect="removeValue"
      />
    </div>
    <Modal
      v-model:open="visible"
      :mask="false"
      :cancel-text="t('close')"
      :ok-text="t('ok')"
      :title="t('selectorTitle')"
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
