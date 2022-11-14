<script setup lang="ts">
import TheProvider from '@/components/TheProvider.vue'
import TheView from '@/components/TheView.vue'
</script>

<template>
  <the-provider>
    <the-view></the-view>
  </the-provider>
</template>
<style>
html,
body,
#app,
.n-config-provider {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
