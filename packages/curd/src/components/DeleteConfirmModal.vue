<script setup lang="ts">
import type { DeleteConfirmConfig } from '../types'
import { Input, Modal } from 'ant-design-vue'
import { get } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import { useLocale } from '../composables'
import { getRealContent } from '../utils'

interface Props {
  open: boolean
  record?: any
  config?: DeleteConfirmConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    mode: 'modal',
    valueKey: 'id',
  }),
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm', record: any): void
  (e: 'cancel'): void
}>()

const { t } = useLocale()

const visible = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const inputValue = ref('')
const confirmText = computed(() => get(props.record, props.config.valueKey ?? 'id'))

// 监听弹窗打开状态，重置输入值
watch(() => props.open, (newVal) => {
  if (newVal) {
    inputValue.value = ''
  }
})

const canConfirm = computed(() => {
  return inputValue.value === confirmText.value
})

function handleConfirm() {
  if (canConfirm.value) {
    emit('confirm', props.record)
    visible.value = false
  }
}

function handleCancel() {
  emit('cancel')
  visible.value = false
}
</script>

<template>
  <Modal
    v-model:open="visible"
    :title="t('Confirm Delete')"
    :ok-text="t('delete')"
    :cancel-text="t('close')"
    :ok-button-props="{
      danger: true,
      disabled: !canConfirm,
    }"
    centered
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="py-4">
      <div class="confirm-input-wrapper flex flex-col gap-2">
        <label class="block text-sm font-medium mb-2">
          {{ t('Please Input') }} <code class="bg-gray-100 rounded text-red-500 px-2">{{ confirmText }}</code> {{ t('to confirm deletion') }}:
        </label>
        <Input
          v-model:value="inputValue"
          :placeholder="getRealContent(confirmText)"
          class="w-full"
          @keyup.enter="handleConfirm"
        />
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.confirm-input-wrapper code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.confirm-text {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 0 2px;
}
</style>
