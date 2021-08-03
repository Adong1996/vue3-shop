/*
vuex的actions模块
 */
import {reqAddress,
        reqCategorys, 
        reqShops,
        // reqInfo,
        // reqGoods,
        // reqRatings,
        reqShop
      } from '../api'
import {RECEIVE_ADDRESS, 
        RECEIVE_CATEGORYS, 
        RECEIVE_SHOPS, 
        RECEIVE_USER,
        RECEIVE_TOKEN,
        RECEIVE_INFO,
        RECEIVE_GOODS,
        RECEIVE_RATINGS,
        ADD_FOOD_COUNT,
        REDUCE_FOOD_COUNT,
        RECEIVE_SHOP
      } from './mutation-types'
import { getCarList } from "../utils/shop.js";
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
  updateFoodCount({commit},{isAdd,food}) {
    if(isAdd){
      commit(ADD_FOOD_COUNT,food)
    }else{
      commit(REDUCE_FOOD_COUNT,food)
    }
  },
  //异步请求商家
  async getShop({commit, state}, id) {
    if (id == state.shop.id) {
      return
    }
    // if (state.shop.id) {
    //   commit(RECEIVE_SHOP, {}) // 空容器中不带shop对象
    // }
    const result = await reqShop(id)
    if (result.code===0) {
      const shop = result.data
      //读取sessiionStorage的数据
      const carList =  getCarList(shop)
      commit(RECEIVE_SHOP, {shop, carList})
    }
  },
}