<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const current = ref('en')

watch(current, v => {
  settings.set_language(v)
  gettext.current = v

  // @ts-expect-error title type
  document.title = `${route.meta?.title()} | ${settings.siteTitle}`
})

</script>

<template>
  <div>
    <ASelect
      v-model:value="current"
      size="small"
      style="width: 60px"
    >
      <ASelectOption
        v-for="(language, key) in ['en', 'zh']"
        :key="key"
        :value="key"
      >
        {{ language }}
      </ASelectOption>
    </ASelect>
  </div>
</template>

<style lang="less" scoped>

</style>
