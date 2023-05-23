import type { Component } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 菜单 & 面包屑 名称
    title?: string
    // 是否显示为菜单项
    hidden?: boolean
    // 菜单顺序，值越小顺序约靠前，默认值 0
    sort?: number
    // 菜单图标组件 / 图片地址
    icon?: Component | string
    // 激活菜单的图标组件 / 图片地址
    activeIcon?: string
    // 指定激活菜单的路由
    activeMenu?: string
  }
}
