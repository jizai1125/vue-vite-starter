<script setup>
import useAppStpre from '@/store/app'
const appStore = useAppStpre()
</script>

<template>
  <n-layout-content content-style="padding: 24px;">
    <n-spin :show="appStore.globalLoading">
      <router-view></router-view>
    </n-spin>
  </n-layout-content>
</template>

<style scoped></style>
