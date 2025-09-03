<script setup lang="ts">
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { StdTable } from '@uozi-admin/curd'
import { Avatar, Button, message, Space, Tag } from 'ant-design-vue'
import { h, ref } from 'vue'

// 自定义渲染数据
const renderData = ref([
  {
    id: '1',
    user: {
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://joeschmoe.io/api/v1/male/1',
    },
    status: 'active',
    product: {
      name: 'iPhone 15 Pro',
      price: 8999,
      image: 'https://via.placeholder.com/60x60',
      stock: 25,
    },
    amount: 15999.99,
    editable: true,
    deletable: true,
  },
  {
    id: '2',
    user: {
      name: '李四',
      email: 'lisi@example.com',
      avatar: 'https://joeschmoe.io/api/v1/female/2',
    },
    status: 'pending',
    product: {
      name: 'MacBook Pro',
      price: 16999,
      image: 'https://via.placeholder.com/60x60',
      stock: 0,
    },
    amount: 8888.88,
    editable: false,
    deletable: true,
  },
  {
    id: '3',
    user: {
      name: '王五',
      email: 'wangwu@example.com',
      avatar: 'https://joeschmoe.io/api/v1/male/3',
    },
    status: 'inactive',
    product: {
      name: 'AirPods Pro',
      price: 1999,
      image: 'https://via.placeholder.com/60x60',
      stock: 100,
    },
    amount: 999.99,
    editable: true,
    deletable: false,
  },
])

// 自定义渲染列配置
const renderColumns = [
  {
    title: '用户信息',
    dataIndex: 'user',
    width: 200,
    customRender: ({ record }) => {
      const user = record.user
      return h('div', {
        style: 'display: flex; align-items: center; gap: 12px;',
      }, [
        h(Avatar, { src: user.avatar, size: 40 }),
        h('div', [
          h('div', {
            style: 'font-weight: 500; margin-bottom: 4px;',
          }, user.name),
          h('div', {
            style: 'color: #666; font-size: 12px;',
          }, user.email),
        ]),
      ])
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      const statusConfig = {
        active: { color: 'success', text: '活跃' },
        inactive: { color: 'error', text: '非活跃' },
        pending: { color: 'warning', text: '待审核' },
      }
      const config = statusConfig[record.status]
      return h(Tag, { color: config.color }, () => config.text)
    },
  },
  {
    title: '商品信息',
    dataIndex: 'product',
    width: 300,
    customRender: ({ record }) => {
      const product = record.product
      return h('div', {
        style: 'display: flex; align-items: center; gap: 12px;',
      }, [
        h('img', {
          src: product.image,
          alt: product.name,
          style: 'width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid #f0f0f0;',
        }),
        h('div', [
          h('div', {
            style: 'font-weight: 500; margin-bottom: 4px;',
          }, product.name),
          h('div', {
            style: 'color: #1890ff; font-weight: 500; margin-bottom: 4px;',
          }, `¥${product.price.toLocaleString()}`),
          h('div', {
            style: 'font-size: 12px;',
          }, [
            '库存: ',
            h('span', {
              style: product.stock > 0 ? 'color: #52c41a;' : 'color: #f5222d;',
            }, product.stock),
          ]),
        ]),
      ])
    },
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 120,
    customRender: ({ record }) => {
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      }).format(record.amount)
    },
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 200,
    customRender: ({ record }) => {
      return h(Space, [
        h(Button, {
          type: 'link',
          size: 'small',
          icon: h(EyeOutlined),
          onClick: () => handleView(record),
        }, '查看'),

        record.editable && h(Button, {
          type: 'link',
          size: 'small',
          icon: h(EditOutlined),
          onClick: () => handleEdit(record),
        }, '编辑'),

        record.deletable && h(Button, {
          type: 'link',
          size: 'small',
          danger: true,
          icon: h(DeleteOutlined),
          onClick: () => handleDelete(record),
        }, '删除'),
      ].filter(Boolean))
    },
  },
]

// 事件处理函数
function handleView(record) {
  message.info(`查看用户: ${record.user.name}`)
}

function handleEdit(record) {
  message.info(`编辑用户: ${record.user?.name || record.name}`)
}

function handleDelete(record) {
  message.error(`删除用户: ${record.user?.name || record.name}`)
}
</script>

<template>
  <h4>自定义表格渲染演示</h4>
  <StdTable
    :columns="renderColumns"
    :table-props="{
      dataSource: renderData,
    }"
    :pagination="{ pageSize: 5 }"
  />
</template>
