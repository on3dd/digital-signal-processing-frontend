<template>
  <section>
    <h2>Исходный код</h2>
    <ul>
      <li v-for="(repo, idx) in repositories" :key="idx">
        <div>
          <a :href="repo.link">
            <span>{{repo.title}}</span>
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
  export default class Source extends Vue {
    private repositories = [
      {
        title: 'Front-end',
        link: 'https://github.com/on3dd/digital-signal-processing-frontend',
      },
      {
        title: 'Back-end',
        link: 'https://github.com/on3dd/digital-signal-processing-backend',
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