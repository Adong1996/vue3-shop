import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login'

const routes = [
  { path: '/', redirect: '/profile' },
  { path: '/msite', component: Msite, meta: {isShowFooter: true} },
  { path: '/order', component: Order, meta: {isShowFooter: true} },
  { path: '/profile', component: Profile, meta: {isShowFooter: true} },
  { path: '/search', component: Search, meta: {isShowFooter: true} },
  { path: '/login', component: Login, meta: {isShowFooter: false}}
]
export default routes