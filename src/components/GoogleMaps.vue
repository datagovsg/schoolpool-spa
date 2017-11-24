<template>
  <div>
    <gmap-map :center="this.center" :zoom="10" map-type-id="roadmap" class="google-maps">
      <gmap-marker
        :key="index"
        v-for="(m, index) in this.markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Config from '../specs/config'

  Vue.use(VueGoogleMaps, {
    load: {
      key: Config.googleMaps.key,
      libraries: 'places',
      v: '3.26',
    },
  })

  export default {
    props: {
      markers: {
        type: Array,
        required: true,
      },
      center: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="sass" scoped>
  .google-maps
    height: 250px
</style>

