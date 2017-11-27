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
                <input class="input" disabled type="email" :placeholder="(profile.email === undefined ? profile.name: profile.email)">
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
                <input :disabled="userExist" class="input" v-model="phoneNumber" type="number" placeholder="Mobile no.">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <vue-google-autocomplete
                  ref="address"
                  id="map"
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
          <partner :profile="profile"></partner>
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
  import User from '../specs/models/user'
  
  export default {
    components: {
      GoogleMaps,
      AutoComplete,
      VueGoogleAutocomplete,
      Partner,
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
          // If user does not exist in database, perform a POST API registration request
          if (this.userExist === false) {
            // Add user properties for user registration
            user.phoneNumber = this.phoneNumber
            await UserSession.register(user, localStorage.getItem('id_token')).then((response) => {
              const { data = {} } = response
              const profile = data.user
              this.updateUserInformation(profile)
              isSuccessful = true
              this.profile = profile
            }).catch((error) => {
              console.log(error.response)
            })
          }
          // Perform a PUT API update request
          await UserSession.update(user, localStorage.getItem('id_token')).then((response) => {
            const { data = {} } = response
            const profile = data.user
            this.updateUserInformation(profile)
            isSuccessful = true
            this.profile = profile
          }).catch((error) => {
            console.log(error.response)
          })
          if (isSuccessful) {
            this.profileChanged()
            this.hasChanged = true
          }
        }
      },
      profileChanged() {
        this.$emit('profileChanged', this.profile)
      },
      addMarker(name, params) {
        if (params === null || params === '') {
          return
        }
        gMapSession.default(params).then((response) => {
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
      async updateUserInformation(profile) {
        this.phoneNumber = profile.phoneNumber
        this.addMarker('user', profile.address)
        // TODO: schoolAddress is an array and UI must cater to multiple schools
        await SchoolSession.default(profile.schoolAddress[0]).then(async (res) => {
          const { result = {} } = res.data
          const { records = [] } = result
          // Assume that a single postal code contains only 1 school
          this.school = records[0].school_name
          this.addMarker('school', records[0].postal_code)
        })
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
    async created() {
      this.profile = this.$attrs
      // Check if user was a registered member by phone number
      if (this.profile.phoneNumber === undefined) {
        return
      }
      // User exist in the database
      this.userExist = !this.userExist
      // Update form information
      this.updateUserInformation(this.profile)
      this.zoom = 11
    },
    mounted() {
      this.$refs.address.update(this.profile.address)
    },
  }

</script>

<style lang="sass" scoped>
  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0
</style>
