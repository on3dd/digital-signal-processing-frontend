<template>
  <ul class="sub-nav">
    <li
        :class="{'sub-nav__item': true, 'sub-nav__item-disabled': !action.isActive}"
        v-for="(action, idx) in actions" :key="idx"
    >
      <router-link
          :to="action.to"
          :disabled="!action.isActive"
          :event="action.isActive ? 'click' : ''">
        {{action.name}}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Subnavbar extends Vue {
    private actions = [
      {
        name: "Обзор",
        isActive: true,
        to: {
          path: '/',
          query: {},
        },
      },
      {
        name: "Каналы",
        isActive: false,
        to: {
          path: '/',
          query: {
            tab: 'channels',
          },
        },
      },
      {
        name: "Информация",
        isActive: false,
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
        cursor: default;

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