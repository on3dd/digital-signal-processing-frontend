<template>
  <div class="details" :style="styles">
    <span class="title">{{title}}</span>
    <div class="details-val">
      <span class="val">{{val}}</span>
      <span class="channel">{{channel}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class'

  import MouseCoordinates from "../../types/mouseCoordinates";

  @Component
  export default class ChartNavigation extends Vue {
    @Getter signalValByIdx!: (idx: number) => number;
    @Getter idx!: number;
    @Getter coordinates!: MouseCoordinates;
    @Getter isVisible!: boolean;

    private get val(): number {
      return this.signalValByIdx(this.idx);
    }

    // private details!: HTMLElement;

    private get styles() {
      return {
        left: this.coordinates.x + 50 + 'px',
        top: this.coordinates.y + 25 + 'px',
        display: this.isVisible ? 'block' : 'none'
      }
    }

    private title = 'Title';
    private channel = 'Channel';
  }
</script>

<style scoped lang="scss">
  .details {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 1rem 1.5rem;
    background: #fff;
    text-align: center;
    border: 1px solid #dddddd;
    border-radius: 5px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .1);

    span {
      display: block;

      &.title {
        font-size: 1.25rem;
        line-height: 1.25rem;
        font-weight: 600;
        margin-bottom: .25rem;
      }

      &.val {
        font-size: 1.5rem;
        line-height: 1.75rem;
        font-weight: 700;
      }

      &.channel {
        line-height: 1rem;
        font-size: 1rem;
      }
    }

    .details-val {
      color: #e74c3c;
    }
  }
</style>