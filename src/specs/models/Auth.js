import Auth0Lock from 'auth0-lock'
import router from '../../router/index'
import Store from '../../store/index'
import Config from '../config'

export class Auth {
  constructor() {
    this.authenticated = Auth.isAuthenticated()
    // Initializing our Auth0Lock
    this.lock = new Auth0Lock(
      Config.auth0Lock.clientID,
      Config.auth0Lock.domain,
      {
        oidcConformant: true,
        auth: {
          redirectUrl: Config.auth0Lock.callbackURL,
          audience: Config.auth0Lock.audience,
          responseType: 'token id_token',
          // The specify the type of data is required from external service
          params: {
            scope: 'openid profile email',
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
          router.replace('control-panel')
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
    this.authResult = authResult
  }

  logout() {
    Store.dispatch('logout')
    // navigate to the home route
    router.replace('home')
    this.authResult = null
  }

  static async isAuthenticated() {
    // Check whether the current time is past the access token's expiry time
    const expiresAt = await JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

// Function to authenticate a user before rendering a component
export function requireAuth(to, from, next) {
  if (!Store.getters.isLoggedIn) {
    next({
      path: '/',
    })
  } else {
    next()
  }
}
