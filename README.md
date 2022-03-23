# vue3-vite2-ts-template

## 快速克隆对应分支

利用 [degit](https://github.com/Rich-Harris/degit) 工具快速克隆所需分支，该工具不会将 git 历史克隆下来。

例如克隆 `main` 分支

```bash
$ npx degit github:jizai1125/vue3-vite2-ts-template#main my-project
```

## 分支说明

- [main](https://github.com/jizai1125/vue3-vite2-ts-template/tree/main)：基础配置
- [h5 分支](https://github.com/jizai1125/vue3-vite2-ts-template/tree/h5)：在 [main](https://github.com/jizai1125/vue3-vite2-ts-template/tree/main) 分支基础配置上集成 h5 移动端相关的配置
- [admin 分支](https://github.com/jizai1125/vue3-vite2-ts-template/tree/admin)：在 [main](https://github.com/jizai1125/vue3-vite2-ts-template/tree/main) 分支基础配置上集成管理台相关的配置

## main 分支集成说明

- 技术栈：[vue 3](https://v3.cn.vuejs.org/guide/introduction.html)、[vite 2](https://cn.vitejs.dev/guide/)、[pinia 2](https://pinia.vuejs.org/introduction.html)、[Vue Router 4](https://next.router.vuejs.org/zh/introduction.html)、[TypeScript ](https://www.typescriptlang.org/)等
- 代码风格检查约束：ESLint + Prettier、husky + lint-staged
- 环境相关配置
- 浏览器兼容性
- 打包分析：rollup-plugin-visualizer 插件
- svg 图片：SvgIcon 组件、vite-plugin-svg-icons 插件
- ...

**相关文档：**

- [vue3-vite2-ts-template 基础搭建文档](https://jizai-.notion.site/vue3-vite2-ts-template-8655943992f14b34a1582e02f26b5eba)

## h5 分支集成说明

- 移动端组件库 [vant 组件库](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/quickstart)

- 移动端适配方案采用 viewport 布局，使用插件 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

  > 将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 [PostCSS](https://github.com/postcss/postcss) 插件

**相关文档：**

- [vue3-vite2-ts-template 【H5 分支文档】](https://jizai-.notion.site/vue3-vite2-ts-template-H5-59684b7e415949b6939c7afe2ceb73fd)

## admin 分支集成说明

- todo...

**相关文档：**

- [vue3-vite2-ts-template 【admin 分支文档】](https://jizai-.notion.site/vue3-vite2-ts-template-admin-b9a4e222c4f84cb6b6db6df07ff0e862)

## 推荐开发工具

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
