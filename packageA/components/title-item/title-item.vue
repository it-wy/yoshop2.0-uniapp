<template>
	<view class="title-item">
		<view class="block"></view>
		<view class="title">
			{{ title }}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.title-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 28rpx;
		.block {
			width: 6rpx;
			height: 30rpx;
			background-color: #FF903F;
		}
		.title {
			padding-left: 13rpx;
			font-size: 32rpx;
			font-weight: bold;
			line-height: 1em;
		}
	}
</style>
