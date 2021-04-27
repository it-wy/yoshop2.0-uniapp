<template>
  <view class="container" v-if="!isLoading">
    <view class="space-upper">
      <view class="wallet-image">
        <image src="http://php.tralife.cn/uploads/10001/20210408/3f467032a569dbb5c7b173ff6a1505eb.png" mode="widthFix"></image>
      </view>
      <view class="wallet-account">
        <view class="wallet-account_balance">
          <text>{{ userInfo.balance.toFixed(2) }}</text>
        </view>
        <view class="wallet-account_lable">
          <text>账户余额(元)</text>
        </view>
      </view>
    </view>
    <view class="space-lower">
      <view v-if="setting.is_entrance" class="space-lower_item btn-recharge">
        <view class="btn-submit" @click="onTargetRecharge()">充 值</view>
		<view class="btn-submit tx" @click="onTargetWith()">提 现</view>
      </view>
      <view class="space-lower_item item-lable dis-flex flex-x-around">
        <view class="lable-text" @click="onTargetRechargeOrder()">
          <text>充值记录</text>
        </view>
        <view class="lable-text" @click="onTargetBalanceLog()">
          <text>账单详情</text>
        </view>
      </view>
    </view>
	<!-- 转账 -->
	<view class="transfer" @click="ontransfer">
		转账
	</view>
	
	<u-modal v-model="show" :content="content" :mask-close-able="true" @confirm="confirm"></u-modal>
  </view>
</template>

<script>
  import * as UserApi from '@/api/user'
  import SettingModel from '@/common/model/Setting'
  import SettingKeyEnum from '@/common/enum/setting/Key'

  export default {
    data() {
      return {
        // 正在加载
        isLoading: true,
        // 会员信息
        userInfo: {},
        // 充值设置
        setting: {},
		// 弹窗显示
		show: false,
		// 弹窗内容
		content: '提现前必须实名认证!'
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
      // 获取页面数据
      this.getPageData()
	  
    },

    methods: {

      // 获取页面数据
      getPageData() {
        const app = this
        app.isLoading = true
        Promise.all([app.getUserInfo(), app.getSetting()])
          .then(() => app.isLoading = false)
      },

      // 获取会员信息
      getUserInfo() {
        const app = this
        return new Promise((resolve, reject) => {
          UserApi.info()
            .then(result => {
              app.userInfo = result.data.userInfo
              resolve(app.userInfo)
            })
        })
      },

      // 获取充值设置
      getSetting() {
        const app = this
        return new Promise((resolve, reject) => {
          SettingModel.item(SettingKeyEnum.RECHARGE.value, false)
            .then(data => {
              app.setting = data
              resolve(data)
            })
        })
      },

      // 跳转充值页面
      onTargetRecharge() {
        this.$navTo('pages/wallet/recharge/index')
      },

      // 跳转充值记录页面
      onTargetRechargeOrder() {
        this.$navTo('pages/wallet/recharge/order')
      },

      // 跳转账单详情页面
      onTargetBalanceLog() {
        this.$navTo('pages/wallet/balance/log')
      },
	  
	  // 跳转提现页面
	  onTargetWith(){
		  if(this.userInfo.real_name==''){
			  this.show = true;
		  } else {
			  uni.navigateTo({
			  	url:'/packageA/pages/with/with?type='+'with'
			  })
		  }
		  
		
	  },
	  
	  // 跳转余额转账页面
	  ontransfer(){
		 uni.navigateTo({
		 	url:'/packageA/pages/with/with?type='+'balance'
		 }) 
		},
		
		// 确认弹出框
		confirm(){
			uni.navigateTo({
				url:'/packageA/pages/with/with?type='+'name'
			})
		}	  

    }
  }
</script>
<style>
  page {
    background: #fff;
  }
</style>
<style lang="scss" scoped>
  .container {
    background: #fff;
  }

  .space-upper {
    padding: 150rpx 0;
    text-align: center;
  }

  .wallet-image image {
    width: 360rpx;
    height: 261.72rpx;
  }

  .wallet-account {
    margin-top: 20rpx;
  }

  .wallet-account_balance {
    font-size: 52rpx;
  }

  .wallet-account_lable {
    margin-top: 10rpx;
    color: #cec1c1;
    font-size: 24rpx;
  }

  .space-lower {
    margin-top: 30rpx;
    padding: 0 110rpx;
  }
	.btn-recharge{
		display: flex;
		justify-content: space-between;
	}
  .btn-recharge .btn-submit {
    width: 230rpx;
    height: 84rpx;
    line-height: 84rpx;
    margin: 0 auto;
    text-align: center;
    border-radius: 50rpx;
    background: #786cff;
    color: white;
    font-size: 30rpx;
  }
  .tx {
	  background-color: white !important;
	  color: #999999 !important;
	  box-shadow: 0 5rpx 15rpx rgba(0,0,0,.05);
	  border: 1rpx solid #ccc;
  }

  .item-lable {
    margin-top: 80rpx;
    font-size: 26rpx;
    color: rgb(94, 94, 94);
    padding: 0 100rpx;
  }
  .transfer{
	  border-radius: 27rpx  0  0 27rpx;
	  width: 100rpx;
	  position: fixed;
	  top: 60rpx;
	  right: 0;
	  padding: 10rpx   20rpx ;
	  box-sizing: border-box;
	  background-color: #786cff;
	  color: white;
	  text-align: center;
  }
</style>
