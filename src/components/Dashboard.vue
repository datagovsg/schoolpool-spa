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
              Schedules - Coming soon
            </p>
            <!-- <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a> -->
          </header>
          <!-- <div class="card-table">
            <div class="content">
              <table class="table is-fullwidth is-striped">
                <tbody>
                  <tr>
                    <td width="5%">
                      <i class="fa fa-bell-o"></i>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> -->
          <!-- <footer class="card-footer">
            <a href="#" class="card-footer-item">View All</a>
          </footer> -->
        </div>
      </div>
      <div v-if="pairedProfile" class="column is-6">
        <partner :profile="pairedProfile"></partner>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import Partner from './Partner'

export default {
  name: 'Dashboard',
  props: {
    profile: {
      type: Object,
      required: true,
    },
    pairedProfile: {
      type: Object,
      required: false,
    },
  },
  components: {
    Partner,
  },
  computed: {
    currentDate() {
      return moment().format('MMMM Do YYYY, h:mm:ss a')
    },
  },
}
</script>

