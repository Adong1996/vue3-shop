//axios 默认的请求体参数是json格式,需 qs 转换
import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
  baseURL: '/api', //代理转发
  timeout: 2000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
  const data = config.data;
  if (data instanceof Object) {
    config.data =  qs.stringify(data)

  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  const data = response.data
  return data
}, function (error) {
  // return Promise.reject(error);
  //同一处理异常
  return new Promise(()=>{})
});

export default instance