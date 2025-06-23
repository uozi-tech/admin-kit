<script setup lang="ts">
import { StdTable } from '@uozi-admin/curd'
import StdCurd from '@uozi-admin/curd/src/components/StdCurd.vue'
import { Card } from 'ant-design-vue'
import { $gettext } from '~/gettext'

const columns = [
  {
    title: $gettext('Name'),
    dataIndex: 'name',
  },
  {
    dataIndex: 'actions',
  },
]

const curdApi = {
  getList: () => {
    return {
      data: [
        { name: 'John Doe' },
      ],
    }
  },
}
</script>

<template>
  <Card :title="$gettext('Dashboard')">
    {{ $gettext('Dashboard Page') }}
  </Card>

  <StdTable
    :columns="columns"
    :get-list-api="curdApi.getList"
  />

  <!-- <StdCurd
    :columns="columns"
    :api="curdApi"
  /> -->
</template>

<style scoped>

</style>
