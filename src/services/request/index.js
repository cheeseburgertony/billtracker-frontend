import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import { Toast } from "zarm";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true, // 当需要在跨域请求中发送或接收 Cookies 时，需要将 withCredentials 设置为 true
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否有token，设置请求头，携带token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // 返回的非200的进行错误提示
  if (response.data.code !== 200) {
    // 处理401错误(token失效)
    if (response.data.code === 401) {
      Toast.show('登录过期,请重新登录')
      setTimeout(() => {
        window.location.href = '/login'
      }, 300)
    } else {
      Toast.show(response.data.msg)
    }
  }
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么  
  Toast.show(error.response.data.message)
  return Promise.reject(error);
});


export default request
