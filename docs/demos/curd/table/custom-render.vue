<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { datetimeRender, StdCurd } from '@uozi-admin/curd'
import { Avatar, Progress, Rate, Tag } from 'ant-design-vue'
import { h } from 'vue'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '用户信息',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
      formItem: { required: true },
    },
    customRender: ({ record }) => {
      return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
        h(Avatar, {
          src: record.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${record.name}`,
          size: 32,
        }),
        h('div', [
          h('div', { style: 'font-weight: 500;' }, record.name),
          h('div', { style: 'font-size: 12px; color: #666;' }, record.email),
        ]),
      ])
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '激活', value: 1 },
          { label: '禁用', value: -1 },
        ],
      },
    },
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '激活', value: 1 },
          { label: '禁用', value: -1 },
        ],
      },
      formItem: { required: true },
    },
    customRender: ({ value }) => {
      const config = value === 1
        ? { color: 'success', text: '激活' }
        : { color: 'error', text: '禁用' }
      return h(Tag, { color: config.color }, () => config.text)
    },
  },
  {
    title: '完成度',
    dataIndex: 'progress',
    edit: {
      type: 'slider',
      slider: {
        min: 0,
        max: 100,
        marks: { 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' },
      },
    },
    customRender: ({ value = 0 }) => {
      return h(Progress, {
        percent: value,
        size: 'small',
        status: value < 30 ? 'exception' : value < 70 ? 'active' : 'success',
      })
    },
  },
  {
    title: '评分',
    dataIndex: 'rating',
    edit: {
      type: 'rate',
      rate: {
        allowHalf: true,
        character: '★',
      },
    },
    customRender: ({ value = 0 }) => {
      return h(Rate, {
        value,
        disabled: true,
        allowHalf: true,
        character: '★',
      })
    },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    edit: {
      type: 'select',
      select: {
        mode: 'tags',
        options: [
          { label: 'VIP', value: 'vip' },
          { label: '新用户', value: 'new' },
          { label: '活跃', value: 'active' },
          { label: '高价值', value: 'high-value' },
        ],
      },
    },
    customRender: ({ value = [] }) => {
      const tagColors = {
        'vip': 'gold',
        'new': 'blue',
        'active': 'green',
        'high-value': 'purple',
      }
      return h('div', value.map(tag =>
        h(Tag, {
          key: tag,
          color: tagColors[tag] || 'default',
          style: 'margin-right: 4px;',
        }, () => tag),
      ))
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
    },
    customRender: datetimeRender,
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]
</script>

<template>
  <StdCurd
    :columns="columns"
    :api="userApi"
    disable-router-query
    scroll-x="max-content"
  />
</template>
