import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// svg 图标注册 vite-plugin-svg-icons
import 'virtual:svg-icons-register'
// 权限路由守卫
import './permission'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
