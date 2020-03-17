<template>
  <div class="tooltip" :id="name">
    <div class="tooltip-title">{{data.title}}</div>
    <ul class="tooltip-list">
      <li class="tooltip-list-item" v-for="(item, key) in data.items" :key="key">
        <div class="value" :style="{color: item.color}">{{item.value}}</div>
        <div class="name" :style="{color: item.color}">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import Theme from "@/types/theme";
  import { ExtendedTooltipOptions } from '@/types/options';
  import {css} from "@/utils";

  @Component
  export default class Tooltip extends Vue {
    @Prop({type: Object, required: true}) options!: ExtendedTooltipOptions;

    public top =  this.options.top;
    public left = this.options.left;
    public data = this.options.data;
    public theme = this.options.theme;
    public name = this.options.name;

    private tooltip!: HTMLElement;

    created() {
      // this.top = this.options.top;
      // this.left = this.options.left;
      // this.data = this.options.data;
      // this.theme = this.options.theme;
    }

    mounted() {
      this.tooltip = document.getElementById(this.name)!;
      console.log("Tooltip mounted:", this.tooltip);
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
      if (this.data?.items.length === 0) {
        return;
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

<style scoped lang="scss">
  .tooltip {
    position: absolute;
    display: none;
    max-width: 200px;
    min-width: 120px;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #dfe6eb;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .05);
    background: #fff;
    color: #000;
    overflow: hidden;
    z-index: 3;

    top: 50px;
    left: 100px;

    .tooltip-title {
      text-align: center;
      margin-bottom: .5rem;
      white-space: nowrap;
    }

    .tooltip-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .tooltip-list-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;

      .name {
        font-size: .8rem;
      }

      .value {
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
</style>