<template>
	<view class="index">
		<view class="info">
			<view class="info-left">
				<view class="label">
					旅享生活账户
				</view>
				<view class="value">
					+86 {{ info.phone }}
				</view>
			</view>
			<view class="avatar">
				<image :src="info.avatar"></image>
			</view>
		</view>
		<view class="buttons">
			<view class="button-item" v-for="(item, index) in buttons" :key="index" @tap="toAnother(index)">
				<!--  && $platform == 'MP-WEIXIN' -->
				<template v-if="index === 1">
					<button class="contact" type="default" open-type="contact"></button>
				</template>
				<image :src="item.img"></image>
				<view class="bold">{{ item.text }}</view>
				<view class="text" :class="{'orange' : index === 1}">{{ item.text1 }}</view>
			</view>
		</view>
		<view class="cell">
			<view class="cell-item" v-for="(item, index) in cell" :key="index" @tap="onTap(item.url)">
				<view class="">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="text">
						{{ item.text }}
					</view>
				</view>
				<view class="icon">
					<image src="http://pic.tralife.cn/10001/20210430/748ed71d7ac52835c2422c75cc4f1b15.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					phone: 16576879070,
					avatar: 'http://pic.tralife.cn/10001/20210430/6360ef35ad4bfb75b42a8a94905d7e53.png'
				},
				buttons: [{
					img: 'http://pic.tralife.cn/10001/20210430/3b75a77c796076ada8da772e256dd6dc.png',
					text: '登录密码',
					text1: '去设置'
				}, {
					img: 'http://pic.tralife.cn/10001/20210430/07195b3344b8267c388fda480484d0fd.png',
					text: '召唤客服',
					text1: '去咨询'
				}, ],
				cell: [{
					title: "如何成为达人",
					text: "达人的基本介绍",
					url: "/packageA/pages2/talent/index"
				}, {
					title: "购物流程",
					text: "购物的基本流程",
					url: "/packageA/pages2/buy/index"
				}, {
					title: "用户提现",
					text: "提现的基本流程",
					url: "/packageA/pages2/withdraw/index"
				}, {
					title: "如何支付给商家",
					text: "商家收款结算",
					url: "/packageA/pages2/pay/index"
				}, {
					title: "商家如何收款",
					text: "使用旅享支付给商家",
					url: "/packageA/pages2/receive-payment/index"
				}, {
					title: "用户分享",
					text: "把旅享生活介绍给更多的人",
					url: "/packageA/pages2/share/index"
				}, ]
			}
		},
		onLoad() {

		},
		methods: {
			// 点击中间两块
			toAnother(index) {
				switch (index) {
					case 0:
						this.$navTo('packageA/pages/editpass/editpass?type=name')
						break;
					case 1:
						
						break;
				}
			},
			// 点击底部cell
			onTap(val) {
				uni.navigateTo({
					url: val
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		width: 100%;
		height: 100%;
		padding: 20rpx 24rpx;
		box-sizing: border-box;

		.info {
			display: flex;
			justify-content: space-between;
			padding: 40rpx 36rpx;
			border-radius: 8rpx;
			background-color: #FFFFFF;
		}

		.info-left {
			.label {
				font-size: 28rpx;
				color: #666;
				line-height: 1em;
			}

			.value {
				padding-top: 31rpx;
				font-size: 40rpx;
				color: #333333;
				font-weight: bold;
			}
		}

		.avatar {
			display: flex;
			align-items: center;

			image {
				width: 87.4rpx;
				height: 87.4rpx;
			}
		}

		.buttons {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
		}

		.button-item+.button-item {
			margin-left: 20rpx;
		}

		.button-item {
			padding: 30rpx 40rpx;
			border-radius: 8rpx;
			flex: 1;
			background-color: #FFFFFF;
			position: relative;
			
			.contact {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 2;
				background-color: transparent;
				color: transparent;
				&::after {
					border: unset;
				}
			}

			image {
				width: 68rpx;
				height: 68rpx;
			}

			.bold {
				padding-top: 24rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				line-height: 1em;
			}

			.text {
				padding-top: 27rpx;
				font-size: 24rpx;
				line-height: 1em;
				color: #609CF1;
			}

			.orange {
				color: #FF903F !important;
			}
		}

		.cell {
			margin-top: 20rpx;
			background-color: #FFFFFF;
		}

		.cell-item {
			display: flex;
			justify-content: space-between;
			padding: 36rpx 30rpx;
			position: relative;

			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 1px;
				color: #f5f5f5;
				transform: scaleY(0.5);
			}

			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
				line-height: 1em;
			}

			.text {
				padding-top: 17rpx;
				font-size: 24rpx;
				color: #999999;
				line-height: 1em;
			}

			.icon {
				display: flex;
				align-items: center;
			}

			image {
				width: 9rpx;
				height: 16rpx;
			}
		}
	}
</style>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
