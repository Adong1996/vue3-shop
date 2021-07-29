<template>
  <div class="demo">
    <Header>
      <template v-slot:center>
        <span>
          搜索
        </span>
      </template>
    </Header>
     <div class="wrapper" ref="demo">
      <ul>
        <li v-for="i in 200">
          <h1>1111111111</h1>
        </li>
        
        ...
      </ul>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import {ref,reactive,onMounted, nextTick} from 'vue'
import Header from '../../components/Header/Header'
  export default {
  components: {
    Header
  },
  setup() {
    const demo = ref(null)
    onMounted(()=>{
      // new BScroll(demo.value, {})
    }),
    nextTick(()=>{
      new BScroll(demo.value, {})
    })
    return {
      demo
    }
  }
 
  }
</script>

<style lang="less">
.wrapper{
  //  height: 400px;
  // overflow: hidden;
  // width: 50px;
}
</style>