import axiosApi from '../index'
import apiConfig from '../config'

const endPoints = {
  users: '/users',
}
/**
 * Function for user registration
 * @param {*} user => user information
 * @param {*} jwtToken => user JWT token
 */
export const register = (user, jwtToken) => axiosApi(apiConfig.serverURL, endPoints.users, user, 'POST', { token: jwtToken })
/**
 * Function for user registration
 * @param {*} user => user information
 * @param {*} jwtToken => user JWT token
 */
export const update = (user, jwtToken) => axiosApi(apiConfig.serverURL, endPoints.users, user, 'PUT', { token: jwtToken })
/**
 * Function for user authentication
 * @param {*} jwtToken => user JWT token
 */
export const authenticate = async jwtToken => axiosApi(apiConfig.serverURL, endPoints.users, {}, 'GET', { token: jwtToken })
/**
 * Function to get user information
 * @param {*} userId => user id
 * @param {*} jwtToken => user JWT token
 */
export const information = async (userId, jwtToken) => axiosApi(apiConfig.serverURL, `${endPoints.users}/${userId}`, {}, 'GET', { token: jwtToken })
