<template>
  <div class="columns">
    <div class="column">
      <div class="columns">
        <div class="column is-12">
          <GoogleMaps :center="center" :markers="markers"></GoogleMaps>
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
                  v-on:placechanged="getAddressData"
                >
                </vue-google-autocomplete>
              </p>
            </div>
            <div class="field is-grouped has-addons">
              <div class="control is-expanded has-icons-left">
                <label class="label">School</label>
                <auto-complete placeholder="S. by name/region" :suggestions="schools" v-model="school" @interface="getSelectedSchoolData($event)"></auto-complete>
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
  import User from '../specs/models/user'
  
  export default {
    components: {
      GoogleMaps,
      AutoComplete,
      VueGoogleAutocomplete,
    },
    watch: {
      // whenever question changes, this function will run
      school() {
        this.fetchSchools()
      },
    },
    methods: {
      onSubmit() {
        // console.log(this.phoneNumber)
        // console.log(this.selectedSchool.postal_code)
        // console.log(this.address)
        if (this.address !== undefined) {
          const { placeResultData = {}, addressData = {} } = this.address
          const user = new User(
            this.phoneNumber,
            this.profile.name,
            placeResultData.formatted_address,
            addressData.latitude,
            addressData.longitude,
            [this.selectedSchool.postal_code],
          )
          UserSession.register(user, localStorage.getItem('id_token')).then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error.response)
          })
        }
      },
      addMarker(name) {
        UserSession.locate(this.selectedSchool.postal_code).then((response) => {
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
        for (let i = 0; i < this.markers.length; i++) {
          if (this.markers[i].name === name) {
            index = i
            break
          }
        }
        this.markers.splice(index, 1)
      },
      getSelectedSchoolData(event) {
        this.selectedSchool = event
        // Check if selected school is defined
        if (this.selectedSchool !== undefined && this.selectedSchool !== null) {
          this.addMarker()
        } else {
          this.removeMarker()
        }
      },
      getAddressData(addressData, placeResultData) {
        this.address = {
          placeResultData,
          addressData,
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
        selectedSchool: null,
        school: '',
        schools: [],
        phoneNumber: null,
        center: { lat: 1.3521, lng: 103.8198 },
        markers: [],
      }
    },
    created() {
      this.profile = this.$attrs
    },
  }

</script>

<style lang="sass" scoped>

</style>
