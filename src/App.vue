<template>
  <div id="app" :auth="auth">
    <AppNav v-if="!isActive"></AppNav>
    <router-view />
    <AppFooter v-if="!isActive"></AppFooter>
  </div>
</template>

<script>
import AppNav from '../src/components/AppNav'
import AppFooter from '../src/components/AppFooter'
import { AuthService } from '../utils/AuthService'

const auth = new AuthService()

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
      return this.$route.name === 'Dashboard'
    },
  },
}

</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import './style/mq'

</style>
