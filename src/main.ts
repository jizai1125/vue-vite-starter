import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// svg 图标注册 vite-plugin-svg-icons
import 'virtual:svg-icons-register'
import ScreenFlexible from './plugins/screen-flexible'

const app = createApp(App)

app.use(ScreenFlexible, { el: '#app', remWidth: 3840, remHeight: 2160 })

app.use(router)
app.use(createPinia())
app.mount('#app')
