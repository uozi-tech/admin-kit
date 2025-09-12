# 选择控件

选择控件用于从预定义的选项中选择一个或多个值，包括下拉选择、单选按钮组、多选框组和级联选择等。

## 使用示例

<demo vue="../demos/curd/form-controls/selection-controls.vue" />

## 下拉选择 (select)

用于从下拉列表中选择一个或多个选项。

```ts
{
  title: '用户状态',
  dataIndex: 'status',
  edit: {
    type:'select',
    select: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
    },
    placeholder: '请选择状态'
  }
}
```

### 多选模式

```ts
{
  title: '用户角色',
  dataIndex: 'roles',
  edit: {
    type:'select',
    select: {
      mode: 'multiple',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '编辑者', value: 'editor' },
        { label: '查看者', value: 'viewer' }
      ],
    },
    placeholder: '请选择角色'
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项数据 | Array<{label: string, value: any}> | [] |
| mode | 选择模式 | 'multiple' \| 'tags' | - |
| allowClear | 允许清空 | boolean | false |
| showSearch | 显示搜索框 | boolean | false |
| filterOption | 过滤选项 | boolean \| function | true |
| optionFilterProp | 搜索时过滤对应的 option 属性 | string | 'label' |

> 更多配置请参考 [SelectProps](https://antdv.com/components/select#api)

## 单选按钮组 (radioGroup)

用于在多个选项中选择一个，所有选项可见。

```ts
{
  title: '性别',
  dataIndex: 'gender',
  edit: {
    type:'radioGroup',
    radioGroup: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' }
      ],
    },
  }
}
```

### 按钮样式

```ts
{
  title: '优先级',
  dataIndex: 'priority',
  edit: {
    type:'radioGroup',
    radioGroup: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '低', value: 'low' },
        { label: '中', value: 'medium' },
        { label: '高', value: 'high' }
      ],
    },
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项数据 | Array<{label: string, value: any}> | [] |
| optionType | 选项类型 | 'default' \| 'button' | 'default' |
| buttonStyle | 按钮样式 | 'outline' \| 'solid' | 'outline' |
| size | 尺寸 | 'large' \| 'middle' \| 'small' | 'middle' |

> 更多配置请参考 [RadioGroupProps](https://antdv.com/components/radio#api)

## 多选框组 (checkboxGroup)

用于在多个选项中选择多个，所有选项可见。

```ts
{
  title: '兴趣爱好',
  dataIndex: 'hobbies',
  edit: {
    type:'checkboxGroup',
    checkboxGroup: {
      options: [
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '旅行', value: 'travel' },
        { label: '音乐', value: 'music' }
      ],
    },
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项数据 | Array<{label: string, value: any}> | [] |
| disabled | 是否禁用 | boolean | false |

> 更多配置请参考 [CheckboxGroupProps](https://antdv.com/components/checkbox#api)

## 级联选择 (cascader)

用于级联选择，如省市区选择。

```ts
{
  title: '所在地区',
  dataIndex: 'region',
  edit: {
    type:'cascader',
    cascader: {
      options: [
        {
          label: '浙江省',
          value: 'zhejiang',
          children: [
            {
              label: '杭州市',
              value: 'hangzhou',
              children: [
                { label: '西湖区', value: 'xihu' },
                { label: '余杭区', value: 'yuhang' }
              ]
            }
          ]
        }
      ],
    },
    placeholder: '请选择地区'
  }
}
```

### 多选模式

```ts
{
  title: '业务范围',
  dataIndex: 'business_scope',
  edit: {
    type:'cascader',
    cascader: {
      multiple: true,
      options: [
        {
          label: '技术',
          value: 'tech',
          children: [
            { label: '前端开发', value: 'frontend' },
            { label: '后端开发', value: 'backend' }
          ]
        }
      ],
    },
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项数据 | CascaderOption[] | [] |
| multiple | 是否多选 | boolean | false |
| showSearch | 显示搜索框 | boolean | false |
| changeOnSelect | 选择即改变 | boolean | false |
| displayRender | 自定义显示 | function | - |

> 更多配置请参考 [CascaderProps](https://antdv.com/components/cascader#api)


## 表格列表选择器（selector）

表格列表选择器（Selector）是一个强大的表单控件，通过表格形式展示选项数据，支持搜索、分页和多选等功能。

### 基础用法

最简单的选择器配置：

```ts
{
  title: '部门',
  dataIndex: 'departmentId',
  edit: {
    type: 'selector',
    selector: {
      getListApi: departmentApi.getList,
      columns: [
        { title: '部门名称', dataIndex: 'name' },
        { title: '部门编码', dataIndex: 'code' },
      ],
      valueKey: 'id',
      displayKey: 'name',
      title: '选择部门',
    },
  },
}
```

### 配置选项

```ts
interface SelectorConfig {
  // API 配置
  getListApi: (params: any) => Promise<any> // 获取数据的API
  valueKey: string // 值字段
  displayKey: string // 显示字段
  
  // 表格配置
  columns: TableColumn[] // 表格列配置
  title?: string // 弹窗标题
  tableProps?: TableProps // 表格配置
  
  // 功能配置
  selectionType?: 'radio' | 'checkbox' // 选择类型
  selectionConfig?: TableRowSelection // 选择配置
}
```

选择器也可以在搜索表单中使用：

```ts
{
  title: '部门',
  dataIndex: 'departmentId',
  search: {
    type: 'selector',
    selector: {
      getListApi: departmentApi.getList,
      columns: [
        { title: '部门名称', dataIndex: 'name' },
        { title: '负责人', dataIndex: 'manager' },
      ],
      valueKey: 'id',
      displayKey: 'name',
      title: '选择部门',
    },
  },
}
```

## 动态选项加载

### 异步加载选项

```ts
{
  title: '所属部门',
  dataIndex: 'department_id',
  edit: {
    type:'select',
    select: {
      remote: {
        api: async () => {
          const response = await fetch('/api/departments')
          return response.json()
        },
        valueKey: 'id',
        labelKey: 'name',
      }
    },
    placeholder: '请选择部门'
  }
}
```

## 使用示例

### 用户信息表单

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')

const columns = [
  {
    title: '用户状态',
    dataIndex: 'status',
    edit: {
      type:'select',
      formItem: {
        required: true,
      },
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ],
      },
      defaultValue: 1
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    edit: {
      type:'radioGroup',
      radioGroup: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    }
  },
  {
    title: '用户角色',
    dataIndex: 'roles',
    edit: {
      type:'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑者', value: 'editor' },
          { label: '查看者', value: 'viewer' }
        ]
      }
    }
  },
  {
    title: '所在地区',
    dataIndex: 'region',
    edit: {
      type:'cascader',
      cascader: {
        options: [
          {
            label: '浙江省',
            value: 'zhejiang',
            children: [
              {
                label: '杭州市',
                value: 'hangzhou',
                children: [
                  { label: '西湖区', value: 'xihu' },
                  { label: '余杭区', value: 'yuhang' }
                ]
              }
            ]
          }
        ]
      }
    }
  }
]
</script>

<template>
  <StdForm :columns="columns" />
</template>
```

## 相关内容

- [基础控件](./basic-controls) - 文本输入、数字输入等
- [日期控件](./date-controls) - 日期时间选择器
- [高级控件](./advanced-controls) - 上传、开关、滑块等