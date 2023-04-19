import { defineStore } from 'pinia'

export default defineStore('app', {
  state: () => {
    return {
      title: 'vue3-vite-ts',
      // 侧边菜单栏宽度
      siderWidth: 276,
      // 侧边菜单栏折叠后宽度
      siderCollapsedWidth: 80,
      // 侧边菜单栏自动折叠的边界宽度
      siderCollapsedScreenWidth: 1400,
      // 侧边菜单栏折叠状态
      siderCollapsed: false,
      // 侧边菜单栏折叠状态（折叠动画完成后才变化）
      siderCollapsedEndFlag: false,
      // 全局 loading
      globalLoading: false
    }
  },
  getters: {
    currentSideMenuWidth: (state) => {
      return state.siderCollapsed ? state.siderCollapsedWidth : state.siderWidth
    }
  },
  actions: {
    toggleSiderCollapsedEnd() {
      this.siderCollapsedEndFlag = !this.siderCollapsedEndFlag
    }
  }
})
