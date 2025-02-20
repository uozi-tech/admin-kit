<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import dayjs from 'dayjs'
import { orderApi } from '~/api'

const columns: StdTableColumn[] = [
  {
    title: '订单号',
    dataIndex: 'id',
  },
  {
    title: '总金额',
    dataIndex: 'total',
    edit: {
      type: 'inputNumber',
      formItem: { rules: [{ type: 'number', min: 0 }] },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '待处理', value: 'pending' },
          { label: '处理中', value: 'processing' },
          { label: '已发货', value: 'shipped' },
          { label: '已取消', value: 'cancelled' },
        ],
      },
    },
  },
  {
    title: '订单时间',
    dataIndex: 'createdAt',
    edit: {
      type: 'datetime',
      formItem: { name: 'orderTime' },
    },
    customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm'),
  },
  {
    title: '配送时间',
    dataIndex: 'deliveryTime',
    edit: {
      type: 'datetimeRange',
    //   formItem: { name: ['startTime', 'endTime'] },
    },
  },
]
</script>

<template>
  <StdCurd
    :api="orderApi"
    :columns="columns"
    row-key="id"
    :disable-trash="false"
  />
</template>
