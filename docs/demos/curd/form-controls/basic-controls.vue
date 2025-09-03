<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '文本输入',
    dataIndex: 'text_input',
    edit: {
      type: 'input',
      placeholder: '请输入文本',
      required: true,
    },
  },
  {
    title: '密码输入',
    dataIndex: 'password',
    edit: {
      type: 'password',
      placeholder: '请输入密码',
      required: true,
    },
  },
  {
    title: '数字输入',
    dataIndex: 'number_input',
    edit: {
      type: 'inputNumber',
      min: 0,
      max: 100,
      placeholder: '请输入数字',
    },
  },
  {
    title: '多行文本',
    dataIndex: 'textarea',
    edit: {
      type: 'textarea',
      rows: 4,
      placeholder: '请输入多行文本',
      maxLength: 200,
      showCount: true,
    },
  },
  {
    title: '开关',
    dataIndex: 'switch',
    edit: {
      type: 'switch',
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
      defaultValue: false,
    },
  },
  {
    title: '单选框',
    dataIndex: 'radio',
    edit: {
      type: 'radioGroup',
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        { label: '选项3', value: 'option3' },
      ],
    },
  },
  {
    title: '多选框',
    dataIndex: 'checkbox',
    edit: {
      type: 'checkboxGroup',
      options: [
        { label: '选项A', value: 'optionA' },
        { label: '选项B', value: 'optionB' },
        { label: '选项C', value: 'optionC' },
      ],
    },
  },
]

function handleSuccess(data) {
  console.log('表单提交成功:', data)
}
</script>

<template>
  <div style="margin: 0 auto;">
    <h3>基础表单控件示例</h3>
    <StdForm
      :columns="columns"
      @success="handleSuccess"
    />
  </div>
</template>
