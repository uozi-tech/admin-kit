# 表单联动

表单联动功能允许字段之间建立依赖关系，当依赖字段的值发生变化时，自动更新其他字段的值。这在处理复杂表单逻辑时非常有用。

## 基础概念

### dependencies
定义当前字段依赖的其他字段名称数组。当这些字段的值发生变化时，会触发联动处理函数。

### onChange
联动处理函数，接收以下参数：
- `value`: 当前字段的值
- `formData`: 完整的表单数据对象
- `dependencies`: 依赖字段的值对象

**重要说明**：`onChange` 函数是 `void` 类型，不返回值。需要在函数内部使用 `set(formData, fieldName, value)` 手动更新字段值。

## 常见联动场景

### 1. 身份证信息自动填充

从身份证号码中自动解析出生日期和性别：

```ts
import { set } from 'lodash-es'

const columns = [
  {
    title: '身份证号',
    dataIndex: 'idCard',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入身份证号' },
          { len: 18, message: '身份证号必须为18位' }
        ]
      }
    }
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    edit: {
      type: 'date',
      dependencies: ['idCard'],
      onChange: (value, formData, dependencies) => {
        const idCard = dependencies.idCard
        if (idCard && idCard.length === 18) {
          const year = idCard.substring(6, 10)
          const month = idCard.substring(10, 12)
          const day = idCard.substring(12, 14)
          const birthday = `${year}-${month}-${day}`
          set(formData, 'birthday', birthday)
        }
      }
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    edit: {
      type: 'select',
      dependencies: ['idCard'],
      onChange: (value, formData, dependencies) => {
        const idCard = dependencies.idCard
        if (idCard && idCard.length === 18) {
          const genderCode = parseInt(idCard.charAt(16))
          const gender = genderCode % 2 === 1 ? 'male' : 'female'
          set(formData, 'gender', gender)
        }
      },
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

### 2. 级联选择

省份城市联动选择：

```ts
import { set } from 'lodash-es'

const columns = [
  {
    title: '省份',
    dataIndex: 'province',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '广东省', value: 'guangdong' },
          { label: '江苏省', value: 'jiangsu' },
          { label: '浙江省', value: 'zhejiang' }
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
        // 清空当前城市选择
        set(formData, 'city', undefined)
      },
      select: {
        // 根据省份动态获取城市选项
        remote: {
          api: (formData) => {
            const { province } = formData
            return fetch(`/api/cities?province=${province}`)
          },
          valueKey: 'code',
          labelKey: 'name'
        }
      }
    }
  }
]
```

### 3. 计算字段

价格数量自动计算总价：

```ts
import { set } from 'lodash-es'

const columns = [
  {
    title: '单价',
    dataIndex: 'price',
    edit: {
      type: 'inputNumber',
      inputNumber: {
        min: 0,
        precision: 2,
        placeholder: '请输入单价'
      }
    }
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    edit: {
      type: 'inputNumber',
      inputNumber: {
        min: 1,
        placeholder: '请输入数量'
      }
    }
  },
  {
    title: '总价',
    dataIndex: 'totalPrice',
    edit: {
      type: 'inputNumber',
      dependencies: ['price', 'quantity'],
      onChange: (value, formData, dependencies) => {
        const { price, quantity } = dependencies
        if (price && quantity) {
          const totalPrice = Number((price * quantity).toFixed(2))
          set(formData, 'totalPrice', totalPrice)
        }
      },
      inputNumber: {
        precision: 2,
        disabled: true // 计算字段通常设为只读
      }
    }
  }
]
```

### 4. 条件显示/隐藏

根据类型字段控制其他字段的显示：

```ts
import { set } from 'lodash-es'

const columns = [
  {
    title: '用户类型',
    dataIndex: 'userType',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '个人用户', value: 'personal' },
          { label: '企业用户', value: 'company' }
        ]
      }
    }
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',
    edit: {
      type: 'input',
      dependencies: ['userType'],
      onChange: (value, formData, dependencies) => {
        const { userType } = dependencies
        // 如果不是企业用户，清空公司名称
        if (userType !== 'company') {
          set(formData, 'companyName', '')
        }
      },
      // 根据用户类型动态设置是否必填
      formItem: {
        required: false // 在 onChange 中动态控制
      }
    }
  }
]
```

## 高级用法

### 多字段依赖

一个字段可以依赖多个字段：

```ts
import { set } from 'lodash-es'

