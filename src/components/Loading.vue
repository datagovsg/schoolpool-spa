<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="loading"/>
  </div>
</template>

<script>

  export default {
    name: 'loading',
  }
</script>

<style lang="sass" scoped>
  .spinner
    z-index: 10
    position: absolute
    display: flex
    justify-content: center
    height: 100vh
    width: 100vw
    background-color: white
    top: 0
    bottom: 0
    left: 0
    right: 0
</style>