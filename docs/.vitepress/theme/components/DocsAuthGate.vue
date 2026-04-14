<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  expectedHash?: string
  storageKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  expectedHash: '',
  storageKey: 'docs-auth-unlocked',
})

const inputPassword = ref('')
const errorMessage = ref('')
const isUnlocked = ref(false)
const isChecking = ref(false)

const isEnabled = computed(() => Boolean(props.expectedHash))

onMounted(() => {
  if (!isEnabled.value) {
    isUnlocked.value = true
    return
  }

  if (typeof window === 'undefined')
    return

  isUnlocked.value = window.sessionStorage.getItem(props.storageKey) === '1'
})

async function toSha256(value: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function unlock() {
  if (!isEnabled.value) {
    isUnlocked.value = true
    return
  }

  if (!inputPassword.value) {
    errorMessage.value = '请输入密码'
    return
  }

  isChecking.value = true
  errorMessage.value = ''

  try {
    const hashedInput = await toSha256(inputPassword.value)
    if (hashedInput === props.expectedHash.toLowerCase()) {
      isUnlocked.value = true
      if (typeof window !== 'undefined')
        window.sessionStorage.setItem(props.storageKey, '1')
      return
    }

    errorMessage.value = '密码错误'
  }
  catch {
    errorMessage.value = '校验失败，请重试'
  }
  finally {
    isChecking.value = false
  }
}
</script>

<template>
  <slot v-if="isUnlocked" />

  <div
    v-else
    class="docs-auth-mask"
  >
    <div class="docs-auth-card">
      <h2 class="docs-auth-title">
        文档访问验证
      </h2>

      <p class="docs-auth-description">
        请输入访问密码后继续浏览。
      </p>

      <input
        v-model="inputPassword"
        class="docs-auth-input"
        type="password"
        placeholder="请输入密码"
        autocomplete="current-password"
        @keydown.enter="unlock"
      >

      <button
        class="docs-auth-button"
        type="button"
        :disabled="isChecking"
        @click="unlock"
      >
        {{ isChecking ? '验证中...' : '进入文档' }}
      </button>

      <p
        v-if="errorMessage"
        class="docs-auth-error"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.docs-auth-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.docs-auth-card {
  width: min(420px, 100%);
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

.docs-auth-title {
  margin: 0 0 8px;
  font-size: 22px;
  color: var(--vp-c-text-1);
}

.docs-auth-description {
  margin: 0 0 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.docs-auth-input {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.docs-auth-input:focus {
  border-color: var(--vp-c-brand-1);
}

.docs-auth-button {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
}

.docs-auth-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.docs-auth-error {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-danger-1);
}
</style>
