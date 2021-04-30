<template>
	<view class="share">
		<title-item :title="'用户怎么分享？'"></title-item>
		<content-item :number="1" :text="text1" :imgs="img1"></content-item>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image>
		<image src="/static/img/img1.png" mode="widthFix"></image> -->
		<content-item :number="2" :text="text2" :imgs="img2"></content-item>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image>
		<image src="/static/img/img1.png" mode="widthFix"></image> -->
	</view>
</template>

<script>
	import titleItem from '@/packageA/components/title-item/title-item.vue';
	import contentItem from '@/packageA/components/content-item/content-item.vue';
	export default {
		data() {
			return {
				text1: "在我的点击我要分享，让用户扫描图片中二维码即可",
				img1: ["http://pic.tralife.cn/10001/20210430/babeab88be83c82c6edfaa456bdd76f0.png","http://pic.tralife.cn/10001/20210430/9c6caf7b0df59e1aefca7e8cf277c11f.png"],
				text2: "点击小程序上方的更多，选择发送给朋友即可分享",
				img2: ["http://pic.tralife.cn/10001/20210430/6c7f1af79aa81900afa39c8049fd579e.png","http://pic.tralife.cn/10001/20210430/66fec215f3d697ebcf01799c22caa2e2.png"]
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
	.share {
		width: 100%;
		height: 100%;
		padding: 55rpx 34rpx;
		box-sizing: border-box;
	}
</style>
