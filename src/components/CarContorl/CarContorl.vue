<template>
  <div class="cartcontrol" v-if="item">
    <transition name="fade">
      <i class="iconfont icon-jian2" v-if="item.count>0" @click.stop="updateFoodCount(false)"></i>
    </transition>
    <span class="cart-count" v-if="item.count>0">{{item.count}}</span>
    <i class="iconfont icon-jia2" @click.stop="updateFoodCount(true)"></i>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: {
    item: {
    type: Object,
    required: true
  },
  },
  setup(props) {
    const store = useStore()
    const updateFoodCount = (isAdd) => {
      store.dispatch('updateFoodCount',{isAdd,food:props.item})
    }
    return{
      updateFoodCount
    }
  }
  


}
</script>

<style lang="less">
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s ease;
    
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(20px) rotate(1turn);;
  }
  .cartcontrol{
    line-height: 20px;
    i{
      display: inline-block;
      color: #02a774;
      font-size: 25px;
      padding: 0 5px;
    }
    span{
      display: inline-block;
      position: relative;
      top: -4px;
      font-size: 15px;
    }
  }
</style>