<script setup lang="ts">
import type { SelectorConfig } from '../../types'
import { watchPausable } from '@vueuse/core'
import { Form, Modal, Select } from 'ant-design-vue'
import { get } from 'lodash-es'
import { computed, nextTick, reactive, ref } from 'vue'
import { useCurdConfig, useLocale } from '../../composables'
import StdTable from '../StdTable.vue'

const props = withDefaults(
  defineProps<SelectorConfig & { placeholder?: string | number, dropUnpreloadable?: boolean }>(),
  { valueKey: 'id', selectionType: 'radio', omitZeroString: undefined, dropUnpreloadable: false },
)
const emit = defineEmits<{
  (e: 'selectedRecords', records: any[]): void
}>()
const value = defineModel<any>('value', { default: reactive([]) })
const dataColumns = computed(() => {
  return props.columns.filter(item => item.pure)
})

Form.useInjectFormItemContext()

const visible = defineModel<boolean>('visible', { default: false })
const selectedRowKeys = ref<any[]>([])
const selectedRows = defineModel<any[]>('selectedRows', { default: reactive([]) })

// 添加内部临时状态来管理选中的行数据
const internalSelectedRows = ref<any[]>([])

// 添加标志来避免无限循环
const isInitializing = ref(false)

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

const { t } = useLocale()

function setValue() {
  if (props.selectionType === 'radio') {
    value.value = selectedRowKeys.value[0]
  }
  else {
    value.value = selectedRowKeys.value
  }
  // 只有在点击OK时才更新selectedRows
  selectedRows.value = [...internalSelectedRows.value]
  visible.value = false
  emit('selectedRecords', selectedRows.value)
  selectedRowKeys.value = []
  internalSelectedRows.value = []
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
  if (isInitializing.value)
    return // 避免无限循环

  isInitializing.value = true
  const isMulti = props.selectionType === 'checkbox'
  selectedRowKeys.value = isMulti ? arraylizeValue(value.value) : []
  await nextTick()
  const preloadIds = arraylizeValue(value.value).filter(Boolean)
  let filteredValue: any = null
  if (preloadIds.length && props.getListApi) {
    const { data } = await props.getListApi({
      ...props.overwriteParams,
      [props.valueKey]: preloadIds,
    })
    const dataMap = new Map(data.map(item => [get(item, props.valueKey), item]))
    const preloadedRows = preloadIds.map(id => dataMap.get(id)).filter(Boolean)

    // 如果启用了 dropUnpreloadable，则过滤掉无法预加载的 valueKey
    if (props.dropUnpreloadable) {
      const preloadableIds = preloadedRows.map(row => get(row, props.valueKey))
      const originalPreloadIds = [...preloadIds]
      const filteredPreloadIds = preloadIds.filter(id => preloadableIds.includes(id))

      // 只有当过滤后的结果与原始值不同时才准备更新 value
      if (JSON.stringify(originalPreloadIds) !== JSON.stringify(filteredPreloadIds)) {
        if (isMulti) {
          selectedRowKeys.value = filteredPreloadIds
          filteredValue = filteredPreloadIds
        }
        else if (filteredPreloadIds.length > 0) {
          filteredValue = filteredPreloadIds[0]
        }
        else {
          filteredValue = props.selectionType === 'radio' ? '' : []
        }
      }
    }

    // 更新内部临时状态
    internalSelectedRows.value = [...preloadedRows]
    // 初始化时设置selectedRows，但要避免循环
    if (selectedRows.value.length === 0
      || JSON.stringify(selectedRows.value) !== JSON.stringify(preloadedRows)) {
      selectedRows.value = [...preloadedRows]
    }
  }
  else {
    // 如果没有预加载数据，清空状态
    internalSelectedRows.value = []
    if (selectedRows.value.length > 0) {
      selectedRows.value = []
    }
  }
  isInitializing.value = false

  // 在完成初始化后，如果需要更新 value，则暂停监听后更新
  if (filteredValue !== null) {
    pause()
    value.value = filteredValue
    await nextTick()
    resume()
  }
}

const { pause, resume } = watchPausable(
  [
    () => value.value,
    () => props.getListApi,
    () => props.overwriteParams,
    () => props.valueKey,
    () => props.dropUnpreloadable,
  ],
  init,
  { immediate: true },
)

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
      wrap-class-name="std-selector-modal"
      @ok="setValue"
    >
      {{ tips }}
      <div>
        <StdTable
          v-model:selected-row-keys="selectedRowKeys"
          v-model:selected-rows="internalSelectedRows"
          :columns="dataColumns"
          :get-list-api="getListApi"
          only-query
          disable-router-query
          :row-selection-type="selectionType"
          :row-selection="selectionConfig"
          :table-props="{
            rowKey: props.valueKey,
            scroll: {
              y: '40vh',
            },
            ...tableProps,
          }"
          :overwrite-params="overwriteParams"
        />
      </div>
    </Modal>
  </div>
</template>

<style scoped>
:deep(.selector) {
  display: none!important;
}
</style>
