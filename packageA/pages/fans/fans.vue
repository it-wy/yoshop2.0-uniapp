<template>
	<view class="container">
		<view class="num-info">

		
		<view class="header">
			<p>总粉丝数: <text class="fz-36">{{allcount}}</text>人</p>
			<p>当前粉丝数合计: <text class="fz-36">{{total}}</text>人</p>
			<p>当前粉丝商家数: <text class="fz-36">{{fragment}}</text>人</p>
			
			
		</view>
		</view>
		<view class="d-hr"></view>
		<view class="fans-list" v-if="fansList.length!=0">
			<view class="fans-item" v-for="(item,i) in fansList" :key="i">
				<view class="avatar">
					<image :src="item.avatar_url?item.avatar_url:'/static/default-avatar.png'" mode="widthFix"></image>
				</view>
				
				<view class="fans-info">
				<view class="nick-name">昵称: {{item.nick_name}}<text class="level" v-if="item.dr_grade!=0">{{item.dr_grade==0?'':item.dr_grade==1?'城市达人':item.dr_grade==2?'团长':item.dr_grade==3?'县级服务商':item.dr_grade==4?'市级服务商':item.dr_grade==5?'省级服务商': item.dr_grade==6?'运营中心':'达人'}}</text>   <view v-if="item.shop_num_count!=0">{{item.shop_num_count==0?'':'商家'}}</view></view>
				<text>UID: {{item.user_id}}</text>
				</view>
				
			</view>
		</view>
		<view class="empty-data" v-else>
			<u-empty text="亲，您暂无粉丝" mode="list"></u-empty>
		</view>

	</view>
</template>

<script>
	import * as UserApi from '@/api/user'
	export default {
		data(){
			return {
				fansList:[],
				page: 1,
				isMore:true,
				total: 0,
				allcount:0,
				fragment: 0 // 粉丝商家数 
			}
		},
		methods:{
			getfans(){
				if(this.isMore){

					return new Promise((resolve, reject) => {
					  UserApi.userFans({page:this.page})
						.then(result => {
							this.isMore = result.data.list.current_page == result.data.list.last_page?false:true;
							
							this.fansList = this.fansList.concat(result.data.list.data);
							this.total = result.data.list.total;
							this.allcount = result.data.list.query
							this.fragment = result.data.list.fragment
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
			}
		},
		onLoad() {
			this.getfans();
		},
		onReachBottom() {
			this.page++;
			this.getfans();
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		width: 100%;
		height: 100vh;
		.num-info {
			width: 100%;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
		
		.header {
			height: 300rpx;
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			border-bottom: 2rpx solid #F5F5F5;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			background: linear-gradient(-30deg, #FAC26C, #FF9247);
			border-radius: 8rpx;
			color: #fff;
			p {
				font-weight: bold;
				width: 46%;
				&:nth-of-type(1){
					width: 100%;
				}
				
			}
			
		}
		}
		
		.fans-list {
			padding: 20rpx;
			box-sizing: border-box;
			.fans-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #F5F5F5;
				align-items: center;
				padding-bottom: 20rpx;
				padding-top: 20rpx;
				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.fans-info {
					margin-left: 42rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content:center;
					align-items: flex-start;
					text {
						width: 100%;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}
				.nick-name{
					font-size: 28rpx;
					color: #333333;
					margin-bottom: 19rpx;
					width: 100%;
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					.level {
						width: auto;
						margin-left: 8rpx;
						padding: 3rpx 10rpx;
						box-sizing: border-box;
						font-size: 20rpx;
						color: #fff;
						background: #54C68B;
						border-radius: 4rpx;
					}
					view {
								margin-left: 8rpx;
								padding: 3rpx 10rpx;
								box-sizing: border-box;
								font-size: 20rpx;
								color: #fff;
								background: #FF903F;
								border-radius: 4rpx;
								
							}
				}
			}
		}
	}
	.empty-data {
		margin-top: 25rpx;
		width: 100%;
		text-align: center;
	}
</style>
