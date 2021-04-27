<template>
	<view>
		<view class="pay">
			<view class="pay-shop">
				<u-icon name="shopping-cart" size="40"></u-icon>
				<view class="title">
					{{pay_type}}
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
		
		<u-modal v-model="show"  title="订单" show-cancel-button="true">
			<view class="solt-content" >
				<p>KFC</p>
				<p>应付金额:  <text>20.00</text></p>
				<p>实付积分: <text>10.00</text></p>
				<!-- <view class="coupons">
					选择优惠券 <u-icon name="arrow-right" size="30"></u-icon>
				</view> -->
				
				<p>合计: 积分-<text>200.00</text></p>
			</view>
		</u-modal>
		
		<cu-keyboard ref="cukeyboard" @change="change" @confirm="confirm" @hide="hide"></cu-keyboard>
	</view>
</template>

<script>
	import cukeyboard from '@/components/cu-keyboard/cu-keyboard.vue'
	export default {
		data() {
			return {
				value: '',
				list:[{
					name:'微信支付',
					checked: false,
					id:'wx'
				},{
					name:'积分支付',
					checked: false,
					id: 'intergal'
				},{
					name:'余额支付',
					checked: false,
					id: 'balance'
				}],
				show: false,
				content: '东临碣石，以观沧海',
				// 商家名称
				shoptitle: '',
				// 支付方式
				pay_type: '支付商家-'
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
				console.log("付款",e);
				this.openModal();
			},
			openModal() {
				this.show = true;
			},
			hide(){
				console.log("关闭键盘")
			},
			
			onRadio(item,list){
				list.some((i)=>{
					if(i.checked)  i.checked = false;
					
				})
				item.checked = !item.checked;		
				
			}
		},
		onReady() {
			this.$refs.cukeyboard.open();
		},
		// 获取店铺id和是否达人购买
		onLoad(options) {
			switch (options.id) {
			  case 'balance':
			    this.list = this.list.filter((i)=>{
					return i.id=='balance'
				})
				this.list.map((k)=>{
					k.checked = !k.checked
				})
				
				this.pay_type = '购买达人'
			    break;
			case 'wx':
				this.list = this.list.filter((i)=>{
							return i.id=='wx'
						})
				this.list.map((k)=>{
					k.checked = !k.checked
				})		
				this.pay_type = '购买达人'		
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
		}
	}
	
	.solt-content{
		padding: 20rpx;
		box-sizing: border-box;
		p {
			&:first-child{
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			&:nth-child(2), &:nth-child(3){
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
			}
			&:last-child{
				text-align: right;
				margin-top: 20rpx;
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
