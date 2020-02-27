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

  protected padding = 0;
  protected withCircles = false;

  // Width of single chart cell
  protected get cellWidth(): number {
    return (this.canvas.width - this.padding * 2) / (this.signals.length - 1);
  }

  protected currentY(val: number): number {
    switch (val) {
      case this.min:
        return this.canvas.height - this.padding;
      case this.max:
        return this.padding;
      default:
        return this.canvas.height - this.canvas.height * val / this.max;
    }
  }

  async created() {
    await this.fetchSignals();
    // console.log('Signals:', this.signals);

    this.min = Math.min(...this.signals.map(el => el.val));
    this.max = Math.max(...this.signals.map(el => el.val));

    this.init();
    // this.drawPoints();
  }

  protected init() {
    const canvas = document.getElementById(this.id) as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;

    this.canvas = canvas;
    this.context = context;
    this.canvasPlaceholder = document.getElementsByClassName(this.parent)[0] as HTMLElement;

    this.resize();
    window.addEventListener("resize", this.resize);
  }

  protected resize() {
    this.canvas.width = this.canvasPlaceholder.offsetWidth;
    this.canvas.height = this.canvasPlaceholder.offsetHeight;

    this.drawPoints();
  }

  protected drawPoints() {
    this.context.strokeStyle = '#e74c3c';
    this.context.lineWidth = 3;
    this.context.lineCap = 'butt';
    this.context.lineJoin = 'bevel';

    // Current X position
    let currentX = this.padding;

    this.context.beginPath();

    this.signals.forEach((signal: Signal) => {
      this.context.lineTo(currentX, this.currentY(signal.val));
      this.context.stroke();
      currentX += this.cellWidth;
    })
  }

  protected circle(centerX: number, centerY: number, radius: number, color: string) {
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = '#ffffff';
    this.context.fill();
    this.context.lineWidth = 3;
    this.context.strokeStyle = '#e74c3c';
    this.context.stroke();
  }
}