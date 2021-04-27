<template>
	<view class="pay">
		<view class="left">
			<view class="items">
				<u-icon name="kefu-ermai"></u-icon>
				<text>客服</text>
			</view>
			<view class="items">
				<u-icon name="rmb-circle"></u-icon>
				<text>抢购</text>
			</view>
			<view class="items">
				<u-icon name="order"></u-icon>
				<text>订单</text>
			</view>
		</view>
		<slot name="btn" class="btn"></slot>	
		
	</view>
</template>

<script>
	export default {
		name:"shopay",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.pay {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: #fff;
	width: 100%;
	display: flex;
	padding: 20rpx 10rpx;
	box-sizing: border-box;
	border-top: 2rpx solid #eee;
	
	.left {
		display: flex;
		.items {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100rpx;
		}
	}
	.btn {
		flex: 1;
	}
}
</style>
