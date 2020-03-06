<template>
  <div class="tg-chart">
    <Tooltip :options="{
        left: 0,
        right: 0,
        theme
      }" ref="tooltip"/>
    <DetailChart :options="{
        name: 'chart',
        width: w,
        height: h,
        // tooltip: tooltip,
        data: data,
        animationSpeed: animationSpeed,
        theme
      }" ref="detail"/>
    <SliderChart :options="{
        name: 'slider-chart',
        width: w,
        height: 40,
        data: data,
        onUpdate: updateChart,
        theme
    }" ref="slider"/>
    <div ref="labels"></div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import DetailChart from "@/components/DetailChart.vue";
  import SliderChart from "@/components/SliderChart.vue";
  import Tooltip from '@/components/Tooltip.vue';
  import Options from "../types/options";
  import {TransformedData} from "@/types/data";
  import Theme from "@/types/theme";
  import Label from '@/types/label';
  import themes from "@/themes";
  import {css} from "@/utils";

  @Component({
    components: {
      Tooltip,
      DetailChart,
      SliderChart,
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
    // protected tooltip!: Tooltip;
    protected prevState!: { left?: number; right?: number; labelsLength?: number };

    // private isRendered = false;

    public $refs!: Vue['$refs'] & {
      // TODO: Fix types
      tooltip: Tooltip;
      detail: DetailChart;
      slider: SliderChart;
      labels: Label;
    };

    created() {
      console.log('TelegramChart created');

      this.data = this.options.data!;
      this.theme = this.options.theme || themes.day;
      this.w = this.options.width || 500;
      this.h = this.options.height || 300;
      this.animationSpeed = this.options.animationSpeed || 15;

      console.log("TelegramChart size:", this.w, this.h);
    }

    mounted() {
      console.log('TelegramChart mounted');

      this.wrap = document.querySelector('.tg-chart') as HTMLElement;
      // console.log(this.wrap);

      console.log("$refs:", this.$refs);

      this.prepare();
      this.init();

      // this.isRendered = true;
    }

    prepare() {
      this.labelClickHandler = this.labelClickHandler.bind(this);
      this.updateChart = this.updateChart.bind(this);

      this.activeLabels = this.data.datasets!.map(set => set.name);
      this.prevState = {};
    }

    init() {
      document.body.classList.add('tg-chart-preload');
      this.$refs.labels.addEventListener('click', this.labelClickHandler);

      this.updateTheme();
      this.updateChart();
      this.renderLabels();

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
      console.log("TelegramChart updateTheme fired");
      this.$refs.slider.updateTheme(this.theme);
      this.$refs.tooltip.updateTheme(this.theme);
      this.$refs.detail.updateTheme(this.theme);
      this.$refs.labels.querySelectorAll('.tg-chart-checkbox').forEach(($label: HTMLElement) => {
        css($label, {
          color: this.theme.checkboxColor,
          borderColor: this.theme.checkboxBorder
        })
      })
    }

    renderLabels() {
      const labels = this.data.datasets!.map(set => new Label(set).toHtml()).join(' ');
      console.log("labels:", labels);
      this.$refs.labels.insertAdjacentHTML('afterbegin', labels);
    }

    updateChart() {
      // console.log("updateChart fired");
      if (this.shouldChartUpdate()) {
        const [left, right] = this.$refs.slider.position();

        this.prevState = {left, right, labelsLength: this.activeLabels.length};
        // console.log("prevState:", this.prevState);

        this.$refs.detail.updatePosition({left, right});
      }
    }

    labelClickHandler({target}: { target: HTMLElement & HTMLInputElement }) {
      console.log("labelClickHandler fired");
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

      if (this.shouldChartUpdate()) {
        console.log("shouldChartUpdate = true");
        this.prevState.labelsLength = this.activeLabels.length;

        this.$refs.slider.update(this.getData());
        this.$refs.detail.update({type, name: target.value, labels: this.activeLabels});
      }
    }

    shouldChartUpdate() {
      const [left, right] = this.$refs.slider.position();
      // console.log("shouldChartUpdate, left:", left, "right:", right);
      return this.prevState.left !== left
          || this.prevState.right !== right
          || this.prevState.labelsLength !== this.activeLabels.length
    }

    getData() {
      console.log("getData fired");
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