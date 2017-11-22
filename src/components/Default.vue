<template>
  <div>
    <div class="columns">
      <div class="column is-12">
        <section class="hero is-info welcome is-small is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Hello, {{ profile.name }}
              </h1>
              <h2 class="subtitle">
                I hope you are having a great day!
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <div class="notification is-warning">
          <button class="delete"></button> Please navigate to
          <a>Profile Settings</a> to update your personal information
        </div>
      </div>
    </div>
    <div class="columns card_container">
      <div class="column is-6">
        <div class="card events-card">
          <header class="card-header">
            <p class="card-header-title">
              Schedules
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-table">
            <div class="content">
              <table class="table is-fullwidth is-striped">
                <tbody>
                  <tr>
                    <td width="5%">
                      <i class="fa fa-bell-o"></i>
                    </td>
                    <td>Lorum ipsum dolem aire</td>
                    <td>
                      <a class="button is-small is-primary" href="#">Action</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-table">
            <div class="content">
              <table class="table is-fullwidth is-striped">
                <tbody>
                  <tr>
                    <td width="5%">
                      <i class="fa fa-bell-o"></i>
                    </td>
                    <td>Lorum ipsum dolem aire</td>
                    <td>
                      <a class="button is-small is-primary" href="#">Action</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-table">
            <div class="content">
              <table class="table is-fullwidth is-striped">
                <tbody>
                  <tr>
                    <td width="5%">
                      <i class="fa fa-bell-o"></i>
                    </td>
                    <td>Lorum ipsum dolem aire</td>
                    <td>
                      <a class="button is-small is-primary" href="#">Action</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">View All</a>
          </footer>
        </div>
      </div>
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
                  <time>{{ currentDate }}</time>
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
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentDate() {
      const today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1 // January is 0!
      const yyyy = today.getFullYear()

      if (dd < 10) {
        dd = `0${dd}`
      }

      if (mm < 10) {
        mm = `0${mm}`
      }

      return `${mm}/${dd}/${yyyy}`
    },
  },
  data() {
    this.profile = this.$attrs
    return {}
  },
}
</script>

