<template>
	<view class="lifes">
		
		<view class="" v-if="shoplist.length!=0">
			<div  class="litem" v-for="(item,i) in shoplist" :key="i" @click="onShopDesc(item)">
				<div class="limage">
					<image :src="item.shop_url" mode="aspectFit"></image>
				</div>
				<div class="ltext">
					<p>{{item.shop_name}}</p>
					<p>营业时间  {{item.start_time}} - {{item.end_time}}</p>
					<p>
							
					<u-tag v-if="item.distance" :text="item.distance > 1 ? item.distance.toFixed(2)+'公里':(item.distance*1000).toFixed(2)+'米'" mode="light"  class="autotag" />
					<u-tag v-else :text="item.shop_name" mode="light"  class="autotag" />

					<text>{{item.view_num}}人访问</text>
					</p>
					<p>{{item.address}}</p>
				</div>
			</div>
		</view>
		<view class="empty-icon" v-show="shoplist.length==0">
		      暂无数据
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props: {
			shoplist: Array,
		},
		methods:{
			// 跳转店铺详情页
			onShopDesc(i){
				uni.navigateTo({
					url:'/packageA/pages/shopDesc/shopDesc?id='+i.shop_id
				})
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.lifes {
		background: rgb(246, 246, 246);
		padding: 4rpx;
		.empty-icon{
			width: 100%;
			text-align: center;
		}
		.litem {
			display: flex;
			justify-content: space-between;
			padding: 6rpx;
			box-sizing: border-box;
			background-color: #fff;
			border-bottom: 2rpx solid #F5F5F5;
			.limage {
				width: 40%;
				margin-right: 10rpx;
				height: 280rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.ltext {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				p {
					&:first-child{
						font-weight: bold;
					}
					&:nth-child(2), &:last-child, &:nth-child(3) text{
						font-size: 24rpx;
						color: #969090;
					}
					&:nth-child(3){
						display: flex;
						
						text {
							flex-basis: 30%;
							
							// &:first-child{
							// 	background-color: #fa2209;
							// 	color: #ecd1a2;
							// 	padding: 0 10rpx;
							// 	box-sizing: border-box;
							// 	border-radius: 8rpx;
							// }
						}
					}
				}
			}
		}
	}

	.autotag{
		flex-basis: 68%;
	
	}
</style>
