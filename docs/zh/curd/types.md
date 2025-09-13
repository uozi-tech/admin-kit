# TypeScript 类型定义参考

Admin Kit CURD 包提供了完整的 TypeScript 类型定义，确保代码的类型安全和开发体验。本文档详细介绍所有可用的类型定义。

## 核心组件类型

### StdCurdProps

主 CURD 组件的属性接口，定义了完整的 CURD 功能配置：

```typescript
interface StdCurdProps {
  // 组件属性
  detailProps?: DescriptionsProps
  formRowProps?: RowProps
  columns: StdTableColumn[]
  rowKey?: string

  // 表格选择
  rowSelectionType?: 'checkbox' | 'radio'
  rowSelection?: TableRowSelection

  // 滚动配置
  scrollX?: number | string
  scrollY?: number | string

  // 标题和API
  title?: string | (() => string)
  api: CurdApi

  // 表格属性
  tableProps?: TableProps

  // 查询参数
  customQueryParams?: Record<string, any>
  overwriteParams?: Record<string, any>

  // 模态框配置
  modalWidth?: string | number
  formClass?: string | string[] | Record<string, boolean>

  // 功能开关
  disableRouterQuery?: boolean
  disableSearch?: boolean
  disableAdd?: boolean
  disableView?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  disableExport?: boolean
  disableTrash?: boolean

  // UI 显示控制
  hideResetBtn?: boolean
  showSearchBtn?: boolean
  hideTitle?: boolean
  hideExtra?: boolean
  hideHeader?: boolean

  // 拖拽功能
  rowDraggable?: boolean
  rowDraggableOptions?: {
    onMove?: (oldRow: number[], newRow: number[]) => void
    onEnd?: (data: {
      target_id: number
      direction: number
      affected_ids: number[]
    }) => void
  }

  // 扩展渲染
  searchFormExtraRender?: (
    searchFormData: any,
    searchColumns: StdTableColumn[],
    stdTableConfig: Record<any, any>
  ) => VNode | JSX.Element

  // 删除确认配置
  deleteConfirmConfig?: DeleteConfirmConfig

  // 钩子函数
  beforeSave?: (data: Record<string, any>) => Promise<boolean> | boolean
}
```

### StdTableProps

表格组件的属性接口：

```typescript
interface StdTableProps extends Pick<
  StdCurdProps,
  'tableProps'
  | 'columns'
  | 'customQueryParams'
  | 'overwriteParams'
  | 'rowSelectionType'
  | 'rowSelection'
  | 'disableRouterQuery'
  | 'disableView'
  | 'disableEdit'
  | 'disableSearch'
  | 'disableDelete'
  | 'disableTrash'
  | 'rowDraggable'
  | 'rowDraggableOptions'
  | 'hideResetBtn'
  | 'showSearchBtn'
  | 'searchFormExtraRender'
  | 'deleteConfirmConfig'
> {
  getListApi?: CurdApi['getList']
  refreshConfig?: {
    timestamp: number
    reset?: boolean
  }
  onlyQuery?: boolean
  isTrash?: boolean
}
```

## 表格列类型

### StdTableColumn

表格列的定义接口，扩展了 Ant Design Vue 的 TableColumnType：

```typescript
interface StdTableColumn<T = any> extends Omit<TableColumnType, 'customRender'> {
  title: string | (() => string)
  dataIndex: string | string[]

  // 自定义渲染
  customHeaderRender?: (data: StdTableHeaderScope) => VNode | JSX.Element
  customRender?: (props: CustomRenderArgs<T>, source?: 'table' | 'edit' | 'add' | 'detail') => VNodeChild

  // 字段属性
  pure?: boolean

  // 搜索配置
  search?: boolean | Partial<StdFormConfig>

  // 编辑配置
  edit?: StdFormConfig
  batchEdit?: boolean

  // 显示控制
  hiddenInTable?: boolean
  hiddenInEdit?: boolean
  hiddenInAdd?: boolean
  hiddenInDetail?: boolean
  hiddenInExport?: boolean
}
```

### 作用域类型

