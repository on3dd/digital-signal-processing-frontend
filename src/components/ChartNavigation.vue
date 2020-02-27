<template>
  <section class="chart chart-navigation">
    <div :class="parent">
      <canvas :id="id"></canvas>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Chart from "../../types/chart";

  @Component
  export default class ChartNavigation extends Chart {
    protected paddingY = 0;
  }
</script>

<style scoped lang="scss">
  .navigation-placeholder {
    height: 7.5vh;

    canvas {
      border: 1px solid #dddddd;
    }
  }
</style>