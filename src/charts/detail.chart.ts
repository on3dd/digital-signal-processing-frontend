import {Component, Prop} from "vue-property-decorator";
import BaseChart from "@/charts/base.chart";
import {computeDy, computeRatio, getBoundary, getCoordinates} from "@/utils";
import Lines from "@/types/lines";
import Pos from "@/types/pos";
import {UpdateOptions} from "@/types/options";
import Theme from "@/types/theme";

@Component
export default class DetailChart extends BaseChart {
  lines!: Lines;
  margin!: number;
  activeLabels!: string[];
  pos!: { left: number; right: number };
  max!: number | null;
  dy!: number | null;

  protected proxy!: object;

  prepare() {
    super.prepare();
    this.lines = {};
    this.margin = 40;
    this.viewH = this.dpiH - this.margin * 2;
    this.activeLabels = this.data.datasets!.map(s => s.name);
    this.data.datasets!.forEach(set => {
      this.lines[set.name] = {opacity: 1, step: 0}
    });

    this.pos = {left: 0, right: 0};
    this.max = null;
    this.dy = null;

    // For optimization
    this.proxy = new Proxy(this, {
      set: (...options) => {
        const result = Reflect.set(...options);
        this.raf = requestAnimationFrame(this.render);
        return result
      }
    });

    this.render = this.render.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  init() {
    this.$el.addEventListener('mousemove', this.mouseMoveHandler, true);
    this.$el.addEventListener('mouseleave', this.mouseLeaveHandler);
  }

  get datasets() {
    const length = this.data.labels!.length;
    const leftIndex = Math.round(length * this.pos.left / 100);
    const rightIndex = Math.round(length * this.pos.right / 100);

    const datasets = this.data.datasets!
        .filter(set => this.activeLabels.includes(set.name))
        .map(set => ({
          ...set,
          data: set.data.slice(leftIndex, rightIndex)
        }));

    return {
      length: datasets[0].data.length,
      value: datasets
    }
  }

  get translateX(): number {
    return -1 * Math.round(this.data.labels!.length * this.xRatio * this.pos.left / 100)
  }

  get delta(): number {
    return Math.round(this.max! - this.yMax)
  }

  updatePosition(pos: Pos) {
    // this.proxy.pos = pos
    this.pos = pos;
  }

  update({type, name, labels}: UpdateOptions) {
    if (type === 'removed') {
      this.lines[name] = {
        opacity: 1,
        step: -1 / this.animationSpeed
      }
    } else if (type === 'added') {
      this.lines[name] = {
        opacity: 0,
        step: 1 / this.animationSpeed
      }
    }

    // this.proxy.activeLabels = labels
    this.activeLabels = labels;
  }

  setup() {
    const [min, max] = getBoundary(this.datasets.value);
    this.updateMaxAndDelta(max, min);

    const [xRatio, yRatio] = computeRatio({
      pos: this.pos,
      viewH: this.viewH,
      viewW: this.viewW,
      length: this.data.labels!.length,
      delta: this.max! - min
    });

    this.yMin = min;
    this.yMax = max;

    this.xRatio = xRatio;
    this.yRatio = yRatio;
  }

  updateMaxAndDelta(max: number, min: number) {
    if (!this.max) {
      this.max = max
    }

    if (!this.dy && this.max !== max) {
      this.dy = computeDy({max, min, oldMax: this.max, speed: this.animationSpeed})
    }

    if (this.dy! > 0) {
      this.max += this.dy!;
      if (this.max > max) {
        this.max = max;
        this.dy = null;
      }
    } else if (this.dy! < 0) {
      this.max += this.dy!;
      if (this.max < max) {
        this.max = max;
        this.dy = null;
      }
    }
  }

  shouldAnimate() {
    const isTransitionFinished = Object
        .keys(this.lines)
        .map(k => this.lines[k].step)
        .every(l => l === 0);

    return this.dy || !isTransitionFinished || this.delta;
  }

  updateTheme(theme: Theme) {
    this.draw.theme = theme;
    this.raf = requestAnimationFrame(this.render);
  }

  render() {
    this.clear();
    this.setup();

    if (this.shouldAnimate()) {
      this.raf = requestAnimationFrame(this.render)
    }

    this.draw.yAxis({
      dpiW: this.dpiW,
      viewH: this.viewH,
      delta: this.delta,
      yMax: this.yMax,
      yMin: this.yMin,
      margin: this.margin,
      rowsCount: 5
    });

    this.draw.xAxis({
      data: this.data,
      visibleItemsLength: this.datasets.length,
      datasets: this.data.datasets!.filter(set => this.activeLabels.includes(set.name)),
      dpiW: this.dpiW,
      dpiH: this.dpiH,
      xRatio: this.xRatio,
      mouse: this.mouse,
      margin: this.margin,
      translateX: this.translateX
    });

    this.data.datasets!.forEach(({data, color, name}) => {
      if (this.shouldSkipLine(name)) {
        return
      }

      const coords = getCoordinates({
        yMin: this.yMin,
        viewH: this.viewH,
        xRatio: this.xRatio,
        yRatio: this.yRatio,
        margin: this.margin,
        data
      });

      this.updateOpacityFor(name);

      this.draw.line({
        coords, color,
        translateX: this.translateX,
        mouse: this.mouse,
        dpiW: this.dpiW,
        opacity: this.lines[name].opacity,
        visibleItemsCount: this.datasets.length,
        withCircles: true
      });
    })
  }

  shouldSkipLine(name: string) {
    return this.lines[name].opacity <= 0 && this.lines[name].step === 0;
  }

  updateOpacityFor(name: string) {
    if (this.lines[name].step !== 0) {
      this.lines[name].opacity += this.lines[name].step;

      if (this.lines[name].opacity >= 1 || this.lines[name].opacity <= 0) {
        this.lines[name].step = 0;
      }
    }
  }

  mouseLeaveHandler() {
    // this.proxy.mouse = null;
    this.mouse = null;
    this.tooltip.hide();
  }

  mouseMoveHandler({clientX, clientY}: { clientX: number; clientY: number }) {
    const {left, top} = this.$el.getBoundingClientRect();
    // this.proxy.mouse = {
    //   x: (clientX - left) * 2,
    //   tooltip: {
    //     top: clientY - top,
    //     left:  clientX - left
    //   }
    // }
    this.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        top: clientY - top,
        left: clientX - left
      }
    }
  }

  destroy() {
    super.destroy();
    this.$el.removeEventListener('mousemove', this.mouseMoveHandler);
    this.$el.removeEventListener('mouseleave', this.mouseLeaveHandler);
  }
}