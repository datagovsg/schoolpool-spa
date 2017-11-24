import axiosApi from '../index'
import apiConfig from '../config'

const endPoints = {
  register: '/users',
  geocode: '/geocode/json?address=',
}
/**
 * Function for user registration
 * @param {*} user => user information
 * @param {*} jwtToken => user JWT token
 */
export const register = (user, jwtToken) => axiosApi(apiConfig.serverURL, endPoints.register, user, 'POST', { token: jwtToken })
/**
 * Function to retrieve user's location
 * @param {*} postalCode => user postal code
 */
export const locate = postalCode => axiosApi(apiConfig.googleMaps.serverURL, `${endPoints.geocode}${postalCode}&key=${apiConfig.googleMaps.key}`)

