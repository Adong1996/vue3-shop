<template>
  <div class="wrapper" ref="demo">
    <ul class="content">
      <li v-for="i in 200">
        <h1>1111111111</h1>
      </li>
      
      ...
    </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import { onMounted, nextTick, ref } from "vue";
export default {
  
  setup() {
    const demo = ref(null)
    onMounted(()=>{
      
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
  overflow: hidden;
}
</style>