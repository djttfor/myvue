import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// //request interceptor
// service.interceptors.request.use(
//   config => {

//     if (store.getters.token) {
//       config.headers['Authorization'] = 'Bearer' + getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

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
