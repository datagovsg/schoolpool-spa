<template>
  <div id="app" :auth="auth">
    <app-nav v-if="!isActive"></app-nav>
    <router-view />
    <app-footer v-if="!isActive"></app-footer>
  </div>
</template>

<script>
import AppNav from '../src/components/AppNav'
import AppFooter from '../src/components/AppFooter'
import { Auth } from './specs/models/Auth'

const auth = new Auth()

export default {
  name: 'app',
  components: {
    AppNav,
    AppFooter,
  },
  data() {
    return {
      auth,
    }
  },
  computed: {
    isActive() {
      return this.$route.path.includes('dashboard')
    },
  },
}

</script>

<style lang="sass">
  @import '../node_modules/bulma/bulma.sass'
  @import './style/mq'
  @import './style/responsive'

  // Google Place autocomplete styling. Reference: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
  // .pac-container
  //     z-index: 20 !important
  //     max-height: 90px !important
  //     overflow-y: scroll !important

</style>
