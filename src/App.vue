<template>
  <div>
    <header id="nav">
      <nav>
        <ul>
          <li>
            <router-link to="/">Файл</router-link>
          </li>
          <li>
            <router-link to="/">Моделирование</router-link>
          </li>
          <li>
            <router-link to="/">Фильтрация</router-link>
          </li>
          <li>
            <router-link to="/">Анализ</router-link>
          </li>
          <li>
            <router-link to="/">Настройки</router-link>
          </li>
          <li>
            <router-link to="/">Справка</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
  @import "./scss/main";
  @import "./scss/index";

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    /*min-height: 100vh;*/
    > h1 {
      text-align: center;
    }
    main {
      width: 100%;
    }
    section {
      margin: .5rem;
      width: 80%;
      &.chart-legend {
        padding: 1rem;
        border: 1px solid #dddddd;
      }
    }
  }
  header {
    width: inherit;
    overflow-x: hidden;
    > nav {
      width: inherit;
      background-color: #fafafa;
      > ul {
        display: flex;
        padding: 1rem;
        li {
          font-size: inherit;
          padding: .5rem 1rem;
          transition: background-color .1s ease-out;
          a {
            text-decoration: none;
            color: inherit;
          }
          &:hover {
            background: rgba(0, 0, 0, .1);
          }
        }
      }
    }
  }
</style>
