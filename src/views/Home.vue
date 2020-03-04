<template>
  <div id="app">
    <h1>Digital Signal Processing</h1>
    <TelegramChart :options="options"/>
  </div>
</template>

<script lang="ts">
  // @ is an alias to /src
  // import ChartComponent from "@/components/ChartComponent";
  // import ChartNavigation from "@/components/ChartNavigation";
  import {Component, Vue} from 'vue-property-decorator';
  import TelegramChart from "@/components/TelegramChart.vue";
  import {transformData} from '@/utils';
  import themes from '@/themes';
  import data from '@/data/chart_data.json'
  import {DataItem} from "@/types/data";

  export default {
    name: 'Home',
    components: {
      // TelegramChart: {
      //   props: {
      //     options: {
      //       // el: document.getElementById('chart1'),
      //       width: 600,
      //       height: 200,
      //       data: transformData(data[0] as DataItem),
      //       theme: themes.day,
      //       animationSpeed: 20
      //     }
      //   }
      // }
      TelegramChart,
    },
    data() {
      return {
        options: {
          // el: document.getElementById('chart1'),
          width: 600,
          height: 200,
          data: transformData(data[0] as DataItem),
          theme: themes.day,
          animationSpeed: 20
        }
      }
    }
  }
</script>
