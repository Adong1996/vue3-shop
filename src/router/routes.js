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
  { path: '', redirect: '/profile' },
  { path: '/msite', component: Msite, meta: {isShowFooter: true},},
  { path: '/order', component: Order, meta: {isShowFooter: true} },
  { path: '/profile', component: Profile, meta: {isShowFooter: true} },
  { path: '/search', component: Search, meta: {isShowFooter: true} },
  { path: '/login', component: Login, meta: {isShowFooter: false}},
  { path: '/shop/:id', component: Shop, meta: {isShowFooter: false}, props: true, name: 'shop',
    children: [
      // {path: '/shop',redirect: '/shop/:id'},
      {path: 'goods',component: Goods, name: 'goods'},
      {path: 'info',component: Info},
      {path: 'ratings',component: Ratings},
      {path: '/shop/:id', redirect: to => {
        const { hash, params, query } = to
        return `/shop/${params.id}/goods`
        // console.log(hash);
        // console.log(params);
        // console.log(query);
      }}
    ]
  },
]
export default routes