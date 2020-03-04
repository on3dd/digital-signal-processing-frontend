<template>
  <div class="tg-chart">
    <div v-if="isRendered">
      <Tooltip :options="{left: 0, right: 0, theme}"/>
      <DetailChart :options="{
        // el: this.$detail,
        width: w,
        height: h,
        // tooltip: tooltip,
        data: data,
        animationSpeed: animationSpeed,
        theme
      }"/>
      <SliderChart :options="{
        // el: this.$slider,
        width: this.w,
        data: this.data,
        onUpdate: updateChart,
        theme: this.theme,
        height: 40
    }"/>
      <div data-el="labels"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import DetailChart from "../components/DetailChart.vue";
  import SliderChart from "../components/SliderChart.vue";
  import Options from "../types/options";
  import themes from "@/themes";
  import {DataItem, TransformedData} from "@/types/data";
  import Theme from "@/types/theme";
  import Tooltip from '@/components/Tooltip.vue';
  import {css} from "@/utils";
  import Label from '@/types/label';

  @Component({
    components: {
      DetailChart,
      SliderChart,
      Tooltip
    }
  })
  export default class TelegramChart extends Vue {
    @Prop({type: Object, required: true}) options!: Options;

    protected data!: TransformedData;
    protected theme!: Theme;
    protected wrap!: HTMLElement;
    protected w!: number;
    protected h!: number;
    protected animationSpeed!: number;
    protected activeLabels!: string[];
    protected tooltip!: Tooltip;
    protected prevState!: { left?: number; right?: number; labelsLength?: number };

    private isRendered = false;

    protected $detail!: HTMLElement;
    protected $slider!: HTMLElement;
    protected $labels!: HTMLElement;

    created() {
      console.log('TelegramChart created');

      this.data = this.options.data!;
      this.theme = this.options.theme || themes.day;
      this.w = this.options.width || 500;
      this.h = this.options.height || 300;
      this.animationSpeed = this.options.animationSpeed || 15;
    }

    mounted() {
      console.log('TelegramChart mounted');

      this.wrap = document.querySelector('.tg-chart') as HTMLElement;
      console.log(this.wrap);

      this.prepare();
      this.init();

      this.isRendered = true;
    }

    prepare() {
      this.labelClickHandler = this.labelClickHandler.bind(this);
      // this.updateChart = this.updateChart.bind(this);

      this.activeLabels = this.data.datasets!.map(set => set.name);
      // this.tooltip = new Tooltip([wrap.querySelector('[data-el=tooltip]'), this.theme]);
      this.prevState = {};

      // this.$detail = this.wrap.querySelector('[data-el=detail]')! as HTMLElement;
      // this.$slider = this.wrap.querySelector('[data-el=slider]')! as HTMLElement;
      // this.$labels = this.wrap.querySelector('[data-el=labels]')! as HTMLElement;

      console.log(this.$detail);
      console.log(this.$slider);
      console.log(this.$labels);
    }

    init() {
      document.body.classList.add('tg-chart-preload');
      // this.$labels.addEventListener('click', this.labelClickHandler);

      // this.slider = new SliderChart({
      //   el: this.$slider,
      //   width: this.w,
      //   data: this.data,
      //   onUpdate: this.updateChart,
      //   theme: this.theme,
      //   height: 40
      // });

      // this.chart = new DetailChart({
      //   el: this.$detail,
      //   width: this.w,
      //   height: this.h,
      //   tooltip: this.tooltip,
      //   data: this.data,
      //   animationSpeed: this.animationSpeed,
      //   theme: this.theme
      // });

      // this.updateTheme();
      // this.updateChart();
      // this.renderLabels();

      // Preventing initial css animations
      setTimeout(() => {
        document.body.classList.remove('tg-chart-preload')
      }, 500)
    }

    setTheme(theme: Theme) {
      this.theme = theme;
      this.updateTheme();
    }

    updateTheme() {
      // this.slider.updateTheme(this.theme)
      // this.tooltip.updateTheme(this.theme)
      // this.chart.updateTheme(this.theme)
      // this.$labels.querySelectorAll('.tg-chart-checkbox').forEach($label => {
      //   css($label as HTMLElement, {
      //     color: this.theme.checkboxColor,
      //     borderColor: this.theme.checkboxBorder
      //   })
      // })
    }

    // renderLabels() {
    //   const labels = this.data.datasets!.map(set => new Label(set).toHtml()).join(' ');
    //   this.$labels.insertAdjacentHTML('afterbegin', labels);
    // }

    // updateChart() {
    //   if (this.shouldChartUpdate()) {
    //     const [left, right] = this.slider.position;
    //     this.prevState = {left, right, labelsLength: this.activeLabels.length};
    //     this.chart.updatePosition({left, right});
    //   }
    // }

    labelClickHandler({target}: { target: HTMLElement }) {
      if (target.tagName.toLowerCase() !== 'input') {
        return
      }

      let type = '';
      if (target.checked) {
        type = 'added';
        this.activeLabels.push(target.value)
      } else if (this.activeLabels.length > 1) {
        type = 'removed';
        this.activeLabels = this.activeLabels.filter(l => l !== target.value);
      } else {
        target.checked = !target.checked;
      }

      // if (this.shouldChartUpdate()) {
      //   this.prevState.labelsLength = this.activeLabels.length;
      //
      //   this.slider.update(this.getData());
      //   this.chart.update({type, name: target.value, labels: this.activeLabels});
      // }
    }

    // shouldChartUpdate() {
    //   const [left, right] = this.slider.position;
    //   return this.prevState.left !== left
    //       || this.prevState.right !== right
    //       || this.prevState.labelsLength !== this.activeLabels.length
    // }

    getData() {
      return {
        datasets: this.data.datasets!.filter(set => this.activeLabels.includes(set.name)),
        labels: this.data.labels!.concat()
      }
    }

    // destroy() {
    //   this.$labels.removeEventListener('click', this.labelClickHandler)
    //   this.chart.destroy()
    //   this.slider.destroy()
    //   document.body.classList.remove('tg-chart-preload')
    //   this.$el.innerHTML = ''
    // }
  }
</script>

<style scoped>

</style>