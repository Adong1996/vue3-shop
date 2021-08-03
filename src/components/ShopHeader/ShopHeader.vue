<template>
  <div class="shop-header">
    <nav class="shop-nav"> 
        <i class="iconfont icon-left-4" @click="router.push('/msite')"></i>
    </nav>

    <div class="shop-content" @click="isInfo = false" v-if="info">
      <img class="content-image" src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" alt="">
      <div class="header-content">
        <h2 class="content-title">
          <span class="mini-tag">品牌</span>
          <span class="content-center">{{info.name}}</span>
          <i class="iconfont icon-sanjiaoxing3"></i>
        </h2>
        <div class="shop-message">
          <span>{{info.rating}}</span>
          <span>月售{{info.sellCount}}单</span>
          <span>商家专送</span>
          <span>约{{info.deliveryTime}}分钟</span>
          <span>距离{{info.distance}}</span>
        </div>
        <p class="shop-notice">{{info.bulletin}}</p>
        <div></div>
      </div>
    </div>

    <div class="shop-header-discounts" @click="isPrice = false">
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

    <div class="shop-brief-modal" :class="{showInfo:isInfo}" v-if="info">
        <div class="brief-modal-content">
          <h2 class="content-title">
            <span class="content-tag">
              <span class="mini-tag">品牌</span>
            </span>
            <span class="content-name">{{info.name}}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{info.score}}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{info.sellCount}}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{info.description}}</h3>
              <p>约{{info.deliveryTime}}分钟</p>
            </li>
            <li>
              <h3>{{info.deliveryPrice}}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{info.distance}}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title">
            <span>公告</span></h3>
            <div class="brief-modal-notice">{{info.bulletin}}</div>
          <div class="mask-footer" @click="isInfo=true">
            <span class="iconfont icon-cha"></span>
          </div>
        </div>
        <div class="brief-modal-cover" @click="isInfo = true"></div>
    </div>  
     
    <div class="activity-sheet" :class="{showprice:isPrice}" v-if="info">
      <div class="activity-sheet-content">
        <h2 class="activity-sheet-title">
        优惠活动</h2>
        <ul class="list">
                                    <!-- :class="supportClasses[support.type]" -->
          <li class="activity-item"  v-for="(support, index) in info.supports" :key="index">
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="activity-content">{{support.content}}</span>
          </li>
        </ul>
        <div class="activity-sheet-close" @click="isShowSupport=false">
          <span class="iconfont icon-close"></span>
        </div>
      </div>

      <div class="activity-sheet-cover" @click="isPrice=true"></div>
    </div>
  </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router';
import {useStore} from 'vuex'
import {ref, onMounted, computed} from 'vue'
export default {
  setup() {
    const store = useStore()
    const isInfo = ref(true)
    const isPrice = ref(true)
    onMounted(()=>{
    })
    const info = computed( () =>  store.state.shop.info)

    const router = useRouter()
    return {
      info,
      isInfo,
      isPrice,
      router
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
    // background-color: yellow;
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
    left:  0;
    right:  0;
    bottom:  0;
    display:  flex;
    justify-content:  center;
    align-items:  center;
    z-index:  52;
    flex-direction:  column;
    color:  #333;
    
    .brief-modal-content{
      
      position: relative;
      width: 80%;
      padding: 25px 20px;
      background: #fff;
      z-index: 99;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      .content-title{
        font-size:  20px;
        line-height: 24px;
        font-weight: 700;
        white-space: nowrap;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .content-tag{
          border-radius: 2px;
          background-image: linear-gradient(90deg, #fff100, #ffe339);
          width: 36px;
          height: 18px;
          margin-right: 10px;
          color: #6a3709;
          font-style: normal;
          position: relative;
          .mini-tag{
            position: absolute;
            left: 0;
            top: 0;
            right: -100%;
            bottom: -100%;
            font-size: 24px;
            transform: scale(.5);
            transform-origin: 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .brief-modal-msg{
        display: flex;
        margin: 20px -10px 0;
        li{
          flex: 1;
          text-align: center;
        }
        h3{
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        p{
          font-size: 12px;
          color: #999;
        }
      }
      .brief-modal-title{
        position: relative;
        text-align: center;
        margin: 15px auto 15px;
        width: 85px;
        background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
        background-size: 100% 1px;
        background-position: 50%;
        background-repeat: no-repeat;
      }
      .brief-modal-notice{
        font-size: 13px;
        line-height: 1.54;
        color: #333;
        overflow-y: auto;
      }
      .mask-footer{
        position: absolute;
        bottom: -60px;
        left: 50%;
        padding: 6px;
        border: 1px solid rgba(255, 255, 255, .7);
        border-radius: 50%;
        transform:translateX(-50%);
        span{
          font-size: 16px;
          color: rgba(255, 255, 255, .7); 
        }
      }
    
    }
    .brief-modal-cover{
      position: absolute;
        width:  100%;
        height:  100%;
        top:  0;
        left:  0;
        background-color:  rgba(0, 0, 0, .5);
        z-index:  1;
    }
  }
  .showInfo{
      display: none;
    }
  .showprice{
    display: none;
  }
  .activity-sheet{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .activity-sheet-content{
      position: absolute;
      background-color: #f5f5f5;
      box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, .4);
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 20px 30px;
      box-sizing: border-box;
      transition: transform .2s;
      will-change: transform;
      color: #333;
      .activity-sheet-title{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .list{
        font-size: 16px;
        height: 160px;
        overflow-y: auto;
        .activity-item{
          margin-bottom: 12px;
          display: flex;
          font-size: 13px;
          align-items: center;
          .content-tag{
            display: inline-block;
            border-radius: 2px;
            width: 36px;
            height: 18px;
            margin-right: 10px;
            color: #fff;
            font-style: normal;
            position: relative;
            .mini-tag{
              position: absolute;
              left: 0;
              top: 0;
              right: -100%;
              bottom: -100%;
              font-size: 24px;
              transform: scale(.5);
              transform-origin: 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .activity-sheet-close{
        position: absolute;
        right: 6px;
        top: 10px;
        width: 25px;
        height:25px;
      }
    }
    .activity-sheet-cover{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
    }
  }
}
</style>