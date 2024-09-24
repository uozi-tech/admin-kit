<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, inject } from 'vue'
import VPIconMoon from './icons/VPIconMoon.vue'
import VPIconSun from './icons/VPIconSun.vue'
import VPSwitch from '../VPSwitch/VPSwitch.vue'

const devicePrefersTheme = inject('devicePrefersTheme') as Ref<string>

// const switchTitle = computed(() => {
//   return isDark.value ? 'Switch to light theme' : 'Switch to dark theme'
// })

// async function toggleAppearance() {
//   if (isDark.value)
//     settings.set_theme('light')
//   else
//     settings.set_theme('dark')
//
//   if (devicePrefersTheme.value === settings.theme)
//     settings.set_preference_theme('auto')
//   else
//     settings.set_preference_theme(settings.theme)
// }
</script>

<template>
  <VPSwitch
    :title="switchTitle"
    class="VPSwitchAppearance"
    :aria-checked="true"
  >
    <VPIconSun class="sun" />
    <VPIconMoon class="moon" />
  </VPSwitch>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
