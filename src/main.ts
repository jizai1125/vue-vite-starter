import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import registerGlobalComp from './components/registerGlobalComp'
// svg 图标注册 vite-plugin-svg-icons
import 'virtual:svg-icons-register'
// 全局路由守卫
import './permission'

const app = createApp(App)
// 注册全局组件
registerGlobalComp(app)

app.use(router)
app.use(createPinia())
app.mount('#app')
