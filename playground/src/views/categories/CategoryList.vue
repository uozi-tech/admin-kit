<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { categoryApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '分类名称',
    dataIndex: 'name',
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true }] },
    },
  },
  {
    title: '父分类',
    dataIndex: 'parentId',
    edit: {
      type: 'cascader',
    },
  },
]
</script>

<template>
  <StdCurd
    :api="categoryApi"
    :columns="columns"
    row-key="id"
  />
</template>
