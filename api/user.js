import request from '@/utils/request'

// api地址
const api = {
  userInfo: 'user/info',
  assets: 'user/assets',
  intergaLog: 'user_points_log/list',
  payLog: 'pay_log/list',
  balanceLog: 'user_balance_log/list',
  rewardLog: 'reward_log/list',
  withLog: 'user_balance_log/list',
  blancetran: 'user_balance_log/balance',
  realName: 'user/real_name',
  userPhone: 'user/bind_phone_number',
  userFans: 'user/user_list',
  userWith: 'draw_log/add',
  withLog: 'draw_log/list',
  qrCode: 'wxapp/getMinWechatQrcode',
  editMobile: 'user/update_phone',
  userShare: 'user/create',
  userNewPassword: 'user/update_pass',
  userShopWith: 'shop/shop_withdrawal',
  userShopWithList: 'shop/shop_withdrawal_list',
  userShopWithDefault:'user/user_bank_info',
  userShopPayList:'shop/get_shop_sale_list'
}

// 当前登录的用户信息
export const info = (param, option) => {
  const options = {
    isPrompt: true, //（默认 true 说明：本接口抛出的错误是否提示）
    load: true, //（默认 true 说明：本接口是否提示加载动画）
    ...option
  }
  return request.get(api.userInfo, param, options)
}

// 账户资产
export const assets = (param, option) => {
  return request.get(api.assets, param)
}

// 账户积分明细
export const intergaLog = (param, option) => {
  return request.post(api.intergaLog, param)
}

// 账户充值明细
export const payLog = (param, option) => {
  return request.post(api.payLog, param)
}

// 账户余额明细
export const balanceLog = (param, option) => {
  return request.post(api.balanceLog, param)
}
// 账户奖励明细
export const rewardLog = (param, option) => {
  return request.post(api.rewardLog, param)
}

// 账户提现明细
export const withLog = (param, option) => {
  return request.post(api.withLog, param)
}

// 账户余额转账
export const blancetran = (param, option) => {
  return request.post(api.blancetran, param)
}

// 账户实名认证
export const realName = (param, option) => {
  return request.post(api.realName, param)
}

// 账户绑定手机号
export const userPhone = (param, option) => {
  return request.post(api.userPhone, param)
}

// 账户粉丝
export const userFans = (param, option) => {
  return request.post(api.userFans, param)
}

// 账户提现
export const userWith = (param, option) => {
  return request.post(api.userWith, param)
}

// 小程序二维码
export const qrCode = (param, option) => {
  return request.post(api.qrCode, param)
}

// 账户修改手机号
export const editMobile = (param, option) => {
  return request.post(api.editMobile, param)
}

// 账户邀请
export const userShare = (param, option) => {
  return request.post(api.userShare, param)
}

// 账户修改密码
export const userNewPassword = (param, option) => {
  return request.post(api.userNewPassword, param)
}

// 商户提现
export const userShopWith = (param, option) => {
  return request.post(api.userShopWith, param)
}

// 商户提现列表
export const userShopWithList = (param, option) => {
  return request.post(api.userShopWithList, param)
}


// 商户提现默认信息
export const userShopWithDefault = (param, option) => {
  return request.post(api.userShopWithDefault, param)
}

// 


export const userShopPayList = (param, option) => {
  return request.post(api.userShopPayList, param)
}





