<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Alert, Button, Card, Divider, message, Space } from 'ant-design-vue'
import { set } from 'lodash-es'
import { ref, watch } from 'vue'

const formData = ref({
  idCard: '',
  birthDate: '',
  gender: '',
  age: null,
  province: '',
  city: '',
  district: '',
  address: '',
})

// 省市区数据
const locationData = {
  provinces: [
    { label: '北京市', value: 'beijing' },
    { label: '上海市', value: 'shanghai' },
    { label: '广东省', value: 'guangdong' },
    { label: '浙江省', value: 'zhejiang' },
  ],
  cities: {
    beijing: [{ label: '北京市', value: 'beijing-city' }],
    shanghai: [{ label: '上海市', value: 'shanghai-city' }],
    guangdong: [
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' },
      { label: '东莞市', value: 'dongguan' },
    ],
    zhejiang: [
      { label: '杭州市', value: 'hangzhou' },
      { label: '宁波市', value: 'ningbo' },
      { label: '温州市', value: 'wenzhou' },
    ],
  },
  districts: {
    'beijing-city': [
      { label: '朝阳区', value: 'chaoyang' },
      { label: '海淀区', value: 'haidian' },
    ],
    'shanghai-city': [
      { label: '黄浦区', value: 'huangpu' },
      { label: '浦东新区', value: 'pudong' },
    ],
    'guangzhou': [
      { label: '天河区', value: 'tianhe' },
      { label: '越秀区', value: 'yuexiu' },
    ],
    'shenzhen': [
      { label: '南山区', value: 'nanshan' },
      { label: '福田区', value: 'futian' },
    ],
    'dongguan': [
      { label: '南城区', value: 'nancheng' },
      { label: '东城区', value: 'dongcheng' },
    ],
    'hangzhou': [
      { label: '西湖区', value: 'xihu' },
      { label: '滨江区', value: 'binjiang' },
    ],
    'ningbo': [
      { label: '海曙区', value: 'haishu' },
      { label: '江北区', value: 'jiangbei' },
    ],
    'wenzhou': [
      { label: '鹿城区', value: 'lucheng' },
      { label: '龙湾区', value: 'longwan' },
    ],
  },
}

// 表单列配置
const columns: StdTableColumn[] = [
  {
    title: '身份证号',
    dataIndex: 'idCard',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入身份证号' },
          { len: 18, message: '身份证号必须为18位' },
        ],
      },
      input: {
        placeholder: '请输入18位身份证号',
        maxlength: 18,
      },
    },
  },
  {
    title: '出生日期',
    dataIndex: 'birthDate',
    edit: {
      type: 'date',
      formItem: {
        required: true,
      },
      dependencies: ['idCard'], // 依赖身份证号字段
      onChange: (value, formData, dependencies) => {
        const idCard = dependencies.idCard
        if (idCard && idCard.length === 18) {
          // 从身份证号提取出生日期
          const year = idCard.substring(6, 10)
          const month = idCard.substring(10, 12)
          const day = idCard.substring(12, 14)
          const birthDate = `${year}-${month}-${day}`

          // 手动更新出生日期字段
          set(formData, 'birthDate', birthDate)

          // 提取性别信息
          const genderCode = Number.parseInt(idCard.substring(16, 17))
          const gender = genderCode % 2 === 0 ? 'female' : 'male'
          set(formData, 'gender', gender)

          // 计算年龄
          const today = new Date()
          const birthYear = Number.parseInt(year)
          const age = today.getFullYear() - birthYear
          set(formData, 'age', age)

          message.success('已根据身份证号自动填充出生日期、性别和年龄')
        }
      },
      date: {
        placeholder: '请选择出生日期',
      },
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    edit: {
      type: 'select',
      formItem: {
        required: true,
      },
      select: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
        placeholder: '请选择性别',
      },
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    edit: {
      type: 'inputNumber',
      formItem: {
        required: true,
      },
      number: {
        min: 0,
        max: 120,
        placeholder: '请输入年龄',
      },
    },
  },
  {
    title: '省份',
    dataIndex: 'province',
    edit: {
      type: 'select',
      formItem: {
        required: true,
      },
      select: {
        options: locationData.provinces,
        placeholder: '请选择省份',
      },
    },
  },
  {
    title: '城市',
    dataIndex: 'city',
    edit: {
      type: 'select',
      formItem: {
        required: true,
      },
      dependencies: ['province'], // 依赖省份字段
      onChange: (value, formData, dependencies) => {
        const province = dependencies.province
        if (province && !locationData.cities[province]?.some(city => city.value === value)) {
          // 如果选择的城市不属于当前省份，清空城市和区县
          set(formData, 'city', '')
          set(formData, 'district', '')
        }
      },
      select: {
        options: [], // 初始为空，将通过计算属性动态设置
        placeholder: '请选择城市',
      },
    },
  },
  {
    title: '区县',
    dataIndex: 'district',
    edit: {
      type: 'select',
      formItem: {
        required: true,
      },
      dependencies: ['city'], // 依赖城市字段
      onChange: (value, formData, dependencies) => {
        const city = dependencies.city
        if (city && !locationData.districts[city]?.some(district => district.value === value)) {
          // 如果选择的区县不属于当前城市，清空区县
          set(formData, 'district', '')
        }
      },
      select: {
        options: [], // 初始为空，将通过计算属性动态设置
        placeholder: '请选择区县',
      },
    },
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    edit: {
      type: 'textarea',
      textarea: {
        placeholder: '请输入详细地址',
        rows: 3,
      },
    },
  },
]

