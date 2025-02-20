<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { postApi, tagApi, userApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    search: true,
    edit: { type: 'input', formItem: { rules: [{ required: true }] } },
  },
  {
    title: '作者',
    dataIndex: 'authorId',
    edit: {
      type: 'selector',
      selector: {
        getListApi: userApi.getList,
        columns: [{ title: '姓名', dataIndex: 'name' }],
        valueKey: 'id',
        displayKey: 'name',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'tagIds',
    edit: {
      type: 'selector',
      selector: {
        getListApi: tagApi.getList,
        columns: [{ title: '标签名', dataIndex: 'name' }],
        valueKey: 'id',
        displayKey: 'name',
        selectionType: 'checkbox',
      },
    },
    customRender: ({ value }) => value?.join(', ') || '-',
  },
]
</script>

<template>
  <StdCurd
    :api="postApi"
    :columns="columns"
    row-key="id"
  />
</template>
