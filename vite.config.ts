import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import colors from 'colors-console'

const resolvePath = (path) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 可以根据不同环境自定义配置
  console.log(colors('cyan', '<<<<<<<<<< VITE_ENV >>>>>>>>>> '), colors('yellow', mode))

  const IS_PROD = mode === 'production'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolvePath('src'),
        api: resolvePath('src/api'),
        components: resolvePath('src/components'),
        views: resolvePath('src/views'),
        utils: resolvePath('src/utils')
      }
    },
    // 开发服务器配置
    // server: {
    //   // 代理配置
    //   proxy: {
    //     '^/api': {
    //       target: 'https://www.kuaidi100.com',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // },
    // 构建时配置
    build: {
      // 正式环境关闭 sourcemap，测试环境开启
      sourcemap: !IS_PROD,
      terserOptions: {
        compress: {
          // 去除 console、debugger
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
})
