<script setup lang="ts">
import { h, computed, toRaw, Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import { useRoute, RouteMeta, RouteRecordRaw, RouterLink } from 'vue-router'
import { renderIcon } from '@/utils'
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const { siderWidth, siderCollapsedWidth, siderCollapsed } = storeToRefs(appStore)

const activeMenuKey = computed(() => {
  return route.meta.activeMenu || route.path
})
// 批量渲染菜单 label
const renderMenuLabel = (option: MenuOption) => {
  // console.log('renderMenuLabel', option)
  // 存在子菜单的菜单项点击不跳转路由
  if (option.children) return option.label
  return h(
    RouterLink,
    {
      to: option.key as string
    },
    { default: () => option.label }
  )
}
// 批量渲染菜单 icon
const renderMenuIcon = (option: MenuOption) => {
  // console.log('renderMenuIcon', option)
  if (!option.menuIcon) return true
  const isActive = activeMenuKey.value.match(option.key as string)
  const color = isActive ? '#09A6FF' : '#47505E'
  let icon = isActive ? option.activeMenuIcon : option.menuIcon
  icon = icon || option.menuIcon
  return renderIcon(icon as string | Component, { color })
}

function generateMenuOpts(routes: RouteRecordRaw[], parent = '/'): MenuOption[] {
  const menus = routes.reduce((acc: MenuOption[], item) => {
    // hidden 为 true, 不生成菜单项
    if (item.meta?.hidden) return acc
    // path 为 /, 不生成菜单项
    if (item.path === '/' && item.children) {
      const tmps = generateMenuOpts(item.children, '/')
      acc.push(...tmps)
      return acc
    }
    const path = item.path.startsWith('/') ? item.path : parent + item.path
    const menuOpt: MenuOption = {
      label: item.meta?.title || '',
      key: path,
      meta: item.meta
    }
    if (item.meta?.icon) menuOpt.menuIcon = toRaw(item.meta.icon)
    if (item.meta?.activeIcon) menuOpt.activeMenuIcon = toRaw(item.meta.activeIcon)
    if (item.children && item.children.length) {
      const tmps = generateMenuOpts(item.children, path + '/')
      menuOpt.children = tmps
    }
    acc.push(menuOpt)
    return acc
  }, [])
  menus.sort((a, b) => {
    const aMeta = a.meta as RouteMeta
    const bMeta = b.meta as RouteMeta
    return (aMeta.sort || 0) - (bMeta.sort || 0)
  })
  return menus
}
const menuOpts = computed(() => {
  return generateMenuOpts(userStore.routes)
})
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="siderCollapsedWidth"
    :width="siderWidth"
    show-trigger="bar"
    :native-scrollbar="false"
    :collapsed="siderCollapsed"
    @update:collapsed="(flag: boolean) => (siderCollapsed = flag)">
    <router-link to="/" #="{ navigate, href }" custom>
      <n-a class="logo" :href="href" @click="navigate">
        <svg-icon name="logo" :size="siderCollapsed ? 50 : 80" />
        <svg-icon name="sun" :size="siderCollapsed ? 0 : 40" />
        <div v-if="!siderCollapsed">vue3-admin-template</div>
      </n-a>
    </router-link>
    <n-menu
      accordion
      :value="activeMenuKey"
      :collapsed-width="siderCollapsedWidth"
      :collapsed="siderCollapsed"
      :options="menuOpts"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon" />
  </n-layout-sider>
</template>

<style lang="scss" scoped>
.logo {
  display: block;
  padding: 10px 0;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: yellowgreen;
}
</style>
