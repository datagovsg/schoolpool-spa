<template>
  <!-- <div class="card-shadow">
    <b-container class="bv-row-container">
      <h4>LOGIN</h4>
      <p>With your social media account</p>
      <button class="btn btn-primary btn-margin" v-if="!this.auth.authenticated" @click="this.auth.login">
        Log In
      </button>
    </b-container>
  </div> -->
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <article class="card is-rounded">
            <div class="card-content">
              <div class="field">
                <div v-if="this.auth.authenticated">
                  <h4>You are logged in!</h4>
                  <button class="button is-primary" @click="this.auth.logout">Logout</button>
                </div>
                <div v-if="!this.auth.authenticated">
                  <h4>You are not logged in!</h4>
                  <button class="button is-primary" @click="this.auth.login">Login</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'home',
    // Essential in order for component to access parent properties
    props: ['auth'],
    data() {
      this.auth.authNotifier.on('authChange', (authState) => {
        this.authenticated = authState.authenticated
      })
      return {}
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../style/mq'
</style>
