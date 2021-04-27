<template>
	<view class="life" v-show="idx==1 && !islife">
		<div class="l-item">
			<div class="l-img">
				<div>
					<image src="../../static/order/status/wait_receipt.png" mode="aspectFit"></image>
				</div>
			</div>
			<div class="l-desc">
				<p class="l-title">铁饭饱</p>
				<div class="l-price">
					<text>￥100.00</text>
					<text class="line-price">￥200.00</text>
				</div>
			</div>
		</div>
		<div class="l-item">
			<div class="l-img">
				<div>
					<image src="../../static/order/status/wait_receipt.png" mode="aspectFit"></image>
				</div>
			</div>
			<div class="l-desc">
				<p class="l-title">铁饭饱</p>
				<div class="l-price">
					<text>￥100.00</text>
					<text class="line-price">￥200.00</text>
				</div>
			</div>
		</div>
		<div class="l-item">
			<div class="l-img">
				<div>
					<image src="../../static/order/status/wait_receipt.png" mode="aspectFit"></image>
				</div>
			</div>
			<div class="l-desc">
				<p class="l-title">铁饭饱</p>
				<div class="l-price">
					<text>￥100.00</text>
					<text class="line-price">￥200.00</text>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.life {
		// background: rgb(246, 246, 246);
		padding: 4rpx;
		display: flex;
		flex-wrap: wrap;
		.l-item {
			width: 50%;
			padding: 6rpx;
			box-sizing: border-box;
			.l-img {
				div {
					width: 100%;
					height: 358rpx;
					background-color: #fff;
					image {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
			}
			.l-desc {
				padding: 8rpx;
				box-sizing: border-box;
				background-color: #fff;
				.l-title{
					height: 64rpx;
					color: #484848;
					line-height: 2.0;
					font-size: 26rpx;
				}
				.l-price {
					text {
						font-size: 30rpx;
						color: #fa2209;
					}
					.line-price {
						text-decoration: line-through;
						color: #999;
						font-size: 24rpx;
						margin-left: 8rpx;
					}
				}
			}
		}
	}
</style>
