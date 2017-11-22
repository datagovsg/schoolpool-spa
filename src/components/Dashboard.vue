<template>
  <div class="hero is-fullheight admin_container">
    <div class="container">
      <div class="columns is-mobile">
        <div class="column is-3">
          <aside class="menu">
            <ul class="menu-list">
              <li>
                <a class="is-active">Dashboard</a>
              </li>
              <li>
                <a>My Settings</a>
              </li>
              <li>
                <button @click="logout()" class="button is-info is-outlined">
                  <span class="icon">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                  </span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column is-9">
           <Default :profile="profile"></Default>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Default from './Default'
  
  export default {
    components: {
      Default,
    },
    methods: {
      logout() {
        this.auth.logout()
      },
    },
    computed: {
      profile() {
        return JSON.parse(localStorage.getItem('profile'))
      },
    },
    created() {
      const {
        auth = {},
      } = this.$parent
      this.auth = auth
      axios.get('http://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          // JSON responses are automatically parsed.
          this.posts = response.data
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
  }

</script>

<style lang="sass" scoped>
  .admin_container
    background-color: #ecf0f1 
    padding-top: 20px 
  .card_container
    margin: 20px auto 
  .menu-list li a 
    font-weight: 500

</style>
