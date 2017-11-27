<template>
  <div class="columns">
    <div class="column">
      <div class="columns">
        <div class="column is-12">
          <GoogleMaps
            :center="center"
            :markers="markers"
            :zoom="zoom"
          >
          </GoogleMaps>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <form @submit.prevent="onSubmit">
            <!-- Input grouping. Reference: https://bulma.io/2017/03/10/new-field-element/ -->
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" disabled type="email" :placeholder="profile.email">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">
                  +65
                </a>
              </p>
              <p class="control is-expanded">
                <input class="input" v-model="phoneNumber" type="number" placeholder="Mobile no.">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <vue-google-autocomplete
                  id="map"
                  classname="input"
                  placeholder="Address"
                  ref="address"
                  v-on:placechanged="getAddressData"
                  :country="['sg']"
                >
                </vue-google-autocomplete>
              </p>
            </div>
            <div class="field is-grouped has-addons">
              <div class="control is-expanded has-icons-left">
                <label class="label">School</label>
                <auto-complete placeholder="S. by name/region"
                  :suggestions="schools"
                  v-model="school"
                  @interface="getSelectedSchoolData($event)"
                >
                </auto-complete>
              </div>
              <div class="control">
                <label class="label">Children</label>
                <span class="select is-fullwidth">
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button class="button is-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div class="column is-6">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48 profile-image">
                    <img :src="profile.picture" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{profile.name}}</p>
                  <p class="subtitle is-6">{{profile.email}}</p>
                </div>
              </div>
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'
  import _ from 'lodash'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  import GoogleMaps from './GoogleMaps'
  import AutoComplete from './AutoComplete'

  import * as UserSession from '../specs/sessions/user'
  import * as SchoolSession from '../specs/sessions/school'
  import * as gMapSession from '../specs/sessions/gMap'
  import User from '../specs/models/user'
  
  export default {
    components: {
      GoogleMaps,
      AutoComplete,
      VueGoogleAutocomplete,
    },
    watch: {
      // whenever school changes, this function will run
      school() {
        this.fetchSchools()
      },
    },
    methods: {
      onSubmit() {
        // Check if input fields are empty
        if (this.address !== undefined && this.phoneNumber !== null && this.school !== '') {
          const { placeResultData = {}, addressData = {} } = this.address
          const user = new User(
            this.profile.name,
            placeResultData.formatted_address,
            addressData.latitude,
            addressData.longitude,
          )
          // If user does not exist in database, perform a POST API registration request
          if (this.userExist === false) {
            const schoolAddress = []
            schoolAddress.push(this.selectedSchool.postal_code)
            // Add user properties for user registration
            user.phoneNumber = this.phoneNumber
            user.schoolAddress = schoolAddress
            console.log(user)
            UserSession.register(user, localStorage.getItem('id_token')).then((response) => {
              console.log(response)
            }).catch((error) => {
              console.log(error.response)
            })
            return
          }
          // Perform a PUT API update request
          UserSession.update(user, localStorage.getItem('id_token')).then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      async addMarker(name, params) {
        if (params === null || params === '') {
          return
        }
        await gMapSession.default(params).then((response) => {
          const { location = {} } = response.data.results[0].geometry
          this.markers.push({
            position: location,
            name,
          })
        }).catch((error) => {
          console.log(error.response)
        })
      },
      removeMarker(name) {
        let index = 0
        let exist = false
        for (let i = 0; i < this.markers.length; i++) {
          if (this.markers[i].name === name) {
            index = i
            exist = true
            break
          }
        }
        if (exist) {
          this.markers.splice(index, 1)
        }
      },
      getSelectedSchoolData(event) {
        this.selectedSchool = event
        // Check if selected school is defined
        if (this.selectedSchool !== undefined && this.selectedSchool !== null) {
          this.addMarker('school', this.selectedSchool.postal_code)
        } else {
          this.removeMarker('school')
        }
      },
      getAddressData(addressData, placeResultData) {
        this.address = {
          placeResultData,
          addressData,
        }
        if (addressData !== undefined && addressData !== null) {
          this.addMarker('user', addressData.postal_code)
        } else {
          this.removeMarker('user')
        }
      },
      fetchSchools: _.debounce(function getSchools() {
        if (this.school.trim() === '') {
          this.schools = []
          return
        }
        const vm = this
        SchoolSession.default(this.school).then((response) => {
          // JSON responses are automatically parsed.
          const { records = {} } = response.data.result
          vm.schools = records
        }).catch((error) => {
          console.log(error.response)
        })
      }, 500),
    },
    data() {
      return {
        school: '',
        address: '',
        schools: [],
        markers: [],
        phoneNumber: null,
        selectedSchool: null,
        userExist: false,
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 7,
      }
    },
    async created() {
      this.profile = this.$attrs
      await UserSession.authenticate(localStorage.getItem('id_token'))
        .then(async (response) => {
          this.userExist = !this.userExist
          // User exist in the database
          const { user = {} } = response.data
          // Update form information
          this.phoneNumber = user.phoneNumber
          this.$refs.address.update(user.address)
          this.addMarker('user', user.address)
          // TODO: schoolAddress is an array and UI must cater to multiple schools
          await SchoolSession.default(user.schoolAddress[0]).then(async (res) => {
            const { result = {} } = res.data
            const { records = [] } = result
            // Assume that a single postal code contains only 1 school
            this.school = records[0].school_name
            this.addMarker('school', records[0].postal_code)
          })
          console.log(this.markers)
          this.zoom = 11
        })
        .catch((e) => {
          // User does not exist in the database
          if (e.response.status === 401) {
            this.isActive = !this.isActive
          }
        })
    },
  }

</script>

<style lang="sass" scoped>

</style>
