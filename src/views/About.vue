<template>
  <div class="about">
    <h1 class="about__header">О программе</h1>
    <Authors/>
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
  .about {
    width: 100%;
    height: 100%;
    padding: 3rem;

    &__header {
      text-align: center;
    }
  }
</style>