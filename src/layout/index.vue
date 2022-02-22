<script setup lang="ts">
import NavHeader from './NavHeader.vue'
</script>

<template>
  <div class="layout">
    <nav-header></nav-header>
    <section class="main-container">
      <router-view></router-view>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  font-size: 42px;
  background-color: lightblue;
  .main-container {
    // height: calc(100vh - 60px);
  }
}
</style>
