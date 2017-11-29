<template>
  <div class="section admin-controller full-height">
    <div class="container">
      <div class="columns is-mobile">
        <div id="nav" class="side-nav column is-2">
          <aside class="menu">
            <figure class="profile-image">
                <img :src="profileImage" />
            </figure>
            <br>
            <ul class="menu-list" ref="navigationArray">
              <li v-for="(component, key) in componentsArray" :key="component.name">
                <!-- Render registered components from list. Reference: https://forum.vuejs.org/t/how-to-make-a-component-with-menu-item-changing-css-to-active-when-clicked/3235/2 -->
                <a class="desktop-link" href="#" @click.prevent="swapComponent(component)" :class="{ 'is-active': isSelected(component) }">
                  <i :class="component.icon" aria-hidden="true"></i>
                  <span>{{ component.name }}</span>
                </a>
              </li>
              <li @click="logout()" id="logout-btn">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <span>Logout</span>
              </li>
            </ul>
          </aside>
        </div>
        <div class="side-nav column is-2"></div>
        <div class="column is-10">
          <div class="columns" v-if="isActive">
            <div class="column is-12">
              <!-- TODO: Add data binding to do conditional rendering of warning -->
              <div class="notification is-warning">
                <button class="delete"></button> Please navigate to
                <a>Profile Settings</a> to update your personal information
              </div>
            </div>
          </div>
          <!-- Conditional rendering of component. Reference: http://jsbin.com/miwuduliyu/edit?html,js,console,output -->
          <div v-if="profile" :is="currentComponent !== null ? currentComponent.name : 'Default'"
            :profile="profile"
            @profileChanged="newProperties" />
          <!-- TODO: Add loading page -->
          <div v-else>Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Default from './Default'
  import Settings from './Settings'
  import * as UserSession from '../specs/sessions/user'

  export default {
    components: {
      Default,
      Settings,
    },
    methods: {
      logout() {
        this.auth.logout()
      },
      swapComponent(component) {
        this.currentComponent = component
      },
      // Logic for swapping view component
      isSelected(component) {
        if (this.currentComponent !== null) {
          return this.currentComponent === component
        } else if (component.name === 'Default') {
          return true
        }
        return false
      },
      newProperties(profile) {
      /**
       *  Bind profile settings to global variable.
       *  Bind occurs at line 38, v-bind="this.profile"
      */
        this.profile = profile
      },
    },
    data() {
      return {
        componentsArray: [{ name: 'Default', icon: 'fa fa-bar-chart fa-lg component-icon' }, { name: 'Settings', icon: 'fa fa-cog fa-lg component-icon' }],
        profileImage: '',
        isActive: false,
        profile: null,
        currentComponent: null,
      }
    },
    async created() {
      const {
        auth = {},
      } = this.$parent
      this.auth = auth
      // Authenticate with server to ensure that user exist
      await UserSession.authenticate(localStorage.getItem('id_token'))
        .then(async (response) => {
          // JSON responses are automatically parsed.
          const { user = {} } = response.data
          this.profile = user
          // Retrieve user information from Auth0 instance
          const sub = (this.profile.sub !== undefined) ? this.profile.sub : this.profile.id
          await UserSession.information(sub, localStorage.getItem('id_token'))
            .then((res) => {
              this.profileImage = res.data.picture
            })
        })
        .catch((e) => {
          // User does not exist in the database
          if (e.response.status === 401) {
            try {
              // Set this.profile to default value
              this.profile = JSON.parse(localStorage.getItem('profile'))
              this.profileImage = this.profile.picture
              this.isActive = !this.isActive
            } catch (error) {
              console.log(error)
            }
          }
        })
    },
  }

</script>

<style lang="sass" scoped>

  .admin-controller
    background-color: #ecf0f1
    padding-top: 20px 
  .card-container
    margin: 20px auto 
  .menu-list li a 
    font-weight: 500
  .full-height 
    min-height: 100vh

</style>
