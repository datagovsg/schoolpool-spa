import Auth0Lock from 'auth0-lock'
import EventEmitter from 'EventEmitter'
import router from '../src/router/index'
import Store from '../src/store/index'

export class AuthService {
  constructor() {
    this.authenticated = AuthService.isAuthenticated()
    this.authNotifier = new EventEmitter()
    // Initializing our Auth0Lock
    this.lock = new Auth0Lock(
      '9cvkRePcJ9271Uo46NgwJjxJBPotOaHZ',
      'schoolpool.auth0.com',
      {
        oidcConformant: true,
        auth: {
          redirectUrl: 'http://localhost:8080/callback',
          audience: 'https://schoolpool.auth0.com/userinfo',
          responseType: 'token id_token',
          // The specify the type of data is required from external service
          params: {
            scope: 'openid profile',
          },
        },
      },
    )
    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    this.lock.show()
  }

  handleAuthentication() {
    // Listening for the authenticated event
    this.lock.on('authenticated', (authResult) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return
        }
        Store.dispatch('login', profile).then(async () => {
          await this.setSession(authResult)
          router.replace('dashboard')
        })
      })
    })
  }

  async setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout() {
    this.authNotifier.emit('authChange', false)
    Store.dispatch('logout')
    // navigate to the home route
    router.replace('home')
  }

  static async isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = await JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

export function requireAuth(to, from, next) {
  if (!Store.getters.isLoggedIn) {
    next({
      path: '/',
    })
  } else {
    next()
  }
}
