# vue-vite-starter

## 快速克隆对应分支

方式1（推荐）：利用 [degit](https://github.com/Rich-Harris/degit) 工具快速克隆所需分支，该工具不会将 git 历史克隆下来。例如克隆 `admin` 分支：

```bash
npx degit github:jizai1125/vue-vite-starter#admin my-project
```

方式2：使用 git 命令，指定选项 `--depth=1` 是下载单 commit，`-b` 是下载指定分支
```bash
git clone --depth=1 -b admin git@github.com:jizai1125/vue-vite-starter.git
```

## 分支说明

- [main](https://github.com/jizai1125/vue-vite-starter/tree/main)：基础配置
- [admin 分支](https://github.com/jizai1125/vue-vite-starter/tree/admin)：在基础配置上集成管理台相关的配置
- [h5 分支](https://github.com/jizai1125/vue-vite-starter/tree/h5)：在基础配置上集成 h5 移动端相关的配置

## main 分支集成说明

- 技术栈：[vue 3](https://v3.cn.vuejs.org/guide/introduction.html)、[vite 3](https://cn.vitejs.dev/guide/)、[pinia 2](https://pinia.vuejs.org/introduction.html)、[Vue Router 4](https://next.router.vuejs.org/zh/introduction.html)、[TypeScript 4](https://www.typescriptlang.org/)等
- 代码风格检查约束：ESLint + Prettier、husky + lint-staged
- 浏览器兼容性：@vitejs/plugin-legacy 插件
- 打包结果分析：rollup-plugin-visualizer 插件
- svg 图片：SvgIcon 组件、vite-plugin-svg-icons 插件
- ...

**相关文档：**

- [vue-vite-starter 基础搭建文档](https://jizai.notion.site/vue-vite-starter-8655943992f14b34a1582e02f26b5eba)

## admin 分支集成说明

除了 [main 分支集成](https://github.com/jizai1125/vue-vite-starter#main-分支集成说明) 外，还有集成以下

- [Naive UI](https://www.naiveui.com/zh-CN/os-theme/docs/installation)  UI 组件库
- [xicons](https://www.xicons.org/)  图标库 
- [ECharts](https://echarts.apache.org/zh/index.html)  图表库
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)  按需自动导入 vue 组件插件 
- [VueUse](https://vueuse.org/)  vue 2 / vue3 composition api 工具库
- [vue-countup-v3](https://www.npmjs.com/package/vue-countup-v3) 数字滚动组件
- ...

**相关文档：**

- [vue-vite-starter【admin 分支文档】](https://jizai.notion.site/vue-vite-starter-admin-b9a4e222c4f84cb6b6db6df07ff0e862)

<img src="https://gitee.com/aka-jizai/PicPlus/raw/master/image-20221021113346990.png" style="zoom:50%;" />

## h5 分支集成说明

除了 [main 分支集成](https://github.com/jizai1125/vue-vite-starter#main-分支集成说明) 外，还有集成以下

- [vant 组件库](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/quickstart)  移动端组件库

- 移动端适配方案采用 viewport 布局，使用插件 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

  > 将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 [PostCSS](https://github.com/postcss/postcss) 插件
  
- ...

**相关文档：**

- [vue-vite-starter 【H5 分支文档】](https://jizai.notion.site/vue-vite-starter-H5-59684b7e415949b6939c7afe2ceb73fd)

<img src="https://gitee.com/aka-jizai/PicPlus/raw/master/image-20221024175041304.png" alt="image-20221024175041304" style="zoom:80%;" />

## 推荐开发工具

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
