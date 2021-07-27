<template>
  <div> 
    <div class="shop-header">
      <nav class="shop-nav"> 
          <i class="iconfont icon-left-4" ></i>
      </nav>
      <div class="shop-content">
        <img class="content-image" src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" alt="">
        <div class="header-content">
          <h2 class="content-title">
            <span class="mini-tag">品牌</span>
            <span class="content-center">嘉禾一品（温都水城）</span>
            <i class="iconfont icon-sanjiaoxing3"></i>
          </h2>
          <div class="shop-message">
            <span>4.2</span>
            <span>月售90单</span>
            <span>商家专送</span>
            <span>约28分钟</span>
            <span>距离1000m</span>
          </div>
          <p class="shop-notice">是以粥为特色的中式营养快餐，自2004年10月18日创立“嘉和一品”品牌至今，不断优化管理，积极创新，立足于“贴近百姓生活，服务千家万户”</p>
          <div></div>
        </div>
      </div>
      <div class="shop-header-discounts">
        <div class="discounts-left">
          <div class="activity activity-green">
            <span class="mini-tag">
              <span class="content-tag">首单</span>
            </span>
            <span class="ellipsis">新用户下单立减17元(不与其它活动同享)</span>
          </div>
        </div>
        <div class="discounts-right">
          8个优惠
          <i class="iconfont icon-sanjiaoxing1"></i>
        </div>
      </div>
      <div class="shop-brief-modal">
        <div class="brief-modal-content"></div>
        <div class="brief-modal-cover"></div>
      </div>
      <div class="activity-sheet"></div>
    </div>
    <div class="tab">
      <span :class="{on:route.path==='/shop/goods'}" @click="Onclick('/shop/goods')">点餐</span>
      <span :class="{on:route.path==='/shop/ratings'}" @click="Onclick('/shop/ratings')">评论</span>
      <span :class="{on:route.path==='/shop/info'}" @click="Onclick('/shop/info')">商家</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted} from 'vue'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    onMounted(()=>{
      store.dispatch('getGoods')
      store.dispatch('getInfo')
      store.dispatch('getRatings')
    })
    const Onclick = (path) => {
      if (route.path != path) {
        router.push(path)
      }else router.currentRoute.value.path = path
      }
    return {
      router,
      route,
      store,
      Onclick
    }
  }
}
</script>

<style lang="less">
@import '../../css/css.less';
.shop-header{
  // width: 100%;
  .shop-nav{
    width: 100%;
    height: 50px;
    background-color: yellow;
    background-image: url('https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png');
    background-size: cover;
    i{
      font-size: 10px;
      display: inline-block;
      font-size: 24px;
      color: #fff;
      position: relative;
      top: 12px;
    }
  }
  .shop-content{
    padding: 30px 20px 5px;
    text-align: center;
    position: relative;
    .content-image{
      position: absolute;
      width: 66px;
      height: 66px;
      top: -40px;
      left: 187px - 33px;
    }
    .header-content{
      .content-title{
        line-height: 24px;
        font-weight: 700;
        color: #000;
        position: relative;
        box-sizing: border-box;
        .mini-tag{
          background-color: yellow;
          display: inline-block;
          width: 34px;
          position: absolute;
          left: 35px;
          color: rgb(146, 14, 14);
          font-weight: 600;
        }
        .content-center{
          font-size: 20px;
          font-weight: 700;
          padding-left: 40px;
        }
        i{
          font-size: 6px;
        }
      }
      .shop-message{
        margin: 5px 0 0 ;
        color: #333;
        span{
          display: inline-block;
          padding-left: 10px;
        }
      }
      .shop-notice{
        margin: 8px 62px 10px;
        width: 63%;
        color: #999;
        text-overflow: ellipsis;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .shop-header-discounts{
    padding: 5px 7px;
    margin: 0 30px;
    border: 1px solid #eee;
    color: #666;
    .discounts-left{
      display: inline-block;
      .activity{
        .mini-tag{
          background-color: #70bc46;
          width: 24px;
          height: 12px;
          margin: 0.5px;
          .content-tag{
          color: white;
          transform: scale(0.8);
          font-size: 10px;
          display: inline-block;
          font-weight: 600;
        }
        }
        .ellipsis{
          padding-left: 3px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          width: 87%;
        }
      }
    }
    .discounts-right{
      display: inline;
      position: relative;
      i{
        position: absolute;
        font-size: 10px;
        transform:scale(0.8)
      }
    }
  }
  .shop-brief-modal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 52;
    flex-direction: column;
    color: #333;
    .brief-modal-content{
      position: relative;
      width: 80%;
      padding: 25px 20px;
      background: #fff;
      z-index: 99;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
    }
    .brief-modal-cover{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 1;
    }
  }
}
.tab{
  width: 100%;
  height: 44px;
  line-height: 44px;
  display: flex;
  position: relative;
  &:after
  {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
    transform: scaleY(0.5);
  }
  .on{
    color: #02a774;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      left: 46px;
      bottom: 0px;
      width: 35px;
      height: 1px;
      background-color: #02a774;
    }
  }
  span{
    flex: 1;
    text-align: center;
    color: #4d555d;
    font-size: 15px;
    
  }
}
</style>