import {Component, Prop, Vue} from "vue-property-decorator";
import Theme from "@/types/theme";
import {css} from "@/utils";
import {ShowData} from "@/types/data";

@Component
export default class Tooltip extends Vue {
  @Prop({type: Object, required: true}) theme!: Theme;

  public $el!: HTMLElement;

  updateTheme(theme: Theme) {
    css(this.$el, {
      background: theme.tooltipBackground,
      borderColor: theme.tooltipBorder,
      boxShadow: theme.tooltipShadow,
      color: theme.tooltipColor
    })
  }

  show({top, left}
           : { top: number, left: number }, data: ShowData) {
    if (!Object.keys(data).length) {
      return
    }

    this.$el.innerHTML = '';
    const {height, width} = this.$el.getBoundingClientRect();
    css(this.$el, {
      display: 'block',
      top: `${top - height}px`,
      left: `${left + (width / 2)}px`
    });

    this.$el.insertAdjacentHTML('afterbegin', `
      <div class="tooltip-title">${data.title}</div>
      <ul class="tooltip-list">
        ${data.items.map(item => {
      return `<li class="tooltip-list-item">
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="name" style="color: ${item.color}">${item.name}</div>
          </li>`
    }).join(' ')}
      </ul>
    `)
  }

  hide() {
    this.$el.style.display = 'none'
  }
}