表格相关的作用域类型定义：

```typescript
interface StdTableHeaderScope {
  title: string
  column: any
}

interface StdTableBodyScope {
  text: any
  value: any
  record: Record<string, any>
  index: number
  column: any
}

interface CustomRenderArgs<T = any, U = any> {
  column: StdTableColumn
  record: T
  text: U
  value?: any
  index?: number
  renderIndex?: number
  export?: boolean
}
```

## 表单类型

### FormItemType

表单项类型的联合类型：

```typescript
type FormItemType
  = 'input'
  | 'password'
  | 'inputNumber'
  | 'select'
  | 'autoComplete'
  | 'selector'
  | 'date'
  | 'datetime'
  | 'year'
  | 'month'
  | 'week'
  | 'time'
  | 'textarea'
  | 'radioGroup'
  | 'checkboxGroup'
  | 'switch'
  | 'rate'
  | 'slider'
  | 'upload'
  | 'cascader'
  | 'transfer'
  | 'dateRange'
  | 'datetimeRange'
  | 'yearRange'
  | 'monthRange'
  | 'weekRange'
  | 'timeRange'
  | ((context: {
      formData: any,
      column: StdTableColumn,
      config: Record<any, any>,
      mode: 'edit' | 'add'
    }) => VNodeChild)
  | JSX.Element
  | VNodeChild
  | DefineComponent<any, any, any>
```

### StdFormConfig

表单配置接口：

```typescript
interface StdFormConfig extends Record<any, any> {
  type: FormItemType
  defaultValue?: any
  valueKey?: string
  col?: ColProps

  // 动态显示控制
  showInForm?: boolean | ((context: { formData: Record<string, any> }) => boolean)
  disabled?: boolean | ((context: { formData: Record<string, any> }) => boolean)
  required?: boolean | ((context: { formData: Record<string, any> }) => boolean)

  // 验证规则
  rules?: FormItemProps['rules']

  // 字段联动
  dependencies?: string[]
  onChange?: (
    value: any,
    formData: Record<string, any>,
    dependencies: Record<string, any>
  ) => void

  // 表单项配置
  formItem?: StdFormItemConfig

  // 各种组件的配置
  password?: PasswordConfig
  input?: InputConfig
  inputNumber?: InputNumberConfig
  textarea?: TextareaConfig
  select?: SelectConfig
  autoComplete?: AutoCompleteConfig
  selector?: SelectorConfig
  cascader?: CascaderConfig
  // ... 其他组件配置
}
```

### StdFormItemConfig

表单项的配置接口：

```typescript
type StdFormItemConfig = Omit<FormItemProps, 'required'> & {
  name?: string | string[]
  label?: string | (() => string)
  hiddenLabelInEdit?: boolean
  hiddenLabelInSearch?: boolean
  hiddenLabelInDetail?: boolean
  required?: boolean | ((context: { formData: Record<string, any> }) => boolean)
}
```

## 表单控件配置类型

### 基础控件配置

```typescript
// 输入框配置
type InputConfig = Omit<InputProps, 'placeholder'> & PlaceholderT & BaseConfig

// 数字输入框配置
type InputNumberConfig = Omit<InputNumberProps, 'placeholder'> & PlaceholderT & BaseConfig

// 密码输入框配置
type PasswordConfig = Omit<InputProps, 'placeholder'> & PlaceholderT & BaseConfig & {
  generate?: boolean
}

// 文本域配置
type TextareaConfig = Omit<TextAreaProps, 'placeholder'> & PlaceholderT & BaseConfig
```

### 选择器配置

