<template>
	<view class="container">
		<view style="width: 100%;margin-bottom: 40rpx;">
			<xfl-select
			    :list="list"
			    :clearable="false"
			    :showItemNum="5" 
			    :listShow="false"
			    :isCanInput="false"  
			    :style_Container="'height: 40px; font-size: 16px;'"
			    :placeholder = "'请查找'"
			    :initValue="initValue"
			    :selectHideType="'hideAll'"
				@change="onchange"
			>
			</xfl-select>
		</view>
	       
			<Lifes :shoplist="shoplist"/>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';     //导入
	import Lifes from '@/components/page/lifes/lifes.vue';
	import * as ShopApi from '@/api/shop';
	export default {
		data() {
			return {
				list: [ //要展示的数据
					'全部',
				],
				initValue: '全部',
				shoplist: [],
				isMore: true,
				// 页码
				form: {
					page: 1,
					type: 0,
					type_id: 0,
					status: 1,
					lat: '',
					lng: '',
				},
				default:[]
			}
		},
		components:{
			xflSelect,
			 Lifes
		},
		methods: {
			onchange(i){
				const app = this;
				app.form.page = 1;
				app.isMore = true;
				app.shoplist = [];

				this.getShopId(i.newVal);
				this.getShopList()
			},
			// 获取店铺
			getShopList() {
			  const app = this
			  // console.log(app.form)
			  if(app.isMore){
			  
			  return new Promise((resolve, reject) => {
			    ShopApi.list(app.form)
			      .then(result => {
					  app.isMore = result.data.result.current_page == result.data.result.last_page?false:true;
					  if(app.form.page!=1){
						  if(result.data.result.data.length>0){
							  app.shoplist = app.shoplist.concat(result.data.result.data)
						  }
					  }else {
						  
						  app.shoplist = app.shoplist.concat(result.data.result.data)
					  }
					  
			        
				
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
			// 根据不同店铺
			getShopId(v){
				const app = this;
				
				app.default.some((i)=>{
					if (i.text == v) {
						
						app.form.type_id = i.shopId;
						return true;
					}else {
						app.form.type_id = 0
					}
				})
			}
		},
		onUnload(){
			// uni.navigateBack({
			// 	delta:1,
			// })
			// uni.redirectTo({ url: '/pages/custom/index?pageId=10002' })
			
			/* #ifdef MP-WEIXIN || H5 */
			uni.navigateBack({
				delta:1,
			})
			/* #endif */
		},
		onBackPress({from}){
			/* #ifdef APP-PLUS*/
			if(from=='navigateBack'){
				return false
			}else {
				uni.navigateBack({
					delta:1,
				})
			}
			/* #endif */	
		},
		onLoad(options) {
			const app = this;
			app.initValue = options.id
			app.form.type_id = Number(options.shopId)
			
			// app.getShopId();
			// 根据id
			// app.getShopId(app.initValue)
			uni.getStorage({
				key: 'gps',
				success: function (res) {
					app.form.lat = res.data.lat;
					app.form.lng = res.data.lng;
					// 商铺列表
					
					app.getShopList();
				}
			});

			uni.getStorage({
				key: 'shopList',
				success: function ({data}) {
					const shop = [];
					app.default = data;
					data.map((i)=>{
						shop.push(i.text);
					})
					app.list = [...app.list, ...shop]
					
				}
			})
			
		},
		onReachBottom() {
			const app = this
			app.form.page++;
			app.getShopList();
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10rpx;
		box-sizing: border-box;
	}
	
</style>

<style>


</style>
