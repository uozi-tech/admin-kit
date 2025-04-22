<script setup lang="ts">
import type { StdTableColumn } from '../types'
import { watchPausable } from '@vueuse/core'
import { Button, Flex, Form, FormItem } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import useCurdConfig from '../composables/useCurdConfig'
import { getColumnKey, getSearchLabel } from '../utils'
import FormControllerRender from './StdFormController.vue'

const props = defineProps<{
  columns: StdTableColumn[]
  hideResetBtn?: boolean
  showSearchBtn?: boolean
  data: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'update:data', data: Record<string, any>): void
}>()

const { t } = useI18n()

const curdConfig = useCurdConfig()
const formDataBuffer = ref<Record<string, any>>({})

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
})

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
  <Form
    class="flex flex-wrap gap-y-4"
    :model="formDataBuffer"
    label-width="auto"
    layout="inline"
  >
    <FormItem
      v-for="c in columns"
      :key="getColumnKey(c)"
      :label="getSearchLabel(c)"
      :name="`${getConfig(c)?.formItem?.name ?? c.dataIndex}__search`"
    >
      <FormControllerRender
        v-model:form-data="formDataBuffer"
        :column="c"
        :form-config-key="c.search === true ? 'edit' : 'search'"
      />
    </FormItem>
    <Flex
      wrap="wrap"
      gap="small"
    >
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
      <slot
        name="extra"
        :form-data="formDataBuffer"
      />
    </Flex>
  </Form>
</template>

<style scoped>

</style>
