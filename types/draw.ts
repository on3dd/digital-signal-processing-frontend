import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Draw extends Vue {
  protected canvas!: HTMLCanvasElement;
  protected context!: CanvasRenderingContext2D;
  protected canvasPlaceholder!: HTMLElement;

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