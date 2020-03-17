<template>
  <div class="tg-chart">
    <Tooltip :options="{
        ...tooltipData,
        name: childrenNames.tooltip,
        theme,
      }" ref="tooltip"/>
    <DetailChart :options="{
        name: childrenNames.detail,
        width: w,
        height: h,
        data: data,
        animationSpeed: animationSpeed,
        theme
      }" ref="detail"/>
    <SliderChart :options="{
        name: childrenNames.slider,
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
  import DetailChart from "@/components/charts/DetailChart.vue";
  import SliderChart from "@/components/charts/SliderChart.vue";
  import Tooltip from '@/components/Tooltip.vue';
  import Options, {TooltipOptions} from "../../types/options";
  import {TransformedData} from "@/types/data";
  import Theme from "@/types/theme";
  import Label from '@/types/label';
  import themes from "@/themes";
  import {css} from "@/utils";
  import ChildrenNames from "@/types/children-names";

  @Component({
    components: {
      Tooltip,
      DetailChart,
      SliderChart,
    }
  })
  export default class DSPChart extends Vue {
    @Prop({type: Object, required: true}) options!: Options;

    protected data!: TransformedData;
    protected theme!: Theme;
    protected wrap!: HTMLElement;
    protected w!: number;
    protected h!: number;
    protected animationSpeed!: number;
    protected activeLabels!: string[];

    protected prevState!: {
      left?: number;
      right?: number;
      labelsLength?: number;
    };

    protected childrenNames!: ChildrenNames;
    protected tooltipData!: TooltipOptions;

    public $refs!: Vue['$refs'] & {
      // FIXME: Fix types
      tooltip: Tooltip & any;
      detail: DetailChart & any;
      slider: SliderChart & any;
      labels: Label & HTMLElement;
    };

    created() {
      console.log('DSPChart created');

      this.data = this.options.data!;
      this.theme = this.options.theme || themes.day;
      this.w = this.options.width || 500;
      this.h = this.options.height || 300;
      this.animationSpeed = this.options.animationSpeed || 15;

      this.childrenNames = this.options.childrenNames!;

      this.tooltipData = {
        top: 0,
        left: 0,
        data: {
          title: '',
          items: [],
        },
      };

      console.log("DSPChart size:", this.w, this.h);
    }

    mounted() {
      console.log('DSPChart mounted');

      this.wrap = document.querySelector('.tg-chart') as HTMLElement;

      console.log("$refs:", this.$refs);

      this.prepare();
      this.init();
    }

    prepare() {
      this.labelClickHandler = this.labelClickHandler.bind(this);
      this.updateChart = this.updateChart.bind(this);

      this.activeLabels = this.data.datasets!.map(set => set.name);
      this.prevState = {};
    }

    init() {
      document.body.classList.add('tg-chart-preload');
      this.$refs.labels.addEventListener('click', this.labelClickHandler as unknown as EventListener);

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
      console.log("DSPChart updateTheme fired");
      this.$refs.slider.updateTheme(this.theme);
      this.$refs.tooltip.updateTheme(this.theme);
      this.$refs.detail.updateTheme(this.theme);
      this.$refs.labels.querySelectorAll('.tg-chart-checkbox').forEach(($label) => {
        css($label as HTMLElement, {
          color: this.theme.checkboxColor,
          borderColor: this.theme.checkboxBorder
        })
      })
    }

    renderLabels() {
      const labels = this.data.datasets!.map(set => new Label(set).toHtml()).join(' ');
      this.$refs.labels.insertAdjacentHTML('afterbegin', labels);
    }

    updateChart() {
      // console.log("updateChart fired");
      if (this.shouldChartUpdate()) {
        const [left, right] = this.$refs.slider.position();

        this.prevState = {left, right, labelsLength: this.activeLabels.length};

        this.$refs.detail.updatePosition({left, right});
      }
    }

    labelClickHandler({target}: {target: HTMLInputElement}): void {
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
  }
</script>