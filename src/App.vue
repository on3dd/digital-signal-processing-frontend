<template>
  <div class="app-wrapper">
    <header id="nav">
      <navbar/>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'

  export default {
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
  @import "./scss/index";

  .app-wrapper {
    display: flex;
    flex-direction: column;
    height: inherit;
    width: inherit;
  }

  main {
    display: flex;
    flex-grow: 1;
    width: 100%;
  }

  header {
    width: inherit;
  }
</style>
