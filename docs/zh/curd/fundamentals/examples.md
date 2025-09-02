# 使用示例

通过实际案例学习 CURD 组件库的常见使用模式和最佳实践。

## 🏢 用户管理系统

完整的用户管理系统示例，包含用户信息、角色权限、状态管理等功能。

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import { Tag, Avatar } from 'ant-design-vue'
import { h } from 'vue'

const userApi = useCurdApi('/api/users')

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    customRender: ({ value }) => 
      h(Avatar, { src: value, size: 40 }),
    form: {
      control: 'upload',
      accept: 'image/*',
      maxCount: 1,
      action: '/api/upload'
    }
  },
  {
    title: '用户名',
    dataIndex: 'username',
    search: { 
      control: 'input',
      placeholder: '请输入用户名'
    },
    form: {
      control: 'input',
      required: true,
      rules: [
        { min: 3, message: '用户名至少3个字符' },
        { max: 20, message: '用户名不能超过20个字符' }
      ]
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: { 
      control: 'input',
      placeholder: '请输入邮箱'
    },
    form: {
      control: 'input',
      required: true,
      rules: [
        { type: 'email', message: '请输入正确的邮箱格式' }
      ]
    }
  },
  {
    title: '角色',
    dataIndex: 'roles',
    customRender: ({ value }) => 
      value?.map(role => h(Tag, { color: 'blue', key: role }, () => role)),
    search: {
      control: 'select',
      mode: 'multiple',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '编辑者', value: 'editor' },
        { label: '查看者', value: 'viewer' }
      ]
    },
    form: {
      control: 'checkboxGroup',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '编辑者', value: 'editor' },
        { label: '查看者', value: 'viewer' }
      ]
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) => 
      h(Tag, { 
        color: value === 1 ? 'green' : 'red' 
      }, () => value === 1 ? '启用' : '禁用'),
    search: {
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    form: {
      control: 'switch',
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
      defaultValue: 1
    }
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    search: {
      control: 'dateRange',
      placeholder: ['开始日期', '结束日期']
    }
  }
]
</script>

<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
    :table-props="{
      rowSelection: { type: 'checkbox' },
      scroll: { x: 800 }
    }"
  />
</template>
```

## 📦 商品管理系统

电商后台商品管理示例，包含分类、价格、库存、图片等复杂字段。

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import { Image, Tag } from 'ant-design-vue'
import { h } from 'vue'

const productApi = useCurdApi('/api/products')

const columns = [
  {
    title: '商品图片',
    dataIndex: 'images',
    width: 100,
    customRender: ({ value }) => 
      h(Image, { 
        src: value?.[0], 
        width: 60, 
        height: 60,
        style: 'object-fit: cover; border-radius: 4px;'
      }),
    form: {
      control: 'upload',
      accept: 'image/*',
      multiple: true,
      maxCount: 5,
      listType: 'picture-card'
    }
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    search: { 
      control: 'input',
      placeholder: '请输入商品名称'
    },
    form: {
      control: 'input',
      required: true,
      rules: [
        { min: 2, message: '商品名称至少2个字符' },
        { max: 100, message: '商品名称不能超过100个字符' }
      ]
    }
  },
  {
    title: '商品分类',
    dataIndex: 'category',
    customRender: ({ value }) => 
      h(Tag, { color: 'blue' }, () => value?.name),
    search: {
      control: 'cascader',
      options: [
        {
          label: '电子产品',
          value: 'electronics',
          children: [
            { label: '手机', value: 'phone' },
            { label: '电脑', value: 'computer' }
          ]
        },
        {
          label: '服装',
          value: 'clothing',
          children: [
            { label: '男装', value: 'men' },
            { label: '女装', value: 'women' }
          ]
        }
      ]
    },
    form: {
      control: 'cascader',
      required: true,
      options: [
        {
          label: '电子产品',
          value: 'electronics',
          children: [
            { label: '手机', value: 'phone' },
            { label: '电脑', value: 'computer' }
          ]
        }
      ]
    }
  },
  {
    title: '价格',
    dataIndex: 'price',
    customRender: ({ value }) => `¥${value}`,
    search: {
      control: 'inputNumber',
      placeholder: '请输入价格'
    },
    form: {
      control: 'inputNumber',
      required: true,
      min: 0,
      precision: 2,
      addonBefore: '¥'
    }
  },
  {
    title: '库存',
    dataIndex: 'stock',
    customRender: ({ value }) => {
      const color = value > 10 ? 'green' : value > 0 ? 'orange' : 'red'
      return h(Tag, { color }, () => `${value}件`)
    },
    form: {
      control: 'inputNumber',
      required: true,
      min: 0
    }
  },
  {
    title: '商品描述',
    dataIndex: 'description',
    hiddenInTable: true,
    form: {
      control: 'textarea',
      rows: 4,
      maxLength: 500,
      showCount: true
    }
  },
  {
    title: '上架状态',
    dataIndex: 'is_active',
    customRender: ({ value }) => 
      h(Tag, { 
        color: value ? 'green' : 'red' 
      }, () => value ? '已上架' : '已下架'),
    search: {
      control: 'select',
      options: [
        { label: '已上架', value: true },
        { label: '已下架', value: false }
      ]
    },
    form: {
      control: 'switch',
      checkedChildren: '上架',
      unCheckedChildren: '下架',
      defaultValue: true
    }
  }
]
</script>

<template>
  <StdCurd
    title="商品管理"
    :api="productApi"
    :columns="columns"
    :form-props="{
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }"
  />
</template>
```

