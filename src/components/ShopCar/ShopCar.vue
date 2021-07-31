<template>
  <div class="shopcart">
    <div class="content">
      <div class="contentLeft">
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
        <div v-else :class="{oncontentRigth:lastPrice>0}">{{lastPrice<0? `还差￥${-lastPrice}起送` : '去结算' }}</div>
      </div>
      
    </div>
    <div class="shopcart-list">
      <div class="list-header"></div>
      <div class="list-content"></div>
    </div>
  </div>
  <div class="list-mask"></div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore()
    //商家信息
    const info = computed(()=>store.state.info)
    //总价格
    const carPrice = computed(()=>store.getters.getCarPrice)
     // 总数量
    const carAll = computed(()=>store.getters.getCarAll)
    //还差多少钱起送
    const lastPrice = computed(()=>store.getters.getLastPrice)
    return{
      info,
      carPrice,
      carAll,
      lastPrice
    }
  }
}
</script>

<style lang="less" >

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
  display: flex;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
  height: 45px;
  // text-align: center;
  // line-height: 45px;
  
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
}
.list-mask{
  display: none;
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