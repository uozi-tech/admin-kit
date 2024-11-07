<script setup lang="ts">
import {FormControllerRender} from "../renderers/FormControllerRender";
import {StdTableColumn} from "../types";
import {getColumnKey} from "../utils/util";

defineProps<{
  columns: StdTableColumn[],
  lang: string
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })

</script>

<template>
<AForm class="flex flex-wrap gap-y-4" :model="formData" label-width="auto" layout="inline">
  <AFormItem
      v-for="c in columns"
      :key="getColumnKey(c)"
      :label="c.edit?.formItem?.label ?? c.title"
      :name="c.edit?.formItem?.name ?? c.dataIndex"
  >
    <FormControllerRender :column="c" v-model:formData="formData" :lang="lang" :formItemKey="c.search === true ? 'edit' : 'search'" />
  </AFormItem>
  <slot name="extra" :form-data="formData" />
</AForm>
</template>

<style scoped>
</style>