<script setup lang="ts">
import { StdTableColumn } from '../types'
import { get } from 'lodash-es'
import { CustomRender } from '../renderers/CustomRender'

const props = defineProps<{
  record: any
  columns: StdTableColumn[]
}>()

const displayColumns = props.columns.filter((item) => !item?.hiddenInDetail || item.dataIndex === 'actions')
</script>

<template>
  <ADescriptions bordered :column="1">
    <ADescriptions-item v-for="(column, index) in displayColumns" :key="index" :label="column.title">
      <CustomRender
        :record="props.record"
        :column="column"
        :text="get(props.record, column.dataIndex)"
        :value="get(props.record, column.dataIndex)"
        :index="index"
        :renderIndex="index"
      />
    </ADescriptions-item>
  </ADescriptions>
</template>

<style scoped></style>