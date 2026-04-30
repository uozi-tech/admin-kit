<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import type { CurdApi } from '@uozi-admin/request'
import { StdTable } from '@uozi-admin/curd'
import { Card } from 'antdv-next'
import { $gettext } from '~/gettext'

const columns: StdTableColumn[] = [
  {
    title: $gettext('Name'),
    dataIndex: 'name',
  },
  {
    title: $gettext('Actions'),
    dataIndex: 'actions',
  },
]

const curdApi: Pick<CurdApi<{ name: string }>, 'getList'> = {
  getList: async () => {
    return {
      data: [
        { name: 'John Doe' },
      ],
      pagination: {
        total: 1,
      },
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
