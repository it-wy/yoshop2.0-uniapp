<template>
  <view v-if="!isLoading" class="container">
    <!-- 页面头部 -->
    <view class="main-header" :style="{ height: $platform == 'H5' ? '240rpx' : '320rpx', paddingTop: $platform == 'H5' ? '0' : '50rpx' }">
      <image class="bg-image" src="http://php.tralife.cn/uploads/10001/20210408/d1b849cc48b301f3be61db9aa7fdb19f.png" mode="scaleToFill"></image>
      <!-- 用户信息 -->
      <view v-if="isLogin" class="user-info" @click="onUser">
        <view class="user-avatar">
          <image class="image" :src="userInfo.avatar_url ? userInfo.avatar_url : '/static/default-avatar.png'"></image>
        </view>
        <view class="user-content">
          <!-- 会员昵称 -->
          <view class="nick-name">{{ userInfo.nick_name }}</view>
          <!-- 会员等级 -->
          <view v-if="userInfo.grade_id > 0 && userInfo.grade" class="user-grade">
            <view class="user-grade_icon">
              <image class="image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA0lBMVEUAAAD/tjL/tzH/uDP/uC7/tjH/tzH/tzL/tTH+tTL+tjP/tDD/tTD+tzD/tjL/szD/uDH/tjL/tjL+tjD/tjT/szb/tzL/tTL+uTH+tjL/tjL/tjL/tTT/tjL/tjL+tjH/uTL/vDD/tjL/tjH/tzL9uS//tTL/nBr/sS7/tjH/ujL/szD/uTv+rzf/tzL+tzH+vDP+uzL+tjP+ry7+tDL9ki/7szf/sEX/tTL/tjL+tjL/tTH/tTT/tzH/tzL/tjP/sTX/uTP/wzX+rTn/vDX9vC8m8ckhAAAAOXRSTlMAlnAMB/vjxKWGMh0S6drMiVxPRkEY9PLy0ru0sKagmo5+dGtgVCMgBP716eXWyMGxqJGRe2o5KSmFNjaYAAABP0lEQVQ4y8XS13KDMBAF0AWDDe4t7r3ETu9lVxJgJ/n/X8rKAzHG5TE+Twz3zki7I/g/KXdghIbGJewrU4yzn08Ebgl6TuZzzuOC6W5es3HX6qsSz3NFShRU0MpucytDmOSpu3yULx3CA9RD1HjVedc0jSjqm6ZzhUjDsFDQhSp/OKj5GQvg0+ZCOixsbtDLAeTTOm/yGi8GyIphIVsgH737FEDV44LJa88IRKK/SetrwT9G/GUIr6vXjoy4GXn7+RboVXnghuSjaoGecwQxL2su3CwAKlO+QFoqxI4FMctHQhQd2OhxTu184jWUlI+rMTBTn1/IQcJHQ6GQdZ7pWiDaNdhTt330efISeiqYwQEzQpTlsURJLhzkEmpCPsERfeIUVyXr6MNuIyp5uziW6xURtt7hhGwzmMNJExfO4Bd9X0ZPqAxdNwAAAABJRU5ErkJggg=="></image>
            </view>
            <view class="user-grade_name">
              <text>{{ userInfo.grade.name }} {{ userInfo.user_id?'(UID:'+userInfo.user_id+')':'' }}</text>
            </view>
          </view>
          <!-- 会员无等级时显示手机号 -->
          <view v-else class="mobile">{{ userInfo.mobile }}{{userInfo.user_id?'(UID:'+userInfo.user_id+')':''}}</view>
          <!-- 城市达人 -->
          <view>
            <u-tag :text="vip" border-color="#c59a46" color="white" bg-color="#ff5722e0"  mode="dack" />
            &nbsp;{{userInfo.shop_id_arr.length>0?'[商家]':''}}
          </view>
          
          
        </view>
      </view>
      <!-- 未登录 -->
      <view v-else class="user-info" @click="handleLogin">
        <view class="user-avatar">
          <image class="image" src="/static/default-avatar.png"></image>
        </view>
        <view class="user-content">
          <view class="nick-name">未登录</view>
          <view class="login-tips">点击登录账号</view>
        </view>
      </view>
    </view>

    <!-- 我的钱包 -->
    <view class="my-asset">
      <view class="asset-left flex-box dis-flex flex-x-center">
        <view class="asset-left-item" @click="onTargetWallet">
          <view class="item-value dis-flex flex-x-center">
            <text>{{ isLogin ? assets.balance.toFixed(2) : '--' }}</text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>账户余额</text>
          </view>
        </view>
        <view class="asset-left-item" @click="onTargetPoints">
          <view class="item-value dis-flex flex-x-center">
            <text>{{ isLogin ? assets.points.toFixed(2) : '--' }}</text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>我的{{ setting[SettingKeyEnum.POINTS.value].points_name }}</text>
          </view>
        </view>
        <view class="asset-left-item" @click="onTargetMyCoupon">
          <view class="item-value dis-flex flex-x-center">
            <text>{{ isLogin ? assets.coupon : '--' }}</text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>优惠券</text>
          </view>
        </view>
      </view>
      <view class="asset-right">
        <view class="asset-right-item" @click="onTargetWallet">
          <view class="item-icon dis-flex flex-x-center">
            <text class="iconfont icon-qianbao"></text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>我的钱包</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 订单操作 -->
    <view class="order-navbar">
      <view class="order-navbar-item" v-for="(item, index) in orderNavbar" :key="index" @click="onTargetOrder(item)">
        <view class="item-icon">
          <text class="iconfont" :class="[`icon-${item.icon}`]"></text>
        </view>
        <view class="item-name">{{ item.name }}</view>
        <text class="order-badge" v-if="item.count && item.count > 0">{{ item.count }}</text>
      </view>
    </view>

    <!-- 我的服务 -->
    <view class="my-service">
      <view class="service-title">我的服务</view>
      <view class="service-content clearfix">
        <block v-for="(item, index) in service" :key="index">
          <view v-if="item.type == 'link'" class="service-item" @click="handleService(item)">
            <view class="item-icon">
              <text class="iconfont" :class="[`icon-${item.icon}`]"></text>
            </view>
            <view class="item-name">{{ item.name }}</view>
          </view>
          <view v-if="item.type == 'button' && $platform == 'MP-WEIXIN'" class="service-item">
            <button class="btn-normal" :open-type="item.openType">
              <view class="item-icon">
                <text class="iconfont" :class="[`icon-${item.icon}`]"></text>
              </view>
              <view class="item-name">{{ item.name }}</view>
            </button>
          </view>
        </block>
      </view>
    </view>
	
	<!-- 备案 -->
	<view class="ba">
		<p><image src="http://pic.tralife.cn/10001/20210427/20baeb551865e8d6eab32ac6d333c696.png" mode="widthFix"></image>闽ICP备20008662号-1</p>
	</view>
	

	<!-- 达人申请框 -->
	<!-- <u-modal v-model="show" :show-title="false" @cancel="cancel" @confirm="confirm" confirm-text="微信支付" cancel-text="余额支付" :show-cancel-button="true">
		<p class="p1">请选择支付方式</p>
		<p class="p1">申请达人</p>
	</u-modal> -->
	<!-- 达人通知框 -->
	<u-modal v-model="is_show" title="达人" :content="content" @confirm="onGift"></u-modal>
  <!-- 模态框 -->
	<view class="mask" @click="confi" v-show="is_drshow">
    <view class="content">
      <image
        src="http://pic.tralife.cn/10001/20210419/24337d376972960ff287eb6780250284.png"
        mode="scaleToFill"
      />
      <p>恭喜您成功升级为达人</p>
    </view>
  </view>	
  </view>
