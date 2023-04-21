import axios from 'axios'
import { ElMessage } from 'element-plus'


// 创建axios实例
const http = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 0 // 请求超时时间
})

// request拦截器
http.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
http.interceptors.response.use(
  /**
   * 如果您想获得http信息，如头信息或状态信息，请返回  response => response
   */
  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您也可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data
    if (res.code !== 0) {
      ElMessage({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    ElMessage({
      message: '服务不可达，请通知管理员或者稍后再试~',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 封装get方法
export function get(url: string, params) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 封装post请求
export function post(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    http.post(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

// 封装put方法
export function put(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    http.put(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

// 封装delete方法
export function del(url: string) {
  return new Promise((resolve, reject) => {
    http.delete(url)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}