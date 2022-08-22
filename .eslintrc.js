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
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  /**
   * 集成配置
   * 命名格式：eslint-config-<name> | @<scope>/eslint-config-<name> | plugin:<name>/<config-name>
   * 使用可以用全称，也可以用缩写，若以 eslint-config- 开头，则可以省略 eslint-config-
   * 作用：继承其他模块的 eslint 配置，可以看作是集成别人的配置方案
   */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  /**
   * 插件配置
   * 命名格式：eslint-plugin-<name> / @<scope>/eslint-plugin-<name>
   * 模块名称若以 eslint-plugin- 开头，则可以省略 eslint-plugin-
   * 作用：新增一些自定义检查规则
   */
  // eslint-plugin-vue @typescript-eslint/eslint-plugin 的缩写
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0
  }
}
