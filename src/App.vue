<template>
  <div id="app">
    <AppNav></AppNav>
    <router-view :auth="auth" :authenticated="authenticated">
    </router-view>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppNav from '../src/components/AppNav'
import AppFooter from '../src/components/AppFooter'
import AuthService from '../utils/AuthService'

const auth = new AuthService()

const { authenticated = false } = auth

export default {
  name: 'app',
  components: {
    AppNav,
    AppFooter,
  },
  data() {
    return {
      auth,
      authenticated,
    }
  },
}

</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import './style/mq'

</style>
