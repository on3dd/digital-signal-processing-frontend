<template>
  <div class="app">
    <h1>О программе</h1>
    <Authors/>
    <!--    <section>-->
    <!--      <h2>Используемые технологии</h2>-->
    <!--    </section>-->
    <Source/>
    <ImplementedFunctions/>
  </div>
</template>

<script>
  import Authors from '../components/about/Authors';
  import Source from '../components/about/Source';
  import ImplementedFunctions from '../components/about/ImplementedFunctions';

  export default {
    name: 'About',
    components: {
      Authors,
      Source,
      ImplementedFunctions,
    },
  }
</script>

<style lang="scss" scoped>

</style>