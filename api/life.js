import request from '@/utils/request'

// api地址
const api = {
    life: 'user/assets',
}



// 生活缴费
export const life = (param, option) => {
  return request.get(api.life, param)
}







