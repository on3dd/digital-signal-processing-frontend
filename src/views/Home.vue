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

<script>
  // @ is an alias to /src
  import ChartComponent from "@/components/ChartComponent";
  import ChartNavigation from "@/components/ChartNavigation";

  export default {
    name: 'Home',
    components: {
      ChartComponent,
      ChartNavigation
    }
  }
</script>
