<template>
	<view class="container">
		<view class="header">
			<p>当前粉丝数合计: <text>{{total}}</text>人</p>
			<p>总粉丝数: <text>{{allcount}}</text>人</p>
		</view>
		<view class="fans-list">
			<view class="fans-item" v-for="(item,i) in fansList" :key="i">
				<view class="avatar">
					<image :src="item.avatar_url?item.avatar_url:'/static/default-avatar.png'" mode="widthFix"></image>
				</view>
				
				<text>UID: {{item.user_id}}</text>
				<text class="nick-name">昵称: {{item.nick_name}}{{item.dr_grade==0?'':item.dr_grade==1?'城市达人':item.dr_grade==2?'团长':item.dr_grade==3?'县级服务商':item.dr_grade==4?'市级服务商':item.dr_grade==5?'省级服务商':'运营中心'}}</text>
			</view>
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
				allcount:0
			}
		},
		methods:{
			getfans(){
				if(this.isMore){

					return new Promise((resolve, reject) => {
					  UserApi.userFans({page:this.page})
						.then(result => {
							this.isMore = result.data.list.current_page == result.data.list.current_page?false:true;
							
							this.fansList = this.fansList.concat(result.data.list.data.data);
							this.total = result.data.list.data.total;
							this.allcount = result.data.list.all_count
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
		.header {
			height: 200rpx;
			line-height: 100rpx;
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			border-bottom: 2rpx solid #F5F5F5;
			text {
				font-weight: bold;
				
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
				.avatar {
					width: 80rpx;
					height: 80rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.nick-name{
					width: 40%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
