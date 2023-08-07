module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
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
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    // 解决全局类型在 .vue 文件中报错问题 xxx is not defined
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-empty': ['error', { allowEmptyCatch: true }]
  }
}
