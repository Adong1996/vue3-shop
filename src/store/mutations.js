import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  DELETE_USER,

  // RECEIVE_INFO,
  // RECEIVE_GOODS,
  // RECEIVE_RATINGS,

  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  DELETEL_CAR_LIST,
  RECEIVE_SHOP
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state,{address}) {
    state.address = address 
  },
  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER](state,{user}) {
    state.user = user
  },
  [RECEIVE_TOKEN](state,{token}) {
    state.token = token
  },
  [DELETE_USER](state) {
    state.user = '';
    state.token = ''
  },

  [ADD_FOOD_COUNT](state,food) {
    if (food.count) {
      food.count++
    }else{
      food.count = 1
      state.carList.push(food)      
    }
  },
  [REDUCE_FOOD_COUNT](state,food) {
    if(food.count > 0){
      food.count--
      if (food.count===0) {
        state.carList.splice(state.carList.indexOf(food), 1)
      }
    }
  },
  [DELETEL_CAR_LIST](state) {
    state.carList.forEach(item => {
      // delete item.count
      item.count = ''
    });
    state.carList = []
  },
  //保存商家
  [RECEIVE_SHOP](state, {shop={},carList=[]}) {
    state.shop = shop;
    state.carList = carList
  }
}