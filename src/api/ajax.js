//axios 默认的请求体参数是json格式,需 qs 转换
import axios from 'axios'
import qs from 'qs'
import router from '../router/index.js'
const instance = axios.create({
  baseURL: '/api', //代理转发
  timeout: 2000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
  const data = config.data;
  //axios默认请求体格式是json对象 --> url-encodie
  if (data instanceof Object) {
    config.data =  qs.stringify(data)
  }
  //携带token的方式：1.cookie 2. 请求参数 3.请求头[authorization]
  let token = localStorage.getItem('token_key')
  if (config.headers.needToken) {
    if (token) {
      config.headers.authorization = token
    }else {
      throw Error('请先登录')
    }
  }
  return config;
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  const data = response.data
  return data
}, function (error) {
  console.log(error.message);
  //默认返回成功的promise实例，但没有数据
  if (!error.response) {//请求没有发出去，在拦截器报的错
    alert('请登录')
    // 跳转至登录页
    if (router.currentRoute.value.path !== '/login') {
      router.replace('/login')
    }
  }else if(error.response.states === 401)
  alert('token过期，重新登录')
  if (router.currentRoute.value.path !== '/login') {
    router.replace('/login')
  }else if(error.response.states === 404){
    alert('请求资源不在')
  }else {
    alert('请求错误')
  } 
  // return Promise.reject(error);
  //同一处理异常
  return new Promise(()=>{})
});

export default instance