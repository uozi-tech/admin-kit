<script setup lang="ts">
import { Pagination } from 'ant-design-vue'
import { computed } from 'vue'
import { useCurdConfig, useLocale } from '../composables'

const props = withDefaults(defineProps<{
  pagination: any
  size?: 'default' | 'small'
  loading?: boolean
  showSizeChanger?: boolean
}>(), {
  showSizeChanger: true,
})

const emit = defineEmits(['change', 'changePageSize', 'update:pagination'])

const { t } = useLocale()
const curdConfig = useCurdConfig()
const { total, current, pageSize } = curdConfig.listApi!.paginationMap!.response

function change(num: number, pageSize: number) {
  emit('change', num, pageSize)
}

const computedPageSize = computed({
  get() {
    return props.pagination[pageSize]
  },
  set(v) {
    emit('changePageSize', v)
    emit('update:pagination', { ...props.pagination, per_page: v })
  },
})

const pagination = computed({
  get() {
    return {
      total: props.pagination[total],
      pageSize: props.pagination[pageSize],
      current: props.pagination[current],
    }
  },
  set(v) {
    emit('update:pagination', { ...props.pagination, [pageSize]: v })
  },
})

const totalText = computed(() => {
  return `${t('total')}: ${pagination.value.total} ${t('item(s)')}`
})
</script>

<template>
  <div
    v-if="pagination.total > pagination.pageSize"
    class="pagination-container"
  >
    <Pagination
      v-model:page-size="computedPageSize"
      :disabled="loading"
      :current="pagination.current"
      :show-size-changer="showSizeChanger"
      :show-total="() => totalText"
      :size="size"
      :total="pagination.total"
      @change="change"
    />
  </div>
</template>

<style lang="less">
.ant-pagination-total-text {
  @media (max-width: 450px) {
    display: block;
  }
}
</style>

<style lang="less" scoped>
.pagination-container {
  padding: 10px 0 0 0;
  display: flex;
  justify-content: right;
  @media (max-width: 450px) {
    justify-content: center;
  }
}
</style>
