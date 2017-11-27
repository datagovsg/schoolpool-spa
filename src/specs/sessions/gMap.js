import axiosApi from '../index'
import apiConfig from '../config'

const endPoints = {
  geocode: '/geocode/json?address=',
}

/**
 * Function to retrieve user's location
 * @param {*} input => user input
 */
const locate = async input => axiosApi(apiConfig.googleMaps.serverURL, `${endPoints.geocode}${input}&key=${apiConfig.googleMaps.key}`)

export default locate
