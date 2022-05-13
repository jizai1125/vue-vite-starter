<script setup lang="ts">
import { resolveAssetFile } from 'utils'
import CardItem from './components/CardItem.vue'
import { useLineChart } from '@/composables/useECharts'
import { nextTick, ref, watch } from 'vue'
import useAppStpre from '@/store/app'
const rangeSelect = ref(1)
const selectOptions = [
  {
    label: '最近一个月',
    value: 1
  },
  {
    label: '最近半年',
    value: 2
  },
  {
    label: '最近一年',
    value: 3
  }
]

const cardList = [
  {
    title: '组件个数',
    value: 293034,
    bgImg: 'card-01.png',
    color: '#1375FF'
  },
  {
    title: '系统个数',
    value: 38292,
    bgImg: 'card-02.png',
    color: '#54C904'
  },
  {
    title: '组件收藏总量(人)',
    value: 23773,
    bgImg: 'card-03.png',
    color: '#FF5A5A'
  },
  {
    title: '组件调用总量(次)',
    value: 328837,
    bgImg: 'card-04.png',
    color: '#FF7743'
  }
]
const cardList2 = [
  {
    title: '调用次数',
    value: 28374,
    img: 'card-05.png',
    color: '#09A6FF'
  },
  {
    title: '调用成功次数',
    value: 3849,
    img: 'card-06.png',
    color: '#54C904'
  },
  {
    title: '调用失败次数',
    value: 29474,
    img: 'card-07.png',
    color: '#FF5A5A'
  },
  {
    title: '调用成功占比',
    value: 90,
    suffix: '%',
    img: 'card-08.png',
    color: '#8083F1'
  }
]
const appStore = useAppStpre()
const chartData = ref<any[]>([])
appStore.globalLoading = true
setTimeout(() => {
  appStore.globalLoading = false
  chartData.value = [
    {
      name: '3.01',
      value: 100
    },
    {
      name: '3.02',
      value: 200
    },
    {
      name: '3.03',
      value: 300
    },
    {
      name: '3.04',
      value: 150
    },
    {
      name: '3.05',
      value: 200
    },
    {
      name: '3.06',
      value: 300
    },
    {
      name: '3.07',
      value: 500
    },
    {
      name: '3.08',
      value: 600
    },
    {
      name: '3.09',
      value: 700
    },
    {
      name: '3.10',
      value: 800
    }
  ]
}, 3000)
const lineChart = useLineChart('#lineChart')
watch(chartData, () => {
  nextTick(() => {
    lineChart.render({
      xAxis: {
        data: chartData.value.map((item) => item.name)
      },
      series: [
        {
          data: chartData.value
        }
      ]
    })
  })
})
</script>

<template>
  <n-card title="业务组件" size="small" segmented hoverable class="widget-business">
    <template #header-extra>
      <n-select v-model:value="rangeSelect" :options="selectOptions" style="width: 120px" />
    </template>
    <card-item v-for="item in cardList" :key="item.title" v-bind="item"></card-item>
  </n-card>
  <n-card title="组件调用趋势" size="small" segmented class="widget-trend">
    <div class="card-wrap">
      <card-item v-for="item in cardList2" :key="item.title" v-bind="item">
        <img :src="resolveAssetFile(item.img)" alt="" />
      </card-item>
    </div>
    <div id="lineChart"></div>
  </n-card>
</template>

<style lang="scss" scoped>
#lineChart {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}
.widget-business {
  margin-bottom: 20px;
  :deep(.n-card__content) {
    display: flex;
    justify-content: space-between;
    .card-item {
      flex: 1;
    }
  }
}
.widget-trend {
  :deep(.n-card__content) {
    .card-wrap {
      display: flex;
      justify-content: space-between;
    }
    .card-item {
      flex: 1;
      height: 93px;
      box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      img {
        width: 60px;
      }
      .content .value {
        font-size: 36px;
        color: #47505e;
      }
    }
  }
}
</style>
