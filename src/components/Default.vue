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
                    <td>Fetch John Smith's children to <strong>Anderson Secondary School</strong></td>
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
        <partner :profile="profile"></partner>
      </div>
    </div>
  </div>
</template>

<script>
import Partner from './Partner'
// import * as UserSession from '../specs/sessions/user'

export default {
  components: {
    Partner,
  },
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
    console.log(this.profile)
    // UserSession.information(this.profile.sub, localStorage.getItem('id_token'))
    //   .then((response) => {
    //     console.log(response)
    //   })
    return {}
  },
}
</script>