</template>

<script>
  import { setCartTabBadge } from '@/utils/app'
  import SettingKeyEnum from '@/common/enum/setting/Key'
  import SettingModel from '@/common/model/Setting'
  import * as UserApi from '@/api/user'
  import * as OrderApi from '@/api/order'
  import { checkLogin } from '@/utils/app'
	
	
	
  // 订单操作
  const orderNavbar = [
    { id: 'all', name: '全部订单', icon: 'qpdingdan' },
    { id: 'payment', name: '待支付', icon: 'daifukuan', count: 0 },
    { id: 'delivery', name: '待发货', icon: 'daifahuo', count: 0 },
    { id: 'received', name: '待收货', icon: 'daishouhuo', count: 0 },
  ]

  /**
   * 我的服务
   * id: 标识; name: 标题名称; icon: 图标; type 类型(link和button); url: 跳转的链接
   */
  

  export default {
    data() {
      return {
        // 枚举类
        SettingKeyEnum,
        // 当前运行的终端 (此处并不冗余,因为微信小程序端view层无法直接读取$platform)
        $platform: this.$platform,
        // 正在加载
        isLoading: true,
        // 是否已登录
        isLogin: false,
        // 系统设置
        setting: {},
        // 当前用户信息
        userInfo: {},
        // 账户资产
        assets: { balance: '--', points: '--', coupon: '--' },
        // 我的服务
        service:[
			  { id: 'address', name: '收货地址', icon: 'shouhuodizhi', type: 'link', url: 'pages/address/index' },
			  { id: 'coupon', name: '申请达人', icon: 'lingquan', type: 'link', url: 'packageA/pages/gift/gift' },
			  { id: 'myCoupon', name: '我的粉丝', icon: 'tuandui', type: 'link', url: 'packageA/pages/fans/fans' },
			  { id: 'help', name: '我要分享', icon: 'fenxiang', type: 'link', url: 'packageA/pages/share/share' },
			  { id: 'contact', name: '在线客服', icon: 'kefu', type: 'button', openType: 'contact' },
			  { id: 'poin', name: '我的明细', icon: 'jifen', type: 'link', url: 'packageA/pages/log/log' },
			  // { id: 'refund', name: '退换/售后', icon: 'shouhou', type: 'link', url: 'pages/refund/index' },
			  // { id: 'refund', name: '夺宝订单', icon: 'fuwu', type: 'link', url: 'pages/refund/index' },
        { id: 'refund', name: '绑定手机', icon: 'dianhua', type: 'link', url: 'packageA/pages/with/with' },
        { id: 'help', name: '商家二维码', icon: 'erweima', type: 'link', url: 'packageA/pages/share/share?shop=shop'},
        { id: 'poin', name: '商家提现明细', icon: 'zhangben', type: 'link', url: 'packageA/pages/log/log?log=shop'},
        { id: 'poin', name: '商家流水', icon: 'zhangben', type: 'link', url: 'packageA/pages/log/log?log=shops'},
        { id: 'poin', name: '商家提现', icon: 'fapiaoguanli', type: 'link', url: 'packageA/pages/with/with?type=swith'},
        ],
        // 订单操作
        orderNavbar,
        // 当前用户待处理的订单数量
        todoCounts: { payment: 0, deliver: 0, received: 0 },
		// 达人弹窗显示
		show: false,
		// 达人领取
		content: '您已购买达人商品,还没有填写收货地址！',
		// 礼包弹窗显示
		is_show: false,
		// 定位
    vip: '普通会员',
    is_drshow: false,
      }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(options) {
      const app = this;
      // 更新购物车角标
      setCartTabBadge()
      // 判断是否已登录
      this.isLogin = checkLogin()
      // 获取页面数据
      this.service =[
			  { id: 'address', name: '收货地址', icon: 'shouhuodizhi', type: 'link', url: 'pages/address/index' },
			  { id: 'coupon', name: '申请达人', icon: 'lingquan', type: 'link', url: 'packageA/pages/gift/gift' },
			  { id: 'myCoupon', name: '我的粉丝', icon: 'tuandui', type: 'link', url: 'packageA/pages/fans/fans' },
			  { id: 'help', name: '我要分享', icon: 'fenxiang', type: 'link', url: 'packageA/pages/share/share' },
			  { id: 'contact', name: '在线客服', icon: 'kefu', type: 'button', openType: 'contact' },
			  { id: 'poin', name: '我的明细', icon: 'jifen', type: 'link', url: 'packageA/pages/log/log' },
			  // { id: 'refund', name: '退换/售后', icon: 'shouhou', type: 'link', url: 'pages/refund/index' },
			  // { id: 'refund', name: '夺宝订单', icon: 'fuwu', type: 'link', url: 'pages/refund/index' },
        { id: 'refund', name: '绑定手机', icon: 'dianhua', type: 'link', url: 'packageA/pages/with/with' },
		// { id: 'poin', name: '商家入驻', icon: 'dianpu', type: 'link', url: 'packageA/pages/shopform/shopform' },
        { id: 'help', name: '商家二维码', icon: 'erweima', type: 'link', url: 'packageA/pages/share/share?shop=shop'},
        { id: 'poin', name: '商家提现明细', icon: 'zhangben', type: 'link', url: 'packageA/pages/log/log?log=shop'},
        { id: 'poin', name: '商家流水', icon: 'zhangben', type: 'link', url: 'packageA/pages/log/log?log=shops'},
        { id: 'poin', name: '商家提现', icon: 'fapiaoguanli', type: 'link', url: 'packageA/pages/with/with?type=swith'},
        ];

      this.getPageData()

      

      uni.getStorage({
      key: 'res_id',
      success: ({ data }) => {
        
          if(this.isLogin){
                
                  return new Promise((resolve, reject) => {
                      UserApi.userShare({res_id: data})
                      .then(result => {
                        // uni.showToast({
                        //   title: data,
                        //   icon: 'success',
                        //   mask: true
                        // })
                        uni.removeStorageSync('res_id')
                        resolve(result)
                      })
                      .catch(err => {
                        if (err.result && err.result.status == 401) {
                        // app.isLogin = false
                        resolve(null)
                        } else {
                        reject(err)
                        }
                      })
                  })	
              }
      },
    })
      
	  // 定位
	  // this.getGps()
	  // this.getLocation()
	  // h5定位
	  
	  
    },
	onLoad(options) {
		const app = this;
		// if(options.scene){
		//   uni.setStorage({
		// 	key: 'res_id',
		// 	data: decodeURIComponent(options.scene),
		//   })
		// }

    
    
    
    
	},

    methods: {

      // 获取页面数据
      getPageData(callback) {
        const app = this
        app.isLoading = true
		
        Promise.all([app.getSetting(), app.getUserInfo(), app.getUserAssets(), app.getTodoCounts()])
          .then(result => {
            app.isLoading = false
            // app.initSer();
            // 初始化我的服务数据
            app.initService();
            // 初始化订单操作数据
            app.initOrderTabbar()
            // 执行回调函数
            callback && callback();
            
          })
          .catch(err => {
            console.log('catch', err)
          })
      },
      confi(){
            this.is_drshow = false;
            
      },

      // 初始化我的服务数据
      initService() {
        const app = this
        const newService = []
        app.service.forEach(item => {
          if (item.id === 'points') {
            item.name = '我的' + app.setting[SettingKeyEnum.POINTS.value].points_name
          }
          newService.push(item)
        })
        app.service = newService
      },

      // 初始化订单操作数据
      initOrderTabbar() {
        const app = this
        const newOrderNavbar = []
        orderNavbar.forEach(item => {
          if (item.hasOwnProperty('count')) {
            item.count = app.todoCounts[item.id]
          }
          newOrderNavbar.push(item)
        })
        app.orderNavbar = newOrderNavbar
      },

      // 获取商城设置
      getSetting() {
        const app = this
        return new Promise((resolve, reject) => {
          SettingModel.data().then(setting => {
            app.setting = setting
            resolve(setting)
          }).catch(err => reject(err))
        })
      },

      // 获取当前用户信息
      getUserInfo() {
        const app = this
         if(!app.isLogin){
          app.initGet()
        }
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : UserApi.info()
            .then(result => {
              app.userInfo = result.data.userInfo
              
              app.initSer();
              if (app.userInfo.drOrder) {
                app.is_show = true;
              }
              resolve(app.userInfo)
            })
            .catch(err => {
              if (err.result && err.result.status == 401) {
                app.isLogin = false
                resolve(null)
              } else {
                reject(err)
              }
            })
        })
       
      },

      // 获取账户资产
      getUserAssets() {
        const app = this
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : UserApi.assets()
            .then(result => {
              app.assets = result.data.assets
              resolve(app.assets)
            })
            .catch(err => {
              if (err.result && err.result.status == 401) {
                app.isLogin = false
                resolve(null)
              } else {
                reject(err)
              }
            })
        })
      },

      // 获取当前用户待处理的订单数量
      getTodoCounts() {
        const app = this
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : OrderApi.todoCounts()
            .then(result => {
              app.todoCounts = result.data.counts
              resolve(app.todoCounts)
            })
            .catch(err => {
              if (err.result && err.result.status == 401) {
                app.isLogin = false
                resolve(null)
              } else {
                reject(err)
              }
            })
        })
      },

      // 跳转到登录页
      handleLogin() {
        !this.isLogin && this.$navTo('pages/login/index')
		
      },

      // 跳转到钱包页面
      onTargetWallet() {
        this.$navTo('packageA/pages/wallet/index')
      },

      // 跳转到订单页
      onTargetOrder(item) {
        this.$navTo('pages/order/index', { dataType: item.id })
      },

      // 跳转到我的积分页面
      onTargetPoints() {
        this.$navTo('packageA/pages/points/log')
      },

      // 跳转到我的优惠券页
      onTargetMyCoupon() {
        this.$navTo('pages/my-')
      },

      // 跳转到服务页面
      handleService({ url }) {
		  
		  if(url=='packageA/pages/with/with'){
			  this.$navTo(url,{ type: 'phone'})
		  }else {
			  
			  this.$navTo(url)
		  }
		// const i = url!=''? this.$navTo(url) : this.show = true; 
        
      },
	  
	  // 达人余额支付
	  cancel(){
		  // uni.navigateTo({
		  // 	url:'/pages/pay/pay?id='+'balance'
		  // })
	  },
	  
	  // 达人微信支付
	  confirm(){
		  uni.navigateTo({
		  	url:'/pages/pay/pay?id='+'wx'
		  })
	  },
    onGift(){
      const app = this;
      uni.navigateTo({
		  	url:'/pages/address/create?drOrder='+app.userInfo.drOrder
		  })
    },

	  // 个人中心
	  onUser(){
		uni.navigateTo({
			url:'/packageA/pages/userinfo/index'
		})
	},
  initSer(){
    const app = this;
    
    if(app.userInfo.dr_grade == 0){
      app.vip = '普通会员'
      uni.removeStorage({
        key: 'isdr',
      })
		}else {
        app.service = app.service.filter((i)=>{
				  return i.name!="申请达人"
			  })
        app.vip = app.userInfo.dr_grade==1?'城市达人':app.userInfo.dr_grade==2?'团长':app.userInfo.dr_grade==3?'县级服务商':app.userInfo.dr_grade==4?'市级服务商':app.userInfo.dr_grade==5?'省级服务商':'运营中心';
		
		
		
		
        uni.getStorage({
          key: 'isdr',
          fail: (error) => {
             uni.setStorage({
              key: 'isdr',
              data: true,
              success:()=>{
                uni.getStorage({
                key: 'isdr',
                success: ({ data }) => {
                  this.is_drshow = data;
                },
              })
              }
            })
          }
        })
        
			  app.$forceUpdate()
    }

      

    if(app.userInfo.shop_id_arr!=undefined && app.userInfo.shop_id_arr.length>0){
			  
		}else {
      
        app.service = app.service.filter((i)=>{
				  return i.name!="商家二维码"
			  })
        app.service = app.service.filter((i)=>{
				  return i.name!="商家提现明细"
			  })
        app.service = app.service.filter((i)=>{
				  return i.name!="商家提现"
			  })

         app.service = app.service.filter((i)=>{
				  return i.name!="商家流水"
			  })
        
			  app.$forceUpdate()
    }

    
		if(app.userInfo.mobile!=''){

      app.service.map((i)=>{
                  if(i.name=='绑定手机'){
                    i.name = '设置';
                    i.icon = 'shezhi';
                    i.url = 'packageA/pages/userinfo/index'
                  }
        })
			
			  app.$forceUpdate()
		}
    
  },
  initGet(){
    
    const app = this;
     app.service = app.service.filter((i)=>{
				  return i.name!="申请达人"
			  })

     app.service = app.service.filter((i)=>{
				  return i.name!="商家二维码"
			  })
        app.service = app.service.filter((i)=>{
				  return i.name!="商家提现明细"
			  })
        app.service = app.service.filter((i)=>{
				  return i.name!="商家提现"
			  })

         app.service = app.service.filter((i)=>{
				  return i.name!="商家流水"
			  })
         app.service = app.service.filter((i)=>{
              return i.name!='绑定手机'
        })

      
  }
		

		

	  

    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
      // 获取首页数据
      this.getPageData(() => {
        uni.stopPullDownRefresh()
      })
    },


  }
