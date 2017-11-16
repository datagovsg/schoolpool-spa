import auth0 from 'auth0-js'
import EventEmitter from 'EventEmitter'
import router from '../src/router/index'

export default class AuthService {
  constructor() {
    this.authenticated = AuthService.isAuthenticated()
    this.authNotifier = new EventEmitter()
    this.auth0 = new auth0.WebAuth({
      domain: 'schoolpool.auth0.com',
      clientID: '9cvkRePcJ9271Uo46NgwJjxJBPotOaHZ',
      redirectUri: 'http://localhost:8080/callback',
      audience: 'https://schoolpool.auth0.com/userinfo',
      responseType: 'token id_token',
      // The specify the type of data is required from external service
      scope: 'openid profile email',
    })
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = AuthService.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        console.log(err)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', this.authenticated = true)
  }

  logout() {
    console.log('triggered')
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('home')
  }

  static isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
