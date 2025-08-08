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

## 字段联动

支持字段间的联动控制，当依赖字段值发生变化时触发联动处理函数：

```ts
interface FormConfig {
  // 依赖的字段名称数组
  dependencies?: string[]
  
  // 联动处理函数，接收当前字段值、完整表单数据和依赖字段值
  // 注意：需要在函数内部手动更新 formData 来实现字段联动
  onChange?: (value: any, formData: Record<string, any>, dependencies: Record<string, any>) => void
}
```

### 基础联动示例

#### 示例1：身份证号联动出生日期

```typescript
import { set } from 'lodash-es'

const formConfig = [
  {
    title: '身份证号',
    dataIndex: 'idCard',
    edit: {
      type: 'input',
      formItem: { required: true }
    }
  },
  {
    title: '出生日期',
    dataIndex: 'birthDate',
    edit: {
      type: 'date',
      dependencies: ['idCard'],
      onChange: (value, formData, dependencies) => {
        const idCard = dependencies.idCard
        if (idCard && idCard.length === 18) {
          // 从身份证号提取出生日期
          const year = idCard.substring(6, 10)
          const month = idCard.substring(10, 12)
          const day = idCard.substring(12, 14)
          const birthDate = `${year}-${month}-${day}`
          
          // 手动更新出生日期字段
          set(formData, 'birthDate', birthDate)
          
          // 提取性别信息
          const genderCode = parseInt(idCard.substring(16, 17))
          const gender = genderCode % 2 === 0 ? 'female' : 'male'
          
          // 手动更新性别字段
          set(formData, 'gender', gender)
        }
      }
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    }
  }
]
```

### 多字段联动

#### 示例2：多字段联动（省市联动）

```typescript
import { set } from 'lodash-es'

const formConfig = [
  {
    title: '省份',
    dataIndex: 'province',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '广东省', value: 'guangdong' },
          { label: '江苏省', value: 'jiangsu' }
        ]
      }
    }
  },
  {
    title: '城市',
    dataIndex: 'city',
    edit: {
      type: 'select',
      dependencies: ['province'],
      onChange: (value, formData, dependencies) => {
        const province = dependencies.province
        
        // 定义省市映射关系
        const cityMap = {
          guangdong: [
            { label: '广州市', value: 'guangzhou' },
            { label: '深圳市', value: 'shenzhen' }
          ],
          jiangsu: [
            { label: '南京市', value: 'nanjing' },
            { label: '苏州市', value: 'suzhou' }
          ]
        }
        
        // 手动更新城市选项（注意：这里需要配合组件的选项更新机制）
        const cityOptions = cityMap[province] || []
        
        // 清空当前城市选择
        set(formData, 'city', undefined)
        
        // 实际项目中，可能需要通过其他方式更新选项，如使用响应式数据
        console.log('可用城市选项:', cityOptions)
      },
      select: {
        options: [] // 初始为空，通过联动更新
      }
    }
  }
]
```

### 计算字段联动

#### 示例3：计算字段联动（单价 × 数量 = 总价）

```typescript
import { set } from 'lodash-es'

const formConfig = [
  {
    title: '单价',
    dataIndex: 'unitPrice',
    edit: {
      type: 'inputNumber',
      inputNumber: { min: 0, precision: 2 }
    }
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    edit: {
      type: 'inputNumber',
      inputNumber: { min: 0 }
    }
  },
  {
    title: '总价',
    dataIndex: 'totalPrice',
    edit: {
      type: 'inputNumber',
      dependencies: ['unitPrice', 'quantity'],
      onChange: (value, formData, dependencies) => {
        const { unitPrice, quantity } = dependencies
        if (unitPrice && quantity) {
          const totalPrice = (unitPrice * quantity).toFixed(2)
          // 手动更新总价字段
          set(formData, 'totalPrice', parseFloat(totalPrice))
        }
      },
      inputNumber: { disabled: true } // 只读字段
    }
  }
]
```

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
