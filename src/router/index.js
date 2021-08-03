import {createRouter, createWebHashHistory} from 'vue-router'

import routes from './routes'

// Vue.use(VueRouter)
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})


router.beforeEach((to, from) => {
  console.log(to,  from);
  // ...
  // 返回 false 以取消导航
  // return false
})
export default router