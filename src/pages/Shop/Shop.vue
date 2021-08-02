<template>
  <div> 
    <ShopHeader></ShopHeader>
    <div class="tab">
      <span :class="{on:route.path===`/shop/${id}/goods`}"    @click="Onclick(`/shop/${id}/goods`)">点餐</span>
      <span :class="{on:route.path===`/shop/${id}/ratings`}"  @click="Onclick(`/shop/${id}/ratings`)">评论</span>
      <span :class="{on:route.path===`/shop/${id}/info`}"     @click="Onclick(`/shop/${id}/info`)">商家</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import {DELETEL_CAR_LIST} from '../../store/mutation-types'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, onBeforeUnmount} from 'vue'
export default {
  components: {
    ShopHeader
  },
  props: ['id'],
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    onMounted(()=>{
      store.dispatch('getShop', props.id)
    })
    const Onclick = (path) => {
      if (route.path != path) {
        router.push(path)
      }else router.currentRoute.value.path = path
      }
      onBeforeUnmount(()=>{
        // store.commit(DELETEL_CAR_LIST)
      })
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