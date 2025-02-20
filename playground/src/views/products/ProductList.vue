<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { categoryApi, productApi } from '~/api'

const columns = [
  {
    title: '产品名称',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
      formItem: { rules: [{ required: true, min: 2, max: 100 }] },
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    edit: {
      type: 'inputNumber',
      formItem: { rules: [{ type: 'number', min: 0 }] },
    },
  },
  {
    title: '库存',
    dataIndex: 'stock',
    edit: {
      type: 'inputNumber',
      formItem: { rules: [{ type: 'number', min: 0 }] },
    },
  },
  {
    title: '分类',
    dataIndex: 'categoryId',
    edit: {
      type: 'selector',
      selector: {
        getListApi: categoryApi.getList,
        columns: [
          { title: '分类名称', dataIndex: 'name' },
        ],
        valueKey: 'id',
        displayKey: 'name',
      },
    },
    customRender: ({ value }) => {
      // 实际应通过接口获取分类名称
      return value ? `分类${value}` : '-'
    },
  },
  {
    title: '产品图片',
    dataIndex: 'images',
    edit: {
      type: 'upload',
      upload: {
        listType: 'picture-card',
        maxCount: 5,
      },
    },
    customRender: ({ text }) => h('div', text?.map(url => h('img', { src: url, style: 'width: 50px; margin-right: 8px;' }))),
  },
  {
    title: '评分',
    dataIndex: 'rating',
    edit: {
      type: 'rate',
      rate: { allowHalf: true },
    },
  },
]
</script>

<template>
  <StdCurd
    :api="productApi"
    :columns="columns"
    row-key="id"
    :scroll-x="1200"
  />
</template>
