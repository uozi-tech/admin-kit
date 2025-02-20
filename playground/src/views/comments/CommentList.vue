<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { commentApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '内容',
    dataIndex: 'content',
    edit: {
      type: 'textarea',
      textarea: { maxlength: 500, showCount: true },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    customRender: ({ text }) => new Date(text).toLocaleString(),
  },
]
</script>

<template>
  <StdCurd
    :api="commentApi"
    :columns="columns"
    row-key="id"
    :disable-add="true"
  />
</template>
