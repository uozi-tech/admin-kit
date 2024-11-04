<script setup lang="ts">
import {StdCurdProps, StdTableBodyScope, StdTableHeaderScope} from "../types";
import useCurd from "../composables/useCurd";
import {useConfigContextInject} from "ant-design-vue/es/config-provider/context";
import {useExport} from "../composables/useExport";
import {debounce} from 'lodash-es'
import {TableColumnType} from "ant-design-vue";
import {i18n} from "../i18n";

const props = defineProps<StdCurdProps>()

const { locale: lang } = useConfigContextInject().locale?.value ?? { locale: 'en' }

const {
  tableLoading,
  modalLoading,
  mode,
  data,
  formData,
  formVisible,
  pagination,
  getList,
  handleRead,
  handleAdd,
  handleEdit,
  handleSave,
} = useCurd(props, lang)

const selectedRowKeys = ref<(string | number)[]>([])
const selectedRows = ref<Record<string | number, unknown>[]>([])

const getData = debounce(() => getList({ ...searchFormData.value, ...props.fixParams }), 400, { leading: false, trailing: true })

const searchColumns = computed(() => {
  return props.columns.filter((item) => item.search)
})

const formColumns = computed(() => {
  return props.columns.filter((item) => item.dataIndex !== 'actions' && item.key !== 'actions' && item.form)
})

const searchFormData = ref({})

watch(searchFormData, getData, { immediate: true, deep: true })

function resetSearchForm() {
  searchFormData.value = {}
}

function onSelectedChange(keys: (string | number)[], rows: Record<string | number, unknown>[]) {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

function CustomHeaderRender(props: { node: VNode }) {
  return props.node
}

const { exportExcel } = useExport(props.columns)
</script>

<template>
  <ATable
    :row-key="props.rowKey ?? 'id'"
    :row-selection="{
          selectedRowKeys,
          onChange: onSelectedChange,
          type: props.rowSelectionType ?? 'checkbox',
        }"
    :data-source="data"
    :columns="columns as TableColumnType[]"
    v-model:pagination="pagination"
    :scroll="{ x: props.scrollX ?? 2400, y: props.scrollY }"
  >
    <template #headerCell="{ title, column }: StdTableHeaderScope">
      <template v-if="column?.customHeaderRender">
        <CustomHeaderRender :node="column?.customHeaderRender({ title, column })" />
      </template>
    </template>
    <template #bodyCell="{ record, column, ...rest }: StdTableBodyScope">
      <template v-if="column?.dataIndex === 'actions' && !column?.customRender">
        <slot name="beforeActions" :record="record" :column="column" />
        <AButton size="small" type="link" v-bind="column?.btnProps" @click="handleRead(record)">
          {{ i18n[lang].read }}
        </AButton>
        <AButton v-if="!props.disableEdit" size="small" type="link" v-bind="column?.btnProps" @click="handleEdit(record)">
          {{ i18n[lang].edit }}
        </AButton>
        <APopconfirm v-if="!props.disableDelete" :title="i18n[lang].confirmDelete">
          <AButton size="small" type="link" v-bind="column?.btnProps" danger> {{ i18n[lang].delete }} </AButton>
        </APopconfirm>
        <slot name="afterActions" :record="record" :column="column" />
      </template>
    </template>
  </ATable>
</template>

<style scoped>

</style>
