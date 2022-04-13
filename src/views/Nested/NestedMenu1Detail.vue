<script setup lang="ts"></script>

<template>
  <n-button @click="$router.back()">返回</n-button>
  <pre class="code">
  // router/nested.ts
  {
    meta: {
      // 不在侧边菜单栏显示
      hidden: true,
      // 指定选中按钮
      activeMenu: '/nested/menu1'
    }
  }
  </pre>
</template>

<style lang="scss" scoped>
.code {
  padding: 20px 0 0;
  background-color: antiquewhite;
}
</style>
