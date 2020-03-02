<template>
  <div id="app">
    <h1>Digital Signal Processing</h1>
    <ChartComponent id="chart" parent="chart-placeholder"/>
    <ChartNavigation id="navigation" parent="navigation-placeholder"/>
    <section class="chart-legend">
      <span>Chart legend</span>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ChartComponent from "@/components/ChartComponent.vue";
import ChartNavigation from "@/components/ChartNavigation.vue";

@Component({
  components: {
    ChartComponent,
    ChartNavigation
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  @import "./scss/main";

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 3rem;
    min-height: 100vh;

    > h1 {
      text-align: center;
    }

    section {
      margin: .5rem;
      width: 80%;

      &.chart-legend {
        padding: 1rem;
        border: 1px solid #dddddd;
      }
    }
  }
</style>
