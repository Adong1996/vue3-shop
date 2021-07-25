<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2>商家外卖</h2>
        <div class="login_header_title">
          <span :class="{on:isShow}" @click="isShow = true">短信验证</span>
          <span :class="{on:!isShow}" @click="isShow = false">密码登录</span>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div v-show="isShow">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="mobile">
              <span>{{mobileMessage}}</span>
              <button :disabled='!isRigthNumber'  @click="isClick">{{countDown>0 ? `短信已发送${countDown}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              <span class="span">{{codeMessage}}</span>
            </section>
            <section class="login_hint">
             温馨提示：未注册商家外卖帐号的手机号，登录时将自动注册，且代表已同意
             <span>《用户服务协议》</span>
            </section>
          </div>
          <div v-show="!isShow">
            <section>
              <section class="login_message">
                <input  type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                <span class="name-span">{{nameMessage}}</span>
              </section>
              <section class="login_verification">
                <input :type="!iShow?'password':'tel'" maxlength="8" placeholder="密码" v-model="password">
                <span class="password-span">{{passwordMessage}}</span>
                <div :class="{switch_button:true, iShow:iShow}" @click="iShow=!iShow">
                  <div></div>
                  <span>abc</span>
                </div>
              </section>
              <section class="login_message">
                <input type="tex" maxlength="4" placeholder="验证码" v-model="codeRigth">
                <span class="codeRigth-span">{{codeRigthMessage}}</span>
                <img ref="getCaptcha" @click="reqCaptcha" src="http://localhost:4000/captcha" class="get_verification" alt="">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="onLogin">登录</button>
        </form>
        <span class="about_us">关于我们</span>
      </div>
      <span class="go_back" @click="router.push('/profile')">
        <i class="iconfont icon-left-4"></i>
      </span>
    </div>
   </div>
</template>

<script>
import {computed, ref, watchEffect} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { useField } from 'vee-validate';
import {reqSendcode,reqLogin,reqloginPhone} from '../../api/index'
import verify from '../../utils/vee-validate-schema'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const isShow = ref(true)
    const iShow = ref(false)
    // const phone = ref(value)
    let disableShow = ref('')
    const isRigthNumber = computed({
      get(){
        disableShow.value  = /^1\d{10}$/.test(Number(mobile.value))
        return disableShow.value
      },
      set(newvalue) {
        return disableShow.value =  newvalue
      }
    })
    //手机获取验证码
    let countDown = ref('')
    
    
    const isClick = async() => {
      if (countDown.value==='') {
        countDown.value = 5;
      const intervalId = setInterval(() => {
        countDown.value--
        if (countDown.value<=0) {
          clearInterval(intervalId)
          countDown.value = ''
        }
      }, 1000);
      const result = await reqSendcode(mobile)
      alert(result.msg)
      }
    }
    watchEffect(()=>{
      // console.log(isRigthNumber.value);
    }) 
    const getCaptcha = ref(null)
    //用户登录
    // const name = ref('');
    // const pwd = ref('');
    // const captcha = ref('');
    
    //获取验证码
    const reqCaptcha = () => {
      getCaptcha.value.src = "http://localhost:4000/captcha?time=" + Date.now()
    }
    const onLogin = async() => {
      let result
      //手机登录
      if (mobile.value&&code.value) {
         result = await reqloginPhone({phone:mobile.value,code:code.value})
         
      }
      //用户名密码登录
      if (name.value&&password.value&&codeRigth) {
         result = await reqLogin({name:name.value,pwd:password.value,captcha:codeRigth.value})
         codeRigth.value = '';
         reqCaptcha()
      }
      if (result.code===0) {
          router.replace('/profile')
          store.dispatch('getUser',{user:result.data})
        }else{
          alert('前端验证失败输入错误请重新输入')
        }
      
    }
    //vue 表单验证
    const { value:mobile, errorMessage:mobileMessage } = useField("_", verify.mobile);
    const { value:code, errorMessage:codeMessage } = useField("_", verify.code);
    const { value:name, errorMessage:nameMessage } = useField("_", verify.account);
    const { value:password, errorMessage:passwordMessage } = useField("_", verify.password);
    const { value:codeRigth, errorMessage:codeRigthMessage } = useField("_", verify.code);
    return {
      countDown,
      disableShow,
      router,
      isShow,
      isRigthNumber,
      isClick,
      iShow,
      getCaptcha,
      reqCaptcha,
      mobile,
      onLogin,
      mobileMessage,
      code,
      codeMessage,
      name,
      nameMessage,
      password,
      passwordMessage,
      codeRigth,
      codeRigthMessage
      
    }
  }
}
</script>

<style lang="less">

  .loginContainer {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .loginInner{
      width: 80%;
      padding-top: 60px;
      margin: 0 auto;
      .login_header {
        h2 {
          text-align: center;
          font-size: 40px;
          font-weight: bold;
          color: #02a774;
        }
        .login_header_title{
          padding-top: 40px;
          text-align: center;
          span {
            padding: 0 10px;
            font-size: 15px;
          }
          .on{
            color: #02a774;
            font-weight: 600;
            border-bottom: 2px solid #02a774;
          }
        }
      }
      .login_content {
        .login_message {
          .name-span{
            position: absolute;
            font-size: 10px;
            // background-color:yellow;
            width: 100%;
            height: 8px;
            left: 0;
            top: 32px;
            color: red;
          }
          .codeRigth-span{
            position: absolute;
            font-size: 10px;
            // background-color:yellow;
            width: 100%;
            height: 8px;
            left: 0;
            top: 32px;
            color: red;
          }
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          outline: 1px solid rgb(231, 223, 223);
          &:hover{
            outline: 1px solid yellowgreen;
          }
          line-height: 48px;
          input{
            outline:none;
            padding-left: 8px;
          }
          button {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
             border: 0;
             font-size: 14px;
            //  color: #fff;
             background-color: #fff;
          }
          span {
            position: absolute;
            font-size: 10px;
            // background-color:yellow;
            width: 100%;
            height: 8px;
            left: 0;
            top: 32px;
            color: red;
            
          }
          .get_verification {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            border: 0;
            color: #ccc;
            font-size: 14px;
          }
        }
        .login_verification {
          .password-span{
            position: absolute;
            font-size: 10px;
            // background-color:yellow;
            width: 100%;
            height: 8px;
            left: 0;
            top: 32px;
            color: red;
          }
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          line-height: 48px;
          outline: 1px solid rgb(231, 223, 223);
          padding-left: 8px;
          
          &:hover{
            outline: 1px solid yellowgreen;
            
          }
          input{
            outline: none;
          }
          .span{
            font-size: 10px;
            position: absolute;
            // background-color:yellow;
            width: 100%;
            height: 8px;
            left: 0;
            top: 32px;
            color: red;
          }
          
          .switch_button{
            position: absolute;
            right: 35px;
            top: 15px;
            width: 40px;
            height: 18px;
            display: inline-block;
            border: 1px solid #ddd;
            color: #fff;
            border-radius: 9px;
            transition: all 2s;
            div {
              transition: all 1s;
              position: absolute;
              top: -1px;
              width: 18px;
              height: 18px;
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 50%;
            }
            span {
              position: absolute;
              right: 10px;
              top: -16px;
            }
          }
          .iShow{
            transition: all 4s;
            background-color: #4cd96f;
            div {
              transform:translateX(24px) ;
              transition: all 1s;
            }
          }
        }
        .login_hint {
          margin-top: 12px;
          color: #999;
          font-size: 14px;
          line-height: 20px;
          span {
            color: #02a774;
          }
        }
        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
        .about_us{
            display: block;
            font-size: 12px;
            margin-top: 20px;
            text-align: center;
            color: #999;
        }
      }
      .go_back {
            position: absolute;
            top: 5px;
            left: 5px;
            width: 30px;
            height: 30px;
      }
    } 
  }
</style>