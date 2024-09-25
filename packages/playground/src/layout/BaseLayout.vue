<script setup lang="ts">

import { RouterView } from 'vue-router'
import { AdminLayout } from '@uozi/admin-layout-antdv'
import { HomeOutlined, InfoOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <AdminLayout
    :breadcrumb-items="[
      {
        title: 'Home',
        path: '/',
        children: [{
          title: 'Home',
          path: '/',
        }]
      },
      {
        title: 'About',
        path: '/about',
      }
    ]"
    :sidebar-items="[
      {
        title: 'Home',
        path: '/',
        icon: h(HomeOutlined),
        children: [{
          title: 'Home',
          path: '/home',
        }]
      },
      {
        title: 'About',
        path: '/about',
        icon: h(InfoOutlined)
      }
    ]"
  >
    <RouterView v-slot="{ Component, route }">
      <component
        :is="Component"
        :key="route.path"
      />
    </RouterView>
  </AdminLayout>
</template>

<style scoped>

</style>
