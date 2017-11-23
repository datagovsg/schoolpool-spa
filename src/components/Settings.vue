<template>
  <div class="columns">
    <div class="column">
      <div class="columns">
        <div class="column is-12">
          <GoogleMaps></GoogleMaps>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">
                  </p>
                </div>
              </div>
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <br>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
        <div class="column is-6">
          <form>
            <!-- Input grouping. Reference: https://bulma.io/2017/03/10/new-field-element/ -->
            <div class="field is-grouped">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
              <p class="control is-expanded has-icons-left">
                <input class="input" type="number" placeholder="Mobile No.">
                <span class="icon is-small is-left">
                  +65
                </span>
              </p>
            </div>
            <div class="field is-grouped has-addons">
              <div class="control is-expanded has-icons-left">
                <AutoComplete :suggestions="schools" v-model="school" @interface="selectedSchool = $event"></AutoComplete>
              </div>
              <div class="control">
                <span class="select is-fullwidth">
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="search" placeholder="Address">
                <span class="icon is-small is-left">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import GoogleMaps from './GoogleMaps'
  import Config from '../../utils/config'
  import AutoComplete from './AutoComplete'

  export default {
    components: {
      GoogleMaps,
      AutoComplete,
    },
    watch: {
      // whenever question changes, this function will run
      school() {
        this.fetchSchools()
      },
    },
    methods: {
      fetchSchools: _.debounce(function getSchools() {
        if (this.school.trim() === '') {
          this.schools = []
          return
        }
        const { govData = {} } = Config
        const vm = this
        axios.get(`${govData.serverURL}?resource_id=${govData.schoolEndpoint}&q=${this.school}`)
          .then((response) => {
            // JSON responses are automatically parsed.
            const { records } = response.data.result
            vm.schools = records
          })
          .catch((e) => {
            console.log(e.response)
          })
      }, 100),
    },
    data() {
      return {
        selectedSchool: null,
        school: '',
        schools: [],
      }
    },
    created() {
      this.profile = this.$attrs
    },
  }

</script>

<style lang="sass" scoped>

</style>
