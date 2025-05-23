<script setup lang="ts">
import type { StdTableColumn } from 'src/types'
import type { CurdApi } from 'src/types/api'
import { message, Modal, Table } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import StdForm from './StdForm.vue'

const props = defineProps<{
  api: CurdApi
  beforeSave?: () => Promise<void>
  columns: StdTableColumn[]
  formClass?: string
  formRowProps?: any
}>()

const emit = defineEmits(['save'])

const columns = computed(() => {
  return props.columns.filter(item => item.pure) as any
})

const { t } = useI18n()

const batchColumns = computed(() => {
  return props.columns.filter(item => item.batchEdit)
})

const selectedRowKeys = ref<(number | string)[]>([])

const selectedRows = ref<any[]>([])

const visible = ref(false)
const data = ref({})
const error = ref({})
const loading = ref(false)

function showModal(rowKeys: (number | string)[], rows: any[]) {
  data.value = {}
  visible.value = true
  selectedRowKeys.value = rowKeys
  selectedRows.value = rows
}

defineExpose({
  showModal,
})

async function ok() {
  loading.value = true

  await props.beforeSave?.()

  await props.api.batchSave(selectedRowKeys.value, data.value)
    .then(async () => {
      message.success(t('saveSuccessfully'))
      emit('save')
      visible.value = false
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <Modal
    v-model:open="visible"
    class="std-curd-edit-modal"
    :mask="false"
    :title="t('batchModify')"
    :cancel-text="t('no')"
    :ok-text="t('save')"
    :confirm-loading="loading"
    :width="600"
    destroy-on-close
    @ok="ok"
  >
    <p>{{ t('belowsAreSelectedItems') }}</p>
    <Table
      class="mb-4"
      size="small"
      :columns
      :data-source="selectedRows"
      :pagination="{ showSizeChanger: false, pageSize: 5, size: 'small' }"
    />

    <p>{{ t('leaveBlankIfDoNotWantToModify') }}</p>

    <StdForm
      v-model:data="data"
      :columns="batchColumns"
      :errors="error"
      :form-class="formClass"
      :form-row-props="formRowProps"
    />

    <slot name="extra" />
  </Modal>
</template>

<style scoped></style>
