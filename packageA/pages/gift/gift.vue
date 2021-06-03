<template>
	<view class="life" >
		
		<div class="l-item" v-if="shoplist.length!=0"  v-for="(item,i) in shoplist" :key="i" @click="ongift(item)">
			<div class="l-img">
				<div>
					<image :src="item.goods_image" mode="aspectFit"></image>
				</div>
			</div>
			<div class="l-desc">
				<p class="l-title">{{item.goods_name}}</p>
				<div class="l-price">
					<text>￥{{item.goods_price_max}}</text>
					<!-- <text class="line-price">￥{{item.line_price_max}}</text> -->
				</div>
			</div>
		</div>
		
		<view v-else class="empty">
			<u-empty  text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	import * as GoodsApi from '@/api/goods'
	export default {
		data() {
			return {
				form:{
					page:1,
					attr: 5,
					sku: ''
				},
				isMore: true,
				shoplist:[]
			}
		},
		methods: {
			ongift(i){
				
				uni.navigateTo({
					url:'/pages/goods/detail?goodsId='+i.goods_id+'&payType='+'gift'
				})
			},
			// 达人商品
			getShopList() {
			  const app = this
			  if(app.isMore){
				  
			  
			  return new Promise((resolve, reject) => {
			    GoodsApi.list({page:app.form.page, attr: app.form.attr,status:0, sku: app.form.sku})
			      .then(result => {
					  this.isMore = result.data.list.current_page == result.data.list.last_page?false:true;
						this.shoplist = this.shoplist.concat(result.data.list.data)
						
			        resolve(result.data)
			      })
			      .catch(err => {
			        if (err.result && err.result.status == 401) {
			          // app.isLogin = false
			          resolve(null)
			        } else {
			          reject(err)
			        }
			      })
			  })
			  }else {
				  uni.showToast({
				  	icon:'none',
					title:'没有更多了'
				  })
			  }
			},
		},
		onLoad(options) {
			const app = this;
			app.form.sku = options.sku;
			app.getShopList()
		},
		onReachBottom() {
			this.form.page++
			this.getShopList()
		}
	}
</script>

<style lang="scss" scoped>
.life {
		// background: rgb(246, 246, 246);
		// padding: 4rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
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
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
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

		.empty {
			width: 100%;
			height: 100vh;
			display:flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
