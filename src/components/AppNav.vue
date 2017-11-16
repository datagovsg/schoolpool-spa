<template>
<nav class="navbar is-fixed-top is-transparent">
  <div class="navbar-brand">
    <router-link to="/Home#top" @click.native="closeNav" class="navbar-item">
      <span>Home</span>
    </router-link>
    <div class="navbar-burger burger" @click="toggleNav" :class="{ 'is-active': isActive }" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{ 'is-active': isActive }">
    <div class="navbar-start">
    </div>

    <div class="navbar-end">
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
        <router-link to="/login" @click.native="closeNav" class="button is-primary is-outlined">
          <span class="icon">
            <i class="fa fa-sign-in" aria-hidden="true"></i>
          </span>
          <span>Login</span>
        </router-link>
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
  },
  data() {
    return {
      isActive: false,
    }
  },
}

</script>

<style lang="sass">

</style>


