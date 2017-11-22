<template>
  <gmap-map :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" class="google-maps"></gmap-map>
</template>

<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAm8UrU_IlJ1ZIcSUeESFm7HfeYELf6F-w',
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
    },
  })

  export default {
    data() {
      return {}
    },
  }
</script>

<style lang="sass" scoped>
  .google-maps
    height: 350px
</style>

