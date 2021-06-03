<template>
	<view class="talent">
		<title-item :title="'什么是达人？'"></title-item>
		<content-item :show="false" :text="text"></content-item>
		<title-item :title="'如何成为达人？'"></title-item>
		<content-item :number="1" :text="text1" :imgs="img1"></content-item>
		<content-item :number="2" :text="text2" :imgs="img2"></content-item>
	</view>
</template>

<script>
	import titleItem from '@/packageA/components/title-item/title-item.vue';
	import contentItem from '@/packageA/components/content-item/content-item.vue';
	export default {
		data() {
			return {
				text: "成为达人后可以通过达人的身份，在旅享生活的平台上获得收益。",
				text1: "在登录旅享生活小程序后，点击我的，选择申请达人。",
				text2: "选择需要的商品同意协议支付后就可以成为达人",
				img1: ["https://pic.tralife.cn/10001/20210601/4924e0ae7fad9c0e462623e23fa1d4af.png"],
				img2: ["https://pic.tralife.cn/10001/20210601/b374b46898f252a314fe52abc4bf317e.png"],
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
	.talent {
		width: 100%;
		height: 100%;
		padding: 55rpx 34rpx;
		box-sizing: border-box;
	}
</style>
