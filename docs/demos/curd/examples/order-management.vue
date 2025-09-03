<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { Button, message, Space, Tag } from 'ant-design-vue'
import { h } from 'vue'
import { orderApi } from '../mock/orderApi'

const orderStatusMap = {
  pending: { text: '待付款', color: 'orange' },
  paid: { text: '已付款', color: 'blue' },
  shipped: { text: '已发货', color: 'cyan' },
  delivered: { text: '已送达', color: 'green' },
  cancelled: { text: '已取消', color: 'red' },
}

const columns: StdTableColumn[] = [
  {
    title: '订单号',
    dataIndex: 'order_no',
    width: 150,
    search: {
      type: 'input',
      placeholder: '请输入订单号',
    },
  },
  {
    title: '客户信息',
    dataIndex: 'customer',
    customRender: ({ value }) =>
      h('div', [
        h('div', { style: 'font-weight: bold;' }, value?.name),
        h('div', { style: 'color: #666; font-size: 12px;' }, value?.phone),
      ]),
    search: {
      type: 'input',
      placeholder: '请输入客户姓名或手机号',
    },
  },
  {
    title: '订单金额',
    dataIndex: 'total_amount',
    customRender: ({ value }) =>
      h('span', { style: 'color: #f50; font-weight: bold;' }, `¥${value}`),
    search: {
      type: 'inputNumber',
      placeholder: '请输入金额',
    },
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    customRender: ({ value }) => {
      const status = orderStatusMap[value]
      return h(Tag, { color: status.color }, () => status.text)
    },
    search: {
      type: 'select',
      options: Object.entries(orderStatusMap).map(([key, value]) => ({
        label: value.text,
        value: key,
      })),
    },
    edit: {
      type: 'select',
      required: true,
      options: Object.entries(orderStatusMap).map(([key, value]) => ({
        label: value.text,
        value: key,
      })),
    },
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method',
    customRender: ({ value }) => {
      const methodMap = {
        alipay: '支付宝',
        wechat: '微信支付',
        bank: '银行卡',
      }
      return methodMap[value] || value
    },
    edit: {
      type: 'radioGroup',
      options: [
        { label: '支付宝', value: 'alipay' },
        { label: '微信支付', value: 'wechat' },
        { label: '银行卡', value: 'bank' },
      ],
    },
  },
  {
    title: '下单时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
      placeholder: ['开始日期', '结束日期'],
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    hiddenInTable: true,
    edit: {
      type: 'textarea',
      rows: 3,
    },
  },
  {
    title: '操作',
    dataIndex: 'actions',
    customRender: ({ record }) => h(Space, {}, () => customActions(record)),
  },
]

// 自定义操作按钮
function customActions(record) {
  return [
    h(Button, {
      type: 'link',
      size: 'small',
      onClick: () => viewOrderDetail(record.order_no),
    }, () => '查看详情'),

    record.status === 'paid' && h(Button, {
      type: 'link',
      size: 'small',
      onClick: () => shipOrder(record.order_no),
    }, () => '发货'),

    record.status === 'pending' && h(Button, {
      type: 'link',
      size: 'small',
      danger: true,
      onClick: () => cancelOrder(record.order_no),
    }, () => '取消订单'),
  ].filter(Boolean)
}

function viewOrderDetail(no) {
  message.success(`查看订单详情: ${no}`)
}

function shipOrder(no) {
  message.success(`发货: ${no}`)
}

function cancelOrder(no) {
  message.success(`取消订单: ${no}`)
}
</script>

<template>
  <StdCurd
    title="订单管理"
    :api="orderApi"
    :columns="columns"
  />
</template>
