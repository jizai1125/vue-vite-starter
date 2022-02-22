import type { App } from 'vue'
/**
 * 根据基准宽高值缩放元素
 * @param $el dom 元素
 * @param remWidth 宽度基准值
 * @param remHeight 高度基准值
 */
function setElementScale($el: HTMLElement, remWidth: number, remHeight: number) {
  const pcWidth = document.documentElement.clientWidth || document.body.clientWidth
  const pcHeight = document.documentElement.clientHeight || document.body.clientHeight
  const whFlag = pcWidth / remWidth > pcHeight / remHeight
  const scale = whFlag
    ? Math.round((pcHeight / remHeight) * 1000) / 1000
    : Math.round((pcWidth / remWidth) * 1000) / 1000

  $el.style.position = 'absolute'
  $el.style.overflow = 'hidden'
  $el.style.width = `${remWidth}px`
  $el.style.height = `${remHeight}px`
  $el.style.transform = `scale(${scale})`
  $el.style.top = `${
    whFlag
      ? -(remHeight * (1 - scale)) / 2
      : -((remHeight * (1 - scale)) / 2 - (pcHeight - remHeight * scale) / 2)
  }px`
  $el.style.left = `${
    whFlag
      ? -((remWidth * (1 - scale)) / 2 - (pcWidth - remWidth * scale) / 2)
      : -(remWidth * (1 - scale)) / 2
  }px`
}

interface DefaultOption {
  el: string
  remWidth: number
  remHeight: number
}
const defaultConfig = { el: '#app', remWidth: 1920, remHeight: 1080 }

export default {
  install(app: App, option: DefaultOption = defaultConfig) {
    const $el = document.querySelector(option.el) as HTMLElement
    // 隐藏滚动条
    document.body.style.overflow = 'hidden'
    handleResize()
    window.addEventListener('resize', handleResize)
    function handleResize() {
      console.log('window resize')
      setElementScale($el, option.remWidth, option.remHeight)
    }
  }
}
