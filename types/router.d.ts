import type { Component } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 菜单 & 面包屑 名称
    title?: string
    // 当设为 true 时不在侧边栏显示为菜单项（默认 false）
    hidden?: boolean
    // 用于嵌套菜单显示，当设为 true 时总是显示为菜单（默认 true）
    // 当路由只有一个子路由时，是否只显示子路由菜单（默认 true，即都显示）
    alwaysShow?: boolean
    // 菜单自上而下的顺序，值越小顺序约靠前（默认值 0），需设置在显示为菜单的路由上
    order?: number
    // 菜单图标组件 / 图片地址
    icon?: Component | string
    // 菜单高亮时的图标组件 / 图片地址；可用于在菜单高亮时想指定不同图标
    activeIcon?: Component | string
    // 指定高亮菜单的路由；例如场景：一个文章的列表页路由为：/article/list，点击文章进入文章详情页，路由为 /article/1，
    // 这时想在侧边栏高亮文章列表菜单，activeMenu 就可以设为 /article/list
    activeMenu?: string
  }
}
