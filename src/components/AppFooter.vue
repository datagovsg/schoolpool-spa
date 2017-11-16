<template>
  <footer class="footer is-primary">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p>And this right here is a spiffy footer, where you can put stuff.</p>
        </div>
        <div class="column has-text-right">
          <a class="icon" href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a class="icon" href="#">
            <i class="fa fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import '../style/mq'
footer
  background-color: $primary !important
  color: #fff

  .icon
    color: #fff
    margin-left: 20px
</style>
