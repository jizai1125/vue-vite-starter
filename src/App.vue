<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { invertIfBoolean } from '@/utils'

const route = useRoute()

const showNavBar = computed(() => invertIfBoolean(route.meta.hideNavBar))
const showTabbar = computed(() => invertIfBoolean(route.meta.hideTabbar))
const showLeftArrow = computed(() => invertIfBoolean(route.meta.hideNavBarLeftArrow))
const NavBarTitle = computed(() => {
  return route.meta.title || ''
})
</script>

<template>
  <van-nav-bar
    v-if="showNavBar"
    fixed
    :left-arrow="showLeftArrow"
    :title="NavBarTitle"
    @click-left="$router.go(-1)" />
  <div :class="['main-container', { hasNavBar: showNavBar }, { hasTabbar: showTabbar }]">
    <router-view></router-view>
  </div>
  <van-tabbar v-if="showTabbar" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
    <van-tabbar-item icon="fire-o" to="/list">列表</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Source Han Sans CN, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
<style lang="scss" scoped>
.main-container {
  &.hasNavBar {
    padding-top: $NavBarHeight;
    height: calc(100vh - $NavBarHeight);
  }
  &.hasTabbar {
    height: calc(100vh - $TabbarHeight);
  }
  &.hasNavBar.hasTabbar {
    height: calc(100vh - $NavBarHeight - $TabbarHeight);
  }
}
</style>
