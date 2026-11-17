<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
/**
 * 表格顶部滚动条组件
 * 用于在表格顶部显示一个横向滚动条，与表格内容同步滚动
 */

// 顶部滚动条相关 refs
const topScrollRef = ref<HTMLDivElement>()
const topScrollContentRef = ref<HTMLDivElement>()
const tableScrollRef = ref<HTMLDivElement>()

// 是否有横向滚动条
const hasScroll = ref(false)

// Observer 引用
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

// 双向同步时，写入对侧 scrollLeft 会在对侧异步触发一次 scroll 事件。
// 若不识别这次回声，惯性滚动期间对侧会把已过期的位置写回来源，表格来回拉扯产生抖动。
// 记下写给每一侧的值，对侧事件到达时位置仍等于该值即视为回声并忽略。
let echoTop: number | null = null
let echoTable: number | null = null

function isEcho(el: HTMLDivElement, expected: number | null) {
  // 高分屏下 scrollLeft 可能是小数，写入后会被取整
  return expected !== null && Math.abs(el.scrollLeft - expected) < 1
}

function syncScrollLeft(source: HTMLDivElement, target: HTMLDivElement) {
  const next = source.scrollLeft
  if (Math.abs(target.scrollLeft - next) < 1)
    return null
  target.scrollLeft = next
  return target.scrollLeft
}

// 同步顶部滚动条到表格
function onTopScroll() {
  const top = topScrollRef.value
  const table = tableScrollRef.value
  if (!top || !table)
    return
  if (isEcho(top, echoTop)) {
    echoTop = null
    return
  }
  echoTop = null
  echoTable = syncScrollLeft(top, table)
}

// 同步表格到顶部滚动条
function onTableScroll() {
  const top = topScrollRef.value
  const table = tableScrollRef.value
  if (!top || !table)
    return
  if (isEcho(table, echoTable)) {
    echoTable = null
    return
  }
  echoTable = null
  echoTop = syncScrollLeft(table, top)
}

// 更新顶部滚动条宽度
function updateTopScrollWidth() {
  if (tableScrollRef.value && topScrollContentRef.value) {
    const scrollWidth = tableScrollRef.value.scrollWidth
    topScrollContentRef.value.style.width = `${scrollWidth}px`
  }
}

// 更新顶部滚动条显示状态
function updateScrollbarVisibility() {
  if (tableScrollRef.value) {
    hasScroll.value = tableScrollRef.value.scrollWidth > tableScrollRef.value.clientWidth
  }
}

/**
 * 查找与当前滚动条组件关联的表格容器
 * 从组件自身向上查找最近的父级表格包装器，然后在其中查找 .ant-table-content
 */
function findAssociatedTableContainer(): HTMLDivElement | null {
  if (!topScrollRef.value) {
    return null
  }

  // 向上查找最近的 .std-table 或 .ant-table-wrapper 父元素
  const parentWrapper = topScrollRef.value.closest('.std-table')
    || topScrollRef.value.closest('.ant-table-wrapper')
    || topScrollRef.value.parentElement

  if (parentWrapper) {
    // 在父容器范围内查找 .ant-table-content
    return parentWrapper.querySelector('.ant-table-content') as HTMLDivElement
  }

  return null
}

// 初始化滚动同步
function initScrollSync() {
  // 使用 setTimeout 确保表格已渲染
  setTimeout(() => {
    const tableContainer = findAssociatedTableContainer()
    if (tableContainer) {
      tableScrollRef.value = tableContainer
      tableScrollRef.value.addEventListener('scroll', onTableScroll)
      updateTopScrollWidth()
      updateScrollbarVisibility()

      // 监听表格大小变化
      resizeObserver = new ResizeObserver(() => {
        updateTopScrollWidth()
        updateScrollbarVisibility()
      })
      resizeObserver.observe(tableContainer)

      // 监听表格内容变化（如数据加载）
      mutationObserver = new MutationObserver(() => {
        updateTopScrollWidth()
        updateScrollbarVisibility()
      })
      mutationObserver.observe(tableContainer, {
        childList: true,
        subtree: true,
      })
    }
  }, 500)
}

// 清理资源
function cleanup() {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
  tableScrollRef.value?.removeEventListener('scroll', onTableScroll)
}

onMounted(() => {
  nextTick(() => {
    initScrollSync()
  })
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div
    ref="topScrollRef"
    class="table-top-scrollbar"
    :class="{ 'has-scroll': hasScroll }"
    @scroll="onTopScroll"
  >
    <div
      ref="topScrollContentRef"
      class="table-top-scrollbar-content"
    />
  </div>
</template>

<style scoped lang="less">
.table-top-scrollbar {
  overflow-x: auto;
  overflow-y: hidden;
  height: 12px;
  margin-bottom: -4px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background-color 0.3s ease;
  scrollbar-width: none;

  // 有滚动条时显示背景和滚动条样式
  &.has-scroll {
    background: #fff;

    // 自定义滚动条样式 - 浅色模式
    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 5px;
      transition: background-color 0.2s ease;

      &:hover {
        background: #999;
      }
    }

    // Firefox 滚动条样式 - 浅色模式
    scrollbar-width: thin;
    scrollbar-color: #bfbfbf #f5f5f5;
  }
}

.table-top-scrollbar-content {
  height: 1px;
  pointer-events: none;
  background: transparent;
}

// 暗夜模式适配
.dark .table-top-scrollbar.has-scroll {
  background: #1f1f1f;

  // WebKit 浏览器暗夜模式滚动条
  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }

  &::-webkit-scrollbar-thumb {
    background: #595959;

    &:hover {
      background: #737373;
    }
  }

  // Firefox 浏览器暗夜模式滚动条
  scrollbar-color: #595959 #2a2a2a;
}
</style>
