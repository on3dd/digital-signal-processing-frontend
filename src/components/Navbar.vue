<template>
  <nav>
    <ul class="nav-links">
      <li class="nav-links__item">
        <div class="dropdown-header">Файл</div>
        <ul class="dropdown-body">
          <li class="dropdown-body__item">
            <label for="file-input">Открыть</label>
            <input id="file-input" name="file-input" type="file" accept="text/plain">
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

  type RouterLink = {
    to: string;
    text: string;
  }

  @Component
  export default class Navbar extends Vue {
    private routerLinks: RouterLink[] = [
      {to: '/', text: 'Моделирование'},
      {to: '/', text: 'Фильтрация'},
      {to: '/', text: 'Анализ'},
      {to: '/', text: 'Настройки'},
      {to: '/', text: 'Справка'},
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
  @import "../scss/_navbar";
</style>