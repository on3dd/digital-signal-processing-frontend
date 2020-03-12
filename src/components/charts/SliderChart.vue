<template>
  <div class="tg-chart-slider">
    <canvas id="slider-chart"></canvas>
    <div data-el="left" class="tg-chart-slider__left">
      <div class="tg-chart-slider__arrow--left" data-el="arrow" data-type="left"></div>
    </div>

    <div data-el="window" data-type="window" class="tg-chart-slider__window"></div>

    <div data-el="right" class="tg-chart-slider__right">
      <div class="tg-chart-slider__arrow--right" data-el="arrow" data-type="right"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import BaseChart from "@/charts/base.chart";
  import Theme from "@/types/theme";
  import {TransformedData} from "@/types/data";
  import {css} from "@/utils";
  import Draw from "@/draw";
  import DSPChart from "@/components/charts/DSPChart.vue";

  @Component
  export default class SliderChart extends BaseChart {
    protected $wrap!: HTMLElement;
    protected $left!: HTMLElement;
    protected $window!: HTMLElement;
    protected $right!: HTMLElement;

    // FIXME: Fix types
    public $parent!: any;

    // created() {
    //   super.created();
    // }

    prepare() {
      this.renderFunc = this.renderFunc.bind(this);

      this.$wrap = this.$el.parentElement!;
      this.mouseDownHandler = this.mouseDownHandler.bind(this);
      this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    init() {
      this.$left = this.$wrap.querySelector('[data-el=left]')! as HTMLElement;
      this.$window = this.$wrap.querySelector('[data-el=window]')! as HTMLElement;
      this.$right = this.$wrap.querySelector('[data-el=right]')! as HTMLElement;

      this.$wrap.addEventListener('mousedown', this.mouseDownHandler);
      document.addEventListener('mouseup', this.mouseUpHandler);

      const defaultWidth = this.w * 0.3; // 30% by default
      this.setPosition(0, this.w - defaultWidth);
    }

    updateTheme(theme: Theme) {
      // console.log("SliderChart updateTheme fired");
      css(this.$left, {background: theme.sliderBackground});
      css(this.$right, {background: theme.sliderBackground});
      css(this.$right.querySelector('[data-el=arrow]')! as HTMLElement, {background: theme.sliderArrow});
      css(this.$left.querySelector('[data-el=arrow]')! as HTMLElement, {background: theme.sliderArrow});
    }

    update(data: TransformedData) {
      this.data = data;
      console.log("SliderChart update fired, data:", this.data);
      this.renderFunc();
    }

    mouseDownHandler(event: any) {
      const {type} = event.target!.dataset;
      const dimension = {
        left: parseInt(this.$window.style.left),
        right: parseInt(this.$window.style.right),
        width: parseInt(this.$window.style.width)
      };

      if (type === 'window') {
        const startX = event.pageX;
        document.onmousemove = e => {
          const delta = startX - e.pageX;
          if (delta === 0) {
            return
          }

          const left = dimension.left - delta;
          const right = this.w - left - dimension.width;

          this.setPosition(left, right);
          // this.trigger();
          this.$parent.updateChart();
        }
      } else if (type === 'left' || type === 'right') {
        const zoomWidth = dimension.width;
        const startX = event.pageX;

        document.onmousemove = e => {
          const delta = startX - e.pageX;
          if (delta === 0) {
            return
          }

          if (type === 'left') {
            const left = this.w - (zoomWidth + delta) - dimension.right;
            const right = this.w - (zoomWidth + delta) - left;
            this.setPosition(left, right);
          } else {
            const right = this.w - (zoomWidth - delta) - dimension.left;
            this.setPosition(dimension.left, right);
          }

          // this.trigger();
          this.$parent.updateChart();
        }
      }
    }

    setPosition(left: number, right: number) {
      const width = this.w - right - left;
      const minWidth = this.w * 0.05; // 5% of full width

      if (width < minWidth) {
        this.$window.style.width = `${minWidth}px`;
        return
      }

      if (left < 0) {
        this.$window.style.left = `0px`;
        this.$left.style.width = `0px`;
        return
      }

      if (right < 0) {
        this.$window.style.right = `0px`;
        this.$right.style.width = `0px`;
        return
      }

      this.$window.style.width = `${width}px`;
      this.$window.style.left = `${left}px`;
      this.$window.style.right = `${right}px`;

      this.$left.style.width = `${left}px`;
      this.$right.style.width = `${right}px`;
    }

    position(): number[] {
      const leftPx = parseInt(this.$left.style.width);
      const rightPx = this.w - parseInt(this.$right.style.width);

      return [
        leftPx * 100 / this.w,
        rightPx * 100 / this.w
      ]
    }

    mouseUpHandler() {
      document.onmousemove = null;
    }
  }
</script>

<style scoped>

</style>