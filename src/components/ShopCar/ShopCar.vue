<template>
  <div class="shopcart" v-if="info">
    <div class="content">
      <div class="contentLeft" @click="showList">
        <div class="logo-wrapper" :class="{onLogoWrapper:carAll>0}">
          <div class="logo">
            <i class="iconfont icon-FontAwesomecartarrowdown"></i>
            <div :class="{num:carAll>0}">{{carAll}}</div>
          </div>
        </div>
        <div class="price">￥{{carPrice}}</div>
        <div class="desc">另还需配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <div class="contentRigth" >
        <div v-if="!carAll">￥{{info.minPrice}}元起送</div>
        <div v-else :class="{oncontentRigth:lastPrice >= 0}">{{lastPrice < 0? `还差￥${-lastPrice}起送` : '去结算' }}</div>
      </div>
      
    </div>
    <div class="shopcart-list" v-show="isList && carList.length > 0" >
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="deleCarList">清空</span>
      </div>
      <div class="list-content" ref="BsListe">
        <ul>
          <li class="food" v-for="item in carList">
            <span class="name">{{item.name}}</span>
            <div class="price">￥{{item.price}}</div>
            <div class="cartcontrol-wrapper">
              <CarContorl :item='item'></CarContorl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="list-mask" v-show="isList && carList.length > 0" @click="showList"></div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref, onUpdated, nextTick } from "vue";
import BScroll from '@better-scroll/core'
import CarContorl from '../CarContorl/CarContorl'
import { DELETEL_CAR_LIST } from "../../store/mutation-types";
export default {
  components: {
    CarContorl
  },
  setup() {
    const store = useStore()
    //商家信息
    const info = computed(()=>store.state.shop.info)
    //总价格
    const carPrice = computed(()=>store.getters.getCarPrice)
     // 总数量
    const carAll = computed(()=>store.getters.getCarAll)
    //还差多少钱起送
    const lastPrice = computed(()=>store.getters.getLastPrice)
    //购物车列表
    const carList = computed(()=> store.state.carList)
    // 显示购物车列表 购物车列表轮播
    const BsListe = ref(null)
    const isList = ref(false)
    const showList = async() => {
      if ( carList.value.length > 0) {
        isList.value = !isList.value
        await nextTick(()=>{
          new BScroll(BsListe.value,{})
          console.log('11');
        })
      }
    }
    // 同步显示购物车列表
    onUpdated(()=>{
      if (lastPrice.value.length<=0) {
        isList.value = false
      }
    })
    // 清空购物车列表
    const deleCarList = () => {
      store.commit(DELETEL_CAR_LIST)
      isList.value = false
    }
    return{
      info,
      carPrice,
      carAll,
      lastPrice,
      carList,
      isList,
      showList,
      deleCarList,
      BsListe
    }
  }
}
</script>

<style lang="less" scoped>

.onLogoWrapper{
  background-color: #02a774;
}
.oncontentRigth{
background-color: #00b43c;
color: #fff;
font-weight: 600;
height: 100%;
}
.shopcart{
  position: fixed;
  // display: flex;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
  height: 45px;
  // width: 100%;
  .content{
    background-color: rgb(110, 101, 101);
    font-size: 0;
    color: rgba(255,255,255,0.4);
    display: flex;
    width: 100%;
    height: 45px;
    line-height: 40px;
    .contentLeft{
      background-color: rgb(41, 40, 40);
      display: flex;
      font-size: 14px;
      position: relative;
      .logo-wrapper{
        position: relative;
        left: 20px;
        top: -15px;
        border-radius: 45px;
        width: 45px;
        height: 45px;
        color: #909b97;
        .logo{
          margin: 0 auto;
          text-align: center;
          position: relative;
          top: 10px;
          left: -1px;
          i{
            font-size: 25px;
            color: #fff;
          }
          .num{
            background-color: red;
            position: absolute;
            top: -10px;
            right: 0px;
            width: 25px;
            height: 15px;
            color: #fff;
            line-height: 15px;
            border-radius: 25%;
            font-size: 12px;
            font-weight: 600;
          }
        }
      }
      .price{
        padding-left: 30px;
        font-size: 16px;
      }
      .desc{
        padding-top: 4px;
        padding-right: 60px;
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 12px;
        font-size: 12px;
        text-align: center;
      }
    }
    .contentRigth{
      text-align: center;
      position: absolute;
      font-size: 12px;
      height: 45px;
      right: 0px;
      width: 105px;
      // background-color: rgba(73, 69, 69, 0.4);
    }
  }
  .shopcart-list{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);
    .list-header{
    height: 41px;
    line-height: 41px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
      .title{
        float: left;
        font-size: 14px;
        color: #07111b;
      }
      .empty{
        float: right;
        font-size: 12px;
        color: #00a0dc;
      }
    }
    .list-content{
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      position: relative;
      .food{
        padding: 12px 0;
        box-sizing: border-box;
        position: relative;
        line-height: 14px;
        .name{
          font-size: 14px;
          color: #07111b;
          line-height: 19px;
        }
        .price{
          font-size: 14px;
          font-weight: 700;
          color: #f01414;
          display: inline-block;
          position: absolute;
          right: 110px;
          top: 14px;
        }
        .cartcontrol-wrapper{
          // padding-left: 10px;
          // background-color: red;
          position: absolute;
          right: 30px;
          top: 12px;
        }
      }
    }
  }
}
.list-mask{
    // display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(4px);
    opacity: 1;
    background: rgba(7,17,27,0.6);
}
</style>