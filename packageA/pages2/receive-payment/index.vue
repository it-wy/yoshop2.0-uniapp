<template>
	<view class="receive-payment">
		<title-item :title="'商家如何收款？'"></title-item>
		<content-item :number="1" :text="text1" :imgs="img1"/>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image> -->
		<content-item :number="2" :text="text2" :imgs="img2"/>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image> -->
	</view>
</template>

<script>
	import titleItem from '@/packageA/components/title-item/title-item.vue';
	import contentItem from '@/packageA/components/content-item/content-item.vue';
	export default {
		data() {
			return {
				text1: "商家在我的点击商家二维码",
				img1: ["http://pic.tralife.cn/10001/20210430/9e160705907d69c9ea742638d0eb2430.png"],
				text2: "展示商家二维码，用户扫描即可付款",
				img2: ["http://pic.tralife.cn/10001/20210430/f9b922619f66b5924951f7610c27bf93.png"],
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
	.receive-payment {
		width: 100%;
		height: 100%;
		padding: 55rpx 34rpx;
		box-sizing: border-box;
	}
</style>
