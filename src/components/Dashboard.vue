<template>
  <div class="hero is-fullheight admin_container">
    <div class="container">
      <div class="notification is-warning">
          <button class="delete"></button>
          You have not completed your <strong>registration!</strong> Navigate to <a>Profile Settings</a> to update your personal information.
      </div>
      <div class="columns">
        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              General
            </p>
            <ul class="menu-list">
              <li>
                <a class="is-active">Dashboard</a>
              </li>
              <li>
                <a>Schedule</a>
              </li>
            </ul>
            <p class="menu-label">
              Administration
            </p>
            <ul class="menu-list">
              <li>
                <a>Profile Settings</a>
              </li>
              <li>
                <a>View Partner</a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column is-9">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    profile() {
      return JSON.parse(localStorage.getItem('profile'))
    },
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
  created() {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then((response) => {
      // JSON responses are automatically parsed.
        this.posts = response.data
      })
      .catch((e) => {
        this.errors.push(e)
      })
  },
}

</script>

<style lang="sass" scoped>

  .admin_container
    background-color: #ecf0f1
    padding-top: 20px
  
  .card_container
    margin: 20px auto

  .menu-list li a
    font-weight: 700

</style>
