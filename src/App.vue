<template>
  <div id="app" :auth="auth">
    <AppNav></AppNav>
    <router-view />
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppNav from '../src/components/AppNav'
import AppFooter from '../src/components/AppFooter'
import AuthService from '../utils/AuthService'

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
}

</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import './style/mq'

</style>
