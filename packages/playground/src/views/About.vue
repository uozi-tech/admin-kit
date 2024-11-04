<script setup lang="ts">
import { $gettext } from '../gettext'
import { StdCurd } from '@uozi-admin/curd'
</script>

<template>
  <ACard :title="$gettext('About')">
    {{ $gettext('About Page') }}
    <StdCurd />
  </ACard>
</template>

<style scoped>

</style>
