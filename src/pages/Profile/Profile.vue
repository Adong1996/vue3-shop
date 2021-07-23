<template>
  <div class="profile">
    <Header>
      <template v-slot:center>
        <span>
          个人
        </span>
      </template>
    </Header>
    <section class="profile-number">
      <div class="profile-link">
        <div class="profile_image" >
          <i class="iconfont icon-icon-test" ></i>
        </div>
      <div class="user-info">
        <p class="user-info-top">登录/注册</p>
        <p>
          <span class="user-icon"><i class="iconfont icon-iconmobile"></i></span>
          <span class="icon-mobile-number">暂无绑定手机号</span>
        </p>
      </div>
      <span class="arrow"><i class="iconfont icon-Forward" @click="router.push('/login')"></i></span>
      </div>
      <div></div>
    </section>
    <section class="profile_info_data">
      <div >
        <span class="item">
          <span>0.00</span>元
        </span>
        <span>我的余额</span>
      </div>
      <div >
        <span class="item">
          <span>0.00</span>元
        </span>
        <span>我的余额</span>
      </div>
      <div >
        <span class="item">
          <span>0.00</span>元
        </span>
        <span>我的余额</span>
      </div>
    </section>
    <section class="profile_my_order">
      <div>
        <span><i class="iconfont icon-order"></i></span>
        <span>我的订单</span>
        <span><i class="iconfont icon-Forward"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-order"></i></span>
        <span>我的订单</span>
        <span><i class="iconfont icon-Forward"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-order"></i></span>
        <span>我的订单</span>
        <span><i class="iconfont icon-Forward"></i></span>
      </div>
    </section>
    <section  class="profile_my_order">
      <div>
        <span><i class="iconfont icon-order"></i></span>
        <span>我的订单</span>
        <span><i class="iconfont icon-Forward"></i></span>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import {useRoute, useRouter} from 'vue-router'
export default {
  components: {
    Header
  },
  setup() {
    const router = useRouter()
    return {
      router
    }
  }
  
}
</script>

<style lang="less">
.profile{
  padding-top: 45px;
}
.profile-number{
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background: #02a774;
  position: relative;
  border: none;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #fff;
    transform: scaleY(0.5);
  }
  .profile-link {
    position: relative;
    padding: 20px 10px;
    .profile_image{
      width: 60px;
      height: 60px;
      display: inline-block;
      i{
        font-size: 62px;
        color:#fff;
      }
    }
    .user-info {
      display: inline-block;
      font-weight: 700;
      font-size: 18px;
      color: #fff;
      p{
        padding-left: 14px;
        padding-top: 4px;
      }
      .user-info-top{
        padding-bottom: 8px;
      }
      .icon-mobile-number{
        font-size: 15px;
        
      }
    }
    .arrow {
      i{
        font-size: 25px;
        color: #fff;
        position: absolute;
        right: 30px;
        top: 30px;
      }
    }
  }
}
.profile_info_data{
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  div {
    box-sizing: border-box;
    width: 33%;
    height: 80px;
    display: inline-block;
    text-align: center;
    border-right: 1px solid #f1f1f1;
    .item {
      box-sizing: border-box;
      display: block;
      width: 100%;
      font-size: 14px;
      color: #333;
      padding: 15px 5px 10px;
      span {
        display: inline-block;
        font-size: 30px;
        color: #f90;
        font-weight: 700;
        line-height: 30px;
      }
    }
    span {
      font-size: 14px;
    }
  }
}
.profile_my_order{
  box-sizing: border-box;
  margin-top: 10px;
  div {
    width: 100%;
    height: 53px;
  }
}
</style>