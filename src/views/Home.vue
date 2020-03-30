<template>
  <div class="home">
    <h1 class="header">Digital Signal Processing</h1>
    <section
        v-if="tab === undefined || null || ''"
        class="tab"
    >
      <div
          v-if="file.columns.length === 0"
          class="drop-area-placeholder"
      >
        <DropArea/>
      </div>
      <div v-else>
        <h2 class="tab__header">Обзор</h2>
        <DSPChart :options="options"/>
      </div>
    </section>
    <section
        v-else-if="tab === 'channels'"
        class="tab"
    >
      <h2 class="tab__header">Каналы</h2>
      <Channels/>
    </section>
    <section
        v-else-if="tab === 'info'"
        class="tab"
    >
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
  import Channels from "@/components/Channels.vue";
  import {transformData} from '@/utils';
  import themes from '@/themes';
  import {DataItem} from "@/types/data";
  import {ResponseDataArraySpecJSON} from "@/types/responseDataArray.spec";

  @Component({
    components: {
      DSPChart,
      DropArea,
      FileInfo,
      Channels,
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
        childrenNames: {
          detail: `chart-main`,
          slider: `slider-main`,
          tooltip: `tooltip-main`,
        }
      };
    }

    get tab() {
      return this.$route.query.tab;
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
