<template>
  <div class="app">
    <h1>О программе</h1>
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
    <!--    <section>-->
    <!--      <h2>Используемые технологии</h2>-->
    <!--    </section>-->
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
  </div>
</template>

<script>
  import GithubCircle from 'mdi-vue/GithubCircle';

  export default {
    name: 'About',
    components: {
      GithubCircle,
    },
    data() {
      return {
        authors: [
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
        ],
        repositories: [
          {
            title: 'Front-end',
            link: 'https://github.com/on3dd/digital-signal-processing-frontend',
          },
          {
            title: 'Back-end',
            link: '',
          },
        ],
        features: [
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
            isDone: false,
          },
          {
            title: 'Обработка файла',
            isDone: false,
          },
          {
            title: 'Визуализация данных',
            isDone: false,
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      li {
        list-style: disc;
        margin-bottom: .25rem;

        > div {
          display: flex;
          align-items: center;

          span {
            display: inline-flex;
            align-items: center;
            margin-right: .2rem;
          }

          a {
            color: inherit;
            display: flex;
            align-items: center;
            text-decoration: none;

            .icon-link {
              opacity: .25;
            }

            &:hover {
              text-decoration: underline;

              .icon-link {
                opacity: 1;
              }
            }
          }

          input[type=checkbox] {
            margin-right: .5rem;
            height: 1rem;
            width: 1rem;
          }
        }
      }
    }

    &:last-child {
      ul {
        li {
          list-style: none;
        }
      }
    }
  }
</style>