# 表单配置

表单配置用于定义数据的编辑界面，包括表单控件类型、校验规则等。

## 基础配置

```ts
interface FormConfig {
  // 控件类型
  type: FormControlType

  // 表单项配置
  formItem?: {
    label?: string // 标签文本
    required?: boolean // 是否必填
    rules?: Rule[] // 校验规则
    extra?: string // 额外提示
    tooltip?: string // 帮助信息
  }

  // 控件属性
  [key: string]: any
}
```

## 控件类型

CURD 内置了多种表单控件:

### 文本输入

```ts
{
  type: 'input',
  formItem: {
    required: true,
    rules: [{ min: 3, max: 20 }]
  },
  input: {
    placeholder: '请输入',
    maxLength: 20,
    allowClear: true
  }
}
```

### 选择器

```ts
{
  type: 'select',
  formItem: {
    required: true
  },
  select: {
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ],
    mode: 'multiple', // 多选模式
    allowClear: true,
    showSearch: true // 可搜索
  }
}
```

### 日期选择

```ts
{
  type: 'date',
  formItem: {
    required: true
  },
  date: {
    format: 'YYYY-MM-DD',
    showTime: false,
    disabledDate: (current) => {
      return current && current < moment().startOf('day')
    }
  }
}
```

:::tip 更多控件
请查阅 [表单控件](../form-controls/input.md) 模块。
:::

## 校验规则

支持多种校验规则:

```ts
{
  formItem: {
    rules: [
      { required: true, message: '必填项' },
      { type: 'email', message: '请输入正确的邮箱格式' },
      { min: 3, max: 20, message: '长度在 3-20 个字符' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
      { validator: async (rule, value) => {
        if (!value)
          return
        // 自定义校验逻辑
      } }
    ]
  }
}
```

## 远程数据

支持从接口获取选项数据:

```ts
{
  type: 'select',
  formItem: {
    label: '部门'
  },
  select: {
    remote: {
      api: () => fetch('/api/departments'),
      valueKey: 'id',
      labelKey: 'name'
    }
  }
}
```

<!-- ## 联动控制

可以通过表单值联动控制其他字段:

```ts
{
  type: 'select',
  formItem: {
    name: 'type',
    label: '类型'
  },
  select: {
    options: [
      { label: '类型1', value: 1 },
      { label: '类型2', value: 2 }
    ],
    onChange: (value, form) => {
      // 根据类型值设置其他字段
      form.setFieldsValue({
        extra: value === 1 ? '默认值1' : '默认值2'
      })
    }
  }
}
``` -->

## 完整示例

```ts
const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      col: {
        span: 10
      },
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 20, message: '长度在 3-20 个字符' }
        ]
      },
      input: {
        placeholder: '请输入用户名',
        maxLength: 20,
        allowClear: true
      }
    }
  },
  {
    title: '部门',
    dataIndex: 'department',
    edit: {
      type: 'select',
      col: {
        span: 10
      },
      formItem: {
        required: true
      },
      select: {
        remote: {
          api: () => fetch('/api/departments'),
          valueKey: 'id',
          labelKey: 'name'
        }
      }
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    edit: {
      type: 'date',
      formItem: {
        required: true
      },
      date: {
        format: 'YYYY-MM-DD'
      }
    }
  }
]
```
