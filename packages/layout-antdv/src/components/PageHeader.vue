<script setup lang="ts">
import { ArrowLeftOutlined } from '@antdv-next/icons'
import { Button } from 'antdv-next'

defineProps<{
  pageTitle: string
  back?: (event: MouseEvent) => void
}>()
</script>

<template>
  <div class="page-header">
    <div class="page-header-main">
      <Button
        v-if="back"
        type="text"
        class="page-header-back"
        @click="back"
      >
        <template #icon>
          <ArrowLeftOutlined />
        </template>
      </Button>
      <h1 class="page-header-title">
        {{ pageTitle }}
      </h1>
      <div class="page-header-extra">
        <slot name="extra" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.page-header {
  padding: 0;
}

.page-header-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-header-back {
  flex: 0 0 auto;
}

.page-header-title {
  flex: 1;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
}

.page-header-extra {
  flex: 0 0 auto;
}
</style>
