<template>
  <div class="search">
    <Header>
      <template v-slot:center>
        <span>
          搜索
        </span>
      </template>
    </Header>
     <form class="search_form" action="#">
      <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
      <input type="submit" name="submit" class="search_submit">
    </form>
  </div>
</template>

<script>
import {ref,reactive,onMounted, nextTick} from 'vue'
import Header from '../../components/Header/Header'
  export default {
  components: {
    Header
  },
  setup() {
    onMounted(()=>{
    }),
    nextTick(()=>{
    })
    return {
    }
  }
 
  }
</script>

<style lang="less" scoped>
.search{
  width: 100%;
  position: relative;
  .search_form{
    position: absolute;
    top: 45px;
    background-color: #fff;
    padding: 12px 8px;
    input{
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;
    }
    .search_input{
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }
      .search_submit{
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
  }
}
</style>