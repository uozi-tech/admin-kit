# 基础控件

基础表单控件包括文本输入、数字输入、密码输入和多行文本等常用输入控件。

## 使用示例

<demo vue="../demos/curd/form-controls/basic-controls.vue" />

## 文本输入框 (input)

用于单行文本输入。

```ts
{
  title: '用户名',
  dataIndex: 'username',
  edit: {
    type:'input',
    placeholder: '请输入用户名',
    input: {
      maxlength: 20,
      showCount: true
    }
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| placeholder | 占位符 | string | - |
| maxlength | 最大长度 | number | - |
| showCount | 显示字数统计 | boolean | false |
| allowClear | 显示清除按钮 | boolean | false |
| addonBefore | 前置标签 | string \| VNode | - |
| addonAfter | 后置标签 | string \| VNode | - |

## 密码输入框 (password)

用于密码输入，自动隐藏输入内容。

```ts
{
  title: '密码',
  dataIndex: 'password',
  edit: {
    type:'password',
    placeholder: '请输入密码',
    password: {
      visibilityToggle: true
    }
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visibilityToggle | 显示切换按钮 | boolean | true |
| iconRender | 自定义切换图标 | (visible: boolean) => VNode | - |

## 多行文本 (textarea)

用于多行文本输入。

```ts
{
  title: '备注',
  dataIndex: 'remark',
  edit: {
    type:'textarea',
    placeholder: '请输入备注信息',
    textarea: {
      rows: 4,
      maxlength: 500,
      showCount: true
    }
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| rows | 行数 | number | 4 |
| maxlength | 最大长度 | number | - |
| showCount | 显示字数统计 | boolean | false |
| autoSize | 自适应高度 | boolean \| object | false |

## 数字输入框 (inputNumber)

用于数字输入，支持精度控制和范围限制。

```ts
{
  title: '价格',
  dataIndex: 'price',
  edit: {
    type:'inputNumber',
    inputNumber: {
      min: 0,
      max: 999999,
      precision: 2,
      step: 0.01,
      addonBefore: '¥'
    }
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| min | 最小值 | number | -Infinity |
| max | 最大值 | number | Infinity |
| step | 步长 | number | 1 |
| precision | 精度 | number | - |
| formatter | 格式化函数 | (value: number) => string | - |
| parser | 解析函数 | (displayValue: string) => number | - |

## 使用示例

### 用户注册表单

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type:'input',
      formItem: {
        required: true,
        rules: [
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名不能超过20个字符' }
        ]
      },
      placeholder: '请输入用户名',
    }
  },
  {
    title: '密码',
    dataIndex: 'password',
    edit: {
      type:'password',
      formItem: {
        required: true,
        rules: [
          { min: 6, message: '密码至少6个字符' }
        ]
      },
      placeholder: '请输入密码',
    }
  },
  {
    title: '确认密码',
    dataIndex: 'confirmPassword',
    edit: {
      type:'password',
      formItem: {
        required: true,
        rules: [
          {
            validator: (rule, value, callback) => {
              if (value && value !== formData.password) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      placeholder: '请再次输入密码',
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    edit: {
      type:'inputNumber',
      inputNumber: {
        min: 18,
        max: 65,
      },
      placeholder: '请输入年龄'
    }
  },
  {
    title: '个人简介',
    dataIndex: 'bio',
    edit: {
      type:'textarea',
      textarea: {
        rows: 4,
        maxlength: 200,
        showCount: true,
      },
      placeholder: '请输入个人简介'
    }
  }
]
</script>

<template>
  <StdForm :api="userApi" :columns="columns" />
</template>
```

## 验证规则

### 常用验证规则

```ts
// 必填验证
{ required: true, message: '此字段为必填项' }

// 长度验证
{ min: 3, max: 20, message: '长度在3-20个字符之间' }

// 正则验证
{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }

// 邮箱验证
{ type: 'email', message: '请输入正确的邮箱格式' }

// 数字验证
{ type: 'number', min: 0, max: 100, message: '请输入0-100之间的数字' }

// 自定义验证
{
  validator: (rule, value, callback) => {
    if (value && value.length < 6) {
      callback(new Error('密码长度不能少于6位'))
    } else {
      callback()
    }
  }
}
```

## 相关内容

- [选择控件](./selection-controls) - 下拉选择、单选、多选等
- [日期控件](./date-controls) - 日期时间选择器
- [高级控件](./advanced-controls) - 上传、开关、滑块等