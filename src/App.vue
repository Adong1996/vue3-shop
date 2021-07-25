<template>
    <div class="root">
      <router-view></router-view>
      <FooterGuide v-show="route.meta.isShowFooter"></FooterGuide>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import {onMounted} from  'vue'
import { useStore , mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide'
import {reqAutologin} from './api/index'
export default {
  name: 'App',
  components: {
    FooterGuide,
  },
  setup() {
    const route = useRoute();
    const store = useStore()
    onMounted(async()=>{
      let result = await reqAutologin()
      store.dispatch('getUser',{user:result.data})
    })
    store.dispatch('getAddress')
    // mapActions(['getAddress'])
    return {
      route
    }
  }
}
</script>

<style lang="less" scoped>
</style>
