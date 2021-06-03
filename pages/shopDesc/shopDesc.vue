<template>
	<view class="wrap">
		
	
	<view class="container">
		<!-- #ifdef APP-PLUS -->
		<u-sticky>
			<view style="width: 100%;background-color: #fff;">
				<view style="width: 400rpx;margin: 0 auto;">
					<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
				</view>
			</view>
		</u-sticky>
		<!-- #endif -->
		
		
		<!-- #ifdef H5 -->
		
		<view style="width: 100%;background-color: #fff;">
			<view style="width: 400rpx;margin: 0 auto;">
				<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
			</view>
		</view>
		<!-- #endif -->
		<!-- 轮播 -->
		<u-swiper :list="lists" height="500"></u-swiper>
		<!-- 介绍 -->
		<view class="desc">
			<p>KFC炸鸡</p>
			<p>
				<text>营业时间： 00:00 - 18:00</text>
				<text>访问: 1</text>
			</p>
			<p>
				<u-icon name="map"></u-icon>
				软件园110号
			</p>
		</view>
		</view>
		<!-- 优惠券 -->
		<view class="coupon">
			<p>店铺优惠券</p>
			<view class="coupon-list">
				<view class="coupon-item">
					<view class="coupon-img">
						<image src="../../static/default-avatar.png" mode="scaleToFill"></image>
					</view>
					<view class="coupon-type">
						<p>满100元优惠5元（可叠加20张）</p>
						<view class="btn">
							<u-button type="error">免费领取</u-button>
							<text>1人领取</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详细介绍 -->
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="box">
			
		
		<!-- 富文本 -->
		<view class="www" v-html="content" v-show="current==0">
			
		</view>
		<!-- 优惠 -->
		<view class="discount"  v-show="current==1">
			<text>使用优惠券时请出示优惠券二维码，或优惠券号码</text>
		</view>
		<!-- 动态 -->
		<view class="dynamic" v-show="current==2">
			<view class="dyna-item">
				<view class="dyna-img">
					<image src="../../static/channel/wechat.png" mode="widthFix"></image>
				</view>
				<view class="dyna-info">
					<p>
						<text>商铺动态</text>
						<text>今天</text>
					</p>
					<p>年货节超级优惠，全场年货买二送一...</p>
				</view>
			</view>
		</view>
		</view>
		<!-- 支付 -->
		<ShopPay>
			
			<view class="btn" slot="btn">
				<u-button type="error" @click="onpay">立即支付</u-button>
			</view>
		</ShopPay>
	</view>
</template>

<script>
	import ShopPay from '@/components/shopay.vue'
	export default {
		data() {
			return {
				list: [{
					name: '介绍'
				}, {
					name: '优惠'
				}, {
					name: '动态',
				}],
				current: 0,
				lists: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				content: `<p>wqeqwewqewqewqeqweqwe</p><p>wqeqwewqewqewqeqweqwe</p><p>wqeqwewqewqewqeqweqwe</p><p>wqeqwewqewqewqeqweqwe</p><p>wqeqwewqewqewqeqweqwe</p><p>wqeqwewqewqewqeqweqwe</p><p>wqeqwewqewqewqeqweqwe</p>`
			}
		},
		components:{
			ShopPay
		},
		methods: {
			change(index) {
				this.current = index;
				switch (index) {
				  case 0:
				    uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				    break;
				case 1:
				  uni.pageScrollTo({
						selector: '.discount',
						duration: 300
					});
				  break;
				case 2:
				  uni.pageScrollTo({
						selector: '.dynamic',
						duration: 300
					});
				  break;		  
				
				  default:
				    break;
				}
			},
			// 立即支付
			onpay(){
				uni.navigateTo({
					url:'/pages/pay/pay'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: #fffefe;
		margin-bottom: 122rpx;
	
.container{
	background-color: #fff;
	.desc {
		padding: 10rpx 10rpx 15rpx 10rpx;
		box-sizing: border-box;
		box-shadow: 0 8rpx 10rpx rgba(0,0,0,.1);
		p {
			&:first-child{
				font-weight: bold;
			}
			&:nth-child(2){
				margin: 40rpx 0;
				display: flex;
				justify-content: space-between;
				padding-bottom: 40rpx;
				border-bottom: 2rpx solid #E4E7ED;
				font-size: 24rpx;
			}
		}
	}
	
	
}
.coupon {
		padding: 10rpx;
		box-sizing: border-box;
		margin: 15rpx 0;
		background-color: #fff;
		box-shadow: 0 8rpx 22rpx rgba(0,0,0,.1);
		p {
			font-weight: bold;
			margin: 20rpx 0;
		}
		.coupon-list {
			margin: 20rpx 0;
			.coupon-item {
				display: flex;
				justify-content: space-between;
				.coupon-img {
					width: 40%;
					image {
						width: 100%;
						height: 160rpx;
					}
				}
				.coupon-type {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.btn {
						
							display: flex;
							justify-content: space-between;
							align-items: center;
					}
				}
			}
		}
	}
	.box {
		background-color: #fff;
		.dynamic {
			padding: 10rpx;
			box-sizing: border-box;
			.dyna-item {
				display: flex;
				.dyna-img {
					width: 10%;
					margin-right: 15rpx;
					image {
						width: 100%;
						
					}
				}
				.dyna-info {
					flex: 1;
					p {
						&:first-child{
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
		}
	}
	.www {
		
	}
	.btn {
		width: 100%;
	}
}
</style>
