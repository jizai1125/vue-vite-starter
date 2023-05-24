<script setup lang="ts">
import { useEventListener, useThrottleFn } from '@vueuse/core'
import SiderMenu from './components/SiderMenu.vue'
import NavHeader from './components/NavHeader.vue'
import MainContent from './components/MainContent.vue'
import useAppStore from '@/store/app'
defineOptions({ name: 'Layout' })

const appStore = useAppStore()

// 自动折叠侧边菜单
const handleResize = () => {
  const { width } = document.body.getBoundingClientRect()
  appStore.siderCollapsed = width <= appStore.siderCollapsedScreenWidth
}
handleResize()
useEventListener(window, 'resize', useThrottleFn(handleResize, 500, true))
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
