<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'

const columns: StdTableColumn[] = [
  {
    title: '下拉选择',
    dataIndex: 'select',
    edit: {
      type: 'select',
      placeholder: '请选择',
      select: {
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
      },
    },
  },
  {
    title: '多选下拉',
    dataIndex: 'multi_select',
    edit: {
      type: 'select',
      placeholder: '请选择多个选项',
      select: {
        mode: 'multiple',
        options: [
          { label: 'JavaScript', value: 'js' },
          { label: 'TypeScript', value: 'ts' },
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' },
          { label: 'Angular', value: 'angular' },
        ],
      },
    },
  },
  {
    title: '级联选择',
    dataIndex: 'cascader',
    edit: {
      type: 'cascader',
      placeholder: '请选择',
      cascader: {
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [
              {
                label: '杭州',
                value: 'hangzhou',
                children: [
                  { label: '西湖', value: 'xihu' },
                  { label: '余杭', value: 'yuhang' },
                ],
              },
              {
                label: '宁波',
                value: 'ningbo',
                children: [
                  { label: '海曙', value: 'haishu' },
                  { label: '江北', value: 'jiangbei' },
                ],
              },
            ],
          },
          {
            label: '江苏',
            value: 'jiangsu',
            children: [
              {
                label: '南京',
                value: 'nanjing',
                children: [
                  { label: '玄武', value: 'xuanwu' },
                  { label: '秦淮', value: 'qinhuai' },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  {
    title: '自动完成',
    dataIndex: 'auto_complete',
    edit: {
      type: 'autoComplete',
      placeholder: '请输入',
      autoComplete: {
        options: [
          { value: 'gmail.com' },
          { value: 'qq.com' },
          { value: '163.com' },
          { value: 'hotmail.com' },
        ],
      },
    },
  },
]
</script>

<template>
  <div style="margin: 0 auto;">
    <h3>选择类控件示例</h3>
    <StdForm :columns="columns" />
  </div>
</template>
