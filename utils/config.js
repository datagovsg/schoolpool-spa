const config = {
  serverURL: 'https://schoolpool-sp.herokuapp.com',
  googleMaps: {
    key: 'AIzaSyAm8UrU_IlJ1ZIcSUeESFm7HfeYELf6F-w',
  },
  govData: {
    serverURL: 'https://data.gov.sg/api/action/datastore_search',
    schoolEndpoint: 'ede26d32-01af-4228-b1ed-f05c45a1d8ee',
  },
  auth0Lock: {
    clientID: '9cvkRePcJ9271Uo46NgwJjxJBPotOaHZ',
    domain: 'schoolpool.auth0.com',
    callbackURL: `${window.location.origin}/callback`,
    audience: 'https://schoolpool.auth0.com/userinfo',
  },
}

export default config
