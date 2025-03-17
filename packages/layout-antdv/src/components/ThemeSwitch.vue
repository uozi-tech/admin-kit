<script setup lang="ts">
import type { Theme } from '../props'
import { computed, ref } from 'vue'
import IconMoon from './Icons/IconMoon.vue'
import IconSun from './Icons/IconSun.vue'
import VPSwitch from './VPSwitch/VPSwitch.vue'

const props = withDefaults(
  defineProps<{
    currentTheme?: Theme
  }>(),
  {
    currentTheme: 'light',
  },
)

const emit = defineEmits(['toggleTheme'])
const theme = ref(props.currentTheme)

const isDark = computed(() => theme.value === 'dark')

function toggleTheme() {
  theme.value = isDark.value ? 'light' : 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
  emit('toggleTheme', theme.value)
}
</script>

<template>
  <VPSwitch
    class="VPSwitchAppearance"
    :aria-checked="isDark"
    @click="toggleTheme"
  >
    <IconSun class="sun" />
    <IconMoon class="moon" />
  </VPSwitch>
</template>

<style lang="less">
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

.dark .VPSwitchAppearance .check {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
