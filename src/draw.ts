import {getRgbValue, hexToRgb, isMouseOver, toDate} from './utils'
import {LineOptions, XAxisOptions, YAxisOptions} from "@/types/options";
import Theme from "@/types/theme";
import {ShowData, ShowDataItem} from "@/types/data";

export default class Draw {
  c: CanvasRenderingContext2D;
  theme: Theme;

  constructor(
      context: CanvasRenderingContext2D,
      theme: Theme
  ) {
    this.c = context;
    this.theme = theme;
  }

  line({
         coords,
         color,
         opacity,
         mouse,
         dpiW,
         translateX,
         withCircles,
         visibleItemsCount
       }: LineOptions) {
    // console.log("line fired");
    this.c.beginPath();
    this.c.save();
    this.c.translate(translateX!, 0);
    this.c.moveTo(coords[0][0], coords[0][1]);

    this.c.lineWidth = this.theme.lineWidth;
    this.c.strokeStyle = hexToRgb(color, opacity);

    coords.forEach(([x, y]) => this.c.lineTo(x, y));

    this.c.stroke();
    this.c.closePath();

    if (withCircles) {
      for (let i = 0; i < coords.length; i++) {
        if (isMouseOver(coords[i][0], mouse!, translateX!, dpiW, visibleItemsCount!)) {
          this.circle(coords[i] as [number, number], color);
          break;
        }
      }
    }

    this.c.restore();
  }

  circle([x, y]: [number, number], color: string) {
    this.c.beginPath();
    this.c.strokeStyle = color;
    this.c.fillStyle = this.theme.gridBackground;
    this.c.arc(x, y, this.theme.circleRadius, 0, Math.PI * 2);
    this.c.fill();
    this.c.stroke();
    this.c.closePath();
  }

  setContextStyles() {
    this.c.fillStyle = this.theme.gridTextColor;
    this.c.font = this.theme.font;
    this.c.strokeStyle = this.theme.gridLineColor;
    this.c.lineWidth = this.theme.gridLineWidth;
  }

  yAxis({
          dpiW,
          viewH,
          yMax,
          yMin,
          margin,
          delta,
          rowsCount = 5
        }: YAxisOptions) {
    this.setContextStyles();

    const step = Math.round(viewH / rowsCount);
    const stepText = (yMax - yMin) / rowsCount;

    this.c.save();
    this.c.beginPath();

    for (let i = 1; i <= rowsCount; i++) {
      const y = step * i;
      const text = Math.round(yMax - stepText * i);

      this.c.fillText(text.toString(), 0, y - 10 + margin + delta);
      this.c.moveTo(0, y + margin);
      this.c.moveTo(dpiW, y + margin);
    }

    this.c.stroke();
    this.c.restore();
    this.c.closePath();
  }

  // To reduce calls to rgb converter
  getColorSetter(hexColor: string) {
    const r = getRgbValue(hexColor)!;
    return (opacity: number) => {
      return `rgba(${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}, ${opacity})`
    }
  }

  xAxis({
          data,
          datasets,
          visibleItemsLength,
          dpiW,
          dpiH,
          xRatio,
          mouse,
          margin,
          translateX,
        }: XAxisOptions): ShowData {
    this.setContextStyles();
    this.c.strokeStyle = this.theme.gridActiveLineColor;

    this.c.beginPath();
    this.c.save();
    this.c.translate(translateX, 0);
    this.c.moveTo(0, margin);

    const columnsCount = 6;

    const labelWidth = Math.round(dpiW / 7);
    const every = Math.floor(data.labels!.length / columnsCount);
    const visibleIdxs = [0, every, every * 2, every * 3, every * 4 - 1, every * 5 - 2, every * 6 - 3];

    let nextStart = 0;
    let prevEnd = 0;
    let count = 0;

    const a = {} as any;

    const colorSetter = this.getColorSetter(this.theme.gridTextColor);

    // FIXME: It shouldn't work this way
    let showData: ShowData = {
      title: '',
      items: [],
    };

    for (let i = 0; i < data.labels!.length; i++) {
      const x = Math.floor(i * xRatio);
      const text = toDate(data.labels![i]);

      if (visibleIdxs.includes(i)) {
        if (a[count]) {
          const between = nextStart - prevEnd;
          const itemsBetween = Math.floor(between / labelWidth);
          const opacity = Math.abs(itemsBetween - between / labelWidth);

          if (itemsBetween === 1) {
            const idx = Math.floor(a[count].length / 2);
            const l = a[count][idx];
            this.c.save();
            this.c.fillStyle = colorSetter(opacity);
            this.c.fillText(l.text, l.x, dpiH - 10);
            this.c.restore();
          }

          if (itemsBetween >= 2) {
            const step = Math.floor(a[count].length / 3) - 1;
            for (let j = 1; j <= 3; j++) {
              this.c.save();
              const l = a[count][step * j];
              if (itemsBetween === 2 && (j === 1 || j === 3)) {
                this.c.fillStyle = colorSetter(opacity);
              }
              if (l.x + labelWidth < nextStart) {
                this.c.fillText(l.text, l.x, dpiH - 10);
              } else if (Math.abs(l.x + labelWidth - nextStart) < labelWidth / 2) {
                this.c.fillText(l.text, l.x, dpiH - 10);
              }
              this.c.restore();
            }
          }
        }

        this.c.fillText(text, x, dpiH - 10);

        const idx = visibleIdxs.findIndex(j => j === i);

        prevEnd = x + labelWidth;
        nextStart = Math.floor(visibleIdxs[idx + 1] * xRatio);
        count++;
      } else {
        if (!a[count]) {
          a[count] = [];
        }
        a[count].push({x, text});
      }

      if (!isMouseOver(x, mouse!, translateX, dpiW, visibleItemsLength)) {
        continue;
      }

      this.c.save();
      this.c.moveTo(x, margin);
      this.c.lineTo(x, dpiH - margin);
      this.c.restore();

      showData = {
        title: toDate(data.labels![i], true),
        items: datasets.map(set => ({
          name: set.name,
          color: set.color,
          value: set.data[i]
        }))
      };
    }

    this.c.restore();
    this.c.stroke();
    this.c.closePath();

    return showData;
  }
}