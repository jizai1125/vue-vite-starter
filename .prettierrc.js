module.exports = {
  semi: false, // 结尾分号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号
  arrowParens: 'always', // 箭头函数，单个参数添加括号
  endOfLine: 'lf', // 行尾符
  tabWidth: 2, // tab键缩进宽度
  singleQuote: true, // 使用单引号
  printWidth: 100, // 指定代码长度，超出换行
  jsxSingleQuote: true,
  bracketSameLine: true, // jsx中把标签元素的'>'单独放一行
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    }
  ]
}
