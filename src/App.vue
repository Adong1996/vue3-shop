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

export default {
  name: 'App',
  components: {
    FooterGuide,
  },
  setup() {
    const route = useRoute();
    const store = useStore()
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
