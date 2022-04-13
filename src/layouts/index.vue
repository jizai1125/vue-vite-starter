<script setup lang="ts">
import SiderMenu from './components/SiderMenu.vue'
import NavHeader from './components/NavHeader.vue'
import MainContent from './components/MainContent.vue'
</script>

<template>
  <n-layout position="absolute" has-sider>
    <sider-menu />
    <n-layout>
      <nav-header />
      <main-content />
    </n-layout>
  </n-layout>
</template>

<style scoped></style>
