<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { Image, Tag } from 'ant-design-vue'
import { h } from 'vue'
import { productApi } from '../mock/productApi'

const columns: StdTableColumn[] = [
  {
    title: '商品图片',
    dataIndex: 'images',
    width: 100,
    customRender: ({ value }) =>
      h(Image, {
        src: value?.[0],
        width: 60,
        height: 60,
        class: 'object-cover rounded-4px',
      }),
    edit: {
      type: 'upload',
      upload: {
        accept: 'image/*',
        multiple: true,
        maxCount: 5,
        listType: 'picture-card',
      },
    },
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    search: {
      type: 'input',
      placeholder: '请输入商品名称',
    },
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { min: 2, message: '商品名称至少2个字符' },
          { max: 100, message: '商品名称不能超过100个字符' },
        ],
      },
    },
  },
  {
    title: '商品分类',
    dataIndex: 'category',
    customRender: ({ value }) =>
      h(Tag, { color: 'blue' }, () => value?.name),
    search: {
      type: 'cascader',
      cascader: {
        options: [
          {
            label: '电子产品',
            value: 'electronics',
            children: [
              { label: '手机', value: 'phone' },
              { label: '电脑', value: 'computer' },
            ],
          },
          {
            label: '服装',
            value: 'clothing',
            children: [
              { label: '男装', value: 'men' },
              { label: '女装', value: 'women' },
            ],
          },
        ],
      },
    },
    edit: {
      type: 'cascader',
      formItem: {
        required: true,
      },
      cascader: {
        options: [
          { label: '电子产品', value: 'electronics', children: [
            { label: '手机', value: 'phone' },
            { label: '电脑', value: 'computer' },
          ] },
        ],
      },
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    customRender: ({ value }) => `¥${value}`,
    search: {
      type: 'inputNumber',
      placeholder: '请输入价格',
    },
    edit: {
      type: 'inputNumber',
      formItem: {
        required: true,
      },
      inputNumber: {
        min: 0,
        precision: 2,
        addonBefore: '¥',
      },
    },
  },
  {
    title: '库存',
    dataIndex: 'stock',
    customRender: ({ value }) => {
      const color = value > 10 ? 'green' : value > 0 ? 'orange' : 'red'
      return h(Tag, { color }, () => `${value}件`)
    },
    edit: {
      type: 'inputNumber',
      formItem: {
        required: true,
      },
      inputNumber: {
        min: 0,
      },
    },
  },
  {
    title: '商品描述',
    dataIndex: 'description',
    hiddenInTable: true,
    edit: {
      type: 'textarea',
      textarea: {
        rows: 4,
        maxlength: 500,
        showCount: true,
      },
    },
  },
  {
    title: '上架状态',
    dataIndex: 'is_active',
    customRender: ({ value }) =>
      h(Tag, {
        color: value ? 'green' : 'red',
      }, () => value ? '已上架' : '已下架'),
    search: {
      type: 'select',
      select: {
        options: [
          { label: '已上架', value: 1 },
          { label: '已下架', value: -1 },
        ],
      },
    },
    edit: {
      type: 'switch',
      formItem: {
        required: true,
      },
      switch: {
        checkedChildren: '上架',
        unCheckedChildren: '下架',
        defaultValue: true,
      },
    },
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]
</script>

<template>
  <StdCurd
    title="商品管理"
    :api="productApi"
    :columns="columns"
    :form-props="{
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }"
  />
</template>
