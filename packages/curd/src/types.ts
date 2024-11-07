import {
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TableColumnType,
  TableProps,
  TimePickerProps,
  TransferProps,
  UploadProps,
} from 'ant-design-vue';
import { ComponentInstance, ExtractPublicPropTypes, VNode } from 'vue';
import { cascaderProps } from 'ant-design-vue/es/cascader';
import {
  MonthPickerProps,
  WeekPickerProps,
} from 'ant-design-vue/es/date-picker';
import { JSX } from 'vue/jsx-runtime';

export type FormControllerType = 'input'
    | 'input-number'
    | 'select'
    | 'date'
    | 'datetime'
    | 'year'
    | 'month'
    | 'week'
    | 'time'
    | 'number'
    | 'textarea'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'rate'
    | 'slider'
    | 'upload'
    | 'cascader'
    | 'transfer'
    | ((column: StdTableColumn) => VNode | JSX.Element)
    | ComponentInstance<any>

export type FormItemType = {
  type: FormControllerType;
  input?: ExtractPublicPropTypes<InputProps>;
  inputNumber?: ExtractPublicPropTypes<InputNumberProps>;
  select?: ExtractPublicPropTypes<SelectProps> & { valueKey?: string };
  cascader?: ExtractPublicPropTypes<typeof cascaderProps>;
  datePicker?: ExtractPublicPropTypes<DatePickerProps>;
  week?: ExtractPublicPropTypes<WeekPickerProps>;
  month?: ExtractPublicPropTypes<MonthPickerProps>;
  time?: ExtractPublicPropTypes<TimePickerProps>;
  radio?: ExtractPublicPropTypes<RadioProps>;
  checkbox?: ExtractPublicPropTypes<CheckboxProps>;
  rate?: ExtractPublicPropTypes<RateProps>;
  slider?: ExtractPublicPropTypes<SliderProps>;
  switch?: ExtractPublicPropTypes<SwitchProps>;
  transfer?: ExtractPublicPropTypes<TransferProps>;
  upload?: ExtractPublicPropTypes<UploadProps>;

  formItem?: ExtractPublicPropTypes<FormItemProps> & {
    name?: string | string[];
  };
};

export interface StdTableColumn extends TableColumnType<any> {
  title: string | (() => string);
  dataIndex: string | string[];
  customHeaderRender?: (data: {
    column: StdTableColumn;
    title: string;
  }) => VNode | JSX.Element;
  search?: boolean | FormItemType;
  edit?: FormItemType
  customRender?: ((data: CustomRenderOptions) => VNode | JSX.Element) | any;
  hiddenInTable?: boolean;
  hiddenInEdit?: boolean;
  hiddenInAdd?: boolean;
  hiddenInDetail?: boolean;
  hiddenInExport?: boolean
}

export type ExportColumn = Required<StdTableColumn> & { checked: boolean }

export interface StdTableProps extends TableProps {
  columns: StdTableColumn[];
  rowKey?: string | ((record: Record<string, any>) => string);
  rowSelectionType?: 'checkbox' | 'radio';
  pagination?: any;
  scrollX?: number | string;
  scrollY?: number | string;
}

export interface CustomRenderOptions {
  column: StdTableColumn;
  record: Record<string, any>;
  text: any;
  value?: any;
  index?: number;
  renderIndex?: number;
  export?: boolean;
};

export interface StdCurdProps extends Pick<StdTableProps, 'rowKey' | 'rowSelectionType' | 'columns' | 'pagination' | 'scrollX' | 'scrollY'> {
  title?: string | any
  api: any
  formLabelPosition?: 'left' | 'right' | 'top'
  tableConfig?: TableProps
  customParams?: Record<string, any>
  listQueryParams?: Record<string, any>
  modalWidth?: string | number
  disableSearch?: boolean
  disableAdd?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  disableExport?: boolean
  disableTrash?: boolean
}

export type StdTableHeaderScope = {
  title: string
  column: any
}

export type StdTableBodyScope = {
  text: any
  value: any
  record: Record<string, any>
  index: number
  column: any
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
