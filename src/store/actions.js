/*
vuex的actions模块
 */
import {reqAddress,
        reqCategorys, 
        reqShops,
        reqInfo,
        reqGoods,
        reqRatings} from '../api'
import {RECEIVE_ADDRESS, 
        RECEIVE_CATEGORYS, 
        RECEIVE_SHOPS, 
        RECEIVE_USER,
        RECEIVE_TOKEN,
        RECEIVE_INFO,
        RECEIVE_GOODS,
        RECEIVE_RATINGS,
        ADD_FOOD_COUNT,
        REDUCE_FOOD_COUNT
      } from './mutation-types'

export default {
  // 异步获取地址
  async getAddress({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqAddress(longitude,latitude)
    if (result.code===0) {
      commit(RECEIVE_ADDRESS,{address: result.data})
    }
  },
  // 异步获取分类列表
  async getCategorys({commit}) {
    const result = await reqCategorys() 
    if (result.code===0) {
      commit(RECEIVE_CATEGORYS, {categorys: result.data})
    }
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
  //异步保存商家信息
  async getInfo({commit}) {
    const result = await reqInfo()
    if (result.code===0) {
      commit(RECEIVE_INFO,{info:result.data})
    }
  },
  //异步保存商家商品
  async getGoods({commit}) {
    const result = await reqGoods()
    if (result.code===0) {
      commit(RECEIVE_GOODS,{goods:result.data})
    }
  },
  //异步保存商家评论
  async getRatings({commit}) {
    const result = await reqRatings()
    if (result.code===0) {
      commit(RECEIVE_RATINGS,{ratings:result.data})
    }
  },
  //更新food中的数量的同步action
  updateFoodCount({commit},{isAdd,food}) {
    if(isAdd){
      commit(ADD_FOOD_COUNT,food)
    }else{
      commit(REDUCE_FOOD_COUNT,food)
    }
  }
}