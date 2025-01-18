<script setup lang="ts">
import type { Theme } from '~/props'
import { computed, ref } from 'vue'
import IconMoon from './Icons/IconMoon.vue'
import IconSun from './Icons/IconSun.vue'

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
  <button
    role="switch"
    class="theme-switch"
    @click="toggleTheme"
  >
    <div
      class="icon-container"
      :class="{ dark: isDark }"
    >
      <IconSun class="icon icon-sun" />
      <IconMoon class="icon icon-moon" />
    </div>
  </button>
</template>

<style scoped>
.theme-switch {
  @apply
  w-40px
  h-22px
  p-0
  bg-[#eff0f3]
  b-gray-2
  transition-all
  rounded-full
  cursor-pointer
  dark:(bg-[#222426] b-[#424242])
  hover:(b-[#3c89e8] dark:b-blue-5);

  border-width: 1px;
  border-style: solid;
}

.theme-switch .icon-container {
  @apply relative flex items-center w-full h-full p-4px;
}

.theme-switch .icon-container .icon {
  @apply
  absolute
  h-92%
  p-3px
  rounded-full
  transition-all
  transition-ease-in;
}

.icon-sun {
  @apply
  left-1px
  fill-gray-6
  bg-white
  dark:(op-0 translate-x-5);
}

.icon-moon {
  @apply
  right-1px
  fill-gray-1
  bg-gray-8
  op-0
  translate-x--5
  dark:(op-100 translate-x-0);
}
</style>
