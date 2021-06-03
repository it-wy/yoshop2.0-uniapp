import store from '../store'
import * as util from './util'
import { paginate } from '@/common/constant'
import md5 from './md5'
/* #ifdef H5 */
import jweixin from './jweixin'
/* #endif */

/**
 * 获取当前运行的终端(App H5 小程序)
 * https://uniapp.dcloud.io/platform
 */
export const getPlatform = () => {
  // #ifdef APP-PLUS
  const platform = 'App'
  // #endif
  // #ifdef APP-PLUS-NVUE
  const platform = 'App'
  // #endif
  // #ifdef H5
  let ua = navigator.userAgent.toLowerCase();
        
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    
    var platform = 'H5'
  }else{
    
    var platform = 'X5'
  }
  
  // #endif
  // #ifdef MP-WEIXIN
  const platform = 'MP-WEIXIN'
  // #endif
  // #ifdef MP-ALIPAY
  const platform = 'MP-ALIPAY'
  // #endif
  // #ifdef MP-BAIDU
  const platform = 'MP-BAIDU'
  // #endif
  // #ifdef MP-TOUTIAO
  const platform = 'MP-TOUTIAO'
  // #endif
  // #ifdef MP-QQ
  const platform = 'MP-QQ'
  // #endif
  // #ifdef MP-360
  const platform = 'MP-360'
  // #endif
  return platform
}

/**
 * 显示成功提示框
 */
export const showSuccess = (msg, callback) => {
  uni.showToast({
    title: msg,
    icon: 'success',
    mask: true,
    duration: 1500,
    success() {
      callback && callback()
    }
  })
}

/**
 * 显示失败提示框
 */
export const showError = (msg, callback) => {
  uni.showModal({
    title: '友情提示',
    content: msg,
    showCancel: false,
    success(res) {
      callback && callback()
    }
  })
}

/**
 * 显示纯文字提示框
 */
export const showToast = msg => {
  uni.showToast({
    title: msg,
    icon: 'none'
  })
}

/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
export const getTabBarLinks = () => {
  const tabBarLinks = [
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/user/index'
  ]
  return tabBarLinks
}

/**
 * 生成转发的url参数
 */
export const getShareUrlParams = (params) => {
  return util.urlEncode({
    refereeId: store.getters.userId, // 推荐人ID
    ...params
  })
}

/**
 * 跳转到指定页面url
 * 支持tabBar页面
 * @param {string}  url
 * @param {object}  query
 */
export const navTo = (url, query = {}) => {
  if (!url || url.length == 0) {
    return false
  }
  // tabBar页面, 使用switchTab
  if (util.inArray(url, getTabBarLinks())) {
    uni.switchTab({
      url: `/${url}`
    })
    return true
  }
  // 生成query参数
  const queryStr = !util.isEmpty(query) ? '?' + util.urlEncode(query) : ''
  // 普通页面, 使用navigateTo
  uni.navigateTo({
    url: `/${url}${queryStr}`
  })
  return true
}

/**
 * 记录购物车商品总数量
 * @param {*} value 
 */
export const setCartTotalNum = (value) => {
  uni.setStorageSync('cartTotalNum', Number(value))
}

/**
 * 设置购物车tabbar的角标
 * 该方法只能在tabbar页面中调用, 其他页面调用会报错
 */
export const setCartTabBadge = () => {
  const cartTabbarIndex = 2
  const cartTotal = uni.getStorageSync('cartTotalNum') || 0
  if (cartTotal > 0) {
    uni.setTabBarBadge({
      index: cartTabbarIndex,
      text: `${cartTotal}`
    })
  } else {
    uni.removeTabBarBadge({
      index: cartTabbarIndex
    })
  }
  return
}

/**
 * 验证是否已登录
 */
