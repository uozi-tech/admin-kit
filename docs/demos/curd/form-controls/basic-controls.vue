<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'

const columns: StdTableColumn[] = [
  {
    title: '文本输入',
    dataIndex: 'text_input',
    edit: {
      type: 'input',
      placeholder: '请输入文本',
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '密码输入',
    dataIndex: 'password',
    edit: {
      type: 'password',
      placeholder: '请输入密码',
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '数字输入',
    dataIndex: 'number_input',
    edit: {
      type: 'inputNumber',
      inputNumber: {
        min: 0,
        max: 100,
      },
      placeholder: '请输入数字',
    },
  },
  {
    title: '多行文本',
    dataIndex: 'textarea',
    edit: {
      type: 'textarea',
      textarea: {
        rows: 4,
        placeholder: '请输入多行文本',
        maxlength: 200,
        showCount: true,
      },
    },
  },
  {
    title: '开关',
    dataIndex: 'switch',
    edit: {
      type: 'switch',
      switch: {
        checkedChildren: '开启',
        unCheckedChildren: '关闭',
        defaultValue: false,
      },
    },
  },
  {
    title: '单选框',
    dataIndex: 'radio',
    edit: {
      type: 'radioGroup',
      radioGroup: {
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
          { label: '选项3', value: 'option3' },
        ],
      },
    },
  },
  {
    title: '多选框',
    dataIndex: 'checkbox',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '选项A', value: 'optionA' },
          { label: '选项B', value: 'optionB' },
          { label: '选项C', value: 'optionC' },
        ],
      },
    },
  },
]
</script>

<template>
  <div style="margin: 0 auto;">
    <h3>基础表单控件示例</h3>
    <StdForm :columns="columns" />
  </div>
</template>
