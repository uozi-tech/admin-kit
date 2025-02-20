<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { postApi, tagApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '标签名',
    dataIndex: 'name',
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true, min: 2, max: 20 }] },
    },
  },
  {
    title: '关联文章',
    dataIndex: 'postIds',
    edit: {
      type: 'selector',
      selector: {
        getListApi: postApi.getList,
        columns: [{ title: '标题', dataIndex: 'title' }],
        valueKey: 'id',
        displayKey: 'title',
        selectionType: 'checkbox',
      },
    },
    customRender: ({ value }) => value?.length || 0,
  },
]
</script>

<template>
  <StdCurd
    :api="tagApi"
    :columns="columns"
    row-key="id"
  />
</template>
