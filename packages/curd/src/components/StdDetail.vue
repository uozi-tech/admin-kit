<script setup lang="ts">
import { StdTableColumn } from '../types'
import { get } from 'lodash-es'
import { DataItemRender } from '../renderers/DataItemRender'

const props = defineProps<{
  record: any
  columns: StdTableColumn[]
}>()

const displayColumns = props.columns.filter((item) => !item?.hiddenInDetail || item.dataIndex === 'actions')
</script>

<template>
  <ADescriptions bordered :column="1">
    <ADescriptionsItem v-for="(column, index) in displayColumns" :key="index" :label="column.title">
      <DataItemRender
        v-if="Object.keys(props.record).length"
        :record="props.record"
        :column="column"
        :text="get(props.record, column.dataIndex)"
        :value="get(props.record, column.dataIndex)"
        :index="index"
        :renderIndex="index"
      />
    </ADescriptionsItem>
  </ADescriptions>
</template>

<style scoped></style>