## 📋 订单管理系统

订单管理示例，展示复杂的状态流转和数据关联。

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import { Tag, Space, Button } from 'ant-design-vue'
import { h } from 'vue'

const orderApi = useCurdApi('/api/orders')

const orderStatusMap = {
  pending: { text: '待付款', color: 'orange' },
  paid: { text: '已付款', color: 'blue' },
  shipped: { text: '已发货', color: 'cyan' },
  delivered: { text: '已送达', color: 'green' },
  cancelled: { text: '已取消', color: 'red' }
}

const columns = [
  {
    title: '订单号',
    dataIndex: 'order_no',
    width: 150,
    search: { 
      control: 'input',
      placeholder: '请输入订单号'
    }
  },
  {
    title: '客户信息',
    dataIndex: 'customer',
    customRender: ({ value }) => 
      h('div', [
        h('div', { style: 'font-weight: bold;' }, value?.name),
        h('div', { style: 'color: #666; font-size: 12px;' }, value?.phone)
      ]),
    search: {
      control: 'input',
      placeholder: '请输入客户姓名或手机号'
    }
  },
  {
    title: '订单金额',
    dataIndex: 'total_amount',
    customRender: ({ value }) => 
      h('span', { style: 'color: #f50; font-weight: bold;' }, `¥${value}`),
    search: {
      control: 'inputNumber',
      placeholder: '请输入金额'
    }
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    customRender: ({ value }) => {
      const status = orderStatusMap[value]
      return h(Tag, { color: status.color }, () => status.text)
    },
    search: {
      control: 'select',
      options: Object.entries(orderStatusMap).map(([key, value]) => ({
        label: value.text,
        value: key
      }))
    },
    form: {
      control: 'select',
      required: true,
      options: Object.entries(orderStatusMap).map(([key, value]) => ({
        label: value.text,
        value: key
      }))
    }
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method',
    customRender: ({ value }) => {
      const methodMap = {
        alipay: '支付宝',
        wechat: '微信支付',
        bank: '银行卡'
      }
      return methodMap[value] || value
    },
    form: {
      control: 'radioGroup',
      options: [
        { label: '支付宝', value: 'alipay' },
        { label: '微信支付', value: 'wechat' },
        { label: '银行卡', value: 'bank' }
      ]
    }
  },
  {
    title: '下单时间',
    dataIndex: 'created_at',
    search: {
      control: 'dateRange',
      placeholder: ['开始日期', '结束日期']
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    hiddenInTable: true,
    form: {
      control: 'textarea',
      rows: 3
    }
  }
]

// 自定义操作按钮
const customActions = (record) => [
  h(Button, {
    type: 'link',
    size: 'small',
    onClick: () => viewOrderDetail(record.id)
  }, () => '查看详情'),
  
  record.status === 'paid' && h(Button, {
    type: 'link',
    size: 'small',
    onClick: () => shipOrder(record.id)
  }, () => '发货'),
  
  record.status === 'pending' && h(Button, {
    type: 'link',
    size: 'small',
    danger: true,
    onClick: () => cancelOrder(record.id)
  }, () => '取消订单')
].filter(Boolean)

const viewOrderDetail = (id) => {
  console.log('查看订单详情:', id)
}

const shipOrder = (id) => {
  console.log('发货:', id)
}

const cancelOrder = (id) => {
  console.log('取消订单:', id)
}
</script>

<template>
  <StdCurd
    title="订单管理"
    :api="orderApi"
    :columns="columns"
    :action-column="{
      title: '操作',
      width: 200,
      customRender: ({ record }) => h(Space, {}, () => customActions(record))
    }"
  />
