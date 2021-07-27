import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods.vue'
import Info from '../pages/Shop/Info.vue'
import Ratings from '../pages/Shop/Ratings.vue'

const routes = [
  { path: '/', redirect: '/profile' },
  { path: '/msite', component: Msite, meta: {isShowFooter: true},},
  { path: '/order', component: Order, meta: {isShowFooter: true} },
  { path: '/profile', component: Profile, meta: {isShowFooter: true} },
  { path: '/search', component: Search, meta: {isShowFooter: true} },
  { path: '/login', component: Login, meta: {isShowFooter: false}},
  { path: '/shop', component: Shop, meta: {isShowFooter: false},
    redirect: '/shop/goods',
    children: [
      {path: 'goods',component: Goods},
      {path: 'info',component: Info},
      {path: 'ratings',component: Ratings},
    ]
  },
]
export default routes