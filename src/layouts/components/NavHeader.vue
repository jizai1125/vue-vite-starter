<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { DropdownOption } from 'naive-ui'
import { useFullscreen } from '@vueuse/core'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import { useRoute, useRouter } from 'vue-router'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubFilled,
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@vicons/antd'

const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
// 折叠菜单按钮
const { siderCollapsed } = storeToRefs(appStore)

// 面包屑
const breadcrumbList = computed(() => {
  // 只展示有配置 router.meta.title
  const matched = route.matched.filter((item) => item.meta.title)
  return matched
})
// 全屏切换
const { isFullscreen, toggle } = useFullscreen()

// 下拉菜单
const dropdownOptions = [
  {
    label: '用户信息',
    key: 'userInfo'
  },
  { type: 'divider', key: 'd1' },
  {
    label: '退出登录',
    key: 'logout'
  }
]
const onDropdownSelect = async (key: string | number, option: DropdownOption) => {
  console.log(key, option)
  switch (option.key) {
    case 'logout':
      console.log('退出登录')
      await userStore.logout()
      router.push('/login')
      break
  }
}
const goToGithub = () => window.open('https://github.com/jizai1125/vue-vite-starter/tree/admin')
</script>

<template>
  <n-layout-header class="layout-header" bordered>
    <n-space class="header-left" align="center">
      <n-icon
        class="collapsed"
        :component="siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
        size="18"
        @click="() => (siderCollapsed = !siderCollapsed)"></n-icon>
      <n-breadcrumb class="breadcrumb">
        <transition-group name="breadcrumb">
          <n-breadcrumb-item v-for="routeItem in breadcrumbList" :key="routeItem.path">
            <router-link :to="routeItem.path">
              {{ routeItem.meta.title }}
            </router-link>
          </n-breadcrumb-item>
        </transition-group>
      </n-breadcrumb>
    </n-space>
    <n-space class="header-right" align="center">
      <n-tooltip placement="bottom">
        <template #trigger>
          <n-icon
            class="fullscreen"
            :component="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined"
            size="18"
            @click="toggle"></n-icon>
        </template>
        全屏
      </n-tooltip>
      <n-icon :component="GithubFilled" size="22" class="github" @click="goToGithub"></n-icon>
      <n-dropdown trigger="hover" show-arrow :options="dropdownOptions" @select="onDropdownSelect">
        <n-avatar
          class="avatar"
          round
          size="large"
          src="https://avatars.githubusercontent.com/u/33979706?v=4" />
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
}
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 60px;
}
.header-left {
  .collapsed {
    display: flex;
    padding-left: 12px;
    cursor: pointer;
  }
  .breadcrumb {
    display: inline-block;
  }
}
.header-right {
  padding-right: 20px;
  .fullscreen,
  .github,
  .avatar {
    cursor: pointer;
  }
}
</style>
