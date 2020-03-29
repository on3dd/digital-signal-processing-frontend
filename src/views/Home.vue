<template>
  <div class="home">
    <h1 class="header">Digital Signal Processing</h1>
    <section class="tab" v-if="tab === undefined || null">
      <div v-if="file.columns.length === 0" class="drop-area-placeholder">
        <DropArea/>
      </div>
      <div v-else>
        <h2 class="tab__header">Обзор</h2>
        <DSPChart
            :options="{
              ...options,
              childrenNames: {
                detail: 'chart-1',
                slider: 'slider-1',
                tooltip: 'tooltip-1',
              }
             }"
        />
      </div>
    </section>
    <section class="tab" v-else-if="tab === 'channels'">

    </section>
    <section class="tab" v-else-if="tab === 'info'">
      <h2 class="tab__header">Текущее состояние многоканального сигнала</h2>
      <FileInfo/>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import DSPChart from "@/components/charts/DSPChart.vue";
  import DropArea from "@/components/DropArea.vue";
  import FileInfo from "@/components/FileInfo.vue";
  import {transformData} from '@/utils';
  import themes from '@/themes';
  import {DataItem} from "@/types/data";
  import {ResponseDataArraySpecJSON} from "@/types/responseDataArray.spec";

  @Component({
    components: {
      DSPChart,
      DropArea,
      FileInfo,
    },
  })
  export default class Home extends Vue {
    @Getter file!: ResponseDataArraySpecJSON;

    get options() {
      return {
        width: 800,
        height: 300,
        data: transformData(this.file as DataItem),
        theme: themes.day,
        animationSpeed: 20,
      };
    }

    get tab() {
      return this.$route.query.tab;
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
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    width: 100%;

    .header {
      text-align: center;
    }

    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;

      &__header {
        text-align: center;
      }

      .drop-area-placeholder {
        width: 80%;
        max-width: 800px;
        flex-grow: 1;
      }
    }
  }
</style>
