<template>
  <div id="app">
    <app-nav v-if="!isActive"></app-nav>
    <router-view />
    <app-footer v-if="!isActive"></app-footer>
  </div>
</template>

<script>
import AppNav from '../src/components/AppNav'
import AppFooter from '../src/components/AppFooter'

export default {
  name: 'app',
  components: {
    AppNav,
    AppFooter,
  },
  computed: {
    isActive() {
      return this.$route.path.includes('control-panel')
    },
  },
}

</script>

<style lang="sass">
  @import '../node_modules/bulma/bulma.sass'
  @import './style/mq'
  @import './style/responsive'

  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0

  // Google Place autocomplete styling. Reference: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
  // .pac-container
  //     z-index: 20 !important
  //     max-height: 90px !important
  //     overflow-y: scroll !important

</style>
