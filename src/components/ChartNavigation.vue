<template>
  <section class="chart chart-navigation">
    <div :class="parent">
      <canvas :id="id"></canvas>
      <div class="navigation">
        <div class="control control-left">
          <div class="arrow arrow-left"/>
        </div>
        <div class="zoom-window"/>
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
  export default class ChartNavigation extends Chart {
    protected left!: HTMLElement;
    protected zoom!: HTMLElement;
    protected right!: HTMLElement;

    protected get zoomWidth(): number {
      return Math.round(this.dpiW * 3 / 10);
    }

    protected init() {
      // console.log("Init fired");

      const canvas = document.getElementById(this.id) as HTMLCanvasElement;
      const context = canvas.getContext("2d")!;

      this.canvas = canvas;
      this.context = context;
      this.canvasPlaceholder = document.getElementsByClassName(this.parent)[0] as HTMLElement;

      this.left = document.getElementsByClassName('control-left')[0] as HTMLElement;
      this.zoom = document.getElementsByClassName('zoom-window')[0] as HTMLElement;
      this.right = document.getElementsByClassName('control-right')[0] as HTMLElement;

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

      console.log("DPI:", this.dpiH, this.dpiW);
      console.log("View:", this.viewH, this.viewW);

      this.computeRatio();
      this.drawPoints();
      this.setZoomPosition(this.canvas.width - this.zoomWidth, 0);
    }

    setZoomPosition(left: number, right: number) {
      if (
          left <= 0 ||
          right < 0 ||
          (left + this.zoomWidth) > this.dpiW ||
          this.zoomWidth <= 10
      ) {
        return
      }

      console.log("Zoom:", this.zoomWidth);
      console.log("Left:", left);
      console.log("Right:", right);
      console.log(this.left);
      console.log(this.zoom);
      console.log(this.right);

      this.zoom.style.width = `${this.zoomWidth}px`
      this.zoom.style.left = `${left}px`
      this.zoom.style.right = `${right}px`

      this.left.style.width = `${left}px`
      this.right.style.width = `${right}px`
    }
  }
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
        position: relative;

        &.control {
          /*display: flex;*/
          position: absolute;
          background: rgba(0, 0, 0, .05);

          &-left {
            left: 0;
          }

          &-right {
            right: 5px;
          }

          .arrow {
            position: absolute;
            width: 5px;
            cursor: w-resize;
            background: rgba(0, 0, 0, .05);

            &-left {
              right: 0;
            }

            &-right {
              left: 0;
            }
          }
        }

        &.zoom-window {
          width: 25%;
          min-width: 5%;
        }
      }
    }
  }
</style>