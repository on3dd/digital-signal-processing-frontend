import {Component, Prop, Vue} from 'vue-property-decorator';
import {Getter, Action} from 'vuex-class'

import {Signal} from "@/../types/signals";

@Component
export default class Chart extends Vue {
  @Prop({required: true}) id!: string;
  @Prop({required: true}) parent!: string;

  @Action fetchSignals!: () => void;
  @Getter signals!: Signal[];

  protected canvas!: HTMLCanvasElement;
  protected context!: CanvasRenderingContext2D;
  protected canvasPlaceholder!: HTMLElement;

  // Min and max values in input array
  protected min!: number;
  protected max!: number;

  protected paddingX = 0;
  protected paddingY = 0;

  async created() {
    await this.fetchSignals();
    console.log('Signals:', this.signals);

    this.min = Math.min(...this.signals.map(el => el.val));
    this.max = Math.max(...this.signals.map(el => el.val));

    this.init();
    // this.drawPoints();
  }

  protected init() {
    const canvas = document.getElementById(this.id) as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;

    this.canvasPlaceholder = document.getElementsByClassName(this.parent)[0] as HTMLElement;
    window.addEventListener("resize", this.resize);

    this.canvas = canvas;
    this.context = context;

    this.resize();
  }

  protected resize() {
    this.canvas.width = this.canvasPlaceholder.offsetWidth;
    this.canvas.height = this.canvasPlaceholder.offsetHeight;

    // this.drawMeasures();
    this.drawPoints();
  }

  protected drawPoints() {
    // Width of single chart cell
    const cellWidth = (this.canvas.width - this.paddingX * 2) / (this.signals.length - 1);

    console.log('Min value:', this.min);
    console.log('Max value:', this.max);
    console.log('Canvas height: ', this.canvas.height);

    this.context.strokeStyle = '#e74c3c';
    this.context.lineWidth = 3;
    this.context.lineCap = 'butt';
    this.context.lineJoin = 'bevel';

    // Current X position
    let currentX = this.paddingX;

    this.context.beginPath();

    const currentY = (val: number): number => {
      switch (val) {
        case this.min:
          return this.canvas.height - this.paddingY;
        case this.max:
          return this.paddingY;
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