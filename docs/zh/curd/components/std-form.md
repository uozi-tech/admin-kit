# StdForm 组件

StdForm 是一个基于 Ant Design Vue Form 的表单组件,支持多种表单控件和验证规则。

## 基础用法

<demo vue="../demos/curd/std-form/basic.vue" title="基础表单" description="展示 StdForm 基础功能，包含各种表单控件、验证规则和布局配置"></demo>

## 字段联动

<demo vue="../demos/curd/std-form/form-linkage.vue" title="表单联动" description="展示表单字段间的联动功能：身份证号联动出生日期、性别、年龄；省市区三级联动"></demo>

StdForm 支持强大的字段间联动功能，当依赖字段值发生变化时可以自动更新其他字段。

更多联动功能请参考[表单联动](../advance/form-linkage)章节。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | StdTableColumn[] | [] |
| labelAlign | 标签对齐方式 | 'left' \| 'right' | 'left' |
| formRowProps | Row 组件属性，用于自定义表单布局 | RowProps | - |
| layout | 布局方式 | 'horizontal' \| 'vertical' \| 'inline' | 'vertical' |

### Model

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表单数据 | object | {} |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 验证表单 | (payload: \{ name: string \| number \| string[] \| number[], status: boolean, errors: string[] \}) => void |

## Slots

- 无

## Events

- `save`: 保存事件。
