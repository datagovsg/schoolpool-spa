<template>
  <div v-if="this.profile">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48 profile-image">
              <img :src="profileImage" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{profile.name}}</p>
            <p class="subtitle is-6">+65 | {{profile.phoneNumber}}</p>
          </div>
        </div>
        <div class="content">
          <h6 class="content-header">Address</h6>
          <p>{{ profile.address }}</p>
          <br>
          <div class="columns is-mobile">
            <div class="column is-10">
              <h6 class="content-header">School</h6>
            </div>
            <div class="column is-2">
              <h6 class="content-header">Children</h6>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-10">
              <p>{{ school }}</p>
            </div>
            <div class="column is-2">
              <p>{{ children }}</p>
            </div>
          </div>
          <button class="button is-danger" v-on:click="showModal = !showModal">UNPAIR</button>
        </div>
      </div>
    </div>
    <div v-bind:class="[{ 'is-active': showModal }, 'modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm unpair</p>
          <button class="delete" aria-label="close" v-on:click="showModal = !showModal"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to unpair with <strong>{{ profile.name }}</strong>? You will <strong>not be able to undo</strong> this action and will be automatically paired with another parent.</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger">Unpair</button>
          <button class="button" v-on:click="showModal = !showModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import * as SchoolSession from '../specs/sessions/school'

  const stockImage = require('../assets/user.png')

  export default {
    props: {
      profile: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        school: '',
        profileImage: '',
        children: 1,
        showModal: false,
      }
    },
    created() {
      this.profileImage = (this.profile.profileURL === undefined) ?
        stockImage :
        this.profile.profileURL
      SchoolSession.default(this.profile.schoolAddress[0]).then((res) => {
        const { result = {} } = res.data
        const { records = [] } = result
        // Assume that a single postal code contains only 1 school
        this.school = records[0].school_name
      })
    },
  }

</script>

<style lang="sass" scoped>

  .media
    padding-bottom: 15px
    border-bottom: 1px solid #ecf0f1
  .content .button 
    width: 100% 
  .content-header 
    font-weight: 500
    margin-bottom: 0 !important 
  .columns .column 
    padding-top: 0 !important 
    padding-bottom: 0 !important

</style>
