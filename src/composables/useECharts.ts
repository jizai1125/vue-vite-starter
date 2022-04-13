import { nextTick, onMounted, shallowReactive, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import { merge } from 'lodash-es'

interface ChartContext {
  // echart 实例
  instance?: ECharts
  // 渲染 echarts
  render: (option: EChartsOption) => ECharts
}
/**
 * echarts 渲染
 * @param domSelectors dom 选择器 例如 #id /.class ...
 * @param option echarts option
 * @param isRenderImmediate 是否立即渲染
 * @returns ChartContext
 */
export default function useECharts(
  domSelectors: string,
  option: EChartsOption = {},
  isRenderImmediate = true
) {
  // 渲染 echart
  const render = (option: EChartsOption = {}) => {
    if (!chartCtx.instance) {
      const el = document.querySelector(domSelectors) as HTMLElement
      if (!el) {
        console.warn('useECharts >>> dom 获取失败, 请确保再 dom 挂载后调用！')
      }
      chartCtx.instance = echarts.init(el)
    }
    chartCtx.instance.setOption(option)

    return chartCtx.instance
  }
  // 使用 shallowReactive 包裹
  const chartCtx: ChartContext = shallowReactive({
    instance: undefined,
    render
  })
  // 立即渲染
  if (isRenderImmediate) {
    onMounted(() => {
      render(option)
    })
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
      left: '0%',
      right: '4%',
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
        fontFamily: 'Noto Sans S Chinese',
        fontWeight: 'bold',
        color: '#A6A6A6'
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
