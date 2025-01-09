<script setup lang="ts">
import { Card } from 'ant-design-vue'
import { $gettext } from '~/gettext'
</script>

<template>
  <Card :title="$gettext('Dashboard')">
    {{ $gettext('Dashboard Page') }}
  </Card>
</template>

<style scoped>

</style>
