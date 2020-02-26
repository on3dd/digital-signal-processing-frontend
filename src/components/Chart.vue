<template>
  <section class="chart">
    <div class="chart-placeholder">
      <canvas id="chart"></canvas>
    </div>
    <div class="chart-legend">
      <span>Chart legend</span>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class'

  import {Signal} from "@/../types/signals";

  @Component
  export default class Chart extends Vue {
    @Action fetchSignals!: () => void;
    @Getter signals!: Signal[];

    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private canvasPlaceholder!: HTMLElement;

    // Min and max values in input array
    private min!: number;
    private max!: number;

    private readonly padding = 0;

    async created() {
      await this.fetchSignals();
      console.log('Signals:', this.signals);

      this.min = Math.min(...this.signals.map(el => el.val));
      this.max = Math.max(...this.signals.map(el => el.val));

      this.init();
      // this.drawPoints();
    }

    private init() {
      const canvas = document.getElementById("chart") as HTMLCanvasElement;
      const context = canvas.getContext("2d")!;

      this.canvasPlaceholder = document.getElementsByClassName("chart-placeholder")[0] as HTMLElement;
      window.addEventListener("resize", this.resize);

      this.canvas = canvas;
      this.context = context;

      this.resize();
    }

    private resize() {
      this.canvas.width = this.canvasPlaceholder.offsetWidth;
      this.canvas.height = this.canvasPlaceholder.offsetHeight;

      this.drawMeasures();
      this.drawPoints();
    }

    private drawMeasures() {
      const linesNum = 6;

      // Height of single measure cell
      const cellHeight = (this.canvas.height - this.padding * 2) / (linesNum);

      this.context.strokeStyle = '#dddddd';
      this.context.lineWidth = 1;
      this.context.font = '16px sans-serif';
      this.context.fillStyle = '#777777';

      let currentY = this.padding;

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

    private drawPoints() {
      // Width of single chart cell
      const cellWidth = (this.canvas.width - this.padding * 2) / (this.signals.length - 1);

      console.log('Min value:', this.min);
      console.log('Max value:', this.max);
      console.log('Canvas height: ', this.canvas.height);

      this.context.strokeStyle = '#e74c3c';
      this.context.lineWidth = 3;
      this.context.lineCap = 'butt';
      this.context.lineJoin = 'bevel';

      // Current X position
      let currentX = this.padding;

      this.context.beginPath();

      const currentY = (val: number): number => {
        switch (val) {
          case this.min:
            return this.canvas.height - this.padding;
          case this.max:
            return this.padding;
          default:
            return this.canvas.height - this.canvas.height * val / this.max;
        }
      };

      this.signals.forEach((signal: Signal) => {
        this.context.lineTo(currentX, currentY(signal.val));
        this.context.stroke();
        currentX += cellWidth;
      })
    }
  }
</script>

<style scoped lang="scss">
  .chart {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      margin: .25rem;
      width: 80%;

      &.chart-placeholder {
        height: 50vh;

        #chart {
          /*width: 100%;*/
          /*height: 100%;*/
          border: 1px solid #dddddd;
          border-top: none;
          /*border-bottom: none;*/
        }
      }

      &.chart-legend {
        padding: 1rem;
        border: 1px solid rgba(0,0,0,.25);
      }
    }
  }
</style>