<template>
	<view class="wrap">
		<view class="balance">
			<p v-if="list.length!=0"><text>{{ assets ? Number(assets.balance).toFixed(2) : '--' }}</text>我的余额:</p>
			<p v-if="list.length!=0"><text>{{ assets ? Number(assets.points).toFixed(2) : '--' }}</text>我的积分:</p>
			<p v-if="shop">商家余额：<text>{{ balance }}</text></p>
		</view>
		<view class="selects">
			<view style="width: 100%;margin-bottom: 40rpx;" class="log">
				<!-- <xfl-select
				    :list="list"
				    :clearable="false"
				    :showItemNum="5" 
				    :listShow="false"
				    :isCanInput="true"  
				    :style_Container="'height: 40px; font-size: 16px;'"
				    :placeholder = "'请查找'"
				    :initValue="initValue"
				    :selectHideType="'hideAll'"
					@change="onchange"
				>
				</xfl-select> -->
				<view class="log-item" v-if="list.length!=0" :class="{active: idx==i}" v-for="(item,i) in list" :key="i" @click="onchange(item,i)">{{item}}</view>
				<view class="shop" v-if="shop">
					<view class="shopList">
						<scroll-view  scroll-x="true"   class="scroll-view_H"   >
							<view class="shop-item"  v-for="(item,i) in shopList" :key="i" :class="{active: idx==i}" @click="getPop(item,i)">
								{{item.shop_name}}
							</view>	
						</scroll-view>
						<u-icon name="arrow-right" 
						></u-icon>
						</view>
				
				</view>

				<!-- <view class="shop" v-if="list.length!=0">
					<view class="shopList">
						<scroll-view  scroll-x="true" :scroll-left="scroll_left" @scroll="scroll"   class="scroll-view_H"   >
							<view class="shop-item"  v-for="(item,i) in list" :key="i" :class="{active: idx==i}" @click="onchange(item,i)">
								{{item}}
							</view>	
						</scroll-view>
						<u-icon name="arrow-right" 
						></u-icon>
						</view>
				
				</view> -->
				
			</view>
			
		</view>
		<!-- 列表 -->
		<view class="log-list">
			<view v-if="logList.length!=0" class="log-item" v-for="(item,i) in logList" :key="i">
				<view class="log-info">
					<p>
						
						<text v-if="item.order_no">{{item.order_no}}</text>
						<text v-if="item.transaction_id">{{item.transaction_id}}</text>
						<text v-if="item.describe">{{item.describe}}</text>
						 <text v-if="item.remark">{{item.remark}}</text>
						 <text v-if="item.card">{{item.bank_name+'('+item.card+')'}}</text>    
						<text v-if="!isShopLog">{{item.money?item.money:item.amount?item.amount:item.scene}}</text>
						<text v-if="isShopLog">{{item.userInfo.nick_name}}</text>
						<text v-if="item.total_fee">{{item.total_fee}}</text>
						
						<image
							v-if="isShopLog"
							:src="item.userInfo.avatar_url"
							mode="scaleToFill"
							style="width:50rpx;height:50rpx;"
						/>
					</p>
					<p><text>{{item.create_time}}</text>   <text v-if="item.zt!=undefined">{{item.zt==0?'未发放': item.zt==1?'已发放': item.zt==2?'转账退回':'异常退回'}}</text> 
					<text v-if="isShopLog">{{'支付:'+item.cash}} {{'实际到账('+item.actua_cash+')'}}</text>
					<text v-if="item.getShop && !shop">{{item.getShop.shop_name}}</text>
					</p>
				</view>
			</view>
			<u-empty v-if="logList.length==0" text="没有数据" mode="list"></u-empty>
			
		</view>
		
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue'; 
	import * as UserApi from '@/api/user'
	import * as ShopApi from '@/api/shop'
	export default {
		data(){
			return {
				list: [ //要展示的数据
					'积分',
					'余额',
					'充值',
					'奖励',
					'提现',
					'转账',
					'门店'
				],
				initValue: '积分',
				logList: [],
				page: 1,
				isMore: true,
				assets: {
					balance: 0
				},
				idx: 0, 
				shopList:[],
				shop_id:'',
				shop: false,
				balance: '',
				isShopLog: false,
				status: 0, 
				scroll_left:0,
				type:''
			}
		},
		components: {
			xflSelect,
		},
		methods: {
			onchange(i,index){
				this.idx = index;
				this.onSearch(i)
				this.initValue = i
			},
			// 根据店铺
			getPop(item,i){
				this.idx = i;
				this.logList = [];
				this.page = 1;
				
				this.shopList.forEach((i,k)=>{
					if(this.idx==k){
						// 筛选
						
						this.balance = i.balance;
						this.shop_id = i.shop_id;
						if(this.isShopLog){
							this.getShoppaylog()
						}else {
							this.getShoplog();
						}
						
					};
				})
			},
			// 根据查找筛选
			onSearch(i){
				this.logList = [];
				this.page = 1;
				
				switch (i) {
					case '积分':
					 this.getintergalLog()
					 break;
					case '余额':
					this.getbalanceLog();					 
					 break;
					case '充值':
					this.getpayLog();					 
					 break; 
					case '奖励':
					this.getrewardLog();					 
					 break; 
					case '提现':
					this.getwithLog();					 
					 break; 
					case '转账':
					this.status = 3;	
					this.getbalanceLog();					 
					 break;
					case '门店':
					this.type = 1;
					this.shop_id = ''	
					this.getShoppaylog();					 
					 break;   	
				 
				   default:
					 break;
				 }
			},
			// 积分明细查询
			getintergalLog(i){
				
				return new Promise((resolve, reject) => {
				  UserApi.intergaLog({status:0, page:this.page})
				    .then(result => {
						this.logList = this.logList.concat(result.data.data);
						this.isMore = result.data.current_page == result.data.last_page? false:true;		 	
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
			// 充值明细查询
			getpayLog(i){
				return new Promise((resolve, reject) => {
				  UserApi.payLog({status:0, page:this.page})
				    .then(result => {
						this.logList = this.logList.concat(result.data.data);
						this.isMore = result.data.current_page == result.data.last_page? false:true;		 	
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
			// 余额明细查询
			getbalanceLog(i){
				return new Promise((resolve, reject) => {
				  UserApi.balanceLog({status:this.status, page:this.page})
				    .then(result => {
						this.logList = this.logList.concat(result.data.data);
						this.isMore = result.data.current_page == result.data.last_page? false:true;		 	
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
			// 奖励明细查询
			getrewardLog(i){
				return new Promise((resolve, reject) => {
				  UserApi.rewardLog({status:0, page:this.page,type: ''})
				    .then(result => {
						
						this.logList = this.logList.concat(result.data.list.data);
						this.isMore = result.data.list.current_page == result.data.list.last_page? false:true;
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
			// 提现明细查询
			getwithLog(i){
				return new Promise((resolve, reject) => {

				  UserApi.withLog({zt:'', page:this.page})
				    .then(result => {
						this.logList = this.logList.concat(result.data.list.data);
						
						this.isMore = result.data.list.current_page == result.data.list.last_page? false:true;		 	
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

			// 商家明细
			getShoplog(){
				return new Promise((resolve, reject) => {

				  UserApi.userShopWithList({shop_id:this.shop_id, page:this.page})
				    .then(result => {
						this.logList = this.logList.concat(result.data.list.data);
						
						this.isMore = result.data.list.current_page == result.data.list.last_page? false:true;		 	
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
			getShoppaylog(){
				return new Promise((resolve, reject) => {

				  UserApi.userShopPayList({shop_id:this.shop_id, page:this.page,type: this.type})
				    .then(result => {
						this.logList = this.logList.concat(result.data.list.data);
						
						this.isMore = result.data.list.current_page == result.data.list.last_page? false:true;		 	
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
			// 商家列表
			getShopList(){
				const app = this;
				return new Promise((resolve, reject) => {
			    ShopApi.qrcode()
			      .then(res => {
			        this.shopList = res.data.list;
					this.shop_id = this.shopList.length>0?this.shopList[0].shop_id:'';
					this.balance = this.shopList.length>0?this.shopList[0].balance:'';
					if(this.isShopLog){
						this.getShoppaylog();
					}else{
						this.getShoplog();
					}
					
					
			        resolve(app.shopList)
			      })
			  })		
			},

			// 获取账户资产
			getUserAssets() {
			  const app = this
			  return new Promise((resolve, reject) => {
			    UserApi.assets()
			      .then(result => {
			        app.assets = result.data.assets
			        resolve(app.assets)
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
			scroll(e){
				// console.log(e);

			}
		},
		onLoad(options) {
			if(options.payType == 'pay'){
				this.idx = 1;
				this.getbalanceLog()
				this.scroll_left = 355
			}else if(options.payType == 'point'){
				this.idx = 0;
				this.getintergalLog()
			}else if(options.payType == 'wxpay'){
				this.scroll_left = 700
				this.idx = 2;
				this.getpayLog()
			}


			if(options.log=='shop'){
				this.list = []
				this.shop = true
				this.getShopList()
			}else if(options.log == 'shops'){
				this.list = []
				this.shop = true
				this.isShopLog = true;
				uni.setNavigationBarTitle({
				　　title:'商家流水'
				})
				this.getShopList()	
			}else if(!options.payType && !options.log){
				
				this.getintergalLog();
				
			}
			this.getUserAssets();

			
			
		},
		onReachBottom() {
			this.page++;
			if(this.isMore && !this.shop){
				
				switch (this.initValue) {
					case '积分':
						this.getintergalLog()
						break;
					case '余额':
					this.getbalanceLog();					 
						break;
					case '充值':
					this.getpayLog();					 
						break; 
					case '奖励':
					this.getrewardLog();					 
						break; 
					case '提现':
						
					this.getwithLog();					 
						break; 	
					case '转账':	
					this.getbalanceLog();					 
					 break;
					case '门店':
					this.getShoppaylog();					 
					 break;   	
					default:
						break;
				}
			}else if(this.isMore && this.shop){
				this.getShoplog();
			}else if(this.isMore && this.isShopLog){
				this.getShoppaylog();
			} {
				uni.showToast({
					icon: 'none',
					title:'没有更多了'
				})
			}
		},
		onUnload() {
			uni.switchTab({ url: '/pages/user/index' })
		}
		
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: #fff;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.balance {
		
		box-sizing: border-box;
		padding-top: 50rpx;
		margin-bottom: 20rpx;
		display:flex;
		justify-content:space-around;
		p {
			display: flex;
			flex-direction: column;
			align-items:center;
			justify-content:center;
			flex: 1;
			text {
				font-size: 32rpx;
				font-weight: bold;
				color: red;
			}
		}
	}
	.selects{
		display: flex;
		justify-content: center;
		.log {
			display: flex;
			justify-content: space-around;
			.log-item {
				padding: 15rpx 10rpx;
				box-sizing: border-box;
			}
			.shop {
				width: 90%;
				.shopList {
					width: 100%;
					display: flex;
    				justify-content: center;
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
				
			}	
			

		}
	}
	.active {
		border-bottom:#f50 solid 4rpx !important;
		font-weight: bold;
	}
	.log-list {
		
		padding: 30rpx 15rpx;
		 box-sizing: border-box;
		 border-radius: 16rpx 16rpx 0 0;
		 height: auto;
		 border-top: 2rpx solid #F5F5F5;
		.log-item {
			
			p {
				display: flex;
				justify-content: space-between;
				&:first-child{
					margin-bottom: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					text {
						
						&:first-child{
							color: white;
							background-color: #2979ff;
							border-radius: 8rpx;
							padding:  5rpx 10rpx;
							
						}
						
					}
					
				}
				
			}
			border-bottom: 2rpx solid #F5F5F5;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
