<template>
  <div class="home">
    <h1>Digital Signal Processing</h1>
    <TelegramChart :options="options"/>
  </div>
</template>

<script lang="ts">
  import TelegramChart from "@/components/TelegramChart.vue";
  import {transformData} from '@/utils';
  import themes from '@/themes';
  import data from '@/data/chart_data.json'
  import {DataItem} from "@/types/data";

  export default {
    name: 'Home',
    components: {
      TelegramChart,
    },
    data() {
      return {
        options: {
          // el: document.getElementById('chart1'),
          width: 800,
          height: 300,
          data: transformData(data[0] as DataItem),
          theme: themes.day,
          animationSpeed: 20
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    width: 100%;

    > h1 {
      text-align: center;
    }
  }
</style>
