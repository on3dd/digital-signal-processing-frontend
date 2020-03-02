import {Component, Prop, Vue} from 'vue-property-decorator';
import {Getter, Action} from 'vuex-class'

import Draw from "./draw";
import {Signal} from "@/../types/signals";

@Component
export default class Chart extends Draw {
  @Prop({required: true}) id!: string;
  @Prop({required: true}) parent!: string;

  @Action fetchSignals!: () => void;
  @Getter signals!: Signal[];

  // Min and max values in input array
  protected min!: number;
  protected max!: number;

  protected dpiW!: number;
  protected dpiH!: number;

  protected viewW!: number;
  protected viewH!: number;

  protected xRatio!: number;
  protected yRatio!: number;

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
    // console.log("Created fired");
    await this.fetchSignals();
    // console.log("Fetched data:", this.signals);

    this.min = Math.min(...this.signals.map(el => el.val));
    this.max = Math.max(...this.signals.map(el => el.val));

    this.init();
    // this.drawPoints();
  }

  protected init() {
    // console.log("Init fired");

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

    this.dpiW = this.canvas.width * 2;
    this.dpiH = this.canvas.height * 2;

    this.viewW = this.canvas.width;
    this.viewH = this.canvas.height;

    console.log("DPI:", this.dpiH, this.dpiW);
    console.log("View:", this.viewH, this.viewW);

    this.computeRatio();
    this.drawPoints();
  }

  protected computeRatio() {
    this.xRatio = this.viewW / (this.signals.length - 2);
    this.yRatio = (this.max - this.min) / this.viewH;
  }

  protected drawPoints() {
    const data = this.getCoordinates();

    this.context.strokeStyle = '#e74c3c';
    this.context.lineWidth = 3;
    this.context.lineCap = 'butt';
    this.context.lineJoin = 'bevel';

    // Current X position
    // let currentX = this.padding;

    this.context.beginPath();

    // this.signals.forEach((signal: Signal) => {
    //   this.context.lineTo(currentX, this.currentY(signal.val));
    //   this.context.stroke();
    //   currentX += this.cellWidth;
    // });

    data.forEach(([x, y]) => this.context.lineTo(x, y));

    this.context.stroke();
    this.context.closePath();
  }

  protected getCoordinates() {
    return this.signals.map((signal: Signal, index) => {
      const y = this.viewH - ((signal.val - this.min) / this.yRatio);
      const x = index * this.xRatio - (this.xRatio / 2);

      return [x, y];
    })
  }
}