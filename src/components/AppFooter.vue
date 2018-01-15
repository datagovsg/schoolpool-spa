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
          <button v-on:click="showPolicyModal = !showPolicyModal" class="button is-text">Privacy Statement</button>
          <button v-on:click="showTermsModal = !showTermsModal" class="button is-text">Terms of Use</button>
        </div>
      </div>
    </div>
    <policy v-if="showPolicyModal" v-on:visible="togglePolicyModal"></policy>
    <terms v-if="showTermsModal" v-on:visible="toggleTermsModal"></terms>
  </footer>
</template>

<script>
import Policy from './Policy'
import Terms from './Terms'

export default {
  components: {
    Policy,
    Terms,
  },
  data() {
    return {
      showPolicyModal: false,
      showTermsModal: false,
    }
  },
  methods: {
    togglePolicyModal() {
      this.showPolicyModal = !this.showPolicyModal
    },
    toggleTermsModal() {
      this.showTermsModal = !this.showTermsModal
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
