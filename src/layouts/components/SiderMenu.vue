<script setup lang="ts">
import { h, computed, type VNodeChild } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, RouteMeta, RouteRecordRaw, RouterLink } from 'vue-router'
import { type MenuOption } from 'naive-ui'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import { renderNIcon } from '@/utils'

type IMenuOption = MenuOption & {
  key: string
  meta: RouteMeta
}

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const { siderWidth, siderCollapsedWidth, siderCollapsed } = storeToRefs(appStore)

const activeMenuKey = computed(() => {
  return route.meta.activeMenu || route.path
})
// 批量渲染菜单 label
const renderMenuLabel = (option: MenuOption): VNodeChild => {
  // 如果存在子菜单，则渲染为普通文本，点击不跳转路由
  if (option.children) return option.label as VNodeChild
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
  const routeMeta = option.meta as RouteMeta
  // icon 不存在，返回 true 保持图标占位缩进
  if (!routeMeta.icon) return true
  const isActive = activeMenuKey.value.match(option.key as string)
  const color = isActive ? '#09A6FF' : '#47505E'
  const icon = isActive ? routeMeta.activeIcon : routeMeta.icon
  return renderNIcon(icon || routeMeta.icon, { color })
}

function generateMenuOpts(routes: RouteRecordRaw[], parent = '/'): IMenuOption[] {
  const menus = routes.reduce((acc: IMenuOption[], item) => {
    // hidden 为 true, 不显示为菜单项
    if (item.meta?.hidden) return acc
    // path 为 /, 不显示为菜单项
    if (item.path === '/' && item.children) {
      const tmps = generateMenuOpts(item.children, '/')
      acc.push(...tmps)
      return acc
    }
    const path = item.path.startsWith('/') ? item.path : parent + item.path
    let menuOpt: IMenuOption = {
      label: item.meta?.title || '',
      key: path,
      meta: item.meta || {}
    }
    if (item.children && item.children.length) {
      const childrenMenus = generateMenuOpts(item.children, path + '/')
      // 只有一个子路由且 alwaysShow 为 false，则不显示父菜单
      if (childrenMenus.length === 1 && !item.meta?.alwaysShow) {
        menuOpt = childrenMenus[0]
      } else if (childrenMenus.length) {
        menuOpt.children = childrenMenus
      }
    }
    acc.push(menuOpt)
    return acc
  }, [])
  // 菜单排序
  menus.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))
  return menus
}
const menuOpts = computed(() => {
  return generateMenuOpts(userStore.routes)
})
</script>

<template>
  <n-layout-sider
    v-model:collapsed="siderCollapsed"
    :width="siderWidth"
    :collapsed-width="siderCollapsedWidth"
    bordered
    :native-scrollbar="false"
    collapse-mode="width"
    show-trigger="bar"
    @after-enter="appStore.toggleSiderCollapsedEnd"
    @after-leave="appStore.toggleSiderCollapsedEnd">
    <router-link to="/" #="{ navigate, href }" custom>
      <n-a class="logo" :href="href" @click="navigate">
        <svg-icon name="logo" :size="siderCollapsed ? 40 : 70" />
        <svg-icon name="sun" :size="siderCollapsed ? 0 : 40" />
        <transition name="fade">
          <div v-if="!siderCollapsed">vue-admin-starter</div>
        </transition>
      </n-a>
    </router-link>
    <n-menu
      class="menu"
      :value="activeMenuKey"
      :options="menuOpts"
      :collapsed="siderCollapsed"
      :collapsed-width="siderCollapsedWidth"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      accordion />
  </n-layout-sider>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.logo {
  display: block;
  padding: 10px 0;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: yellowgreen;
}
.menu {
  user-select: none;
}
</style>