```typescript
// 下拉选择配置
type SelectConfig = Omit<SelectProps, 'placeholder'> & PlaceholderT & {
  remote?: {
    valueKey: string
    labelKey: string
    api: (...args: any[]) => Promise<{ data: any[] }>
  }
  mask?: Record<string | number, any>
  valueKey?: string
} & BaseConfig

// 自动完成配置
type AutoCompleteConfig = Omit<AutoCompleteProps, 'placeholder'> & PlaceholderT & {
  remote?: {
    valueKey: string
    labelKey: string
    api: (...args: any[]) => Promise<{ data: any[] }>
  }
  mask?: Record<string | number, any>
  valueKey?: string
} & BaseConfig

// 选择器配置
type SelectorConfig = {
  tableProps?: TableProps
  valueKey?: string
  displayKey?: string
  selectionType?: 'radio' | 'checkbox'
  selectionConfig?: TableRowSelection
  getListApi: CurdApi['getList']
  columns: StdTableColumn[]
  tips?: string
  disabled?: boolean
  hideInputContainer?: boolean
  modalWidth?: number | string
  modalProps?: ModalProps
  overwriteParams?: Record<string, any>
  labelRender?: (row: any) => string
  omitZeroString?: boolean
} & PlaceholderT & BaseConfig
```

### 日期时间配置

```typescript
// 日期选择器配置
type DatePickerConfig = Omit<DatePickerProps, 'placeholder'> & PlaceholderT & TimeT & BaseConfig

// 时间范围选择器配置
type RangePickerConfig = Omit<RangePickerProps, 'placeholder'> & PlaceholderT & TimeT & BaseConfig

// 时间配置
interface TimeT extends BaseConfig {
  timestamp?: boolean
}
```

### 上传配置

```typescript
type UploadConfig = Omit<UploadProps, 'placeholder' | 'beforeUpload'> & PlaceholderT & BaseConfig & {
  beforeUpload?: (file: FileType, fileList: FileType[], value: Ref<any>) => boolean
}
```

## API 类型

### CurdApi

CRUD API 接口定义：

```typescript
interface CurdApi<T = any, P = any> {
  getList: (params?: Record<string, any>, config?: Record<string, any>) => Promise<{ data: T[], pagination: P }>
  getItem?: (id: string | number, params?: Record<string, any>, config?: Record<string, any>) => Promise<T>
  createItem?: (data: Record<string, any>, config?: Record<string, any>) => Promise<T>
  updateItem?: (id: string | number, data: Record<string, any>, config?: Record<string, any>) => Promise<T>
  deleteItem?: (id: string | number, params?: Record<string, any>, config?: Record<string, any>) => Promise<any>
  restoreItem?: (id: string | number, params?: Record<string, any>, config?: Record<string, any>) => Promise<any>
  batchSave?: (ids: (number | string)[], data: Record<string, any>, config?: Record<string, any>) => Promise<any>
}
```

## 配置类型

### 分页配置

```typescript
interface PaginationMap {
  params: {
    current: string
    pageSize: string
  }
  response: {
    total: string
    current: string
    pageSize: string
    totalPages: string
  }
}

interface PaginationData {
  total: number
  current: number
  pageSize: number
  totalPages: number
}
```

### 国际化类型

```typescript
type I18nLanguage = 'zh-CN' | 'zh-HK' | 'zh-TW' | 'en-US'

type I18nToken =
  | 'total'
  | 'list'
  | 'item(s)'
  | 'view'
  | 'edit'
  | 'delete'
  | 'restore'
  // ... 更多国际化令牌

type I18nLanguageObject = Partial<Record<I18nToken, any>>
```

### 删除确认配置

```typescript
type DeleteConfirmMode = 'popconfirm' | 'modal'

interface DeleteConfirmConfig {
  mode?: DeleteConfirmMode
  valueKey?: string
}
```

### 全局配置

```typescript
interface CurdConfigT {
  listApi?: {
    paginationPath?: string
    paginationMap?: PaginationMap
    responseFormat?: ResponseFormatFn
    requestFormat?: RequestFormatFn
  }
  i18n?: I18nOptions<{ message: I18nLanguageObject }>
  dateFormat?: DateFormatConfig
  time?: TimeConfig
  selector?: {
    omitZeroString?: boolean
  }
  search?: {
    showSearchBtn?: boolean
    hideResetBtn?: boolean
  }
  deleteConfirmConfig?: DeleteConfirmConfig
  modal: {
    width?: number | string
    bodyHeight?: number | string
  }
}
```