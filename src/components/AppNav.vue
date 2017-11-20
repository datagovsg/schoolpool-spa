<template>
  <nav class="navbar is-fixed-top is-transparent">
    <div class="navbar-brand">
      <router-link to="/Home#top" @click.native="closeNav" class="navbar-item">
        <span>Home</span>
      </router-link>
      <div class="navbar-burger burger" @click="toggleNav" :class="{ 'is-active': isActive }" data-target="navbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbar" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <div v-if="!isLoggedIn">
          <div class="navbar-item">
            <a class="navbar-item" href="#about">
              About
            </a>
            <a class="navbar-item" href="#services">
              Services
            </a>
            <a class="navbar-item" href="#contact">
              Contact
            </a>
            <button @click="login()" :disabled="!disabled" class="button is-primary is-outlined">
              <span class="icon">
                <i class="fa fa-sign-in" aria-hidden="true"></i>
              </span>
              <span>Login</span>
            </button>
          </div>
        </div>
        <div v-if="isLoggedIn">
          <div class="navbar-item">
            <button @click="logout()" class="button is-primary is-outlined">
              <span class="icon">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      toggleNav() {
        this.isActive = !this.isActive
      },
      closeNav() {
        this.isActive = false
      },
      login() {
        this.auth.login()
      },
      logout() {
        this.auth.logout()
        this.disabled = this.$route.name === 'Home'
      },
    },
    data() {
      return {
        authenticated: false,
        isActive: false,
        disabled: false,
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      profile() {
        return JSON.parse(localStorage.getItem('profile'))
      },
    },
    created() {
      const {
        auth = {},
      } = this.$parent
      this.auth = auth
      this.disabled = this.$route.name === 'Home'
      // auth.authNotifier.on('authChange', (authState) => {
      //   this.authenticated = authState.authenticated
      // })
      try {
        // this.authenticated = this.auth.authenticated
      } catch (err) {
        console.log(err)
      }
    },
  }

</script>

<style lang="sass" scoped>


</style>
