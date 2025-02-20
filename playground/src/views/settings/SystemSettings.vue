<script setup lang="ts">
const columns = [
  {
    title: '站点名称',
    dataIndex: 'siteName',
    edit: { type: 'input' },
  },
  {
    title: '维护模式',
    dataIndex: 'maintenance',
    edit: {
      type: 'switch',
      switch: { checkedChildren: '开启', unCheckedChildren: '关闭' },
    },
  },
  {
    title: '主题颜色',
    dataIndex: 'themeColor',
    edit: {
      type: 'colorPicker',
    },
  },
  {
    title: '通知方式',
    dataIndex: 'notifyMethods',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '邮件', value: 'email' },
          { label: '短信', value: 'sms' },
          { label: '站内信', value: 'inApp' },
        ],
      },
    },
  },
]
</script>
