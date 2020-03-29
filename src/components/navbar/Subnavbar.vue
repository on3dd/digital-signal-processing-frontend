<template>
  <ul class="sub-nav">
    <li
        v-for="(action, idx) in actions"
        :key="idx"
        :class="{'sub-nav__item': true, 'sub-nav__item-disabled': !isActive && idx !== 0}"
    >
      <router-link
          :to="action.to"
          :disabled="!isActive && idx !== 0"
          :event="isActive || (idx === 0) ? 'click' : ''">
        {{action.name}}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from "vuex-class";
  import {ResponseDataArraySpecJSON} from "@/types/responseDataArray.spec";

  @Component
  export default class Subnavbar extends Vue {
    @Getter file!: ResponseDataArraySpecJSON;

    get isActive(): boolean {
      return this.file.columns.length !== 0;
    }

    private actions = [
      {
        name: "Обзор",
        to: {
          path: '/',
          query: {},
        },
      },
      {
        name: "Каналы",
        to: {
          path: '/',
          query: {
            tab: 'channels',
          },
        },
      },
      {
        name: "Информация",
        to: {
          path: '/',
          query: {
            tab: 'info',
          },
        },
      },
    ]
  }
</script>

<style scoped lang="scss">
  @import "../../scss/colors";

  .sub-nav {
    display: flex;
    width: inherit;
    padding: 0 1rem;
    background-color: darken(#fafafa, 2.5%);

    &__item {
      cursor: pointer;
      color: lighten($textDefault, 25%);

      &:hover {
        background-color: darken(#fafafa, 7.5%);
      }

      &-disabled {
        background: darken(#fafafa, 5%);
        color: lighten($textDefault, 50%);
        cursor: not-allowed;

        &:hover {
          background: darken(#fafafa, 5%);
        }
      }

      a {
        padding: .5rem 1rem;
        display: block;
        text-decoration: none;
        color: inherit;
        cursor: inherit;
      }
    }
  }
</style>