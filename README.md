# Vue 3 + Typescript + Vite

vue3 + TypeScript + Vite + Pinia

## 推荐开发工具

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 集成说明

- [vue 3.x](https://v3.cn.vuejs.org/guide/introduction.html)
- [vite 2.x](https://cn.vitejs.dev/guide/)
- [pinia 2.x](https://pinia.vuejs.org/introduction.html) 
- [Vue Router 4.x](https://next.router.vuejs.org/zh/introduction.html) 
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](http://www.axios-js.com/zh-cn/docs/)
- 代码风格检查约束：ESLint + Prettier、husky + lint-staged

# 搭建步骤

## 创建项目

1. yarn create vite
2. 选择 vue
3. 选择 vue-ts

## 代码风格约束

### 配置 ESLint 

相关插件：

- [eslint](https://eslint.org/docs/user-guide/getting-started)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/docs/)
- @typescript-eslint/parser

1. 安装插件

    ```bash
    yarn add eslint --dev
    # vue 官方 ESLint 插件，检查 .vue 文件中 <template>、<script>中的语法错误、指令等
    yarn add eslint-plugin-vue --dev
    # 让 Eslint 支持 TypeScript
    yarn add @typescript-eslint/eslint-plugin --dev
    # typescript parser
    yarn add @typescript-eslint/parser --dev
    ```

2. 根目录新建 `.eslintrc.js` 文件，完整配置见最后。

3. 新建 `.eslintignore` 文件

   > ESLint默认忽略 `/node_modules/*` 和 `/bower_components/*` 中的文件

   ```
   /dist
   ```

### 配置 Prettier

相关插件：

- prettier
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- eslint-config-prettier

1. 安装插件

   ```bash
   yarn add prettier --dev
   # 该插件将 prettier 配置的规则作为 eslint 的规则来检查我们的代码
   yarn add eslint-plugin-prettier --dev
   ```

2. 新建 `prettierrc.js`，完整配置见最后。

3. **解决 prettier 与 eslint 冲突的规则**

   > 安装 [eslint-config-prettier 插件](https://github.com/prettier/eslint-config-prettier#legacy)，该插件可以禁用 prettier 与 eslint 冲突的相关规则
   >
   > 参考 [eslint-plugin-prettier Recommended Configuration](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)
   3.1 安装 `eslint-config-prettier`

   ```bash
   yarn add eslint-config-prettier --dev
   ```

   3.2 `.eslintrc.js` 文件配置 `extends`，**注意一定要把该条配置放置在 extends 最后面！！！**

   > 我们安装的 `eslint-plugin-prettier` 插件附带了一个 `plugin:prettier/recommended` 配置，帮我们配置好了 prettier 和解决了prettier 与 eslint 冲突的问题，所以我们只需要直接使用该配置就行，无需在再去配置 eslint-plugin-prettier 和 eslint-config-prettier 

   ```js
   {
      "extends": [
         // ...其他配置
         "plugin:prettier/recommended" // 放在最后
      ]
   }
   ```

### 配置 git commit 时检查

husky + lint-staged 

参考：[lint-staged Installation and setup](https://www.npmjs.com/package/lint-staged)

husky：它的主要作用就是关联git的钩子函数，在执行相关git hooks时进行自定义操作，比如在提交前执行eslint校验，提交时校验commit message等等。[npm地址](https://www.npmjs.com/package/husky)

lint-staged: 对暂存的 git 文件运行检测

直接运行命令，会生成一个 .husky 文件夹，会在package.json 文件 sciprts 添加一条 "prepare" 命令和 “lint-staged” 配置项

```bash
npx mrm@2 lint-staged
```

## 配置环境变量

加载的环境变量暴露 **`import.meta.env`**  对象上；[vite官方文档-环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

默认情况下，vite 提供两种环境模式

-  `dev` 命令：`development` (开发) 模式
- `build` 以及 `serve` 命令：`production` (生产) 模式

我们在通过 `--mode` 参数定义 3 种模式来加载对应的`.env` 文件环境变量，运行/构建不同环境包：

- development  =>  .env.development
- sit  => .env.sit
- production  => .env.production

步骤：

1. 新建`.env` 文件

    - `.env.development`

    ```bash
    # 本地开发环境变量
    NODE_ENV=development
    # 接口地址
    VITE_API_URL='http://dev.com'
    ```

    - `.env.sit`

      ```bash
      # 测试环境变量
      NODE_ENV=sit

      VITE_API_URL='http://test.com'
      ```

    - `.env.production`

      ```bash
      # 生产环境变量
      NODE_ENV=production

      VITE_API_URL='http://production.com'
      ```

2.  `env.d.ts` 文件添加声明，支持 TypeScript 的智能提示

    ```java
    interface ImportMetaEnv {
      readonly VITE_API_URL: string
      // 更多环境变量...
    }
    ```

## css 相关

建议使用原生  [css 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95) 和实现 CSSWG 草案的 PostCSS 插件（例如 [postcss-nesting](https://github.com/jonathantneal/postcss-nesting)）来编写简单的、符合未来标准的 CSS。

若需要使用 css 预处理，[参考文档](https://cn.vitejs.dev/guide/features.html#css-modules)

## 路由配置

[Vue Router 官方文档](https://next.router.vuejs.org/zh/installation.html)

1. src 目录下新建 router 文件夹

2. router 文件夹下新建 index.ts 文件

   ```js
   import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
   const routes: RouteRecordRaw[] = [
     {
       path: '/',
       name: 'HelloWorld',
       // 注意导入要带上文件后缀.vue，否则 ts 会报错找不到相应模块
       component: () => import('@/views/HelloWorld.vue')
     }
   ]
   
   const router = createRouter({
     history: createWebHistory(),
     routes
   })
   
   export default router
   ```

3. main.ts 导入路由

   ```js
   import { createApp } from 'vue'
   import App from './App.vue'
   import router from './router'
   
   const app = createApp(App)
   
   app.use(router)
   
   app.mount('#app')
   ```

##  Axios 请求封装

文件路径 `src/utils/request.ts`

## 状态管理 Pinia

[官方文档](https://pinia.esm.dev/introduction.html)

特点：

- 直观，像定义组件一样地定义 `store`，并且能够更好地组合它们；
- 完整的 `Typescript` 支持；
- 关联 `Vue Devtools` 钩子，提供更好地开发体验；
- 模块化设计，能够构建多个 `stores` 并实现自动地代码拆分；
- 极其轻量（1kb），甚至感觉不到它的存在 ；
- 同时支持同步和异步 `actions`；

使用步骤：

1. 安装 `yarn add pinia`

2. 在 `src/main.ts` 下定义引用 `pinia` 插件

   ```js
   import { createPinia } from 'pinia'
   
   app.use(createPinia())
   ```

3.  新建 store 文件夹，在 store 下新建 index.ts，**state 必须是箭头函数，保证 ts 能完成的进行类型推断**

   ```js
   import { defineStore } from 'pinia'
   export default defineStore({
     id: 'app', // store id, 必填且必须唯一
     state: () => {
       return {
         title: 'vue3-vite-ts'
       }
     }
   })
   ```

   就可以在组件中使用了

   ```vue
   <template>
     <div>{{store.name}}</div>
   </template>
   
   <script setup lang="ts">
   import useAppStore from "@/store"
   const store = useAppStore()
   </script>
   ```

   修改 store 数据，可以直接 `store.xxx = xxx`, 也可以使用 `store.$patch`、`actions `

# 其他配置

## vite 常用配置

### 配置别名

```js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  ...
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

### 配置代理

示例：

```js
// vite.config.ts
{
	// ...
    server: {
        proxy: {
            target: 'http://api.xxx',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
}
```

参考：

- [vite server-proxy](https://cn.vitejs.dev/config/#server-proxy)
- [`http-proxy`](https://github.com/http-party/node-http-proxy)。proxy 完整选项详见 [此处](https://github.com/http-party/node-http-proxy#options).

### sourcemap & console\debugger

构建打包时，vite 配置项 `build.sourcemap` 默认为 false，即不会生成 source map 文件，如果我们需要根据环境去判断构建后是否生成 source map 文件，可以如下示例配置：

```js
// vite.config.js
export default defineConfig(({ mode }) => {
   const IS_PROD = mode === 'production'
    return {
        build: {
          // 生产环境关闭 sourcemap
          sourcemap: !IS_PROD,
          terserOptions: {
            compress: {
              // 去除 console、debugger
              drop_console: !IS_PROD,
              drop_debugger: true
            }
          }
    	}
    } 
})
```

### vite 插件

- [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

  > 为打包后的文件提供传统浏览器兼容性支持

[官方中文文档-插件](https://cn.vitejs.dev/plugins/)

# 推荐

- [VueUse](https://vueuse.org/): vue3 hooks 库，提供了一些常用的基于 `Composition API` 的函数集合。

# 完整文件

## .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  // eslint-plugin-vue @typescript-eslint/eslint-plugin 的缩写
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}

```

## .prettierrc.js

```js
module.exports = {
  semi: false, // 结尾分号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号
  arrowParens: 'always', // 箭头函数，单个参数添加括号
  endOfLine: 'lf', // 行尾符
  tabWidth: 2, // tab键缩进宽度
  singleQuote: true, // 使用单引号
  printWidth: 100, // 指定代码长度，超出换行
  jsxSingleQuote: true,
  jsxBracketSameLine: true
}
```

## request.ts

```js
import axios from 'axios'
import { getToken } from '@/utils/auth'

const baseURL = import.meta.env.VITE_API_URL

// 创建实例
const service = axios.create({
  baseURL, // url = base api url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 根据需要自定义
    const token = getToken()
    const option = {
      headers: {
        token
      }
    }
    return Object.assign(config, option)
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const resData = response.data
    // 根绝业务自定义
    // if (resData?.status !== 200) {
    //   if (resData.status === 401) {
    //     // 登录超时,重新登录
    //   }
    //   return Promise.reject(resData)
    // }
    return Promise.resolve(resData)
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
```



# 问题解决

## eslint 报错：prettier 配置好后，eslint 检查不生效报错

排除 eslint 跟 prettier 的配置冲突的原因之外，可以关闭重新打开项目。

## ts 报错 ：找不到模块“xxx”或其相应的类型声明

tsconfig.json 配置，配置基本目录 `baseUrl` 以及 `paths`，解析非绝对模块路径

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/": ["src/*"]
    }
}
```

参考：[tsconfig.json - paths](https://www.typescriptlang.org/tsconfig#paths)

