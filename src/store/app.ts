import { defineStore } from 'pinia'

export default defineStore('app', {
  state: () => {
    return {
      title: 'vue3-vite-ts',
      // 侧边菜单栏宽度
      siderWidth: 276,
      // 侧边菜单栏折叠后宽度
      siderCollapsedWidth: 80,
      // 侧边菜单栏折叠状态
      siderCollapsed: false
    }
  },
  getters: {
    currentSideMenuWidth: (state) => {
      return state.siderCollapsed ? state.siderCollapsedWidth : state.siderWidth
    },
    currSideWidth: (state) => {
      return state.siderCollapsed ? state.siderCollapsedWidth : state.siderWidth
    }
  },
  actions: {}
})
