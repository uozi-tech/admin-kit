<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'

const columns: StdTableColumn[] = [
  {
    title: '基础输入',
    dataIndex: 'name',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        help: '请输入用户姓名',
      },
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    edit: {
      type: 'password',
      password: {
        generate: true,
      },
      formItem: {
        required: true,
      },
    },
    hiddenInTable: true,
  },
  {
    title: '数字输入',
    dataIndex: 'age',
    edit: {
      type: 'inputNumber',
      inputNumber: {
        min: 0,
        max: 150,
        precision: 0,
        addonAfter: '岁',
      },
      formItem: {
        rules: [{ type: 'number', min: 18, message: '年龄不能小于18岁' }],
      },
    },
  },
  {
    title: '下拉选择',
    dataIndex: 'status',
    edit: {
      type: 'select',
      select: {
        placeholder: '请选择状态',
        options: [
          { label: '激活', value: 1 },
          { label: '禁用', value: -1 },
          { label: '待审核', value: 0 },
        ],
        showSearch: true,
      },
      formItem: { required: true },
    },
  },
  {
    title: '多选标签',
    dataIndex: 'interests',
    edit: {
      type: 'select',
      select: {
        mode: 'multiple',
        placeholder: '请选择兴趣爱好',
        options: [
          { label: '阅读', value: 'reading' },
          { label: '运动', value: 'sports' },
          { label: '音乐', value: 'music' },
          { label: '旅游', value: 'travel' },
          { label: '摄影', value: 'photography' },
        ],
      },
    },
    hiddenInTable: true,
  },
  {
    title: '单选组',
    dataIndex: 'gender',
    edit: {
      type: 'radioGroup',
      radioGroup: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
          { label: '其他', value: 'other' },
        ],
      },
      formItem: { required: true },
    },
  },
  {
    title: '复选组',
    dataIndex: 'permissions',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '读取', value: 'read' },
          { label: '写入', value: 'write' },
          { label: '删除', value: 'delete' },
          { label: '管理', value: 'admin' },
        ],
      },
    },
    hiddenInTable: true,
  },
  {
    title: '文本域',
    dataIndex: 'description',
    edit: {
      type: 'textarea',
      textarea: {
        rows: 4,
        placeholder: '请输入个人描述',
        maxlength: 500,
        showCount: true,
      },
    },
    hiddenInTable: true,
  },
  {
    title: '滑块',
    dataIndex: 'progress',
    edit: {
      type: 'slider',
      slider: {
        min: 0,
        max: 100,
        marks: {
          0: '0%',
          25: '25%',
          50: '50%',
          75: '75%',
          100: '100%',
        },
      },
    },
    hiddenInTable: true,
  },
  {
    title: '开关',
    dataIndex: 'enabled',
    edit: {
      type: 'switch',
      switch: {
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
      },
    },
  },
  {
    title: '评分',
    dataIndex: 'rating',
    edit: {
      type: 'rate',
      rate: {
        allowHalf: true,
        character: '★',
        tooltips: ['极差', '差', '一般', '良好', '优秀'],
      },
    },
  },
  {
    title: '日期',
    dataIndex: 'birthday',
    edit: {
      type: 'date',
      date: {
        format: 'YYYY-MM-DD',
        placeholder: '请选择生日',
      },
    },
  },
  {
    title: '文件上传',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      upload: {
        maxCount: 1,
        accept: 'image/*',
      },
    },
    hiddenInTable: true,
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]
</script>

<template>
  <StdCurd
    :columns="columns"
    :api="userApi"
    disable-router-query
    scroll-x="max-content"
  />
</template>