{
  title: '折扣后价格',
  dataIndex: 'discountedPrice',
  edit: {
    type: 'inputNumber',
    dependencies: ['price', 'quantity', 'discountRate'],
    onChange: (value, formData, dependencies) => {
      const { price, quantity, discountRate } = dependencies
      if (price && quantity && discountRate) {
        const total = price * quantity
        const discount = total * (discountRate / 100)
        const discountedPrice = Number((total - discount).toFixed(2))
        set(formData, 'discountedPrice', discountedPrice)
      }
    }
  }
}
```

### 链式联动

字段A影响字段B，字段B又影响字段C：

```ts
import { set } from 'lodash-es'

const columns = [
  {
    title: '商品类别',
    dataIndex: 'category',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '电子产品', value: 'electronics' },
          { label: '服装', value: 'clothing' }
        ]
      }
    }
  },
  {
    title: '商品品牌',
    dataIndex: 'brand',
    edit: {
      type: 'select',
      dependencies: ['category'],
      onChange: (value, formData, dependencies) => {
        // 清空品牌和型号
        set(formData, 'brand', undefined)
        set(formData, 'model', undefined)
      },
      select: {
        remote: {
          api: (formData) => {
            const { category } = formData
            return fetch(`/api/brands?category=${category}`)
          }
        }
      }
    }
  },
  {
    title: '商品型号',
    dataIndex: 'model',
    edit: {
      type: 'select',
      dependencies: ['brand'],
      onChange: (value, formData, dependencies) => {
        set(formData, 'model', undefined)
      },
      select: {
        remote: {
          api: (formData) => {
            const { brand } = formData
            return fetch(`/api/models?brand=${brand}`)
          }
        }
      }
    }
  }
]
```

### 异步联动

联动处理中包含异步操作：

```ts
import { set } from 'lodash-es'

{
  title: '邮政编码',
  dataIndex: 'zipCode',
  edit: {
    type: 'input',
    dependencies: ['address'],
    onChange: async (value, formData, dependencies) => {
      const { address } = dependencies
      if (address) {
        try {
          // 异步获取邮政编码
          const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`)
          const data = await response.json()
          set(formData, 'zipCode', data.zipCode)
          set(formData, 'latitude', data.lat)
          set(formData, 'longitude', data.lng)
        } catch (error) {
          console.error('获取邮政编码失败:', error)
        }
      }
    }
  }
}
```

### 商品分类联动

需要调用 API 获取联动数据：

```typescript
import { set } from 'lodash-es'

{
  title: '商品分类',
  dataIndex: 'categoryId',
  edit: {
    type: 'select',
    dependencies: ['supplierId'],
    onChange: async (value, formData, dependencies) => {
      const { supplierId } = dependencies
      if (supplierId) {
        try {
          const categories = await fetchCategoriesBySupplier(supplierId)
          
          // 手动更新分类选择
          set(formData, 'categoryId', undefined)
          
          // 注意：选项更新需要配合组件的响应式机制
          // 实际项目中可能需要通过其他方式更新选项
          console.log('可用分类选项:', categories)
        } catch (error) {
          console.error('获取分类失败:', error)
          set(formData, 'categoryId', undefined)
        }
      }
    }
  }
}
```

## 注意事项

### 1. 避免循环依赖

确保字段间的依赖关系不会形成循环：

```ts
// ❌ 错误：形成循环依赖
{
  title: '字段A',
  dataIndex: 'fieldA',
  edit: {
    dependencies: ['fieldB'], // A依赖B
    onChange: (values, formData) => { 
      set(formData, "fieldA", values.fieldB)
    }
  }
},
{
  title: '字段B',
  dataIndex: 'fieldB',
  edit: {
    dependencies: ['fieldA'], // B依赖A，形成循环
    onChange: (values, formData) => { 
      set(formData, "fieldB", values.fieldA)
    }
  }
}
```

### 2. 性能考虑

对于复杂的联动逻辑，考虑使用防抖来避免频繁触发：

```ts
import { debounce } from 'lodash-es'

const debouncedOnChange = debounce((values) => {
  // 复杂的联动逻辑
  calculateComplexValues(values)
}, 300)

{
  title: '复杂计算字段',
  dataIndex: 'complexField',
  edit: {
    dependencies: ['field1', 'field2', 'field3'],
    onChange: debouncedOnChange
  }
}
```

### 3. 错误处理

在联动函数中添加适当的错误处理：

```ts
{
  title: '计算字段',
  dataIndex: 'calculated',
  edit: {
    dependencies: ['input1', 'input2'],
    onChange: (values) => {
      try {
        const { input1, input2 } = values
        if (input1 && input2) {
          const result = complexCalculation(input1, input2)
          // ...
        }
      } catch (error) {
        console.error('计算失败:', error)
        // 错误提示
      }
    }
  }
}
```
