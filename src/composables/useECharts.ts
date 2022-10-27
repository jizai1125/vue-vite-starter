import { onMounted, onUnmounted, shallowReactive } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import { merge } from 'lodash-es'
import { useEventListener, useThrottleFn } from '@vueuse/core'

interface ChartContext {
  // echart 实例
  instance: ECharts | undefined
  render: (option: EChartsOption) => ECharts
  reRender: () => void
  dispose: () => void
  resize: () => void
}
/**
 * echarts 渲染
 * @param domSelectors dom 选择器 例如 #id /.class ...
 * @param initOption echarts option
 * @param isRenderImmediate 是否立即渲染
 * @returns ChartContext
 */
export default function useECharts(
  domSelectors: string,
  initOption: EChartsOption = {},
  isRenderImmediate = true
) {
  const chartCtx = shallowReactive<ChartContext>({
    instance: undefined,
    render: _render,
    reRender,
    dispose: _dispose,
    resize: _resize
  })
  // 立即渲染
  if (isRenderImmediate) {
    onMounted(() => {
      _render(initOption)
    })
  }
  useEventListener(window, 'resize', useThrottleFn(_resize, 500, true))
  onUnmounted(() => {
    _dispose()
  })
  // 初始渲染
  function _render(option: EChartsOption = {}): ECharts {
    let targetOption = option
    if (!chartCtx.instance) {
      const el = document.querySelector(domSelectors) as HTMLElement
      if (!el) {
        console.warn('[useECharts] DOM 获取失败, 请确保在 DOM 挂载后调用！')
        return
      }
      chartCtx.instance = echarts.init(el)
      if (!isRenderImmediate) {
        // 若初始时未渲染，需与初始配置合并
        targetOption = merge(initOption, option)
      }
    }
    chartCtx.instance.setOption(targetOption)

    return chartCtx.instance
  }
  // 销毁实例
  function _dispose() {
    chartCtx.instance?.dispose()
    chartCtx.instance = undefined
  }
  // 重新渲染，用于容器 DOM 节点被销毁后再次重建
  function reRender() {
    if (!chartCtx.instance) return
    const opts = chartCtx.instance.getOption()
    _dispose()
    _render(opts as EChartsOption)
  }
  function _resize() {
    console.log('[useECharts] resize', domSelectors)
    chartCtx.instance?.resize()
  }
  return chartCtx
}

/**
 * 折线图
 * @param domSelectors dom 选择器 例如 #id/.class/div
 * @returns ChartContext
 */
export function useLineChart(domSelectors: string, isRenderImmediate?: boolean) {
  const defaultLineOpt: EChartsOption = {
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          width: 2,
          color: '#92ACE4',
          opacity: 0.5
        }
      },
      axisLabel: {
        color: '#97A3BB',
        fontSize: 16,
        fontFamily: 'PingFang SC'
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 16,
        margin: 20,
        fontFamily: 'Noto Sans S Chinese',
        color: '#97A3BB'
      },
      splitLine: {
        lineStyle: {
          color: '#92ACE4',
          opacity: 0.3
        }
      }
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#1375FF'
              },
              {
                offset: 1,
                color: 'rgba(20,118,255, 0.2)'
              }
            ]
          },
          opacity: 0.3
        },
        showSymbol: false,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#1375FF'
              },
              {
                offset: 1,
                color: 'rgba(20,118,255, 0.2)'
              }
            ]
          }
        }
      }
    ]
  }
  return useECharts(domSelectors, defaultLineOpt, isRenderImmediate)
}
