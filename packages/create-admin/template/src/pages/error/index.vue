<script setup lang="ts">
import type { ResultStatusType } from 'ant-design-vue/es/result'

const route = useRoute()

const error = computed<{
  title: string | number
  status?: ResultStatusType
  subTitle?: string
}>(() => {
  const code = Number(route.params.code)
  switch (code) {
    case 403:
      return {
        title: code,
        status: code,
        subTitle: $gettext('Sorry, you are not authorized to access this page.'),
      }
    case 404:
      return {
        title: code,
        status: code,
        subTitle: $gettext('Sorry, the page you visited does not exist.'),
      }
    default:
      return {
        status: 'error',
        title: $gettext('Sorry, something went wrong.'),
      }
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <AResult
      class="bg-light dark:bg-dark"
      :title="error.title"
      :sub-title="error.subTitle"
      :status="error.status"
    >
      <template #extra>
        <AButton
          key="console"
          type="primary"
        >
          {{ $gettext('Go Home') }}
        </AButton>
      </template>
    </AResult>
  </div>
</template>

<style scoped>

</style>
