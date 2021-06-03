<template>
  <div>
    <MpWeixin v-if="isShowUserInfo" @success="onGetUserInfoSuccess" />
    <Main v-else :isParty="isExistUserInfo" :partyData="partyData" />
  </div>
</template>

<script>
  import store from '@/store'
  import Main from './components/main'
  import MpWeixin from './components/mp-weixin'

  export default {
    components: {
      Main,
      MpWeixin
    },

    data() {
      return {
        // 是否显示获取用户信息组件
        /* #ifdef MP-WEIXIN */
        isShowUserInfo: true,
        /* #endif */
        /* #ifdef APP-PLUS || H5 */
        isShowUserInfo: false,
        /* #endif */
        
        // 是否已获取到了用户信息
        isExistUserInfo: false,
        // 第三方用户信息数据
        partyData: {}
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      const app = this
      store.dispatch('Logout')
      

		
  
      // 只有微信小程序才显示获取用户信息按钮
      
      // app.isShowUserInfo = wx.canIUse('getUserProfile')
     
    },
	onShow() {
		const app = this;
    // #ifdef MP-WEIXIN || H5
    uni.getStorage({
			key:'wxlogin',
			fail() {
        /* #ifdef H5 */
        let ua = navigator.userAgent.toLowerCase();
        
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          
          uni.setStorage({
					key:'wxlogin',
						data:true,
						success() {
							uni.navigateTo({
								url:'../../packageA/pages/login/login'
							})  
						}
				  })
        }else{
          
          app.isShowUserInfo = false;
        }
        /* #endif */
        
        /* #ifdef MP-WEIXIN */
        uni.setStorage({
					key:'wxlogin',
						data:true,
						success() {
							uni.navigateTo({
								url:'../../packageA/pages/login/login'
							})  
						}
				  })
        /* #endif */
				
			},
			success(){
        /* #ifdef H5 */
        	uni.navigateTo({
								url:'../../packageA/pages/login/login'
							})  
        /* #endif */
        /* #ifdef MP-WEIXIN */
        
        app.isShowUserInfo = true;
        /* #endif */
				
			}
		})
		// #endif


	},
    methods: {

      // 获取到用户信息的回调函数
      onGetUserInfoSuccess({ oauth, code, userInfo }) {
        // 记录第三方用户信息数据
        this.partyData = { oauth, code, userInfo }
        // 显示注册页面
        this.onShowRegister()
      },

      // 显示注册页面
      onShowRegister() {
        // 是否显示获取用户信息组件
        this.isShowUserInfo = false
        // 是否已获取到了用户信息
        this.isExistUserInfo = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
