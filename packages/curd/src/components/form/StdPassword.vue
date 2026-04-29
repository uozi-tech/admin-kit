<script setup lang="ts">
import type { PasswordConfig } from '../../types'
import { Button, Input, InputPassword, SpaceCompact } from 'antdv-next'
import { ref } from 'vue'
import { useLocale } from '../../composables'

const p = defineProps<{
  props?: Omit<PasswordConfig, 'placeholder'>
  placeholder?: string | number
  disabled?: boolean
}>()

const modelValue = defineModel<PasswordConfig['value']>('value')

const visibility = ref(false)

const { t } = useLocale()

function handleGenerate() {
  visibility.value = true
  modelValue.value = 'xxxx'

  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const passwordLength = p.props?.maxlength || 12
  let password = ''
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)

    password += chars.substring(randomNumber, randomNumber + 1)
  }

  modelValue.value = password
}
</script>

<template>
  <div>
    <SpaceCompact block>
      <InputPassword
        v-if="!visibility"
        v-model:value="modelValue"
        :class="{ compact: props?.generate }"
        :maxlength="20"
        :disabled="disabled"
        :placeholder="placeholder?.toString()"
        v-bind="props"
      />
      <Input
        v-else
        v-model:value="modelValue"
        :class="{ compact: props?.generate }"
        :maxlength="20"
        :disabled="disabled"
        :placeholder="placeholder?.toString()"
        v-bind="props"
      />
      <Button
        v-if="props?.generate"
        type="primary"
        :disabled="disabled"
        @click="handleGenerate"
      >
        {{ t('generate') }}
      </Button>
    </SpaceCompact>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-input-group.ant-input-group-compact) {
  display: flex;
}
</style>
