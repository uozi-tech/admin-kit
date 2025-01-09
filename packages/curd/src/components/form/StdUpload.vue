<!-- TODO: 该组件未完成，请勿使用 -->
<script setup lang="ts">
import type { UploadConfig } from '../../types'
import { InboxOutlined } from '@ant-design/icons-vue'
import { UploadDragger } from 'ant-design-vue'
import { isArray } from 'lodash-es'
import { computed } from 'vue'
import { $gettext } from '../../locales'

const { props } = defineProps<{ props?: UploadConfig & { placeholder?: string | number } }>()

const value = defineModel<string | string[]>('value')

const fileList = computed(() => {
  let files
  if (isArray(value.value)) {
    files = (value.value as string[]).map(item => ({ uid: item, name: item, status: 'done', url: item }))
  }
  else {
    files = [
      {
        uid: value.value,
        name: value.value,
        url: value.value,
      },
    ]
  }
  return files
})
</script>

<template>
  <UploadDragger
    :file-list="fileList"
    v-bind="props"
  >
    <p class="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p class="ant-upload-text">
      {{ $gettext('Upload') }}
    </p>
  </UploadDragger>
</template>

<style scoped lang="less">

</style>
