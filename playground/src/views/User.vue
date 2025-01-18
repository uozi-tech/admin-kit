<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd/src/types'
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../api/user'

const columns: StdTableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: true,
    edit: {
      type: 'input',
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
    },
  },
  {
    title: 'Birthday',
    dataIndex: 'birthday',
    edit: {
      type: 'date',
    },
    search: {
      type: 'dateRange',
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    fixed: 'right',
    width: 240,
  },
]
</script>

<template>
  <StdCurd
    :custom-params="{
    }"
    :columns="columns"
    :api="userApi"
  />
</template>

<style scoped>

</style>
