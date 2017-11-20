import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state: {
    isLogged: new Date().getTime() < JSON.parse(localStorage.getItem('expires_at')),
  },
  getters: {
    isLoggedIn(state) {
      return state.isLogged
    },
  },
  mutations: {
    LOGIN_PROFILE(state, status = true) {
      state.isLogged = status
    },
    LOGOUT_PROFILE(state) {
      state.isLogged = false
    },
  },
  actions: {
    login({ commit }, profile) {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('profile', JSON.stringify(profile))
          commit('LOGIN_PROFILE')
          resolve()
        }, 1000)
      })
    },
    logout({ commit }) {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('profile')
      commit('LOGOUT_PROFILE')
    },
  },
})