</template>
```

## 📊 数据统计面板

结合图表展示的数据管理示例。

```vue
<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import { Card, Row, Col, Statistic } from 'ant-design-vue'
import { ref, onMounted } from 'vue'

const statisticsApi = useCurdApi('/api/statistics')
const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  totalOrders: 0,
  totalRevenue: 0
})

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    search: {
      control: 'dateRange',
      placeholder: ['开始日期', '结束日期']
    }
  },
  {
    title: '新增用户',
    dataIndex: 'new_users',
    customRender: ({ value }) => 
      h('span', { style: 'color: #1890ff;' }, value)
  },
  {
    title: '活跃用户',
    dataIndex: 'active_users',
    customRender: ({ value }) => 
      h('span', { style: 'color: #52c41a;' }, value)
  },
  {
    title: '订单数量',
    dataIndex: 'orders_count'
  },
  {
    title: '营收金额',
    dataIndex: 'revenue',
    customRender: ({ value }) => 
      h('span', { style: 'color: #f5222d; font-weight: bold;' }, `¥${value}`)
  }
]

onMounted(async () => {
  const result = await statisticsApi.getList({ summary: true })
  stats.value = result.summary
})
</script>

<template>
  <div>
    <!-- 统计卡片 -->
    <Row :gutter="16" style="margin-bottom: 24px;">
      <Col :span="6">
        <Card>
          <Statistic
            title="总用户数"
            :value="stats.totalUsers"
            :value-style="{ color: '#1890ff' }"
          />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic
            title="活跃用户"
            :value="stats.activeUsers"
            :value-style="{ color: '#52c41a' }"
          />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic
            title="总订单数"
            :value="stats.totalOrders"
            :value-style="{ color: '#722ed1' }"
          />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic
            title="总营收"
            :value="stats.totalRevenue"
            :precision="2"
            prefix="¥"
            :value-style="{ color: '#f5222d' }"
          />
        </Card>
      </Col>
    </Row>

    <!-- 数据表格 -->
    <StdCurd
      title="数据统计"
      :api="statisticsApi"
      :columns="columns"
      :create-button="false"
      :action-column="false"
    />
  </div>
</template>
```

## 🚀 下一步

通过这些示例，您已经了解了 CURD 在实际项目中的应用。接下来可以：

- [学习组件 API](../components/std-curd) - 深入了解组件配置
- [探索表单控件](../form-controls/basic-controls) - 掌握各种表单控件
- [学习高级特性](../advanced/customization) - 实现更复杂的定制需求