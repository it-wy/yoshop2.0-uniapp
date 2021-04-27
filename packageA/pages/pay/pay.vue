<template>
	<view>
		<view class="pay">
			<view class="pay-shop">
				<u-icon name="shopping-cart" size="40"></u-icon>
				<view class="title">
					{{pay_typetxt}}
					<text>{{shoptitle}}</text>
				</view>
			</view>
			<view class="price" >
				<text>金额</text>
				<text @click="open">￥{{value}}</text>
			</view>
		</view>
		
		
		<view class="pay-type">
			<view class="wx-type" v-for="(item,i) in list" :key="i">
				{{item.name}}
				<label class="radio" @click="onRadio(item,list)">
					<radio :value="item.name" :checked="item.checked" />
				</label>
			</view>
		</view>
		
		<u-modal v-model="show"  title="订单" :show-cancel-button="true" @confirm="payok">
			<view class="solt-content" >
				<p><text>{{shoptitle}}</text></p>
				<p>应付金额:  <text>{{form.shopPrice%1==0?form.shopPrice+'.00':form.shopPrice}}</text></p>
				<p>实付{{form.payType==10 || form.payType==20?'余额':'积分'}}: <text>{{form.payType!=10 && form.payType!=20? form.shopPrice*10: form.shopPrice%1==0?form.shopPrice+'.00':form.shopPrice}}</text></p>
				<!-- <view class="coupons">
					选择优惠券 <u-icon name="arrow-right" size="30"></u-icon>
				</view> -->
				
				<p>合计: {{form.payType==10 || form.payType==20?'余额':'积分'}}<text>{{form.payType!=10 && form.payType!=20? form.shopPrice*10: form.shopPrice%1==0?form.shopPrice+'.00':form.shopPrice}}</text></p>
			</view>
		</u-modal>
		
		<cu-keyboard ref="cukeyboard" @change="change" @confirm="confirm" ></cu-keyboard>

		<u-modal v-model="payshow" :content="content" :mask-close-able="true" @confirm="confirmpay"></u-modal>
	</view>
</template>

