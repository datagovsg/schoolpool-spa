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
          <transition name="fade">
          <div v-if="hasChanged" class="notification is-primary">
            <button class="delete" v-on:click="hasChanged = !hasChanged"></button> Your data has been updated
          </div>
          </transition>
          <form @submit.prevent="onSubmit">
            <!-- Input grouping. Reference: https://bulma.io/2017/03/10/new-field-element/ -->
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" id="name" disabled :placeholder="(profile.email === undefined ? profile.name: profile.email)">
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
                <input class="input" id="phoneNumber" :disabled="userExist" v-model="phoneNumber" type="number" placeholder="Mobile no.">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <input class="input" id="address" v-model="address" type="number" placeholder="Postal code">
              </p>
            </div>
            <div class="field is-grouped has-addons">
              <p class="control is-expanded has-icons-left">
                <label class="label">School</label>
                <auto-complete placeholder="S. by name/region"
                  id="school"
                  :suggestions="schools"
                  searchParam="school_name"
                  v-model="school"
                  @interface="getSelectedSchoolData($event)"
                >
                </auto-complete>
              </p>
              <div class="field">
                <p class="control">
                  <label class="label">Children</label>
                  <span class="select is-fullwidth">
                    <select id="children" disabled>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </span>
                </p>
              </div>
            </div>
            <div class="is-grouped is-grouped-right">
              <div class="control">
                <button class="button is-primary" :class="{ 'is-loading': inSubmitProcess }">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div v-if="pairedProfile" class="column is-6">
          <partner :profile="pairedProfile"></partner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  import GoogleMaps from './GoogleMaps'
  import AutoComplete from './AutoComplete'
  import Partner from './Partner'

  import * as UserSession from '../specs/sessions/user'
  import * as SchoolSession from '../specs/sessions/school'
  import * as gMapSession from '../specs/sessions/gMap'
  import User from '../specs/models/User'
  
  export default {
    components: {
      GoogleMaps,
      AutoComplete,
      VueGoogleAutocomplete,
      Partner,
    },
    props: {
      profile: {
        type: Object,
        required: true,
      },
      pairedProfile: {
        type: Object,
        required: false,
      },
    },
    watch: {
      // whenever school changes, this function will run
      school() {
        // Check if school value is an empty string or character is lesser than FIX_STR_LENGTH
        if (this.school === '' || this.school.length < this.FIX_STR_LENGTH) {
          this.removeMarker('school')
        }
        this.fetchSchools()
      },
      async address(val) {
        if (val === '' || val.length < this.FIX_STR_LENGTH) {
          this.removeMarker('user')
        } else if (val.length === this.FIX_STR_LENGTH) {
          this.fetchAddress(val)
        }
      },
    },
    methods: {
      async onSubmit() {
        this.inSubmitProcess = !this.inSubmitProcess
        // Check if input fields are empty
        if (this.address !== undefined && this.phoneNumber !== null && this.school !== '') {
          let jwtToken = null
          let updatedProfile = null
          let isSuccessful = false
          let tempLat = null
          let tempLong = null
          let tempAddress = null
          // // Check if address is an empty object
          // if (_.isEmpty(this.address)) {
          //   const { latlong = {}, address = '' } = this.profile
          //   const [lat, long] = latlong.coordinates
          //   tempLat = lat
          //   tempLong = long
          //   tempAddress = address
          // } else {
          //   // User changed address location
          //   // tempLat = addressData.latitude
          //   // tempLong = addressData.longitude
          //   tempAddress = this.address
          // }
          tempLat = this.location.lat
          tempLong = this.location.lng
          tempAddress = this.address
          // Validate school address array
          let tempSchoolAddress = []
          if (this.selectedSchool !== null) {
            tempSchoolAddress.push(this.selectedSchool.postal_code)
          } else {
            tempSchoolAddress = this.profile.schoolAddress
          }
          // Construct user object for registration/update
          const user = new User(
            this.profile.name,
            tempAddress,
            tempLat,
            tempLong,
            tempSchoolAddress,
            this.phoneNumber,
          )
          try {
            jwtToken = localStorage.getItem('id_token')
          } catch (error) {
            console.log(error)
          }
          // If user does not exist in database, perform a POST API registration request
          if (this.userExist === false) {
            // Add user properties for user registration
            await UserSession.register(user, jwtToken).then((response) => {
              const { data = {} } = response
              updatedProfile = this.updateUserInformation(data.user)
              isSuccessful = true
            }).catch((error) => {
              console.log(error.response)
            })
          } else {
            // Perform a PUT API update request
            await UserSession.update(user, jwtToken).then((response) => {
              const { data = {} } = response
              updatedProfile = this.updateUserInformation(data.user)
              isSuccessful = true
            }).catch((error) => {
              console.log(error.response)
            })
          }
          if (isSuccessful) {
            this.inSubmitProcess = !this.inSubmitProcess
            this.profileChanged(updatedProfile)
            this.hasChanged = true
          }
        }
      },
      profileChanged(updatedProfile) {
        this.$emit('profileChanged', updatedProfile)
      },
      async addMarker(name, params, coord = null) {
        if (params === null || params === '') {
          return
        }
        if (coord === null || coord === undefined) {
          await gMapSession.default(params).then((response) => {
            const result = response.data.results[0]
            if (result !== undefined
            && result.address_components[result.address_components.length - 1].short_name === 'SG') {
              coord = result.geometry.location
            }
          }).catch((err) => {
          // Invalid postal code coordinates
            console.log(err)
          })
        }
        // Remove existing marker before replacing it
        this.removeMarker(name)
        this.markers.push({
          position: coord,
          name,
        })
        this.zoom = 10
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
      // Function called when user selects an option from the school autocomplete dropdown
      getSelectedSchoolData(event) {
        this.selectedSchool = event
        // Check if selected school is defined
        if (this.selectedSchool !== undefined && this.selectedSchool !== null) {
          this.addMarker('school', this.selectedSchool.postal_code)
        } else {
          this.removeMarker('school')
        }
      },
      updateUserInformation(profile) {
        let updatedProfile = null
        if (!_.isEmpty(profile)) {
          updatedProfile = Object.assign(this.profile, profile)
          this.addMarker('user', updatedProfile.address)
          // TODO: schoolAddress is an array and UI must cater to multiple schools
          SchoolSession.default(updatedProfile.schoolAddress[0]).then((res) => {
            const { result = {} } = res.data
            const { records = [] } = result
            // Assume that a single postal code contains only 1 school
            this.school = records[0].school_name
            this.phoneNumber = updatedProfile.phoneNumber
            this.address = updatedProfile.address
            this.location = updatedProfile.latlong.coordinates
            this.addMarker('school', records[0].postal_code)
          }).catch((err) => {
            console.log(err)
          })
        }
        return updatedProfile
      },
      // Fetch school information base on school search query
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
      // Fetch address information base on postal code search query
      async fetchAddress(postalCode) {
        await gMapSession.default(postalCode).then((response) => {
        // JSON responses are automatically parsed.
          const { results = [] } = response.data
          const { location = {} } = results[0].geometry
          this.location = location
          this.addMarker('user', postalCode, location)
        }).catch((err) => {
        // console.log(error.response)
          console.log(err)
        })
      },
    },
    data() {
      return {
        FIX_STR_LENGTH: 6,
        school: '',
        address: '',
        location: {},
        schools: [],
        markers: [],
        phoneNumber: null,
        selectedSchool: null,
        userExist: false,
        hasChanged: false,
        inSubmitProcess: false,
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 7,
      }
    },
    created() {
      // Check if user was a registered member by phone number
      if (this.profile.phoneNumber === undefined) {
        return
      }
      // User exist in the database
      this.userExist = !this.userExist
      // Update form information
      this.updateUserInformation(this.profile)
    },
  }

</script>

<style lang="sass" scoped>
  
</style>
