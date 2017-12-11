<template>
  <footer class="footer">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-3 has-text-centered">
          <h1 class="title">About us</h1>
          <p id="customSubtitle">To contact us or have any enquires, please email us at <a href="mailto:info@tech.gov.sg">info@tech.gov.sg</a></p>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-3 has-text-centered">
          <p class="subtitle">A product by GovTech</p>
          <button v-on:click="showModal = !showModal" class="button is-text">Privacy Statement</button>
        </div>
      </div>
    </div>
    <policy v-if="showModal" v-on:visible="toggleModal"></policy>
  </footer>
</template>

<script>
import Policy from './Policy'

export default {
  components: {
    Policy,
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>

<style lang="sass" scoped>

@import '../style/mq'
footer
  background-color: whitesmoke !important
  color: #fff
  .icon
    color: #fff
    margin-left: 20px
  .logo 
    width: 13.333333% !important
  #customSubtitle
    color: #363636
    a
      color: #363636
      text-decoration: underline
      &:hover
        border-bottom: 1px double

</style>
