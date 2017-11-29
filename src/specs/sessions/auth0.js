import axiosApi from '../index'
import apiConfig from '../config'

const endPoints = {
  users: '/users',
}

/**
 * Function to get user information
 * @param {*} userId => user id
 * @param {*} jwtToken => user JWT token
 */
const auth0 = async (userId, jwtToken) => axiosApi(apiConfig.auth0Lock.serverURL, `${endPoints.users}/${userId}`, {}, 'GET', { Authorization: `Bearer ${jwtToken}` })

export default auth0
