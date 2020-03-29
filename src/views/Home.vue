<template>
  <div class="app">
    <h1>Digital Signal Processing</h1>
    <div v-if="file.columns.length !== 0">
      <DSPChart :options="{
      ...options,
      childrenNames: {
          detail: 'chart-1',
          slider: 'slider-1',
          tooltip: 'tooltip-1',
        },
    }"/>
    </div>
    <!--    <DSPChart :options="options1"/>-->
    <!--    <DSPChart :options="options2"/>-->
    <!--    <DSPChart :options="options3"/>-->
    <!--    <DSPChart :options="options4"/>-->
    <!--    <DSPChart :options="options5"/>-->
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import DSPChart from "@/components/charts/DSPChart.vue";
  import {transformData} from '@/utils';
  import themes from '@/themes';
  import {DataItem} from "@/types/data";
  import {ResponseDataArraySpecJSON} from "@/types/responseDataArray.spec";
  import Options from "@/types/options";

  @Component({
    components: {
      DSPChart,
    },
  })
  export default class Home extends Vue {
    @Getter file!: ResponseDataArraySpecJSON;

    get options() {
      const obj = {
        // name: '',
        width: 800,
        height: 300,
        data: transformData(this.file as DataItem),
        theme: themes.day,
        animationSpeed: 20,
      };

      return obj;
    }

    // private options1 = {
    //   width: 800,
    //   height: 300,
    //   data: transformData(data[0] as DataItem),
    //   theme: themes.day,
    //   animationSpeed: 20,
    //   childrenNames: {
    //     detail: 'chart-1',
    //     slider: 'slider-1',
    //     tooltip: 'tooltip-1',
    //   },
    // };
    //
    // private options2 = {
    //   width: 800,
    //   height: 300,
    //   data: transformData(data[1] as DataItem),
    //   theme: themes.day,
    //   animationSpeed: 20,
    //   childrenNames: {
    //     detail: 'chart-2',
    //     slider: 'slider-2',
    //     tooltip: 'tooltip-2',
    //   },
    // };
    //
    // private options3 = {
    //   width: 800,
    //   height: 300,
    //   data: transformData(data[2] as DataItem),
    //   theme: themes.day,
    //   animationSpeed: 20,
    //   childrenNames: {
    //     detail: 'chart-3',
    //     slider: 'slider-3',
    //     tooltip: 'tooltip-3',
    //   },
    // };
    //
    // private options4 = {
    //   width: 800,
    //   height: 300,
    //   data: transformData(data[3] as DataItem),
    //   theme: themes.day,
    //   animationSpeed: 20,
    //   childrenNames: {
    //     detail: 'chart-4',
    //     slider: 'slider-4',
    //     tooltip: 'tooltip-4',
    //   },
    // };
    //
    // private options5 = {
    //   width: 800,
    //   height: 300,
    //   data: transformData(data[4] as DataItem),
    //   theme: themes.day,
    //   animationSpeed: 20,
    //   childrenNames: {
    //     detail: 'chart-5',
    //     slider: 'slider-5',
    //     tooltip: 'tooltip-5',
    //   },
    // };
  }
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
