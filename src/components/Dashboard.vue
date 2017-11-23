<template>
  <div class="hero is-fullheight admin-controller">
    <div class="container">
      <div class="columns is-mobile">
        <div id="nav"  class="side-nav column is-3">
          <aside class="menu">
            <figure class="profile-image">
                <img src="https://loremflickr.com/128/128" />
            </figure>
            <br>
            <ul class="menu-list" ref="navigationArray">
              <li v-for="(component, key) in componentsArray" :key="component">
                <!-- Render registered components from list. Reference: https://forum.vuejs.org/t/how-to-make-a-component-with-menu-item-changing-css-to-active-when-clicked/3235/2 -->
                <a class="desktop-link" href="#" @click.prevent="swapComponent(component)" :class="{ 'is-active': isSelected(component) }">
                  <span>{{ component }}</span>
                  <i class="fa fa-address-book fa-lg component-icon" aria-hidden="true"></i>
                </a>
              </li>
              <li @click="logout()" id="logout-btn">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <span >Logout</span>
              </li>
            </ul>
          </aside>
        </div>
        <div class="side-nav column is-3"></div>
        <div class="column is-9">
          <!-- Conditional rendering of component. Reference: http://jsbin.com/miwuduliyu/edit?html,js,console,output -->
          <div :is="currentComponent" v-bind="currentProperties"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Dashboard from './Default'
  import Settings from './Settings'

  export default {
    components: {
      Dashboard,
      Settings,
    },
    methods: {
      logout() {
        this.auth.logout()
      },
      swapComponent(component) {
        this.currentComponent = component
      },
      isSelected(component) {
        return this.currentComponent === component
      },
    },
    computed: {
      // Pass data to respective child components: Reference: https://stackoverflow.com/questions/43658481/passing-props-dynamically-to-dynamic-component-in-vuejs
      currentProperties() {
        if (this.currentComponent === 'Dashboard') {
          return JSON.parse(localStorage.getItem('profile'))
        }
        return {}
      },
    },
    data() {
      return {
        componentsArray: ['Dashboard', 'Settings'],
        currentComponent: 'Dashboard',
      }
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

  .profile-image
    text-align: center
  .profile-image img
    border-radius: 100%
  .admin-controller
    background-color: #ecf0f1
    padding-top: 20px 
  .card-container
    margin: 20px auto 
  .menu-list li a 
    font-weight: 500

</style>
