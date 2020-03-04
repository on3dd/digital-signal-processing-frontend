<template>
  <div class="tooltip">
    <div v-if="data !== undefined">
      <div class="tooltip-title">{{data.title}}</div>
      <ul class="tooltip-list">
        <li class="tooltip-list-item" v-for="(item, key) in data.items" :key="key">
          <div class="value" :style="{color: item.color}">{{item.value}}</div>
          <div class="name" :style="{color: item.color}">{{item.name}}</div>
        </li>
      </ul>
    </div>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import Theme from "@/types/theme";
  import {css} from "@/utils";
  import {ShowData} from "@/types/data";
  import options from "@/types/options";

  @Component
  export default class Tooltip extends Vue {
    // @Prop({type: HTMLElement, required: true}) $el!: HTMLElement;
    @Prop({type: Object, required: true}) options!: {top: number; left: number; data?: ShowData; theme: Theme};

    top!: number;
    left!: number;
    data!: ShowData;
    theme!: Theme;

    private tooltip!: HTMLElement;

    created() {
      this.top = this.options.top;
      this.left = this.options.left;
      this.data = this.options.data!;
      this.theme = this.options.theme;
    }

    mounted() {
      console.log("Tooltip mounted");
      this.tooltip = document.getElementsByClassName('tooltip')[0] as HTMLElement;
      console.log(this.tooltip);
    }

    updateTheme(theme: Theme) {
      console.log("Tooltip updateTheme fired");
      css(this.tooltip, {
        background: theme.tooltipBackground,
        borderColor: theme.tooltipBorder,
        boxShadow: theme.tooltipShadow,
        color: theme.tooltipColor
      })
    }

    show() {
      if (!Object.keys(this.data!).length) {
        return
      }

      const {height, width} = this.tooltip.getBoundingClientRect();
      css(this.tooltip, {
        display: 'block',
        top: `${this.top - height}px`,
        left: `${this.left + (width / 2)}px`
      });
    }

    hide() {
      this.tooltip.style.display = 'none'
    }
  }
</script>

<style scoped>

</style>