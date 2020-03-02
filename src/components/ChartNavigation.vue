<template>
  <section class="chart chart-navigation">
    <div :class="parent">
      <canvas :id="id"></canvas>
      <div class="navigation">
        <div class="control control-left">
          <div class="arrow arrow-left"/>
        </div>
        <div class="window"/>
        <div class="control control-right">
          <div class="arrow arrow-right"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import Chart from "../../types/chart";

  @Component
  export default class ChartNavigation extends Chart {}
</script>

<style scoped lang="scss">
  .navigation-placeholder {
    position: relative;
    height: 7vh;
    border: 1px solid #dddddd;

    canvas {
      position: absolute;
      left: 0;
    }
    
    .navigation {
      position: absolute;
      display: flex;
      top: 0;
      width: 100%;
      height: 100%;

      div {
        height: inherit;
        /*position: absolute;*/

        &.control {
          display: flex;
          background: rgba(0,0,0,.05);

          &-left {
            justify-content: flex-end;
            flex-basis: 5px;
          }

          &-right {
            justify-content: flex-start;
            flex: 1;
          }

          .arrow {
            flex-basis: 5px;
            cursor: w-resize;
            background: rgba(0,0,0,.05);
          }
        }

        &.window {
          width: 25%;
          min-width: 5%;
        }
      }
    }
  }
</style>