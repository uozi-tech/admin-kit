<script setup lang="tsx">
import type { CustomRenderArgs, StdTableColumn } from '../types'
import { Descriptions, DescriptionsItem } from 'ant-design-vue'
import { get } from 'lodash-es'
import { getEditLabel } from '../utils'

const props = defineProps<{
  record: any
  columns: StdTableColumn[]
}>()

const displayColumns = props.columns.filter(item => !item?.hiddenInDetail && item.dataIndex !== 'actions')

function DataItemRender(props: CustomRenderArgs) {
  const { record, column } = props
  const value = get(record, column.dataIndex)
  return column.customRender ? column.customRender(props) : value ?? '/'
}
</script>

<template>
  <Descriptions
    bordered
    :column="1"
  >
    <DescriptionsItem
      v-for="(column, index) in displayColumns"
      :key="index"
      :label="getEditLabel(column)"
    >
      <DataItemRender
        v-if="Object.keys(props.record).length"
        :record="props.record"
        :column="column"
        :text="get(props.record, column.dataIndex)"
        :value="get(props.record, column.dataIndex)"
        :index="index"
        :render-index="index"
      />
    </DescriptionsItem>
  </Descriptions>
</template>

<style scoped></style>
