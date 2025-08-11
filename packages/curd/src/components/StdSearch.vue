<script setup lang="ts">
import type { StdTableColumn } from '../types'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { watchPausable } from '@vueuse/core'
import { Button, Flex, Form, FormItem } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { computed, nextTick, ref, watch } from 'vue'
import { useCurdConfig, useLocale } from '../composables'
import { getColumnKey, getSearchLabel } from '../utils'
import FormControllerRender from './StdFormController.vue'

const props = defineProps<{
  columns: StdTableColumn[]
  hideResetBtn?: boolean
  showSearchBtn?: boolean
  data: Record<string, any>
  maxVisibleItems?: number
}>()

const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'update:data', data: Record<string, any>): void
}>()

const { t } = useLocale()

const curdConfig = useCurdConfig()
const formDataBuffer = ref<Record<string, any>>({})

// {{ AURA-X: Add - 添加折叠功能状态管理. Approval: 寸止(ID:1723363200). }}
const expand = ref(false)
const maxVisibleItems = computed(() => props.maxVisibleItems ?? 6)

const showSearchBtn = computed(() => {
  return props.showSearchBtn ?? curdConfig.search.showSearchBtn
})

const hideResetBtn = computed(() => {
  return props.hideResetBtn ?? curdConfig.search.hideResetBtn
})

const { pause, resume } = watchPausable(formDataBuffer, (v) => {
  if (!showSearchBtn.value) {
    emit('update:data', v)
  }
}, { deep: true })

watch(() => props.data, async () => {
  pause()
  formDataBuffer.value = cloneDeep(props.data)
  await nextTick()
  resume()
}, { deep: true, immediate: true })

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

function onSearch() {
  emit('update:data', formDataBuffer.value)
}
</script>

<template>
  <Flex
    vertical
    gap="16"
  >
    <Form
      v-if="columns.length"
      class="flex flex-wrap gap-2"
      :model="formDataBuffer"
      label-width="auto"
      layout="vertical"
    >
      <FormItem
        v-for="(c, index) in columns"
        v-show="expand || index < maxVisibleItems"
        :key="getColumnKey(c)"
        :label="getSearchLabel(c)"
        :name="`${getConfig(c)?.formItem?.name ?? c.dataIndex}__search`"
      >
        <FormControllerRender
          v-model:form-data="formDataBuffer"
          :column="c"
          :form-config-key="c.search === true ? 'edit' : 'search'"
          mode="search"
        />
      </FormItem>

      <div class="pt-30px flex justify-between flex-1">
        <div class="flex items-center gap-2">
          <slot name="search-actions-left" />
          <Button
            v-if="columns.length && showSearchBtn"
            type="primary"
            @click="onSearch"
          >
            {{ t('search') }}
          </Button>
          <Button
            v-if="columns.length && !hideResetBtn"
            @click="emit('reset')"
          >
            {{ t('reset') }}
          </Button>
          <a
            v-if="columns.length > maxVisibleItems"
            class="text-12px"
            @click="expand = !expand"
          >
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            {{ expand ? '收起' : '展开' }}
          </a>
        </div>
        <div class="flex gap-2">
          <slot
            name="extra"
            :form-data="formDataBuffer"
          />
        </div>
      </div>
    </Form>
  </Flex>
</template>

<style lang="less" scoped>
:deep(.ant-form-item-label label) {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.9;
}

:deep(.ant-form-item) {
  margin-bottom: 4px;
}
</style>
