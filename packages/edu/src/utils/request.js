import axios from "axios"
import Qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1) {
      config.transformRequest = [function (data) {
        data = Qs.stringify(data)
        return data
      }]
    }

    // if (store.getters.token) {
    //   // config.headers['Authorization'] = getToken()
    // }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data

    return res
  },
  (error) => {
    console.log("err" + error)

    return Promise.reject(error)
  }
)

export default service
