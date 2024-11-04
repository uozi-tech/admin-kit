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

export interface StdTableColumn extends TableColumnType<any> {
  dataIndex: string | string[];
  customHeaderRender?: (data: {
    column: StdTableColumn;
    title: string;
  }) => VNode | JSX.Element;
  search?: boolean;
  form?: {
    type:
      | 'input'
      | 'input-number'
      | 'select'
      | 'date'
      | 'datetime'
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
      | ComponentInstance<any>;
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
  customRender?: ((data: CustomRenderOptions) => VNode | JSX.Element) | any;
  hiddenInTable?: boolean;
  hiddenInEdit?: boolean;
  hiddenInAdd?: boolean;
  hiddenInDetail?: boolean;
}

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

export interface StdCurdProps extends StdTableProps {
  title?: string | any
  api: any
  formLabelPosition?: 'left' | 'right' | 'top'
  tableConfig?: TableProps
  fixParams?: Record<string, any>
  modalWidth?: string | number
  disableSearch?: boolean
  disableAdd?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
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
