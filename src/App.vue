<template>
  <div id="app">
    <h1>Digital Signal Processing</h1>
    <Chart></Chart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chart from "@/components/Chart.vue";

@Component({
  components: {
    Chart,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  @import "./scss/main";

  #app {
    padding: 3rem;
    min-height: 100vh;

    > h1 {
      text-align: center;
    }
  }
</style>
