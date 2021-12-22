module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // unitToConvert: 'px', // 需要转换的单位，默认为"px"
      viewportWidth: 375 // 设计稿的视口宽度
      // unitPrecision: 5, // 单位转换后保留的精度
      // propList: ['*'], // px转化为vw的属性列表, 通配符 * 代表全部
      // viewportUnit: 'vw', // 使用的视口单位
      // fontViewportUnit: 'vw', // 字体使用的视口单位
      // selectorBlackList: [], // 忽略的CSS选择器
      // minPixelValue: 1, // 设置最小的转换数值
      // mediaQuery: false, // 媒体查询里的单位是否需要转换
      // replace: true, // 是否直接更换属性值，而不添加备用属性
      // exclude: undefined, // 忽略某些文件夹下的文件或特定文件
      // include: undefined, // 只有匹配到的文件才会被转换
      // landscape: false,
      // landscapeUnit: 'vw', // 横屏时使用的单位
      // landscapeWidth: 568 // 横屏时使用的视口宽度
    }
  }
}
