<script setup lang="ts">

import { $gettext } from '../gettext.ts'
</script>

<template>
  <ACard :title="$gettext('About')">
    {{ $gettext('About Page') }}
  </ACard>
</template>

<style scoped>

</style>
