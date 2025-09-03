<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Col, Row } from 'ant-design-vue'
import { computed, ref } from 'vue'

// 用于强制重新渲染表单的键值
const basicFormKey = ref(0)
const cascadeFormKey = ref(0)

// 基础联动表单数据
const basicLinkageData = ref<Record<string, any>>({})
const cascadeLinkageData = ref<Record<string, any>>({})

// 级联选择数据
const cityOptions = ref([])
const districtOptions = ref([])

// 基础联动列配置
const basicLinkageColumns = computed(() => [
  {
    title: '用户类型',
    dataIndex: 'user_type',
    edit: {
      type: 'radioGroup',
      formItem: {
        required: true,
      },
      defaultValue: 'personal',
      radioGroup: {
        options: [
          { label: '个人用户', value: 'personal' },
          { label: '企业用户', value: 'company' },
        ],

        onChange: (value) => {
          // 清空相关字段
          if (value.target.value === 'company') {
            basicLinkageData.value.company_name = ''
            basicLinkageData.value.business_license = ''
            delete basicLinkageData.value.id_card
          }
          else {
            basicLinkageData.value.id_card = ''
            delete basicLinkageData.value.company_name
            delete basicLinkageData.value.business_license
          }
          basicFormKey.value++
        },
      },
    },
  },
  {
    title: '身份证号',
    dataIndex: 'id_card',
    edit: {
      type: 'input',
      formItem: {
        required: ({ formData }) => formData.user_type === 'personal',
      },
      showInForm: ({ formData }) => formData.user_type === 'personal',
      placeholder: '请输入身份证号',
    },
  },
  {
    title: '企业名称',
    dataIndex: 'company_name',
    edit: {
      type: 'input',
      formItem: {
        required: ({ formData }) => formData.user_type === 'company',
      },
      showInForm: ({ formData }) => formData.user_type === 'company',
      placeholder: '请输入企业名称',
    },
  },
  {
    title: '营业执照号',
    dataIndex: 'business_license',
    edit: {
      type: 'input',
      formItem: {
        required: ({ formData }) => formData.user_type === 'company',
      },
      showInForm: ({ formData }) => formData.user_type === 'company',
      placeholder: '请输入营业执照号',
    },
  },
] as StdTableColumn[])

// 级联联动列配置
const cascadeLinkageColumns = computed<StdTableColumn[]>(() => [
  {
    title: '省份',
    dataIndex: 'province',
    edit: {
      type: 'select',
      formItem: {
        required: true,
      },
      placeholder: '请选择省份',
      select: {
        options: [
          { label: '浙江省', value: 'zhejiang' },
          { label: '江苏省', value: 'jiangsu' },
          { label: '广东省', value: 'guangdong' },
        ],
        onChange: async (provinceCode) => {
          if (provinceCode) {
            // 模拟获取城市数据
            const cityMap = {
              zhejiang: [
                { label: '杭州市', value: 'hangzhou' },
                { label: '宁波市', value: 'ningbo' },
              ],
              jiangsu: [
                { label: '南京市', value: 'nanjing' },
                { label: '苏州市', value: 'suzhou' },
              ],
              guangdong: [
                { label: '广州市', value: 'guangzhou' },
                { label: '深圳市', value: 'shenzhen' },
              ],
            }
            cityOptions.value = cityMap[provinceCode as string] || []

            // 清空下级选择
            cascadeLinkageData.value.city = undefined
            cascadeLinkageData.value.district = undefined
            districtOptions.value = []
            cascadeFormKey.value++
          }
        },
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
      placeholder: () => cascadeLinkageData.value.province ? '请选择城市' : '请先选择省份',
      disabled: ({ formData }) => !formData.province,
      select: {
        options: cityOptions.value,
        onChange: async (cityCode) => {
          if (cityCode) {
            // 模拟获取区县数据
            const districtMap = {
              hangzhou: [
                { label: '西湖区', value: 'xihu' },
                { label: '滨江区', value: 'binjiang' },
              ],
              ningbo: [
                { label: '海曙区', value: 'haishu' },
                { label: '江北区', value: 'jiangbei' },
              ],
              nanjing: [
                { label: '鼓楼区', value: 'gulou' },
                { label: '玄武区', value: 'xuanwu' },
              ],
              suzhou: [
                { label: '姑苏区', value: 'gusu' },
                { label: '吴中区', value: 'wuzhong' },
              ],
            }
            districtOptions.value = districtMap[cityCode as string] || []

            // 清空区县选择
            cascadeLinkageData.value.district = undefined
            cascadeFormKey.value++
          }
        },
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
      disabled: ({ formData }) => !formData.city,
      select: {
        options: districtOptions.value,
        placeholder: cascadeLinkageData.value.city ? '请选择区县' : '请先选择城市',
      },
    },
  },
])
</script>

<template>
  <div>
    <h4>字段联动演示</h4>
    <Row :gutter="24">
      <Col :span="12">
        <h5>基础联动 - 用户类型联动</h5>
        <StdForm
          :key="`linkage-${basicFormKey}`"
          v-model:data="basicLinkageData"
          :columns="basicLinkageColumns"
        />
      </Col>
      <Col :span="12">
        <h5>级联选择 - 省市区联动</h5>
        <StdForm
          :key="`cascade-${cascadeFormKey}`"
          v-model:data="cascadeLinkageData"
          :columns="cascadeLinkageColumns"
        />
      </Col>
    </Row>
  </div>
</template>

<style scoped>
h4 {
  margin: 16px 0;
  color: #1890ff;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

h5 {
  margin: 12px 0;
  color: #666;
  font-weight: 500;
}

:deep(.ant-form) {
  margin-top: 16px;
}
</style>
