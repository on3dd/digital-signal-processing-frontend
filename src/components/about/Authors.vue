<template>
  <section>
    <h2>Авторы</h2>
    <ul>
      <li v-for="(author, idx) in authors" :key="idx">
        <div>
          <span>{{author.name}}</span>
          <a :href="author.github">
            <github-circle class="icon-link"/>
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import GithubCircle from 'mdi-vue/GithubCircle.vue';

  @Component({
    components: {
      GithubCircle
    }
  })
  export default class Authors extends Vue {
    private authors = [
      {
        name: 'Балтынков Артем',
        github: 'https://github.com/on3dd',
      },
      {
        name: 'Пысин Юрий',
        github: 'https://github.com/Meromen',
      },
      {
        name: 'Чербаджи Максим',
        github: 'https://github.com/Code7unner',
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