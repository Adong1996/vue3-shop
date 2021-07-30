<template>
  <div class="wrapper" ref="demo">
    <ul class="content">
      <li >
        <h1></h1>
      </li>
    </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
import { onMounted, nextTick, ref } from "vue";
export default {
  
  setup() {
    const demo = ref(null)
    onMounted(()=>{
      
    }),
    nextTick(()=>{
    })
    return {
    }
  }
}
</script>

<style lang="less">
</style>