</script>

<style lang="scss" scoped>
  // 页面头部
  .main-header {
    background-color: #fff;
    // background-image: url('/static/background/user-header.png');
    position: relative;
    width: 100%;
    height: 280rpx;
    background-size: 100% 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    // padding-top: 40rpx;
    padding-left: 30rpx;

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .user-info {
      display: flex;
      height: 100rpx;
      z-index: 1;

      .user-avatar .image {
        display: block;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }

      .user-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 30rpx;
        color: #c59a46;

        .nick-name {
          font-size: 32rpx;
          font-weight: bold;
        }

        .mobile {
          margin: 15rpx 0;
          font-size: 26rpx;
        }

        .user-grade {
          display: flex;
          align-items: center;
          background: #3c3c3c;
          margin-top: 12rpx;
          border-radius: 10rpx;
          padding: 4rpx 12rpx;

          .user-grade_icon .image {
            display: block;
            width: 32rpx;
            height: 32rpx;
          }

          .user-grade_name {
            margin-left: 5rpx;
            font-size: 24rpx;
            color: #EEE0C3;
          }

        }

        .login-tips {
          margin-top: 12rpx;
          font-size: 28rpx;
        }

      }
    }
  }

  // 我的钱包
  .my-asset {
    display: flex;
    background: #fff;
    padding: 40rpx 0;

    .asset-right {
      width: 200rpx;
      border-left: 1rpx solid #eee;
    }

    .asset-right-item {
      text-align: center;
      color: #545454;

      .item-icon {
        font-size: 40rpx;
      }

      .item-name {
        margin-top: 10rpx;
      }

      .item-name text {
        font-size: 25rpx;
      }

    }

    .asset-left-item {
      text-align: center;
      color: #666;
      padding: 0 37rpx;

      .item-value {
        font-size: 30rpx;
        color: red;
      }

      .item-name {
        margin-top: 6rpx;
      }

      .item-name {
        font-size: 25rpx;
      }
    }

  }

  // 订单操作
  .order-navbar {
    display: flex;
    margin: 20rpx auto 20rpx auto;
    padding: 20rpx 0;
    width: 94%;
    box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
    font-size: 30rpx;
    border-radius: 5rpx;
    background: #fff;

    &-item {
      position: relative;
      width: 25%;

      .item-icon {
        text-align: center;
        margin: 0 auto;
        padding: 10rpx 0;
        color: #545454;
        font-size: 40rpx;
      }

      .item-name {
        font-size: 24rpx;
        color: #545454;
        text-align: center;
        margin-right: 10rpx;
      }

      .order-badge {
        position: absolute;
        top: 0;
        right: 55rpx;
        font-size: 22rpx;
        background: #fa2209;
        text-align: center;
        line-height: 28rpx;
        color: #fff;
        border-radius: 100%;
        min-height: 30rpx;
        min-width: 30rpx;
        padding: 1rpx;
      }
    }
  }

  // 我的服务
  .my-service {
    margin: 22rpx auto 22rpx auto;
    padding: 20rpx 0;
    width: 94%;
    box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 5rpx;
    background: #fff;

    .service-title {
      padding-left: 20rpx;
      margin-bottom: 30rpx;
      font-size: 28rpx;
    }

    .service-content {

      // margin-bottom: -30rpx;
      .service-item {
        position: relative;
        width: 25%;
        float: left;
        margin-bottom: 30rpx;

        .item-icon {
          text-align: center;
          margin: 0 auto;
          padding: 10rpx 0;
          color: #ff3800;
          font-size: 40rpx;
        }

        .item-name {
          font-size: 24rpx;
          color: #545454;
          text-align: center;
          // margin-right: 10rpx;
        }

      }
    }


  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.692);
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      p { text-align: center;color:white;font-size: 32rpx;font-weight: bold;}
    }
  }

  
  .p1 {
	  margin: 30rpx;
	  text-align: center;
  }
  .ba {
	  margin-top: 35rpx;
	  p {
		  text-align: center;
		  color: #858687;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  image {
			  width: 30rpx;
			  margin-right: 10rpx;
		  }
	  }
  }
</style>
