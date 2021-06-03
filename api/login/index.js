import request from '@/utils/request'

// api地址
const api = {
  login: 'passport/phone',
  logins: 'passport/Login',
  H5Login:'passport/phoneNew',
  mpWxLogin: 'passport/mpWxLogin',
  appWxLogin:'passport/mpAppLogin',
  captcha: 'passport/captcha',
  sendSmsCaptcha: 'passport/sendSmsCaptcha',
  mpWxH5Login: 'passport/mpHWxLoginNew'
}

// 用户登录
export function login(data) {
  return request.post(api.login, data)
}
// 用户登录
export function logins(data) {
  return request.post(api.logins, data)
}

// H5用户浏览器登录
export function H5Login(data) {
  return request.post(api.H5Login, data)
}

// 微信小程序快捷登录
export function mpWxLogin(data, option) {
  return request.post(api.mpWxLogin, data, option)
}

// 微信H5快捷登录
export function mpWxH5Login(data, option) {
  return request.post(api.mpWxH5Login, data, option)
}


// app微信登录

export function appWxLogin(data, option) {
  return request.post(api.appWxLogin, data, option)
}

// 图形验证码
export function captcha() {
  return request.get(api.captcha, {}, { load: false })
}

// 发送短信验证码
export function sendSmsCaptcha(data) {
  return request.post(api.sendSmsCaptcha, data, { load: false })
}
