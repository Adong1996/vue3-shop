<template>
  <div class="food" v-show="isShow" v-if="fooditem">
      <div class="food-content">
        <div class="image-header">
          <img :src="fooditem.image" alt="">
          <p class="foodpanel-desc">{{fooditem.info}}</p>
        </div>
        <div class="content">
          <h1 class="title">{{fooditem.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{fooditem.sellCount}}份</span>
            <span class="rating">好评率{{fooditem.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{fooditem.price}}</span>
            <span class="old" v-if="fooditem.oldPrice">￥{{fooditem.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <CarContorl/>
          </div>
        </div>
      </div>
      <div  class="food-cover" @click="isShow = false"></div>
    </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CarContorl from '../CarContorl/CarContorl'

export default {
  components: {
    CarContorl
  },
  props: {
    fooditem: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const isShow = ref(false)
    const store = useStore()
    const food = computed(()=>store.state.goods[0])
    const onShow = () => {
      isShow.value = true
    }

    return {
      food,
      isShow,
      onShow
    }
  }
}
</script>

<style lang="less">
.food{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  bottom: 48px;
  // background: #000;
  .food-content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 65%;
    z-index: 66;
    background: #fff;
    border-radius: 4px;
    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .foodpanel-desc{
        font-size: 12px;
        color: #ddd;
        padding: 0 10px 10px;
        letter-spacing: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    .content{
      position: relative;
      padding: 18px;
      .title{
        font-size: 14px;
        margin: 0 0 8px;
        line-height: 14px;
        font-weight: 700;
        color: #07111b;
      }
      .detail{
        padding: 0 0 18px;
        color: #93999f
      }
      .price{
        display: inline-block;
        .now{
          font-weight: 700;
          color: #f01414;
          font-size: 15px;
        }
        .old{
          text-decoration: line-through;
          font-size: 0.266667rem;
          color: #93999f;
        }
        
      }
      .cartcontrol-wrapper{
        float: right;
      }
    }
  }
  .food-cover{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 24px;
    left: 0;
    z-index: 55;
    background-color: rgba(0,0,0,0.5);
  }
  }
</style>