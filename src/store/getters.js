export default {
  //总价格
  getCarPrice(state) {
    return state.carList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.count * currentValue.price
    }, 0);
  },
  // 总数量
  getCarAll(state) {
    return state.carList.reduce((accumulator, currentValue) => {
      return  accumulator + currentValue.count
    }, 0);
  },
  //还差多少钱起送
   
  getLastPrice(state, getters) {
    if (state.shop.info) {
      return getters.getCarPrice - state.shop.info.minPrice
    }
  },
}