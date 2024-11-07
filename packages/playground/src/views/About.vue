<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import {StdTableColumn} from "@uozi-admin/curd/src/types";

const columns: StdTableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: true,
    edit: {
      type: 'input',
    },
  },
  {
    title: 'School ID',
    dataIndex: 'school_id',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入学工号',
            trigger: 'blur',
          },
          {
            min: 3,
            message: '学工号长度不能小于3',
            trigger: 'blur',
          },
        ],
      },
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    edit: {
      type: 'input',
    },
    customRender({ value }) {
      const map = {
        1: 'success',
        2: 'warning',
        3: 'error',
      }
      return h('div', {}, map[value])
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'cascader',
      cascader: {
        options: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency',
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback',
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency',
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability',
                  },
                ],
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation',
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    customHeaderRender: (data: { column: any }) => {
      return h('span', { style: { color: 'red' } }, data.column.title)
    },
    customRender: ({ text }) => {
      return h('span', { style: { color: 'red' } }, text)
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    edit: {
      type: 'inputNumber',
    },
  },
  {
    title: 'Checkbox',
    dataIndex: 'switch',
    edit: {
      type: 'checkbox',
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    edit: {
      type: 'date',
    },
    search: true,
  },
  {
    title: 'Date Time',
    dataIndex: 'datetime',
    edit: {
      type: 'datetime',
    },
    search: true,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    edit: {
      type: 'year',
    },
    search: true,
  },
  {
    title: 'Month',
    dataIndex: 'month',
    edit: {
      type: 'month',
    },
    search: true,
  },
  {
    title: 'Week',
    dataIndex: 'week',
    edit: {
      type: 'week',
    },
    search: true,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    edit: {
      type: 'time',
    },
    search: true,
  },
  {
    title: 'Switch',
    dataIndex: 'switch',
    edit: {
      type: 'switch',
    },
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    edit: {
      type: 'rate',
    },
  },
  {
    title: 'Slider',
    dataIndex: 'slider',
    edit: {
      type: 'slider',
    },
  },
  {
    title: 'FileList',
    dataIndex: 'fileList',
    edit: {
      type: 'upload',
    },
    customRender: (props) => props.text.join(','),
  },
  {
    title: 'File',
    dataIndex: 'file',
    edit: {
      type: 'upload',
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    fixed: 'right',
    width: 240,
  },
]

const api = {
  getList: () => {
    const data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(() => ({
      id: 1,
      school_id: 1,
      name: 'John Brown',
      age: 32,
      type: 2,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03',
      datetime: '2016-10-03 14:00:11',
      year: '2022',
      month: '2016-10-03',
      week: '2016-10-03',
      time: '2016-10-03',
      switch: true,
      rate: 3,
      slider: 20,
      fileList: [],
      file: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
    }))
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data,
          pagination: {
            total: 1000,
            current_page:1,
            per_page: 20
          }
        })
      }, 1000)
    })
}
}
</script>

<template>
    <StdCurd :custom-params="{
      'aaa': 111
    }" :columns="columns" :api="api" />
</template>

<style scoped>

</style>
