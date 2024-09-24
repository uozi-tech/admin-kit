<script setup lang="ts">
import { AdminLayout } from '../../admin-layout-antdv'
</script>

<template>
  <div class="app-container">
    <AdminLayout :breadcrumb-items="[
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'About',
          href: '/about',
        }
    ]" />
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  min-height: 100vh;
}

</style>
