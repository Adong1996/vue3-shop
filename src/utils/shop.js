/*
  指定商家的购物车数据
 */
//shopId_key: {foodId1: count1, foodId2: count2}
export function saveCarList(shopId, carList ) {
  const carCounts = carList.reduce((pre, food)=>{
    pre[food.id] = food.count
    return pre
  },{})

  //保存sessionStorage
  sessionStorage.setItem(shopId + '_key', JSON.stringify(carCounts))
}

//读取sessionStorage中carList的数据
//shopId_key: {foodId1: count1, foodId2: count2}
export function getCarList(shop) {
  const carList = []
  const carCounts =  JSON.parse(sessionStorage.getItem(shop.id + '_key')) || {}
  shop.goods.forEach(item => {
    // console.log(foods);
    item.foods.forEach(food => {
      const count = carCounts[food.id]
      if (count > 0) {
        food.count = count
        carList.push(food)
      }
    });
  });
  return carList
}