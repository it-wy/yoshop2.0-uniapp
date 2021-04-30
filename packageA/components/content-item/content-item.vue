<template>
	<view class="content-item">
		<view class="text-content" :class="{'padding-bottom' : imgs.length === 0}">
			<view class="number" v-if="show">
				{{ number }}、
			</view>
			<view class="text">
				{{ text }}
			</view>
		</view>
		<template v-if="imgs && imgs.length !== 0">
			<view class="img-box" :class="{'padding' : !show}" v-for="(item, index) in imgs" :key="index">
				<image :src="item" mode="widthFix"></image>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			},
			number: {
				type: Number,
				default: null
			},
			text: {
				type: String,
				default: ''
			},
			imgs: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-item {
		.text-content {
			display: flex;
			justify-content: flex-start;
			font-size: 26rpx;
			color: #666;
		}
		.padding-bottom {
			padding-bottom: 32rpx;
		}
		// .img-box + .img-box {
		// 	padding-top: 32rpx;
		// }
		.img-box {
			padding: 32rpx 0 0 1.5em;
			&:last-child {
				padding-bottom: 32rpx;
			}
		}
		.padding {
			padding-left: 0;
		}
		// image + image {
		// 	margin-top: 32rpx;
		// }
		image {
			width: 450rpx;
		}
	}
</style>
