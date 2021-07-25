/*
vuex的actions模块
 */
import {reqAddress, reqCategorys, reqShops, reqLogin} from '../api'
import {RECEIVE_ADDRESS, 
        RECEIVE_CATEGORYS, 
        RECEIVE_SHOPS, 
        RECEIVE_USER,
        RECEIVE_TOKEN
      } from './mutation-types'

export default {
  // 异步获取地址
  async getAddress({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqAddress(longitude,latitude)
    commit(RECEIVE_ADDRESS,{address: result.data})
  },
 
 

  // 异步获取分类列表
  async getCategorys({commit}) {
    const result = await reqCategorys()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },

  // 异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  //异步保存用户信息
  getUser({commit},{user}) {
    const {token} = user
    if (token) {
      commit(RECEIVE_TOKEN,{token})
      localStorage.setItem('token_key',token)
    }
    delete user.token
    commit(RECEIVE_USER,{user})
  },
}