import axios from 'axios'

const axiosApi = (url, endPoint, payload = {}, operation = 'GET', headerParams = {}) => {
  try {
    const response = axios({
      method: operation,
      url: `${url}${endPoint}`,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        ...headerParams,
      },
      /**
       * Check if the payload is an empty object or not
       * Source: https://stackoverflow.com/questions/11480769/how-can-i-check-if-a-json-is-empty-in-nodejs
       */
      ...(Object.keys(payload).length !== 0 ? {
        body: JSON.stringify({
          ...payload,
        }),
      } : null),
    })

    return response
  } catch (err) {
    return err
  }
}

export default axiosApi
