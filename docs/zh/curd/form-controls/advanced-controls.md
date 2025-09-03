# 高级控件

高级表单控件包括文件上传、开关、滑块、评分等特殊用途的控件，用于处理复杂的交互需求。

## 文件上传 (upload)

用于文件上传，支持图片、文档等多种文件类型。

```ts
{
  title: '用户头像',
  dataIndex: 'avatar',
  edit: {
    type:'upload',
    accept: 'image/*',
    maxCount: 1,
    listType: 'picture-card',
    action: '/api/upload'
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| accept | 接受的文件类型 | string | - |
| action | 上传地址 | string | - |
| maxCount | 最大文件数 | number | - |
| maxSize | 最大文件大小(MB) | number | - |
| listType | 上传列表样式 | 'text' \| 'picture' \| 'picture-card' | 'text' |
| multiple | 是否多选 | boolean | false |
| directory | 支持上传文件夹 | boolean | false |

### 图片上传示例

```ts
{
  title: '商品图片',
  dataIndex: 'images',
  edit: {
    type:'upload',
    accept: 'image/png,image/jpeg,image/jpg',
    maxCount: 5,
    maxSize: 2, // 2MB
    listType: 'picture-card',
    action: '/api/upload/images',
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件!')
      }
      return isImage
    }
  }
}
```

### 文档上传示例

```ts
{
  title: '附件',
  dataIndex: 'attachments',
  edit: {
    type:'upload',
    accept: '.pdf,.doc,.docx,.xls,.xlsx',
    multiple: true,
    maxCount: 10,
    maxSize: 10, // 10MB
    action: '/api/upload/documents'
  }
}
```

## 开关 (switch)

用于布尔值的切换。

```ts
{
  title: '启用状态',
  dataIndex: 'is_active',
  edit: {
    type:'switch',
    checkedChildren: '启用',
    unCheckedChildren: '禁用',
    defaultValue: true
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checkedChildren | 选中时的内容 | string \| VNode | - |
| unCheckedChildren | 非选中时的内容 | string \| VNode | - |
| checkedValue | 选中时的值 | any | true |
| unCheckedValue | 非选中时的值 | any | false |
| size | 开关大小 | 'default' \| 'small' | 'default' |
| loading | 加载状态 | boolean | false |

## 滑块 (slider)

用于数值范围选择。

```ts
{
  title: '价格范围',
  dataIndex: 'price_range',
  edit: {
    type:'slider',
    range: true,
    min: 0,
    max: 10000,
    step: 100,
    marks: {
      0: '¥0',
      2500: '¥2500',
      5000: '¥5000',
      7500: '¥7500',
      10000: '¥10000'
    }
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长 | number | 1 |
| range | 是否为范围选择 | boolean | false |
| marks | 刻度标记 | object | - |
| vertical | 是否垂直 | boolean | false |
| tooltipVisible | 是否显示提示 | boolean | - |

## 评分 (rate)

用于评分选择。

```ts
{
  title: '服务评分',
  dataIndex: 'rating',
  edit: {
    type:'rate',
    count: 5,
    allowHalf: true,
    tooltips: ['很差', '较差', '一般', '较好', '很好']
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| count | 星星总数 | number | 5 |
| allowHalf | 是否允许半选 | boolean | false |
| allowClear | 是否允许清除 | boolean | true |
| tooltips | 自定义提示信息 | string[] | - |
| character | 自定义字符 | string \| VNode | ⭐ |

## 自动完成 (autoComplete)

提供输入建议的文本输入框。

```ts
{
  title: '邮箱',
  dataIndex: 'email',
  edit: {
    type:'autoComplete',
    options: [
      { value: '@gmail.com' },
      { value: '@163.com' },
      { value: '@qq.com' },
      { value: '@hotmail.com' }
    ],
    filterOption: (inputValue, option) =>
      option.value.includes(inputValue)
  }
}
```

### 动态选项

```ts
{
  title: '用户名',
  dataIndex: 'username',
  edit: {
    type:'autoComplete',
    onSearch: async (searchText) => {
      if (searchText) {
        const response = await fetch(`/api/users/search?q=${searchText}`)
        const users = await response.json()
        return users.map(user => ({ value: user.username }))
      }
      return []
    }
  }
}
```

## 颜色选择器 (colorPicker)

用于颜色选择。

```ts
{
  title: '主题色',
  dataIndex: 'theme_color',
  edit: {
    type:'colorPicker',
    showText: true,
    presets: [
      { label: '推荐', colors: ['#1890ff', '#52c41a', '#faad14', '#f5222d'] },
      { label: '最近使用', colors: ['#722ed1', '#eb2f96', '#fa8c16'] }
    ]
  }
}
```

## 使用示例

### 商品管理表单

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import { message } from 'ant-design-vue'

const productApi = useCurdApi('/products')

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    edit: {
      type:'input',
      required: true
    }
  },
  {
    title: '商品图片',
    dataIndex: 'images',
    edit: {
      type:'upload',
      accept: 'image/*',
      maxCount: 5,
      maxSize: 2,
      listType: 'picture-card',
      action: '/api/upload/images',
      beforeUpload: (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          message.error('只能上传 JPG/PNG 格式的图片!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          message.error('图片大小不能超过 2MB!')
        }
        return isJpgOrPng && isLt2M
      }
    }
  },
  {
    title: '价格范围',
    dataIndex: 'price_range',
    edit: {
      type:'slider',
      range: true,
      min: 0,
      max: 10000,
      step: 10,
      marks: {
        0: '¥0',
        5000: '¥5000',
        10000: '¥10000'
      },
      tipFormatter: (value) => `¥${value}`
    }
  },
  {
    title: '推荐等级',
    dataIndex: 'recommend_level',
    edit: {
      type:'rate',
      count: 5,
      allowHalf: true,
      tooltips: ['不推荐', '一般', '推荐', '强烈推荐', '必买']
    }
  },
  {
    title: '是否上架',
    dataIndex: 'is_published',
    edit: {
      type:'switch',
      checkedChildren: '上架',
      unCheckedChildren: '下架',
      defaultValue: false
    }
  },
  {
    title: '商品说明书',
    dataIndex: 'manual',
    edit: {
      type:'upload',
      accept: '.pdf',
      maxCount: 1,
      maxSize: 5,
      action: '/api/upload/documents'
    }
  }
]
</script>

<template>
  <StdForm :api="productApi" :columns="columns" />
</template>
```

### 用户设置表单

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const settingsApi = useCurdApi('/user/settings')

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type:'upload',
      accept: 'image/*',
      maxCount: 1,
      listType: 'picture-card',
      action: '/api/upload/avatar',
      beforeUpload: (file) => {
        const isImage = file.type.startsWith('image/')
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isImage) {
          message.error('只能上传图片文件!')
        }
        if (!isLt1M) {
          message.error('图片大小不能超过 1MB!')
        }
        return isImage && isLt1M
      }
    }
  },
  {
    title: '邮箱通知',
    dataIndex: 'email_notification',
    edit: {
      type:'switch',
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
      defaultValue: true
    }
  },
  {
    title: '短信通知',
    dataIndex: 'sms_notification',
    edit: {
      type:'switch',
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
      defaultValue: false
    }
  },
  {
    title: '音量设置',
    dataIndex: 'volume',
    edit: {
      type:'slider',
      min: 0,
      max: 100,
      step: 1,
      marks: {
        0: '静音',
        50: '50%',
        100: '最大'
      },
      tipFormatter: (value) => `${value}%`,
      defaultValue: 50
    }
  },
  {
    title: '界面主题色',
    dataIndex: 'theme_color',
    edit: {
      type:'colorPicker',
      showText: true,
      defaultValue: '#1890ff',
      presets: [
        {
          label: '推荐色彩',
          colors: [
            '#1890ff', '#52c41a', '#faad14', '#f5222d',
            '#722ed1', '#eb2f96', '#fa8c16', '#13c2c2'
          ]
        }
      ]
    }
  },
  {
    title: '服务评价',
    dataIndex: 'service_rating',
    edit: {
      type:'rate',
      allowHalf: true,
      tooltips: ['很差', '较差', '一般', '较好', '很好']
    }
  }
]
</script>

<template>
  <StdForm :api="settingsApi" :columns="columns" />
</template>
```

## 高级控件对比

| 控件 | 用途 | 数据类型 | 适用场景 |
|------|------|----------|----------|
| **upload** | 文件上传 | File[] \| string[] | 头像、文档、图片 |
| **switch** | 布尔切换 | boolean | 开关状态、功能启用 |
| **slider** | 数值范围 | number \| [number, number] | 价格范围、音量设置 |
| **rate** | 评分 | number | 服务评价、商品评分 |
| **autoComplete** | 输入建议 | string | 邮箱、用户名提示 |
| **colorPicker** | 颜色选择 | string | 主题色、标签颜色 |

<demo vue="../demos/curd/form-controls/advanced-controls.vue" />

## 相关内容

- [基础控件](./basic-controls) - 文本输入、数字输入等
- [选择控件](./selection-controls) - 下拉选择、单选、多选等
- [日期控件](./date-controls) - 日期时间选择器