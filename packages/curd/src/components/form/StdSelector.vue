<script setup lang="ts">
import type { SelectorConfig } from '../../types'
import { Form, Modal, Select } from 'ant-design-vue'
import { get } from 'lodash-es'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import useCurdConfig from '../../composables/useCurdConfig'
import StdTable from '../StdTable.vue'

const props = withDefaults(
  defineProps<SelectorConfig & { placeholder?: string | number }>(),
  { valueKey: 'id', selectionType: 'radio', omitZeroString: undefined },
)
const emit = defineEmits<{
  (e: 'selectedRecords', records: any[]): void
}>()
const value = defineModel<any>('value')
const dataColumns = computed(() => {
  return props.columns.filter(item => item.pure)
})

Form.useInjectFormItemContext()

const visible = defineModel<boolean>('visible', { default: false })
const selectedRowKeys = ref<any[]>([])
const selectedRows = ref<any[]>([])

// 获取全局配置
const curdConfig = useCurdConfig()

function arraylizeValue(val: any) {
  let result = Array.isArray(val) ? val : val ? [val] : []

  // 应用 omitZeroString，优先使用组件 props 设置，否则使用全局配置
  const shouldOmitZeroString = props.omitZeroString !== undefined
    ? props.omitZeroString
    : curdConfig.selector.omitZeroString

  if (shouldOmitZeroString) {
    result = result.filter(item => item !== '0')
  }

  return result
}

const options = computed(() => selectedRows.value.map(item => ({
  label: props.labelRender?.(item) ?? get(item, props.displayKey || props.valueKey),
  value: get(item, props.valueKey),
})))

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
  selectedRowKeys.value = []
  selectedRows.value = []
}

function removeValue(v: any) {
  if (props.selectionType === 'radio') {
    value.value = ''
  }
  else {
    value.value = arraylizeValue(value.value).filter(item => item !== v)
  }
}

async function init() {
  const isMulti = props.selectionType === 'checkbox'
  selectedRowKeys.value = isMulti ? arraylizeValue(value.value) : []
  await nextTick()
  const preloadIds = arraylizeValue(value.value).filter(Boolean)
  if (preloadIds.length && props.getListApi) {
    const { data } = await props.getListApi({
      ...props.overwriteParams,
      id: preloadIds,
    })
    selectedRows.value = data.filter(item => preloadIds.includes(get(item, props.valueKey)))
  }
}

watch(
  [
    () => value.value,
    () => props.getListApi,
    () => props.overwriteParams,
    () => props.valueKey,
  ],
  init,
  { immediate: true },
)

onMounted(init)

function clickInput() {
  if (props.disabled) {
    return
  }
  visible.value = true
}

const computedValue = computed({
  get: () => arraylizeValue(value.value),
  set: v => value.value = props.selectionType === 'checkbox' ? v : v[0],
})
</script>

<template>
  <div>
    <div
      v-if="!hideInputContainer"
      @click="clickInput"
    >
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
      :cancel-text="t('close')"
      :ok-text="t('ok')"
      :title="t('selectorTitle')"
      :width="modalWidth || 800"
      destroy-on-close
      v-bind="modalProps"
      :z-index="3000"
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
        :row-selection="selectionConfig"
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