<script>
	import cukeyboard from '@/components/cu-keyboard/cu-keyboard.vue'
	import * as CheckoutApi from '@/api/checkout'
	import { wxPayment } from '@/utils/app'
	import * as ShopApi from '@/api/shop'
	export default {
		data() {
			return {
				value: '',
				list:[{
					name:'微信支付',
					checked: false,
					id:'wx',
					pay_type: 20
				},{
					name:'积分支付',
					checked: false,
					id: 'intergal',
					pay_type: 30
				},{
					name:'余额支付',
					checked: false,
					id: 'balance',
					pay_type: 10
				}],
				show: false,
				content: '',
				// 商家名称
				shoptitle: '',
				// 支付方式
				pay_typetxt: '支付商家-',
				// 表单
				form:{
					mode: 'shop',
					payType: '',
					goodsId: '',
					goodsSkuId: 0,
					goodsNum: 1,
					shopId: '',
					shopPrice:''
				},
				orderNumber:'',
				pay:{
					
				},
				shopInfo:{},
				payshow:false,
				content: '支付成功'
			}
		},
		components:{
			cukeyboard
		},
		methods: {
				
			change(e){
				this.value = e;
				console.log("数字改变",e);			
			},
			open(){
				console.log("打开键盘");
				this.$refs.cukeyboard.open();
			},
			confirm(e){
				const app = this;
				this.form.shopPrice = e;
				if(this.form.shopPrice==''||this.form.shopPrice==0){
					app.$error('金额不能为空或0')
					
				}else if(this.form.payType==''){
					app.$error('请选择支付方式')
					
				}else {
					this.openModal()
				}
				
				
			},
			// 表单提交的数据
			openModal() {
				this.show = true;
			},
			hide(){
				console.log("关闭键盘")
			},
			payok(){
				const app = this;
				// 请求api
				CheckoutApi.submit(app.form.mode,app.form)
				  .then(result =>{
					  app.orderNumber = result.data.orderNo
					  app.onSubmitCallback(result);
					  this.show = false;
				  })
				  .catch(err => {
				    if (err.result) {
				      const errData = err.result.data
				      // if (errData.is_created) {
				      //   app.navToMyOrder()
				      //   return false
				      // }
				    }
				    app.disabled = false
				  })
			},
			// 支付
			// 订单提交成功后回调
			onSubmitCallback(result) {
			  const app = this
			  // 发起微信支付
			  if (result.data.payType == 20) {
			    wxPayment(result.data.payment)
			      .then(() => {app.$success('支付成功');
				  app.payshow = true;
				  })
			      .catch(err => app.$error('未支付'))
			      .finally(() => {
			        app.disabled = false
			        app.navToMyOrder()
			      })
			  }
			  // 余额支付
			  if (result.data.payType == 10) {
			    app.$toast('支付成功')
			    app.disabled = false
				this.payshow = true;
			   	
			  }
			  
			  // 积分支付
			  if (result.data.payType == 30) {
			    app.$success('支付成功')
			    app.disabled = false
			    this.payshow = true;
			  }
			},
			
			// 跳转到我的订单(等待1秒)
			navToMyOrder() {
			//   setTimeout(() => {
			//     this.$navTo('pages/index/index')
			//   }, 1000)
			},
			confirmpay(){
				this.payshow = false;
				if(this.form.payType==20 || this.form.payType==10){
					this.$navTo('packageA/pages/log/log?payType=pay')
				}else {
					this.$navTo('packageA/pages/log/log?payType=point')
				}
				
				
			},
			
			onRadio(item,list){
				list.some((i)=>{
					if(i.checked)  i.checked = false;
					
				})
				item.checked = !item.checked;		
				this.form.payType = item.pay_type;
			},
			// 店铺详情
			fetchShopInfo(){
				const app = this;
				return new Promise((resolve, reject) => {
				  ShopApi.info({shop_id: app.form.shopId})
				    .then(result => {
					app.shopInfo = result.data.res
					app.shoptitle = app.shopInfo.shop_name;
				      resolve(result.data)
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
		onReady() {
			this.$refs.cukeyboard.open();
		},
		// 获取店铺id和是否达人购买
		onLoad(options) {
			
			this.form.shopId = decodeURIComponent(options.scene);
			// this.shoptitle = options.shop_name? decodeURIComponent(options.shop_name):'';
			this.fetchShopInfo();
			switch (options.id) {
			  case 'balance':
			    this.list = this.list.filter((i)=>{
					return i.id=='balance'
				})
				this.list.map((k)=>{
					k.checked = !k.checked
				})
				
				this.pay_typetxt = '购买达人'
			    break;
			case 'wx':
				this.list = this.list.filter((i)=>{
							return i.id=='wx'
						})
				this.list.map((k)=>{
					k.checked = !k.checked
				})		
				this.pay_typetxt = '购买达人'		
			  break;
			
			  default:
			    break;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay {
		background-color: #fff;
	
		.pay-shop {
			display: flex;
			padding: 30rpx;
			box-sizing: border-box;
			
			.title{
				margin-left: 10rpx;
				text{
					&:last-child{
						font-weight: bold;
					}
				}
			}
		}
	
		.price{
			background-color: #eee;
			margin: 20rpx;
			padding: 40rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
		}
		
	}
	.pay-type{
		margin: 20rpx;
		box-shadow: 0 5rpx 15rpx rgba(0,0,0,.1);
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
		.wx-type, .integral-type, .balance-type {
			line-height: 80rpx;
			height: 80rpx;
			border-bottom: 2rpx solid #F5F5F5;
			display: flex;
			justify-content: space-between;
			&:last-child{
				border: none;
			}
		}
	}
	
	.solt-content{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		p {
			&:first-child{
				font-weight: bold;
				margin-bottom: 10rpx;
				margin-bottom: 20rpx;
			}
			&:nth-child(2), &:nth-child(3){
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
			}
			&:last-child{
				text-align: right;
				margin-top: 40rpx;
			}
			text {
				font-weight: bold;
				color: red;
			}
		}
		.coupons {
			text-align: right;
			margin-bottom: 40rpx;
		}
	}
</style>
