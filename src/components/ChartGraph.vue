<template>
  <canvas :id="id"></canvas>
</template>

<script>
  import {Component, Prop} from 'vue-property-decorator';
  import {Getter, Mutation} from 'vuex-class';

  import Chart from "../../types/chart";

  @Component
  export default class ChartGraph extends Chart {

  }
</script>

<style scoped>

</style>