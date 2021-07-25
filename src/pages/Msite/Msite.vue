<template>
  <div class="msite">
    <!-- 头部 -->
    <Header class="heade">
      <template v-slot:left>
        <span @click="">
          <i class="iconfont icon-serch4"></i>
        </span>
      </template>
      <template v-slot:center>
        <span>
          home
        </span>
      </template>
      <template v-slot:rigth>
        <span>
          登录|注册
        </span>
      </template>
    </Header>
    <!--首页导航-->
    <div ref="swiper" class="swiper-container" v-if="categorys.length>0">
      <div class="swiper-wrapper">
        <nav  class="nav swiper-slide"  v-for="(cs,index) in categorysArr" :key="index">
          <div class="nav-item" v-for="item in cs" :key="item.id">
            <div>
              <img :src="'https://fuss10.elemecdn.com'+item.image_url" alt="">
            </div>
            <span>{{item.title}}</span>
          </div>
        </nav>
        <!-- <nav class="nav swiper-slide"  >
          <div class="nav-item" v-for="item in 8">
            <div>
              <img src="./images/1.jpg" alt="">
            </div>
            <span>甜品饮品</span>
          </div>
        </nav> -->
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div v-else class="msite_back">
      <img src="./images/msite_back.svg" alt="">
    </div>
      <div class="shop">
        <div class="shopHeader">
          <i class="iconfont icon-fujin"></i>
          <span>附近商家</span>
        </div>
        <ul class="shop-list" v-for="(shop, index) in shops" key="shop.id" v-if="shops.length>0">
          <li class="shop-item">
            <div class="shop-item-left">
              <img :src="'https://fuss10.elemecdn.com'+shop.image_path" alt="">
            </div>
            <div class="shop-item-rigth">
              <section class="shop_detail_header">
                <h4 class="shop_title ellipsis">
                  {{shop.name}}
                </h4>
                <ul class="shop_detail_ul">
                  <li class="supports" v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</li>
                </ul>
              </section>
              <section class="shop_rating_order_left">
                <!-- <Star :score="shop.rating" :size="24"/> -->
                <div class="rating_section">{{shop.rating}}</div>
                <div class="order_section">月售{{shop.recent_order_num}}单</div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">商家专送</span>
              </section>
              <section class="shop_distance">
                <p class="shop_delivery_msg">
                  <span>¥{{shop.float_minimum_order_amount}}起送</span>
                  <span class="segmentation">/</span>
                  <span>配送费约¥{{shop.float_delivery_fee}}</span>
                </p>
              </section>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li><img src="./images/shop_back.svg" alt=""></li>
          <li><img src="./images/shop_back.svg" alt=""></li>
          <li><img src="./images/shop_back.svg" alt=""></li>
          <li><img src="./images/shop_back.svg" alt=""></li>
          <li><img src="./images/shop_back.svg" alt=""></li>
        </ul>
      </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper.min.css'
import Header from '../../components/Header/Header'

import {onMounted, computed,ref } from 'vue' 
import { useStore ,mapState,mapActions} from 'vuex'
import chunk from 'lodash/chunk.js'
export default {
  components: {
    Header
  },
  setup() {
    //轮播
    // const mySwiper = mySwiper
    const swiper = ref('')
    onMounted(async()=>{
     await store.dispatch('getCategorys');
      store.dispatch('getShops')
      new Swiper (swiper.value, {
      loop: true, // 循环模式选项,
      autoplay:true,
    // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        // direction: 'vertical', // 垂直切换选项,
        
      }
      }) 
    });
    const store = useStore();
    const title = computed(()=> store.state.address)
    // mapActions(['getCategorys', 'getShops'])
    
    const categorys = computed(()=>store.state.categorys)
    const shops = computed(()=>store.state.shops)
    const categorysArr = computed(()=>chunk(categorys.value,8))
    return {
      title,
      shops,
      categorys,
      categorysArr,
      swiper
    }
  }
}
</script>

<style lang="less">
@import '../../css/css.less';
.msite{
  background-color: #e4e4e4;
  // padding-bottom: 45px;
}
  .header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    margin-bottom: 45px;
  }
  .msite_back{
    padding-top: 45px;
  }
  .nav {
    padding-top: 45px;
    width: 100%;
    height: 225px;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
    // margin-top: 45px;
    // background-color: green;
    // display: flex;
    .nav-item {
      width: 25%;
      display: inline-block;
      text-align: center;
      line-height: 25px;
      padding-top: 10px;
      // flex: 1;
      img {
      width: 50px;
      height: 50px;
    }
    }
  }
  
  .swiper-pagination {
    width: 100%;
    height: 10px;
    // background-color: yellow;
    text-align: center;
    line-height: 16px;
  }
  .shop {
    width: 100%;
    // background-color: #e4e4e4;
    margin-top: 10px;
    
    .shopHeader {
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      padding: 10px 10px 0;
      font-size: 14px;
      background-color: #fff;
      span {
        color: #999;
      }
    }
    .shop-list {
      background-color: #fff;
      width: 100%;
      padding: 15px 18px;
      box-sizing: border-box;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: burlywood;
        transform: scaleY(0.5);
      }
      .shop-item {
        box-sizing: border-box;
        height: 105px;
        
        .shop-item-left {
          display: inline-block;
          width: 23%;
          height: 75px;
          padding-right: 10px;
          box-sizing: border-box;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .shop-item-rigth {
          float: right;
          width: 77%;
          .shop_detail_header{
            width: 100%;
            .shop_title {
              width: 200px;
              color: #333;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;
              float: left;
              &.ellipsis{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &::before{
                  content: '品牌';
                  display: inline-block;
                  font-size: 11px;
                  line-height: 11px;
                  color: #333;
                  background-color: #ffd930;
                  padding: 2px 2px;
                  border-radius: 2px;
                  margin-right: 5px;
                }
            }
            .shop_detail_ul{
              float: right;
              margin-top: 4px;
              // display: flex;
              // display: inline-block;
              .supports{
                float: left;
                font-size: 10px;
                color: #999;
                border: 1px solid #f1f1f1;
                padding: 0 2px;
                border-radius: 2px;
              }
            }
          }
          .shop_rating_order_left{
            padding-top: 30px;
              // float: left;
              color: #ff9a0d;
            .rating_section{
              float: left;
              font-size: 10px;
              color: #ff6000;
              margin-left: 4px;
            }
            
          }
          .shop_rating_order_right{
            float: right;
            color: #02a774;
            border: 1px solid #02a774;
          }
          .shop_distance{
            padding-top: 20px;
            width: 100%;
            font-size: 14px;
            .shop_delivery_msg{
              // float: left;
              transform-origin: 0;
              transform: scale(0.9);
              color: #666;
            }
          }
        }
      }
    }
  }
</style>