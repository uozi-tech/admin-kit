<script setup lang="ts">
import { InputNumber, message } from 'ant-design-vue'
import { ref } from 'vue'

const minValue = ref(0)
const maxValue = ref(100)

function handleChange() {
  message.success(`Range changed: ${minValue.value} - ${maxValue.value}`)
}
</script>

<template>
  <div class="custom-range-input">
    <InputNumber
      v-model:value="minValue"
      placeholder="最小值"
      :min="0"
      style="width: 120px;"
      @change="handleChange"
    />
    <span class="separator">-</span>
    <InputNumber
      v-model:value="maxValue"
      placeholder="最大值"
      :min="minValue || 0"
      style="width: 120px;"
      @change="handleChange"
    />
  </div>
</template>

<style scoped>
.custom-range-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.separator {
  color: #999;
  font-weight: 500;
}
</style>
