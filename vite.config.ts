import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import colors from 'colors-console'

const resolvePath = (path) => resolve(__dirname, path)

export default defineConfig(({ mode }) => {
  console.log(colors('cyan', '<<<<<<<<<< VITE_ENV >>>>>>>>>> '), colors('yellow', mode))
  // 可以根据不同环境自定义配置
  const IS_PROD = mode === 'production'

  return {
    plugins: [
      vue(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      viteSvgIcons({
        // 指定 svg 图标文件夹路径
        iconDirs: [resolvePath('src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      })
    ],
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
      // 非生产环境生成 sourcemap
      sourcemap: !IS_PROD,
      terserOptions: {
        compress: {
          // 生产环境去除 console、debugger
          drop_console: IS_PROD,
          drop_debugger: true
        }
      },
      // Rollup 打包配置
      rollupOptions: {
        plugins: [visualizer({ open: true, gzipSize: true })]
      }
    }
  }
})
