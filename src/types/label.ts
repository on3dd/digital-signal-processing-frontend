// import {Component, Prop, Vue} from "vue-property-decorator";
import {Dataset} from "@/types/data";

// @Component
export default class Label{
  // @Prop({type: Object, required: true}) set!: Dataset;
  // @Prop({type: String, required: true}) name!: string;
  // @Prop({type: String, required: true}) color!: string;

  // set!: Dataset;
  name!: string;
  color!: string;

  constructor(set: Dataset) {
    this.name = set.name;
    this.color = set.color;
  }

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