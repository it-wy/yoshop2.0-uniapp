<template>
	<view class="pay">
		<title-item :title="'如何支付给商家？'"></title-item>
		<content-item :show="false" :text="text" :imgs="imgs"></content-item>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image> -->
	</view>
</template>

<script>
	import titleItem from '@/packageA/components/title-item/title-item.vue';
	import contentItem from '@/packageA/components/content-item/content-item.vue';
	export default {
		data() {
			return {
				text: "使用微信的扫一扫扫描商家出示的二维码即可付款",
				imgs: ["http://pic.tralife.cn/10001/20210430/2f0923c0b92441739fbc50d195de7b4e.png"]
			} 
		},
		components:{
			titleItem,
			contentItem
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.pay {
		width: 100%;
		height: 100%;
		padding: 55rpx 34rpx;
		box-sizing: border-box;
	}
</style>
