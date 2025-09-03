<script setup lang="ts">
import { Radio, RadioGroup } from 'ant-design-vue'
import { ref } from 'vue'
import CustomRangeInput from './customization/CustomRangeInput.vue'
import CustomRender from './customization/CustomRender.vue'
import DynamicForm from './customization/DynamicForm.vue'

const demoType = ref('render')
</script>

<template>
  <div class="customization-demo">
    <h3>自定义扩展演示</h3>

    <!-- 演示选项 -->
    <div style="margin: 24px 0;">
      <RadioGroup
        v-model:value="demoType"
        button-style="solid"
      >
        <Radio value="render">
          自定义渲染
        </Radio>
        <Radio value="form">
          自定义表单控件
        </Radio>
        <Radio value="dynamic">
          动态表单
        </Radio>
      </RadioGroup>
    </div>

    <!-- 自定义渲染演示 -->
    <div v-show="demoType === 'render'">
      <CustomRender />
    </div>

    <!-- 自定义控件组件 -->
    <CustomRangeInput v-show="demoType === 'form'" />

    <!-- 动态表单演示 -->
    <div v-show="demoType === 'dynamic'">
      <DynamicForm />
    </div>
  </div>
</template>

<style scoped>
.customization-demo {
  padding: 16px;
}

.customization-demo h4 {
  margin: 16px 0;
  color: #1890ff;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

:deep(.ant-table) {
  margin-top: 16px;
}

:deep(.ant-form) {
  margin-top: 16px;
  max-width: 600px;
}
</style>
