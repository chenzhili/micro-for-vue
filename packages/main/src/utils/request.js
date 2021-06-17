import axios from "axios"
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import Qs from 'qs'
import { ElMessageBox, ElMessage/* , Loading */ } from 'element-plus'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }

    if (config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1) {
      config.transformRequest = [function (data) {
        data = Qs.stringify(data)
        return data
      }]
    }
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
    if (res.code !== '000000') {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.reject(res.message)
    } else {
      return res
    }
  },
  (error) => {
    console.log("err" + error)
    if (error.response.status === 401) {
      ElMessage({
        message: '登录权限已失效，请重新登录',
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
      store.dispatch('user/resetToken').then(() => {
        const data = {
          code: -1,
          message: '登录权限已失效，请重新登录'
        }
        router.replace("/")
        return Promise.reject(data)
      })
    }
    return Promise.reject(error)
  }
)

export default service
