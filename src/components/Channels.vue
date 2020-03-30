<template>
  <div
      v-if="file.columns.length !== 0"
      class="channels"
  >
    <DSPChart
        v-for="n in file.columns.length - 1"
        :key="n"
        :options="options(n-1)"
    />
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import DSPChart from "@/components/charts/DSPChart.vue";
  import {ResponseDataArraySpecJSON} from "@/types/responseDataArray.spec";
  import {transformData} from "@/utils";
  import {DataItem, TransformedData} from "@/types/data";
  import themes from "@/themes";

  // TODO: Pass file as prop from parent component - it may solve issue with redrawing after changing a tab
  @Component({
    components: {
      DSPChart,
    }
  })
  export default class Channels extends Vue {
    @Getter file!: ResponseDataArraySpecJSON;
    @Watch('file')
    onFileChange() {
      this.data = transformData(this.file as DataItem);
    }

    private data!: TransformedData;

    mounted() {
      if (this.file.columns.length !== 0) {
        this.data = transformData(this.file as DataItem);
        console.log('test:', this.file.columns.length);
        console.log('channels data:', this.data);
      }
    }

    options(idx: number) {
      const {labels, datasets} = this.data;

      return {
        width: 800,
        height: 300,
        data: {labels: labels, datasets: [datasets[idx]]},
        theme: themes.day,
        animationSpeed: 20,
        childrenNames: {
          detail: `chart-${idx}`,
          slider: `slider-${idx}`,
          tooltip: `tooltip-${idx}`,
        }
      };
    }
  }
</script>

<style scoped lang="scss">

</style>