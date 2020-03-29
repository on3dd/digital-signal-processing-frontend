import {Component, Prop, Vue} from 'vue-property-decorator';
import {computeRatio, css, getBoundary, getCoordinates, noop} from '@/utils'
import Draw from '@/draw'
import Options from "@/types/options";
import {TransformedData} from "@/types/data";
import Mouse from "@/types/mouse";

@Component
export default class BaseChart extends Vue {
  @Prop({type: Object, required: true}) options!: Options;

  protected name!: string;
  protected cvs!: HTMLCanvasElement;
  protected c!: CanvasRenderingContext2D;
  protected w!: number;
  protected h!: number;
  protected data!: TransformedData;
  protected trigger!: Function;
  protected animationSpeed!: number;

  protected dpiW!: number;
  protected dpiH!: number;
  protected viewW!: number;
  protected viewH!: number;

  protected yMin!: number;
  protected yMax!: number;

  protected xRatio!: number;
  protected yRatio!: number;

  protected draw!: Draw;
  protected mouse!: Mouse | null;

  protected raf!: number;

  created() {
    this.name = this.options.name;
    this.w = this.options.width;
    this.h = this.options.height;
    this.data = this.options.data || {};
    this.trigger = this.options.onUpdate || noop;
    this.animationSpeed = this.options.animationSpeed || 15;

    this.dpiW = this.w * 2;
    this.dpiH = this.h * 2;
    this.viewW = this.dpiW;
    this.viewH = this.dpiH;
    this.mouse = null;
  }

  mounted() {
    this.cvs = document.getElementById(this.name) as HTMLCanvasElement;
    this.c = this.cvs.getContext('2d')!;

    this.cvs.width = this.dpiW;
    this.cvs.height = this.dpiH;

    css(this.cvs, {
      width: `${this.w}px`,
      height: `${this.h}px`
    });

    this.draw = new Draw(this.c, this.options.theme!);

    this.prepare();
    this.init();
    this.raf = requestAnimationFrame(this.renderFunc as FrameRequestCallback);
  }

  protected prepare() {
    this.renderFunc = this.renderFunc.bind(this)
  }

  protected init() {
    return
  }

  protected setup() {
    const [min, max] = getBoundary(this.data.datasets!);

    const [xRatio, yRatio] = computeRatio({
      pos: {left: 0, right: 100},
      viewH: this.viewH,
      viewW: this.viewW,
      length: this.data.labels!.length,
      delta: max - min
    });

    this.yMin = min;
    this.yMax = max;

    this.xRatio = xRatio;
    this.yRatio = yRatio;
  }

  renderFunc() {
    this.clear();
    this.setup();

    const {yMin, viewH, xRatio, yRatio, mouse, dpiW} = this;
    console.log("render data:", yMin, viewH, xRatio, yRatio, mouse, dpiW);

    this.data.datasets!.forEach(({data, color}) => {
      const coords = getCoordinates({data, yMin, viewH, xRatio, yRatio, margin: 0});
      this.draw.line({coords, color, mouse, dpiW, opacity: 1})
    })
  }

  protected clear() {
    this.c.clearRect(0, 0, this.dpiW, this.dpiH);
  }

  protected destroy() {
    this.clear();
    cancelAnimationFrame(this.raf);
  }
}
