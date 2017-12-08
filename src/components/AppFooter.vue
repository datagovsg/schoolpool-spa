<template>
  <footer class="footer">
    <div class="container">
      <div class="columns is-centered">
        <div class="column logo is-2">
          <div class="image is-square">
            <img src="../assets/GovTech.png" />
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-3">
        <!-- todo site map -->
        </div>
        <div class="column is-3">
        <!-- todo contact us -->
        </div>
        <div class="column is-3">
        <!-- todo other links?? -->
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import '../style/mq'
footer
  background-color: whitesmoke !important
  color: #fff

  .icon
    color: #fff
    margin-left: 20px
  a
    color:#ffffff
    &:hover
      text-decoration: underline
  .logo 
    width: 13.333333% !important
</style>
