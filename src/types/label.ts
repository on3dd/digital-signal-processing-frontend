import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Label extends Vue {
  @Prop({type: String, required: true}) name!: string;
  @Prop({type: String, required: true}) color!: string;

  toHtml() {
    return `
      <div class="tg-chart-checkbox">
        <input 
          type="checkbox" 
          value="${this.name}" 
          checked
        />
        <label>
          <span
            style="border-color: ${this.color}"
          ></span>
          ${this.name}
        </label>
      </div>
    `
  }
}