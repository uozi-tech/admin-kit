<script setup lang="ts">
import { AdminLayout } from '../../admin-layout-antdv'
import { HomeOutlined, InfoOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
</script>

<template>
  <div class="app-container">
    <AdminLayout
      :breadcrumb-items="[
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'About',
          href: '/about',
        }
      ]"
      :menu-items="[
        {
          label: 'Home',
          path: '/',
          icon: h(HomeOutlined),
          children: [{
            label: 'Home',
            path: '/',
            icon: h(HomeOutlined)
          }]
        },
        {
          label: 'About',
          path: '/about',
          icon: h(InfoOutlined)
        }
      ]"
    />
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  min-height: 100vh;
}

</style>
