import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

//request interceptor
service.interceptors.request.use(
  config => {
    console.log(config.url)
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
