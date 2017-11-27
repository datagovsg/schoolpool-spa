import axiosApi from '../index'
import apiConfig from '../config'

const endPoints = {
  school: 'ede26d32-01af-4228-b1ed-f05c45a1d8ee&q=',
}
/**
 * Function to search for schools
 * @param {*} input => search parameters
 */
const search = async input => axiosApi(apiConfig.govServerURL, `?resource_id=${endPoints.school}${input}`)

export default search

