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
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>John Smith</strong>
                    <small>@johnsmith</small>
                    <small>31m</small>
                    <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas.
                    Nullam condimentum luctus turpis.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoogleMaps from './GoogleMaps'

  export default {
    components: {
      GoogleMaps,
    },
  }

</script>

<style lang="sass" scoped>
  
  GoogleMaps 
    height: 250px
    
</style>
