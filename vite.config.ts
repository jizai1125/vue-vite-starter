import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 浏览器兼容
import legacy from '@vitejs/plugin-legacy'
import viteSvgIcons from 'vite-plugin-svg-icons'
// 可视化分析打包结果
// import { visualizer } from 'rollup-plugin-visualizer'
import colors from 'colors-console'
import styleImport from 'vite-plugin-style-import'

const resolvePath = (path) => resolve(__dirname, path)

export default defineConfig(({ mode }) => {
  console.log(colors('cyan', '<<<<<<<<<< VITE_ENV >>>>>>>>>> '), colors('yellow', mode))
  // 可以根据不同环境自定义配置
  const IS_PROD = mode === 'production'

  return {
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style/index`
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': resolvePath('src')
      }
    },
    // 开发服务器配置
    server: {
      // 代理配置
      // proxy: {
      //   '^/api': {
      //     target: 'https://www.kuaidi100.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    esbuild: {
      // 生产环境删除 console、debugger 语句
      drop: IS_PROD ? ['debugger', 'console'] : []
    },
    // 构建时配置
    build: {
      // 非生产环境生成 sourcemap
      sourcemap: !IS_PROD,
      // Rollup 打包配置
      rollupOptions: {
        plugins: [
          // visualizer({ open: true, gzipSize: true })
        ]
      }
    }
  }
})
