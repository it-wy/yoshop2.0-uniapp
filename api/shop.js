import request from '@/utils/request'

// api地址
const api = {
  shopList: 'shop/shop_list',
  city: 'shop/getAddress',
  gps: 'shop/getCity',
  cate: 'shop/class_list',
  info: 'shop/shop_info',
  form: 'shop/shop_add',
  code: 'passport/sendSmsCaptcha',
  qrcode: 'user/get_user_shop_new',
  shopGps: 'shop/getarealocation',
  shopForm: 'shopApply/shopApplyList',
  formInfo: 'shopApply/shop_info',
  editForm: 'shopApply/editShopApplyHistory',
  record: 'shop/shopRecord'
}

// 本地生活列表
export const list = (param, option) => {
  const options = {
    isPrompt: true, //（默认 true 说明：本接口抛出的错误是否提示）
    load: true, //（默认 true 说明：本接口是否提示加载动画）
    ...option
  }
  return request.post(api.shopList, param, options)
}

// 地址转经纬度
export const city = (param, option) => {
  return request.post(api.city, param)
}

// 经纬度转地址
export const gps = (param, option) => {
  return request.post(api.gps, param)
}

// 商铺分类列表
export const cate = (param, option) => {
  return request.post(api.cate, param)
}

// 商铺详情
export const info = (param, option) => {
  return request.post(api.info, param)
}

// 商铺入驻
export const form = (param, option) => {
  return request.post(api.form, param)
}

// 商铺入驻验证码
export const code = (param, option) => {
  return request.post(api.code, param)
}

// 商铺二维码列表
export const qrcode = (param, option) => {
  return request.post(api.qrcode, param)
}

// 商铺入驻定位
export const shopGps = (param, option) => {
  return request.post(api.shopGps, param)
}

// 商铺入驻列表
export const shopForm = (param, option) => {
  return request.post(api.shopForm, param)
}

// 商铺入驻编辑详情
export const formInfo = (param, option) => {
  return request.post(api.formInfo, param)
}

// 商铺入驻编辑
export const editForm = (param, option) => {
  return request.post(api.editForm, param)
}

// 商铺分账提交
export const record = (param, option) => {
  return request.post(api.record, param)
}

