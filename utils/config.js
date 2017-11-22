const config = {
  serverURL: 'https://schoolpool-sp.herokuapp.com',
  googleMaps: {
    key: 'AIzaSyAm8UrU_IlJ1ZIcSUeESFm7HfeYELf6F-w',
  },
  auth0Lock: {
    clientID: '9cvkRePcJ9271Uo46NgwJjxJBPotOaHZ',
    domain: 'schoolpool.auth0.com',
    callbackURL: `${window.location.origin}/callback`,
    audience: 'https://schoolpool.auth0.com/userinfo',
  },
}

export default config
