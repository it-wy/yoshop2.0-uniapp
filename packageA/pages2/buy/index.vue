<template>
	<view class="buy">
		<title-item :title="'在旅享生活怎么购物？'"></title-item>
		<content-item :number="1" :text="text1"></content-item>
		<content-item :number="2" :text="text2" :imgs="img2"></content-item>
		<!-- <image src="/static/img/img3.png" mode="widthFix"></image> -->
		<content-item :number="3" :text="text3" :imgs="img3"></content-item>
		<!-- <image src="/static/img/img4.png" mode="widthFix"></image> -->
		<content-item :number="4" :text="text4" :imgs="img4"></content-item>
		<!-- <image src="/static/img/img5.png" mode="widthFix"></image> -->
	</view>
</template>

<script>
	import titleItem from '@/packageA/components/title-item/title-item.vue';
	import contentItem from '@/packageA/components/content-item/content-item.vue';
	export default {
		data() {
			return {
				text1: "在商城内找到自己喜欢的物品，或者搜索自己喜欢的商品",
				text2: "点击商品，进入到商品详情，选择加入购物车或者直接 结算",
				img2: ["http://pic.tralife.cn/10001/20210430/4f447f08590ad5bd6c5ffe255a1c562f.png"],
				text3: "在购物车选中要购买的商品，点击去结算",
				img3: ["http://pic.tralife.cn/10001/20210430/76308aa0f6b5ffdd20a9dd1450a12352.png"],
				text4: "在订单结算台需要完善自己的收货地址。点击支付后购买成功，等着商品送到",
				img4: ["http://pic.tralife.cn/10001/20210430/edef3b508573e21a91391f3261d4aea7.png"],
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
	.buy {
		width: 100%;
		height: 100%;
		padding: 55rpx 34rpx;
		box-sizing: border-box;
	}
</style>
