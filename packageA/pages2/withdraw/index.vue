<template>
	<view class="withdraw">
		<title-item :title="'用户怎么提现？'"></title-item>
		<content-item :number="1" :text="text1" :imgs="img1"></content-item>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image> -->
		<content-item :number="2" :text="text2" :imgs="img2"></content-item>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image>
		<image src="/static/img/img1.png" mode="widthFix"></image> -->
		<content-item :number="3" :text="text3" :imgs="img3"></content-item>
		<!-- <image src="/static/img/img1.png" mode="widthFix"></image> -->
	</view>
</template>

<script>
	import titleItem from '@/packageA/components/title-item/title-item.vue';
	import contentItem from '@/packageA/components/content-item/content-item.vue';
	export default {
		data() {
			return {
				text1: "在我的中点击我的钱包，选择提现",
				img1: ["http://pic.tralife.cn/10001/20210430/b9f69bf60582ce41319cb8cd8bbc9d8d.png"],
				text2: "依据系统提示进行实名认证与手机号码的绑定",
				img2: ["http://pic.tralife.cn/10001/20210430/a5b6289c9c0dfce3a0ce7c2fd7ade2a4.png","http://pic.tralife.cn/10001/20210430/43eef095f12a6ba6912189d6f1e3dc40.png"],
				text3: "输入提现的金额，银行卡信息后提交，等待工作 人员审核",
				img3: ["http://pic.tralife.cn/10001/20210430/caf96ae2ec56f085cc29d76bfe2522b4.png"],
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
	.withdraw {
		width: 100%;
		height: 100%;
		padding: 55rpx 34rpx;
		box-sizing: border-box;
	}
</style>
