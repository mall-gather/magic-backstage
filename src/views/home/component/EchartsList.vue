<template>
  <div class="echarts-list" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { getTime } from '@/utils/times';

// dom
const chartRef = ref<HTMLDivElement>()
const optionDay: Array<string> = reactive([])

onMounted(() => {
  getDays()
  setEchartsData()
  
})

// ECharts方法
const setEchartsData = () => {
  var myChaet = echarts.init(chartRef.value!)

  var option = {
    title: {
      text: '订单统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: optionDay
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };

  myChaet.setOption(option)

  window.onresize = () => {
    myChaet.resize()
  }
}

// 获取年月日
function getDays(){
  for (let index = 6; index >= 0; index--) {
    optionDay.push(getTime(-index))
  }
}

</script>

<style lang="less" scoped>
.echarts-list {
  width: 80%;
  height: 500px;
  margin: 20px auto;
  background-color: #fff;
}
</style>