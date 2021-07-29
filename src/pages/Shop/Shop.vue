<template>
  <div> 
    <ShopHeader></ShopHeader>
    <div class="tab">
      <span :class="{on:route.path==='/shop/goods'}" @click="Onclick('/shop/goods')">点餐</span>
      <span :class="{on:route.path==='/shop/ratings'}" @click="Onclick('/shop/ratings')">评论</span>
      <span :class="{on:route.path==='/shop/info'}" @click="Onclick('/shop/info')">商家</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted} from 'vue'
export default {
  components: {
    ShopHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    onMounted(()=>{
      store.dispatch('getGoods')
      store.dispatch('getRatings')
      store.dispatch('getInfo')
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