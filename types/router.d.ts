import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string
    // 是否隐藏顶部导航栏
    hideNavBar?: boolean
    // 是否隐藏顶部导航栏左侧箭头
    hideNavBarLeftArrow?: boolean
    // 是否隐藏底部导航栏
    hideTabbar?: boolean
  }
}
