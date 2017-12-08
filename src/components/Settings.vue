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
                <vue-google-autocomplete
                  ref="address"
                  id="address"
                  classname="input"
                  placeholder="Address"
                  v-on:placechanged="getAddressPlaceChanged"
                  v-on:inputChange="getAddressInputChange"
                  :country="['sg']"
                >
                </vue-google-autocomplete>
              </p>
            </div>
            <div class="field is-grouped has-addons">
              <p class="control is-expanded has-icons-left">
                <label class="label">School</label>
                <auto-complete placeholder="S. by name/region"
                  id="school"
                  :suggestions="schools"
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
                <button class="button is-primary">Save</button>
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
    },
    methods: {
      async onSubmit() {
        // Check if input fields are empty
        if (this.address !== undefined && this.phoneNumber !== null && this.school !== '') {
          const { placeResultData = {}, addressData = {} } = this.address
          let jwtToken = null
          let updatedProfile = null
          let isSuccessful = false
          let tempLat = null
          let tempLong = null
          let tempAddress = null
          // Check if address is an empty object
          if (_.isEmpty(this.address)) {
            const { latlong = {}, address = '' } = this.profile
            const [lat, long] = latlong.coordinates
            tempLat = lat
            tempLong = long
            tempAddress = address
          } else {
            // User changed address location
            tempLat = addressData.latitude
            tempLong = addressData.longitude
            tempAddress = placeResultData.formatted_address
          }
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
          )
          try {
            jwtToken = localStorage.getItem('id_token')
          } catch (error) {
            // console.log(error)
            throw (error)
          }
          // If user does not exist in database, perform a POST API registration request
          if (this.userExist === false) {
            user.phoneNumber = this.phoneNumber
            // Add user properties for user registration
            await UserSession.register(user, jwtToken).then((response) => {
              const { data = {} } = response
              updatedProfile = this.updateUserInformation(data.user)
              isSuccessful = true
            }).catch((error) => {
              // console.log(error.response)
              throw (error.response)
            })
          } else {
            // Perform a PUT API update request
            await UserSession.update(user, jwtToken).then((response) => {
              const { data = {} } = response
              updatedProfile = this.updateUserInformation(data.user)
              isSuccessful = true
            }).catch((error) => {
              // console.log(error.response)
              throw (error.response)
            })
          }
          if (isSuccessful) {
            this.profileChanged(updatedProfile)
            this.hasChanged = true
          }
        }
      },
      profileChanged(updatedProfile) {
        this.$emit('profileChanged', updatedProfile)
      },
      addMarker(name, params) {
        if (params === null || params === '') {
          return
        }
        gMapSession.default(params).then((response) => {
          const { location = {} } = response.data.results[0].geometry
          // Remove existing marker before replacing it
          this.removeMarker(name)
          this.markers.push({
            position: location,
            name,
          })
          this.zoom = 11
        }).catch((error) => {
          // console.log(error.response)
          throw (error.response)
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
      // Function called when user types in the address autocomplete input field
      getAddressInputChange(data) {
        const { newVal = {} } = data
        if (newVal === '' || newVal.length < this.FIX_STR_LENGTH) {
          this.removeMarker('user')
        }
      },
      // Function called when user selects an option from the address autocomplete dropdown
      getAddressPlaceChanged(addressData, placeResultData) {
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
            this.addMarker('school', records[0].postal_code)
          }).catch((err) => {
            throw err
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
          // console.log(error.response)
          throw (error.response)
        })
      }, 500),
    },
    data() {
      return {
        FIX_STR_LENGTH: 5,
        school: '',
        address: '',
        schools: [],
        markers: [],
        phoneNumber: null,
        selectedSchool: null,
        userExist: false,
        hasChanged: false,
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
    mounted() {
      this.$refs.address.update(this.profile.address)
    },
  }

</script>

<style lang="sass" scoped>
  
</style>
