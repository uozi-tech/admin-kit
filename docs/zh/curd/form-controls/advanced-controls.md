# 高级控件

高级表单控件包括文件上传、开关、滑块、评分等特殊用途的控件，用于处理复杂的交互需求。

## 使用示例

<demo vue="../demos/curd/form-controls/advanced-controls.vue" />

## 文件上传 (upload)

用于文件上传，支持图片、文档等多种文件类型。

```ts
{
  title: '用户头像',
  dataIndex: 'avatar',
  edit: {
    type:'upload',
    upload: {
      accept: 'image/*',
      maxCount: 1,
      listType: 'picture-card',
      action: '/api/upload'
    }
  }
}
```

### 特别说明

若需要自行处理上传逻辑，可以使用 `beforeUpload` 属性。

```ts
{
  title: '用户头像',
  dataIndex: 'avatar',
  edit: {
    type:'upload',
    upload: {
      beforeUpload: (file: FileType, fileList: FileType[], value: Ref<any>) => {
        // file 是上传的文件
        // fileList 是上传的文件列表
        // value 是 form data 中对应字段的值，可以修改它来改变 form data 对应 dataIndex 的值
        // 返回 false 阻止自动上传
        return false
      }
    }
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

> 更多配置请参考 [UploadProps](https://antdv.com/components/upload#api)

### 图片上传示例

```ts
{
  title: '商品图片',
  dataIndex: 'images',
  edit: {
    type:'upload',
    upload: {
      accept: 'image/png,image/jpeg,image/jpg',
      maxCount: 5,
      maxSize: 2,
      listType: 'picture-card',
      action: '/api/upload/images',
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
    upload: {
      accept: '.pdf,.doc,.docx,.xls,.xlsx',
      multiple: true,
      maxCount: 10,
      maxSize: 10, // 10MB
      action: '/api/upload/documents'
    }
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
    switch: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
      defaultValue: true
    }
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

> 更多配置请参考 [SwitchProps](https://antdv.com/components/switch#api)

## 滑块 (slider)

用于数值范围选择。

```ts
{
  title: '价格范围',
  dataIndex: 'price_range',
  edit: {
    type:'slider',
    slider: {
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

> 更多配置请参考 [SliderProps](https://antdv.com/components/slider#api)

## 评分 (rate)

用于评分选择。

```ts
{
  title: '服务评分',
  dataIndex: 'rating',
  edit: {
    type:'rate',
    rate: {
      count: 5,
      allowHalf: true,
      tooltips: ['很差', '较差', '一般', '较好', '很好']
    }
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

> 更多配置请参考 [RateProps](https://antdv.com/components/rate#api)

## 自动完成 (autoComplete)

提供输入建议的文本输入框。

```ts
{
  title: '邮箱',
  dataIndex: 'email',
  edit: {
    type:'autoComplete',
    autoComplete: {
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
}
```

### 动态选项

```ts
{
  title: '用户名',
  dataIndex: 'username',
  edit: {
    type:'autoComplete',
    autoComplete: {
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
}
```

### 动态选项

```ts
{
  title: '用户名',
  dataIndex: 'username',
  edit: {
    type:'autoComplete',
    autoComplete: {
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
}
```

> 更多配置请参考 [AutoCompleteProps](https://antdv.com/components/auto-complete#api)

## 相关内容

- [基础控件](./basic-controls) - 文本输入、数字输入等
- [选择控件](./selection-controls) - 下拉选择、单选、多选等
- [日期控件](./date-controls) - 日期时间选择器