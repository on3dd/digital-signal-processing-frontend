<template>
  <section>
    <h2>Реализованные функции</h2>
    <ul>
      <li v-for="(feature, idx) in features" :key="idx">
        <div>
          <input :id="'checkbox-'+idx" type="checkbox" :checked="feature.isDone" disabled>
          <label :for="'checkbox-'+idx">{{feature.title}}</label>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class ImplementedFunctions extends Vue {
    private features = [
      {
        title: 'Меню навигации',
        isDone: true,
      },
      {
        title: 'Справка',
        isDone: true,
      },
      {
        title: 'Базовый график',
        isDone: true,
      },
      {
        title: 'Загрузка файла',
        isDone: true,
      },
      {
        title: 'Обработка файла',
        isDone: false,
      },
      {
        title: 'Визуализация данных',
        isDone: false,
      },
    ];

  }
</script>

<style scoped lang="scss">
  @import "../../scss/about-section";
  section {
    @include about-section;
  }
</style>