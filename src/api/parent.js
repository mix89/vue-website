// import axios from 'axios'
// import {
//   getToken
// } from '@/utils/auth'

// const service = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 5000 // 请求超时时间
// })
// export function requestPost(url, params) {
//   return service({
//     method: "post",
//     url: url,
//     data: params,
//     headers: {
//       'token': getToken()
//     }
//   })
// }
// export function requestGet(url, params) {
//   return service({
//     url,
//     method: 'get',
//     params
//   })
// }

// export default service


import axios from 'axios'
import {
  getToken
} from '@/utils/auth'
import {
  getUUID
} from '@/utils/uuid'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  // withCredentials: true
})

// axios.defaults.withCredentials= true  //保持session一致性
export function request(url, methed, params) {
  if (params == null) {
    params = {}
  }
  let data = {
    "request_id": getUUID(),
    "timestamp": new Date().getTime(),
    "source": 1,
    "app_version": "1.0.0",
    "request_data": params
  }
  let res = service({
    method: methed,
    url: url,
    data: data,
    headers: {
      'token': sessionStorage.getItem('token_front')
    }
  })
  res.then(response => {
    if(response.data.code === 403){
      store.dispatch('FedLogOut').then(() => {
        // this.$router.push({ path: '/login'})
      })
    }
  })
  return res
}

export function requestPost(url, params) {
  return request(url, 'post', params)
}

export function requestGet(url) {
  return request(url, 'get')
}

export function downloadFile(url,fileName) {
  let path = process.env.BASE_API + '/api/upload/download?url='+url +"&fileName="+fileName
  return window.open(path)
}

export default service
