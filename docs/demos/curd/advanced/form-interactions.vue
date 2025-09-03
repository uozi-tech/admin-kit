<script setup lang="ts">
import { Radio, RadioGroup } from 'ant-design-vue'
import { ref } from 'vue'
import ConditionalDisplay from './form-interactions/ConditionalDisplay.vue'
import DynamicFormItems from './form-interactions/DynamicFormItems.vue'
import DynamicValidation from './form-interactions/DynamicValidation.vue'
import FieldLinkage from './form-interactions/FieldLinkage.vue'
import StepsForm from './form-interactions/StepsForm.vue'

const demoType = ref('linkage')
</script>

<template>
  <div class="form-interactions-demo">
    <h3>表单交互演示</h3>

    <!-- 演示选项 -->
    <div style="margin: 24px 0;">
      <RadioGroup
        v-model:value="demoType"
        button-style="solid"
      >
        <Radio value="linkage">
          字段联动
        </Radio>
        <Radio value="conditional">
          条件显示
        </Radio>
        <Radio value="validation">
          动态验证
        </Radio>
        <Radio value="steps">
          分步表单
        </Radio>
        <Radio value="dynamic">
          动态表单项
        </Radio>
      </RadioGroup>
    </div>

    <!-- 字段联动演示 -->
    <div v-show="demoType === 'linkage'">
      <FieldLinkage />
    </div>

    <!-- 条件显示演示 -->
    <div v-show="demoType === 'conditional'">
      <ConditionalDisplay />
    </div>

    <!-- 动态验证演示 -->
    <div v-show="demoType === 'validation'">
      <DynamicValidation />
    </div>

    <!-- 分步表单演示 -->
    <div v-show="demoType === 'steps'">
      <StepsForm />
    </div>

    <!-- 动态表单项演示 -->
    <div v-show="demoType === 'dynamic'">
      <DynamicFormItems />
    </div>
  </div>
</template>

<style scoped>
.form-interactions-demo {
  padding: 16px;
}

.form-interactions-demo h4 {
  margin: 16px 0;
  color: #1890ff;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.form-interactions-demo h5 {
  margin: 12px 0;
  color: #666;
  font-weight: 500;
}

:deep(.ant-form) {
  margin-top: 16px;
}

:deep(.ant-steps) {
  max-width: 600px;
}
</style>
