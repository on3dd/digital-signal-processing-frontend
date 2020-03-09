<template>
  <nav>
    <ul class="nav-links">
      <li class="nav-links__item">
        <div class="dropdown-header">Файл</div>
        <ul class="dropdown-body">
          <li class="dropdown-body__item">
            <file-input/>
          </li>
          <li class="dropdown-body__item">
            <span>Закрыть</span>
          </li>
          <li class="dropdown-body__item">
            <span>Принять ислам</span>
          </li>
        </ul>
      </li>
      <li v-for="(item, idx) in routerLinks" :key="idx" class="nav-links__item">
        <router-link :to="item.to">{{item.text}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import FileInput from './FileInput.vue'

  type RouterLink = {
    to: string;
    text: string;
  }

  @Component({
    components: {
      FileInput
    }
  })
  export default class Navbar extends Vue {
    private routerLinks: RouterLink[] = [
      {to: '/', text: 'Моделирование'},
      {to: '/', text: 'Фильтрация'},
      {to: '/', text: 'Анализ'},
      {to: '/', text: 'Настройки'},
      {to: '/about', text: 'Справка'},
    ];

    private dropdownHeaders!: NodeListOf<Element>;
    private dropdownBodies!: NodeListOf<Element>;

    mounted() {
      this.dropdownHeaders = document.querySelectorAll(".nav-links__item > .dropdown-header");
      this.dropdownBodies = document.querySelectorAll(".nav-links__item > .dropdown-body");

      document.addEventListener('click', (evt) => {
        const target = evt.target as HTMLElement;
        if (!target.classList.contains('dropdown-header')) {
          this.removeActiveClass();
        }
      });

      this.dropdownHeaders.forEach((el, idx) => {
        el.addEventListener('click', () => {
          this.removeActiveClass();
          this.setActiveClass(idx);
        })
      });
    }

    removeActiveClass() {
      this.dropdownHeaders.forEach((el) => el.classList.remove('active'));
      this.dropdownBodies.forEach((el) => el.classList.remove('active'));
    }

    setActiveClass(idx: number) {
      this.dropdownHeaders[idx].classList.add('active');
      this.dropdownBodies[idx].classList.add('active');
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/nav-item";

  nav {
    width: inherit;
    background-color: #fafafa;

    .nav-links {
      display: flex;
      padding: 1rem;

      &__item {
        position: relative;
        display: flex;
        align-items: center;
        font-size: inherit;
        //transition: background-color .1s ease-out;

        &:hover {
          background: darken(#fafafa, 5%);
        }

        a, .dropdown-header {
          @include nav-item;
        }

        .dropdown-header {
          border-bottom: none;

          &.active {
            border-color: rgba(0, 0, 0, .2);
          }
        }

        .dropdown-body {
          display: none;
          background-color: #fafafa;
          border: 1px solid transparent;

          &.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
            border-color: rgba(0, 0, 0, .2);
          }

          &__item {
            //transition: background-color .1s ease-out;

            &:hover {
              background: darken(#fafafa, 5%);
            }

            span {
              @include nav-item;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>