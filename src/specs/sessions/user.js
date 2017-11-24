import axiosApi from '../index'
import apiConfig from '../config'

const endPoints = {
  register: '/users',
}
/**
 * Function for user registration
 * @param {*} user => user information
 * @param {*} jwtToken => user JWT token
 */
const register = (user, jwtToken) => axiosApi(apiConfig.serverURL, endPoints.register, user, 'POST', { token: jwtToken })

export default register

