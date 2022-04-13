<script setup lang="ts">
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubFilled,
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@vicons/antd'
import useAppStore from '@/store/app'
import { computed, ref } from 'vue'
import type { DropdownOption } from 'naive-ui'
import { useFullscreen } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
// 折叠菜单按钮
const collapsed = computed(() => appStore.sideMenuCollapsed)
const changeCollapsed = () => {
  appStore.sideMenuCollapsed = !collapsed.value
}
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
const onDropdownSelect = (key: string | number, option: DropdownOption) => {
  console.log(key, option)
  switch (option.key) {
    case 'logout':
      console.log('退出登录')
      removeToken()
      router.push('/login')
      break
  }
}
</script>

<template>
  <n-layout-header class="layout-header" bordered>
    <n-space class="header-left" align="center">
      <n-icon
        class="collapsed"
        :component="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
        size="18"
        @click="changeCollapsed"></n-icon>
      <n-breadcrumb class="breadcrumb">
        <n-breadcrumb-item v-for="routeItem in breadcrumbList" :key="routeItem.path">
          <router-link :to="routeItem.path">
            {{ routeItem.meta.title }}
          </router-link>
        </n-breadcrumb-item>
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
      <n-icon :component="GithubFilled" size="22"></n-icon>
      <n-dropdown trigger="hover" show-arrow :options="dropdownOptions" @select="onDropdownSelect">
        <n-avatar
          class="avatar"
          round
          size="large"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>

<style lang="scss" scoped>
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
  .avatar {
    cursor: pointer;
  }
}
</style>
