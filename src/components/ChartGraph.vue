<template>
  <section class="chart">
    <div :class="parent">
      <canvas :id="id"></canvas>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Chart from "../../types/chart";

  @Component
  export default class ChartGraph extends Chart {
    protected drawMeasures() {
      const linesNum = 6;

      // Height of single measure cell
      const cellHeight = (this.canvas.height - this.paddingY * 2) / (linesNum);

      this.context.strokeStyle = '#dddddd';
      this.context.lineWidth = 1;
      this.context.font = '16px sans-serif';
      this.context.fillStyle = '#777777';

      let currentY = this.paddingY;

      this.context.beginPath();

      const measureVal = (i: number): string => {
        switch (i) {
          case 0:
            return this.max.toString();
          case linesNum:
            return this.min.toString();
          default:
            return (this.max * ((linesNum - i) / linesNum)).toString()
        }
      };

      for (let i = 0; i <= linesNum; i++) {
        this.context.fillText(measureVal(i), 5, currentY - 8);
        this.context.moveTo(0, currentY);

        this.context.lineTo(this.canvas.width, currentY);
        this.context.stroke();
        currentY += cellHeight;
      }
    }

    protected resize() {
      this.canvas.width = this.canvasPlaceholder.offsetWidth;
      this.canvas.height = this.canvasPlaceholder.offsetHeight;

      this.drawMeasures();
      this.drawPoints();
    }
  }
</script>

<style scoped lang="scss">
  .chart-placeholder {
    height: 40vh;

    canvas {
      /*width: 100%;*/
      /*height: 100%;*/
      border: 1px solid #dddddd;
      border-top: none;
      /*border-bottom: none;*/
    }
  }
</style>