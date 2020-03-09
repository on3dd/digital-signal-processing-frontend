<template>
  <div>
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

  main {
    width: 100%;

    .app {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem;
      width: 100%;
    }
  }

  header {
    width: inherit;
  }
</style>
