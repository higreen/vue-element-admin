import axios from 'axios'
import Swal from 'sweetalert2'
import { Message } from 'element-ui'
import { getAuth } from '@/assets/auth'
import store from '@/store'
import router from '@/router/index.js'

// 创建实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: { Authorization: '' },
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const auth = getAuth()
  if (auth) {
    config.headers.Authorization = auth
  }

  // 删除请求
  if (config.method === 'delete') {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: '确定要删除吗?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#ccc',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(res => {
        if (res.isConfirmed) {
          resolve()
        } else {
          reject()
        }
      })
    }).then(() => {
      return config
    }).catch(() => {
      return Promise.reject()
    })
  }

  return config
}, error => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use(response => {
  const res = response.data

  // 是否自身处理异常
  if (response.config.selfCatch) {
    if (res.code === 0) {
      return res.data
    } else {
      return Promise.reject(res)
    }
  }

  // 判断状态码
  switch (res.code) {
    case 0:
      return res.data
    case 401:
      store.dispatch('user/signOut')
      router.push('/login')
      return Promise.reject()
    case 406:
      Message({
        message: res.msg,
        type: 'error',
      })
      return Promise.reject()
    case 412:
      Swal.fire('操作失败', res.msg, 'warning')
      return Promise.reject()
    case 500:
      Swal.fire('系统故障', '服务器内部错误，请联系开发者', 'error')
      return Promise.reject()
    default:
      Message({
        message: res.msg,
        type: 'error',
      })
      return Promise.reject()
  }
}, error => Promise.reject(error))

export default instance
