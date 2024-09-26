<script setup lang="ts">

import { $gettext } from '../gettext.ts'
</script>

<template>
  <ACard :title="$gettext('Dashboard')">
    {{ $gettext('Dashboard Page') }}
  </ACard>
</template>

<style scoped>

</style>
