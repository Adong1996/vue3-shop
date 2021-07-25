import ajax from './ajax'

// 1. 根据纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax.get(`/position/${latitude},${longitude}`)

//2 . 获取商品分类列表

export const reqCategorys = () => ajax.get('/index_category',
{headers: {
  needToken: true
}})

// 3、根据经纬度获取商铺列表

export const reqShops = ({latitude,longitude}) => ajax.get('/shops',
{
  params:{latitude,longitude},
  headers: {
    needToken: true
}
})

//  4. 用户名密码登陆
export const reqLogin = ({name,pwd,captcha}) => ajax.post('/login_pwd',{
  name,
  pwd,
  captcha,
})

// 5 发送短信验证码
export const reqSendcode = (phone) => ajax.get('/sendcode',{params:{phone}})

//8、手机号验证码登陆
export const reqloginPhone = ({phone, code}) => ajax.post('/login_sms',{phone, code})

// 9  自动登录
export const reqAutologin = () => ajax.get('/auto_login',{
  headers: {
    needToken: true
  }
})