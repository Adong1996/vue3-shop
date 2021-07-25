<template>
  <div class="demo">
    <Header>
      <template v-slot:center>
        <span>
          搜索
        </span>
      </template>
    </Header>
  </div>
</template>

<script>
import {ref,reactive} from 'vue'
import Header from '../../components/Header/Header'
  export default {
  components: {
    Header
  },
 
  }
</script>

<style lang="less">

</style>