// 动态更新城市和区县选项
const dynamicColumns = ref<StdTableColumn[]>([...columns])

// 监听表单数据变化，动态更新选项
function updateColumnOptions() {
  dynamicColumns.value = columns.map<StdTableColumn>((col) => {
    if (col.dataIndex === 'city') {
      return {
        ...col,
        edit: {
          ...col.edit,
          select: {
            ...col.edit?.select,
            options: formData.value.province ? locationData.cities[formData.value.province] || [] : [],
          },
        },
      } as StdTableColumn
    }
    if (col.dataIndex === 'district') {
      return {
        ...col,
        edit: {
          ...col.edit,
          select: {
            ...col.edit?.select,
            options: formData.value.city ? locationData.districts[formData.value.city] || [] : [],
          },
        },
      } as StdTableColumn
    }
    return col
  })
}

// 监听省份变化
function onProvinceChange() {
  formData.value.city = ''
  formData.value.district = ''
  updateColumnOptions()
  message.info('省份已变更，请重新选择城市和区县')
}

// 监听城市变化
function onCityChange() {
  formData.value.district = ''
  updateColumnOptions()
  message.info('城市已变更，请重新选择区县')
}

// 表单引用
const formRef = ref()

// 填充示例数据
function fillSampleData() {
  formData.value = {
    idCard: '31010119900615001X',
    birthDate: '',
    gender: '',
    age: null,
    province: 'guangdong',
    city: 'shenzhen',
    district: 'nanshan',
    address: '科技园南区科苑路',
  }
  updateColumnOptions()
  message.success('已填充示例数据，请注意观察联动效果')
}

// 重置表单
function handleReset() {
  formData.value = {
    idCard: '',
    birthDate: '',
    gender: '',
    age: null,
    province: '',
    city: '',
    district: '',
    address: '',
  }
  updateColumnOptions()
  message.info('表单已重置')
}

// 保存表单
function handleSave() {
  formRef.value?.validate().then(() => {
    console.log('表单数据:', formData.value)
    message.success('表单保存成功！')
  }).catch((error) => {
    console.error('表单验证失败:', error)
    message.error('请检查表单输入')
  })
}

// 初始化选项
updateColumnOptions()
watch(() => formData.value.province, onProvinceChange)
watch(() => formData.value.city, onCityChange)
</script>

<template>
  <div>
    <Alert
      message="表单联动演示"
      description="这个示例展示了表单字段间的联动功能：身份证号联动出生日期、性别、年龄；省市区三级联动。"
      type="info"
      show-icon
      style="margin-bottom: 16px;"
    />

    <!-- 操作按钮 -->
    <Card style="margin-bottom: 16px;">
      <Space>
        <Button
          type="primary"
          @click="handleSave"
        >
          保存表单
        </Button>
        <Button @click="handleReset">
          重置表单
        </Button>
        <Button
          type="dashed"
          @click="fillSampleData"
        >
          填充示例数据
        </Button>
      </Space>
    </Card>

    <!-- 表单 -->
    <Card title="用户信息表单（联动演示）">
      <StdForm
        ref="formRef"
        v-model:data="formData"
        :columns="dynamicColumns"
        label-align="right"
        layout="vertical"
      />
    </Card>

    <!-- 表单数据预览 -->
    <Card
      title="表单数据预览"
      style="margin-top: 16px;"
    >
      <pre style="background: #f6f8fa; padding: 12px; border-radius: 4px; overflow-x: auto;">{{ JSON.stringify(formData, null, 2) }}</pre>
    </Card>
  </div>
</template>

<style scoped>
pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}
</style>
