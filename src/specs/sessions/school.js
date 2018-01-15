import axiosApi from '../index'
import apiConfig from '../config'

/**
 * Function to search for schools
 * @param {*} input => search parameters
 */
const school = input => axiosApi(apiConfig.dataGov.serverURL, `?resource_id=${apiConfig.dataGov.resourceID}&q=${input}`)

export default school

