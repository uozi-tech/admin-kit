<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { userApi } from '../mock/userApi'
import { userColumns } from './columns'
</script>

<template>
  <StdCurd
    :columns="userColumns"
    :api="userApi"
    disable-router-query
    scroll-x="max-content"
  />
</template>

<style scoped lang="less">

</style>
