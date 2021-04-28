<template>
	<view class="wrap">
		
		<view class="card">
				<view class="shop" v-if="isShop">
					<scroll-view scroll-x="true" @scroll="scroll"  class="scroll-view_H"  scroll-with-animation="true" >
						<view class="shop-item"  v-for="(item,i) in shopList" :key="i" :class="{active: idx==i}" @click="getPop(item,i)">
							{{item.shop_name}}
						</view>	
					</scroll-view>
					<u-icon name="arrow-right" 
					></u-icon>
				</view>
				
			<view class="img-box">
				<u-image width="100" height="100rpx" :src="avatar"></u-image>
			</view>
			<view class="qrcode">
				<image
					:src="'data:image/jpeg;base64,'+qrcode"
					mode="aspectFit"
				/>
			</view>
			<view class="desc" v-if="!isShop">
				<p>1. 分享者ID: <text>{{uid}}</text></p>
				<p>2. 您可以通过系统生成的二维码图片通过<text>微信</text>分享给您的好友。</p>
				<p>3. 您可以转发本页面通过<text>微信</text>分享给您的好友。</p>
				<p>4. 每个二维码信息都不同，请使用您自己生成的二维码图片进行传播。</p>
				<!-- #ifdef APP-PLUS -->
				<u-button type="primary" @click="onshare()">点击分享微信</u-button>
				<!-- #endif -->
			</view>

			<view class="desc" v-else>
				<p class="shopp">{{shop_name}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	import * as UserApi from '@/api/user'
	import * as ShopApi from '@/api/shop'
	import store from '@/store'
	
	export default {
		data(){
			return {
				val: 'xxx',
				size: 435,
				uid: store.getters.userId,
				qrcode: '',
				avatar: '',
				// 分享
				share:{
					title:'快来加入旅享生活',
					path:'/pages/index/index?scene=',
					imageUrl:'',
					desc:'',
					content:''
				},
				isShop: false,
				shopList: ["qq","ww","ee","hhhhhh","汉堡之际","滑稽米苏"],
				idx: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				shopList: [],
				shop_name: ''
			}
		},
		methods:{
			qrR(e){
				console.log(e)
			},
			getQrcode(){
				return new Promise((resolve, reject) => {
						 UserApi.qrCode()
						 	.then(result => {
						 		this.qrcode = result.data.str
						 		
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
			},
			getinfo(){
				const app = this;
				return new Promise((resolve, reject) => {
			    UserApi.info()
			      .then(result => {
			        app.avatar = result.data.userInfo.avatar_url
			        resolve(app.userInfo)
			      })
			  })		
			},
			getPop(item,i){
				this.idx = i;
				this.shopList.forEach((i,k)=>{
					if(this.idx==k){
						// 筛选
						this.qrcode = i.QRcode
						this.avatar = i.shop_url;
						this.shop_id = i.shop_id;
						this.shop_name = i.shop_name;
					};
				})
			},
			scroll(e) {
				
				this.old.scrollTop = e.detail.scrollTop
			},
			// 根据选中提现
			onWith(){

			},
			// 获取店铺二维码
			getShopQrcode(){
				const app = this;
				return new Promise((resolve, reject) => {
			    ShopApi.qrcode()
			      .then(res => {
			        this.shopList = res.data.list;

					this.qrcode = this.shopList[0].QRcode;
					
					this.avatar = this.shopList[0].shop_url;
					this.shop_name = this.shopList[0].shop_name;
			        resolve(app.userInfo)
			      })
			  })		
			},
			// app分享
			onshare(){
				uni.share({
					provider: 'weixin',
					scene: "WXSceneSession",
					type: 5,
					imageUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/962fc340-4f2c-11eb-bdc1-8bd33eb6adaa.png',
					title: '旅享生活',
					miniProgram: {
						id: 'gh_6790f13273c8',
						path: 'pages/index/index',
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: ret => {
						console.log(JSON.stringify(ret));
					}
				});
			}
			
		},
		 onShareAppMessage(res) {
			this.share.path = this.share.path+this.uid;
			return {
				title:this.share.title,
				path:this.share.path,
				imageUrl:this.share.imageUrl,
				desc:this.share.desc,
				content:this.share.content,
				success(res){
					uni.showToast({
						title:'分享成功'
					})
				},
				fail(res){
					uni.showToast({
						title:'分享失败',
						icon:'none'
					})
				}
			}
    	},
		onLoad(options) {
			this.isShop = options.shop? true: false;
			if(options.shop){
				uni.setNavigationBarTitle({
				　　title:'商家二维码'
				})
				this.getShopQrcode();
			}else {
				this.getQrcode();
				this.getinfo();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F5F5F5;
		.card {
			width: 80%;
			border: 2rpx solid #F5F5F5;
			box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
			background-color: #fff;
			padding: 40rpx 30rpx;
			box-sizing: border-box;
			border-radius: 16rpx;
			.shop {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: 30rpx;
				
				.scroll-view_H {
					
					width: 100%;
					height: 85rpx;
					white-space: nowrap;
					margin-right: 10rpx;
					.shop-item {
						display: inline-block;
						width: 100%;
						
						padding: 20rpx 10rpx;
						box-sizing: border-box;
						text-align: center;
						margin-right: 20rpx;
					}
				}
				
			}

			.img-box{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
			}
			.desc{
				margin-top: 20rpx;
				p {
					
				}
				.shopp{
					text-align: center;
				}
			}
			.qrcode {
				width: 80%;
				margin: auto;
				image {
					width: 100%;	
				}
			}
		}
		
	}

	.active {
		border-bottom: 6rpx solid #f50;
		font-weight: bold;
	}
</style>
