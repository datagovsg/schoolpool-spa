<template>
  <div>
    <gmap-map :center="{lat:1.3521, lng:103.8198}" :zoom="14" map-type-id="roadmap" class="google-maps"></gmap-map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Config from '../../utils/config'

  Vue.use(VueGoogleMaps, {
    load: {
      key: Config.googleMaps.key,
      libraries: 'places',
      v: '3.26',
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

