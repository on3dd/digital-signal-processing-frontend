<template>
  <section class="chart">
    <div :class="parent">
      <canvas :id="id"></canvas>
      <ChartElementDetails :isReady="isReady"/>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import {Getter, Mutation} from 'vuex-class'

  import ChartElementDetails from "@/components/ChartElementDetails.vue";

  import Chart from "../../types/chart";
  import MouseCoordinates from "../../types/mouseCoordinates";

  @Component({
    components: {
      ChartElementDetails
    }
  })
  export default class ChartComponent extends Chart {
    @Getter signalValByIdx!: (idx: number) => number;
    @Mutation updateIdx!: (idx: number) => void;
    @Mutation updateCoordinates!: (coordinates: MouseCoordinates) => void;
    @Mutation updateVisibility!: (isVisible: boolean) => void;

    protected readonly linesNum = 5;
    protected isReady = false;

    protected init() {
      const canvas = document.getElementById(this.id) as HTMLCanvasElement;
      const context = canvas.getContext("2d")!;

      // canvas.addEventListener("mouseover", this.mouseOverHandler);
      // canvas.addEventListener("mousemove", this.mouseMoveHandler);
      // canvas.addEventListener("mouseout", this.mouseOutHandler);

      this.canvas = canvas;
      this.context = context;
      this.canvasPlaceholder = document.getElementsByClassName(this.parent)[0] as HTMLElement;
      this.isReady = true;

      this.resize();
      window.addEventListener("resize", this.resize);
    }

    protected resize() {
      this.canvas.width = this.canvasPlaceholder.offsetWidth;
      this.canvas.height = this.canvasPlaceholder.offsetHeight;

      this.dpiW = this.canvas.width * 2;
      this.dpiH = this.canvas.height * 2;

      this.viewW = this.canvas.width;
      this.viewH = this.canvas.height;

      this.computeRatio();
      this.redraw();
    }

    protected redraw(idx?: number, mouseover?: boolean) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawVerticalMeasures();
      this.drawPoints();
      if (mouseover) {
        this.drawHoveredElement(idx!)
      }
    }

    // Draw measures for Y axis
    protected drawVerticalMeasures() {
      let currentY = this.cellHeight;

      this.context.strokeStyle = '#dddddd';
      this.context.lineWidth = 1;
      this.context.font = '16px Helvetica, sans-serif';
      this.context.fillStyle = '#96a2aa';

      this.context.beginPath();

      for (let i = 0; i <= this.linesNum; i++) {
        const text = Math.round((this.viewH - currentY) * this.yRatio);
        this.context.fillText(text.toString(), 5, currentY - 10);
        this.context.moveTo(0, currentY);

        this.context.lineTo(this.dpiW, currentY);
        this.context.stroke();

        currentY += this.cellHeight;
      }
    }

    protected drawHoveredElement(idx: number) {
      const currentX = idx * this.cellWidth;

      this.context.strokeStyle = '#dddddd';
      this.context.lineWidth = 2;

      this.context.beginPath();
      this.context.moveTo(currentX, 0);

      this.context.lineTo(currentX, this.canvas.height);
      this.context.stroke();

      this.circle(currentX, this.currentY(this.signalValByIdx(idx)), 10, '#e74c3c');
    }

    protected getMousePosition(e: MouseEvent): MouseCoordinates {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    protected mouseOverHandler(): void {
      this.updateVisibility(true);
    }

    protected mouseMoveHandler(e: MouseEvent): void {
      const coordinates = this.getMousePosition(e);
      const idx = Math.round(coordinates.x / this.cellWidth);

      // console.log(coordinates)
      this.redraw(idx, true);

      this.updateIdx(idx);
      this.updateCoordinates(coordinates);
    }

    protected mouseOutHandler(): void {
      this.updateVisibility(false);
      this.redraw();
    }

    // Height of single measure cell
    protected get cellHeight(): number {
      return (this.viewH - this.padding * 2) / (this.linesNum)
    }
  }
</script>

<style scoped lang="scss">
  .chart-placeholder {
    position: relative;
    height: 40vh;
    border: 1px solid #dddddd;
  }
</style>