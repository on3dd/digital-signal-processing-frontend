<template>
  <div class="app">
    <h1>Digital Signal Processing</h1>
    <TelegramChart :options="options1"/>
    <TelegramChart :options="options2"/>
  </div>
</template>

<script lang="ts">
  import DSPChart from "@/components/charts/DSPChart.vue";
  import {transformData} from '@/utils';
  import themes from '@/themes';
  import data from '@/data/chart_data.json'
  import {DataItem} from "@/types/data";

  export default {
    name: 'Home',
    components: {
      TelegramChart: DSPChart,
    },
    data() {
      return {
        options1: {
          width: 800,
          height: 300,
          data: transformData(data[0] as DataItem),
          theme: themes.day,
          animationSpeed: 20,
          childrenNames: {
            detail: 'chart-1',
            slider: 'slider-1',
            tooltip: 'tooltip-1',
          },
        },
        options2: {
          width: 800,
          height: 300,
          data: transformData(data[1] as DataItem),
          theme: themes.day,
          animationSpeed: 20,
          childrenNames: {
            detail: 'chart-2',
            slider: 'slider-2',
            tooltip: 'tooltip-2',
          },
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