export const checkLogin = () => {
	
  return !!store.getters.userId
}


 //二次签名
 function getPayInfo (orderInfo) {
	let res = orderInfo, // 后台返回的统一下单数据
		key = "5970CC553E305FCCC225F50755EA818B", // 加密Key，微信支付填写的key（后台提供）
		payInfo = {
			appid: res.appid,
			noncestr:res.noncestr,
			package: 'Sign=WXPay',
			partnerid: res.partnerid,
			prepayid: res.prepayid,
			timestamp: Number(res.timestamp),
	}
	// 键值对按照ASCII码从小到大排序生成类似：appid=xxx&body=xx&device_info=1000
	let keyValueStr = mapObjToKeyValue(payInfo, true);
	// 插入加密Key到最后
	let strSignTemp = `${keyValueStr}&key=${key}`;
	// 真正的二次加密（需要引入md5.js源码，小编文章最后会附）
	let sign = md5(strSignTemp).toUpperCase().substr(0, 32);	
	console.log(sign) // 可以去微信支付文档做校验
	payInfo.sign = sign;
	// 返回字符串给uniapp调起支付用
	return JSON.stringify(payInfo);
}

/*
 * 根据object生成key value字符串
 * @params obj: any 要map的对象
 * @params isSort: boolean 是否根据ASCII字典排序
 */
function mapObjToKeyValue(obj, isSort = false) {
	let keys = Object.keys(obj);
	let str = "";
	
	if (isSort) keys.sort();
	keys.forEach(key => {
		if (obj.hasOwnProperty(key)) {
			str += `${key}=${obj[key]}&`;
		}
	});
	return str.replace(/&$/, "");
}



/**
 * 发起支付请求
 * @param {Object} 参数
 */
export const wxPayment = (option) => {
  const options = {
    timeStamp: '',
    nonceStr: '',
    prepay_id: '',
    paySign: '',
    ...option
  }

  


  /* #ifdef APP-PLUS */
  const orderInfo  = {
    appid: 'wxf045fd10aa00e07e',
    timestamp: options.timeStamp,
    noncestr: options.nonceStr,
    package: 'Sign=WXPay',
    prepayid: options.prepay_id,
    partnerid: '1590037521',  
    sign: options.paySign,
  }

  let weixinorder = getPayInfo(orderInfo);


 



  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      orderInfo: weixinorder,
      success: res => resolve(res),
      fail: (res) => {
        // uni.showModal({
        //   content: "支付失败,其原因为: " + JSON.stringify(res),
        //     showCancel: false
        // })

        // uni.showModal({
        //   content: "支付失败,其原因为: " + JSON.stringify(orderInfo),
        //     showCancel: false
        // })

        console.log(JSON.stringify(res));
        reject(res)
      }  
    })
  })
  /* #endif */

  /* #ifdef MP-WEIXIN */
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: options.timeStamp,
      nonceStr: options.nonceStr,
      'package': `prepay_id=${options.prepay_id}`,
      signType: 'MD5',
      paySign: options.paySign,
      success: res => resolve(res),
      fail: (res) => {
        // uni.showModal({
        //   content: "支付失败,其原因为: " + JSON.stringify(res),
        //     showCancel: false
        // })

        console.log(JSON.stringify(res));
        reject(res)
      }  
    })
  })
  /* #endif */


  /* #ifdef H5 */
  return new Promise((resolve, reject) => {
  let ua = navigator.userAgent.toLowerCase();
        
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
   
      jweixin.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:'wx374b7f026d00b120', // 必填，公众号的唯一标识
        timestamp:options.timeStamp, // 必填，生成签名的时间戳
        nonceStr:options.nonceStr, // 必填，生成签名的随机串
        signature:options.paySign, // 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    
    
      jweixin.ready(function(){  
        jweixin.chooseWXPay({
          timestamp: options.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: options.nonceStr, // 支付签名随机串，不长于 32 位
          'package': `prepay_id=${options.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign:options.paySign, // 支付签名
          success:res=> {
              // 支付成功后的回调函数
              resolve(res);
          },
          fail:err=> {
            // 支付失败后的回调函数
            
            reject(err);
          },
          cancel:res=>{
           
            reject(res);
          }
        })
    
      });
    
    
  }else{

    // 跳转微信
    
    window.location.href = options.payUrl;
  }
})  

/* #endif */

  
}

/**
 * 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getEmptyPaginateObj = () => {
  return util.cloneObj(paginate)
}

/**
 * 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getMoreListData = (resList, oldList, pageNo) => {
  // 如果是第一页需手动制空列表
  if (pageNo == 1) oldList.data = []
  // 合并新数据
  return oldList.data.concat(resList.data)
}
