<script setup lang="ts"></script>

<template>
  <div class="nested-menu2">
    <h1>二级菜单</h1>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nested-menu2 {
  .container {
    border: 1px solid yellowgreen;
  }
}
</style>
