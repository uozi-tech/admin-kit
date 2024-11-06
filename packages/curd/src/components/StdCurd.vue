<script setup lang="ts">
import {StdCurdProps, StdTableBodyScope, StdTableHeaderScope} from "../types";
import useCurd from "../composables/useCurd";
import {useConfigContextInject} from "ant-design-vue/es/config-provider/context";
import {useExport} from "../composables/useExport";
import {message, TableColumnType} from "ant-design-vue";
import {i18n} from "../i18n";
import StdForm from "./StdForm.vue";
import StdDetail from "./StdDetail.vue";
import StdSearch from "./StdSearch.vue";

const props = defineProps<StdCurdProps>()

const { locale: lang } = useConfigContextInject()
const currentLanguage = computed(() => lang?.value?.locale ?? 'en')
provide('lang', currentLanguage.value)

const {
  tableLoading,
  modalLoading,
  mode,
  searchFormData,
  resetSearchForm,
  tableData,
  itemDetail,
  formVisible,
  pagination,
    isTrash,
    switchTrashAndList,
  handleRead,
  handleAdd,
  handleEdit,
  handleSave,
} = useCurd(props, currentLanguage.value)
const selectedRowKeys = ref<(string | number)[]>([])
const selectedRows = ref<Record<string | number, unknown>[]>([])


const stdForm = ref()
const onSave = () => {
  const { formRef } = stdForm.value
  formRef.validateFields().then((res) => {
    console.log(res)
    handleSave(res)
  }).catch((err) => {
    console.log(err)
    message.error(i18n[currentLanguage.value].formValidateError)
  })
}

const searchColumns = computed(() => {
  return props.columns.filter((item) => item.search)
})

const formColumns = computed(() => {
  return props.columns.filter((item) => item.dataIndex !== 'actions' && item.key !== 'actions' && (item.edit))
})

function onSelectedChange(keys: (string | number)[], rows: Record<string | number, unknown>[]) {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

function CustomHeaderRender(props: { node: VNode }) {
  return props.node
}

const { exportExcel, exportColumns, state: exportColumnsSelectionState, onCheckAllChange } = useExport(props.columns)
const exportVisible = ref(false)

</script>

<template>
  <ACard title="筛选" class="mb-4">
    <StdSearch
        v-if="!props.disableSearch"
        v-model:data="searchFormData"
        :columns="searchColumns"
        :lang="currentLanguage"
    >
      <template #extra="{ formData }">
        <AFlex wrap="wrap" gap="small">
          <AButton @click="resetSearchForm">{{ i18n[currentLanguage].reset }}</AButton>
          <slot name="searchFormAction" :form-data="formData" />
        </AFlex>
      </template>
    </StdSearch>
  </ACard>
  <ACard>
  <template #title>
    {{ props.title ?? i18n[currentLanguage].list }}
    <slot name="titleRight" />
  </template>
  <template #extra>
    <AFlex gap="8">
    <slot name="beforeListActions" />
      <a
          v-if="!props.disableExport"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': selectedRowKeys.length === 0 }"
          @click="exportVisible = true">
        {{ i18n[currentLanguage].exportExcel }}
      </a>
    <a v-if="!props.disableAdd" @click="handleAdd">{{ i18n[currentLanguage].add }}</a>
    <a v-if="!props.disableTrash" :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': tableLoading }" @click="switchTrashAndList">
      {{ isTrash ? i18n[currentLanguage].backToList : i18n[currentLanguage].trash }}
    </a>
      <slot name="afterListActions" />
    </AFlex>
  </template>

  <ATable
    :row-key="props.rowKey ?? 'id'"
    :row-selection="{
          selectedRowKeys,
          onChange: onSelectedChange,
          type: props.rowSelectionType ?? 'checkbox',
        }"
    :data-source="tableData"
    :columns="columns as TableColumnType[]"
    v-model:pagination="pagination"
    :loading="tableLoading "
    :scroll="{ x: props.scrollX ?? 2400, y: props.scrollY }"
    v-bind="props.tableConfig"
  >
    <template #headerCell="{ title, column }: StdTableHeaderScope">
      <template v-if="column?.customHeaderRender">
        <CustomHeaderRender :node="column?.customHeaderRender({ title, column })" />
      </template>
    </template>
    <template #bodyCell="{ record, column }: StdTableBodyScope">
      <template v-if="column?.dataIndex === 'actions' && !column?.customRender">
        <slot name="beforeActions" :record="record" :column="column" />
        <AButton size="small" type="link" v-bind="column?.btnProps" @click="handleRead(record)">
          {{ i18n[currentLanguage].read }}
        </AButton>
        <AButton v-if="!props.disableEdit && !isTrash" size="small" type="link" v-bind="column?.btnProps" @click="handleEdit(record)">
          {{ i18n[currentLanguage].edit }}
        </AButton>
        <APopconfirm v-if="!props.disableDelete && !isTrash" :title="i18n[currentLanguage].confirmDelete">
          <AButton size="small" type="link" v-bind="column?.btnProps" danger> {{ i18n[currentLanguage].delete }} </AButton>
        </APopconfirm>
        <APopconfirm v-if="!props.disableTrash && isTrash" :title="i18n[currentLanguage].confirmRestore">
          <AButton size="small" type="link" v-bind="column?.btnProps"> {{ i18n[currentLanguage].restore }} </AButton>
        </APopconfirm>
        <slot name="afterActions" :record="record" :column="column" />
      </template>
    </template>
  </ATable>

    <AModal
      style="max-height: 80vh"
      :closable="!modalLoading"
      :width="props.modalWidth"
      :title="i18n[currentLanguage][mode]"
      v-model:open="formVisible"
    >
      <ASpin :spinning="modalLoading">
        <div style="overflow-y: auto; max-height: 70vh">
          <StdForm ref="stdForm" v-if="mode !== 'read'"  :data="itemDetail" :api="props.api" :columns="formColumns" />
          <StdDetail v-else :columns="props.columns" :record="itemDetail" />
        </div>
      </ASpin>
      <template #footer>
        <AButton :disabled="modalLoading" @click="formVisible = false">{{ i18n[currentLanguage].close }}</AButton>
        <AButton v-if="mode !== 'read'" :loading="modalLoading" type="primary" @click="onSave">{{ i18n[currentLanguage].save }}</AButton>
      </template>
    </AModal>

    <AModal
      style="max-height: 80vh"
      :closable="!modalLoading"
      :width="props.modalWidth"
      :title="i18n[currentLanguage].export"
      :ok-text="i18n[currentLanguage].export"
      v-model:open="exportVisible"
      @ok="exportExcel(selectedRowKeys, selectedRows)"
    >
      <ACheckbox v-model:checked="exportColumnsSelectionState.checkAll" :indeterminate="exportColumnsSelectionState.indeterminate" @change="onCheckAllChange">
        {{ i18n[currentLanguage].checkAll }}
      </ACheckbox>
      <ADivider />
<!--      <VueDraggable class="checkbox__wrapper" v-model="exportColumns" :animation="200">-->
<!--        <a-checkbox-->
<!--          v-for="(c, i) in exportColumns"-->
<!--          :key="c.dataIndex"-->
<!--          class="checkbox"-->
<!--          :checked="exportColumns[i].checked"-->
<!--          @change="(event) => (exportColumns[i].checked = event.target.checked)"-->
<!--        >-->
<!--          {{ c.title }}-->
<!--        </a-checkbox>-->
<!--      </VueDraggable>-->
    </AModal>
  </ACard>
</template>

<style scoped>

</style>
