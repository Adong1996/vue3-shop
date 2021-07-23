<template>
  <div class="footer-guide">
    <span class="footer-guide-item" :class="{on:route.path === '/msite'}"  @click="goto('/msite')">
      <span>
        <i class="iconfont icon-home"></i>
      </span>
      <span>Home</span>
    </span>
    <span class="footer-guide-item" :class="{on:route.path === '/search'}"  @click="goto('/search')">
      <span>
        <i class="iconfont icon-serch3"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="footer-guide-item" :class="{on:route.path === '/order'}"  @click="goto('/order')">
      <span>
        <i class="iconfont icon-emaxcitygerenxinxitubiaoji03"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="footer-guide-item" :class="{on:route.path === '/profile'}" @click="goto('/profile')">
      <span >
        <i class="iconfont icon-MaleUserAccountInterfaceLogin"></i>
      </span>
      <span>个人</span>
    </span>
  </div>
</template>

<script>
import {ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const goto = (path) => {
      if (path !== route.path) {
        router.push(path)
      } else window.location = path
      
    }
    return {
      goto,
      route
    }
  }
}
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../css/css.less';
.footer-guide {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  background-color: #fff;
  .top-border-1px;

}
.footer-guide-item {
    // flex: 1;
    flex-grow: 1;
    text-align: center;
    width: 25%;
    span {
      font-size: 14px;
      display: block;
      margin-top: 4px;
      
      i {
        font-size: 25px;
      }
    }
  }
  .on{
        color: yellowgreen;
      }
</style>