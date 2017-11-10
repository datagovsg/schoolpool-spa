<template>
  <div class="content">
    <div class="card-shadow">
      <h4>{{ signIn }}</h4>
      <div class="g-signin2"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        signIn: 'Sign in',
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content {
    background-image: url("../assets/background-image.jpeg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  } 
  // Reference: https://codepen.io/sdthornton/pen/wBZdXq
  .card-shadow {
    background: #fff;
    border-radius: 2px;
    height: 40%;
    width: 50%;
    padding: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    .card-shadow {
      width: 80%;
    }
  }

</style>
