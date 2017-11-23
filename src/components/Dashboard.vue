<template>
  <div class="section is-large admin-controller">
    <div class="container">
      <div class="columns" v-if="isActive">
        <div class="column is-12">
          <div class="notification is-warning">
            <button class="delete"></button> Please navigate to
            <a>Profile Settings</a> to update your personal information
          </div>
        </div>
      </div>
      <div class="columns is-mobile">
        <div id="nav"  class="side-nav column is-3">
          <aside class="menu">
            <figure class="profile-image">
                <img v-bind:src="profile.picture" />
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
  import Config from '../../utils/config'

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
        return this.profile
      },
    },
    data() {
      return {
        componentsArray: ['Dashboard', 'Settings'],
        currentComponent: 'Dashboard',
        isActive: false,
      }
    },
    created() {
      const {
        auth = {},
      } = this.$parent
      this.auth = auth
      this.profile = JSON.parse(localStorage.getItem('profile'))
      axios.get(`${Config.serverURL}/users`, {
        token: localStorage.getItem('id_token'),
        'Access-Control-Allow-Origin': '*',
      })
        .then((response) => {
          // JSON responses are automatically parsed.
          const { data } = response
          console.log(data)
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.isActive = !this.isActive
          }
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
