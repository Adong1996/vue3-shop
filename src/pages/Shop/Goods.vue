<template>
  <div class="goods" >
    <div class="menu-wrapper" ref="BScrollLeft">
      <ul >
        <li class="menu-wrapper-item" 
            v-for="(item, index) in goods" 
            :key="item.name"
            :class="{current:index === currentIndex}"
            @click="clickItem(index)">
          <span>
            <img :src="item.icon" class="iconfont" v-if="item.icon">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="BScrollRigth">
      <ul ref="rigthUi">
        <li class="food-list-hook" v-for="(food) in goods" :key="food.name">
          <h1 class="title">{{food.name}}</h1>
          <ul >
            <li class="food-item" v-for="(item, index) in food.foods" :key="index" @click="showFood(item)">
              <div class="icon">
                <img :src="item.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.description}}</p>
                <div class="extra">
                  <span class="count">月售{{item.sellCount}}份</span>
                  <span>好评率{{item.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{item.price}}</span>
                  <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  
  <Food :fooditem='fooditem' ref="isshowFood"></Food>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, onMounted, watch, nextTick, watchEffect, onUpdated } from "vue";
import BScroll from '@better-scroll/core'
import Food from '../../components/Food/Food'

export default {
  name: 'goods',
  components: {
    Food
  },
   setup () {
    const store = useStore()
    const goods = computed(()=>store.state.goods)
    let fooditem = ref({})
    const isshowFood = ref(null)
    const showFood = (food) => {
      if (food) {
        fooditem.value = food
        isshowFood.value.onShow()
      }
    }
    //BScroll
    const scrollY = ref(0) // 左侧列表滑动的y轴坐标, 右侧滑动过程中实时更新
    const tops = ref([]) // 右侧所有分类的<li>的top的数组, 在列表显示之后更新一次
    // const food = ref({}) // 需要显示的food
    const currentIndex = computed(()=>{
      const index = tops.value.findIndex((top,index)=> scrollY.value >= top && scrollY.value < tops.value[index+1])
      return index
    })
    //初始化滑动
    const BScrollLeft = ref(null) 
    const BScrollRigth = ref(null) 
    let rightScroll
    const initScroll = () => {
      new BScroll(BScrollLeft.value, {
        observeDOM: true,
      })
      rightScroll = new BScroll(BScrollRigth.value, {
        probeType: 1
      })
      rightScroll.on('scrollEnd',({x, y})=>{
        console.log(x, y);
        scrollY.value = Math.abs(y)
        console.log(scrollY.value);
      })
    }
    // 统计右侧所有分类li的top数组 
    const rigthUi = ref(null)
    const initTops = () => {
      const countTops = []
      let top = 0
      countTops.push(top)
      let lists = Array.prototype.slice.call(rigthUi.value.children)
      lists.forEach((li) => {
        top += li.clientHeight
        countTops.push(top)
      });
      tops.value = countTops
    }
    //点击左侧滑动右侧
    const clickItem = (index) => {
      const top = tops.value[index]
      scrollY.value = top 
      rightScroll.scrollTo(0, -tops.value[index], 1000)
    }
    onMounted(()=>{
      if (goods.value.length > 0) {
        initScroll()
        initTops()
      }
    })
    watch(goods,async()=>{//goods 数据更新
      await nextTick(() =>{ //页面加载
        initScroll()
        initTops()
      }) 
    }) 
    
    
    return {
      goods,
      showFood,
      fooditem,
      isshowFood,
      BScrollLeft,
      BScrollRigth,
      currentIndex,
      tops,
      scrollY,
      initTops,
      rigthUi,
      clickItem
    }

  }
}
</script>

<style lang="less">
.goods{
  position: absolute;
  display: flex;
  width: 100%;
  background: #fff;
  overflow: hidden;
  top: 225px;
  bottom: 46px;
  .menu-wrapper{
    // height: 400px;
    // display: inline-block;
    // display: flex;
    width: 80px;
    background-color: #f3f5f7;
    .current{
      background-color: #fff;
      color: #02a774;
    }
    .menu-wrapper-item{
      box-sizing: border-box;
      display: inline-block;
      padding: 0 12px;
      width: 100%;
      height: 54px;
      line-height: 54px;
      img{
        width: 12px;
        height: 12px;
      }
    }
  }
  .foods-wrapper{
    flex: 1;
    .food-list-hook{
      line-height: 26px;
      .title{
        padding-left: 13px;
        border-left: 1px solid #d9dde1;
        color: #93999f;
        background: #f3f5f7;
      }
      .food-item{
        // margin: 18px;
        // padding-bottom: 18px;
        padding: 18px;
        display: flex;
        .icon{
          img{
            width: 57px;
            height: 57px;
          }
        }
        .content{
          padding-left: 10px;
          .name{
            margin: 2px 0 0;
            font-size: 14px;
            line-height: 14px;
          }
          .desc{
            font-size: 12px;
            color: #93999f;
            line-height: 12px;
            margin: 7px 0 0;
          }
          .extra{
            color: #93999f;
            font-size: 9px;
            line-height: 9px;
            margin: 7px 0 0;
            .count{
              margin-right: 10px;
            }
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: #f01414;
            }
            .old{
              text-decoration: line-through;
              font-size: 12px;
              color: #93999f;
            }
          }
        }
      }
    }
  }
}
</style>