<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="myMap" v-if="showMap" :latitude="latitude" :longitude="longitude" :markers="markers"
				 show-location enable-scroll @tap="bindtap" @callouttap="callouttap" @markertap="markertap" @regionchange="regionchange" 
				 @updated="updated"  >
				 <!-- enable-scroll 是否支持拖动-->
				 <!-- @tap 点击地图时触发-->
				 <!-- @regionchange 视野发生变化时触发-->
				 <!-- @callouttap 点击标记点对应的气泡时触发，e.detail = {markerId}-->
				 <!-- @updated 在地图渲染更新完成时触发-->
				 <!-- #ifdef MP-WEIXIN || H5 -->
				 <view class="store-tips" v-if="showMap">
				 
				<cover-view class="store-des-box" v-if="storeFlag" @tap="storeDesEvn(store)">
					<!-- <cover-image class="store-img" src="../../static/shop.jpg"></cover-image> -->
					<cover-view class="store-des">
						<cover-view class="store-name">{{store.name}}</cover-view>
						<cover-view class="store-address">地址:{{store.address}}</cover-view>
						<cover-view class="store-tel">电话:{{store.tel}}</cover-view>
					</cover-view>
				</cover-view>
				</view>
				<!-- #endif -->

				<!-- #ifdef APP-PLUS -->
				<cover-view class="store-names b-f f-zz" v-if="storeFlag" @tap="storeDesEvn(store)">{{store.name}}</cover-view>
				<cover-view class="store-addresss b-f f-zz" v-if="storeFlag" @tap="storeDesEvn(store)">地址:{{store.address}}</cover-view>
				<cover-view class="store-tels b-f f-zz" v-if="storeFlag" @tap="storeDesEvn(store)">电话:{{store.tel}}</cover-view>
				<!-- #endif -->
				
				<!-- <cover-image v-if="storeAdFlag" class="store-ad" src="@/static/shop2.png"></cover-image> -->
				<!-- <cover-image v-if="storeAdFlag" class="store-clear" @tap="hideAd" src="@/static/shop2.png"></cover-image> -->
				
			
			
		<cover-view v-if="showMap" class="near-num">距离最近的门店{{distanceL==null ? 0 : distanceL.toFixed(2)}}km</cover-view>
		<cover-image v-if="showMap" class="address-icon" src="https://pic.tralife.cn/10001/20210602/ca09717572baf1c6b0360d23f276107c.png"></cover-image>
			
				</map>
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			storeData: {
				type: Array,
				default: []
			},
			markers: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				store: {},
				current:{},
				showMap: false,
				storeFlag: false,
				storeAdFlag: true, // 是否显示门店广告
				distanceL: 0, //附近店门的距离
				latitude: 39.909,
				longitude: 116.39742,
				controls: []
			}
		},
		methods: {
			// 点击了门店信息
			storeDesEvn(i) {
				// uni.navigateTo({
				// 	url:'/packageA/pages/shopDesc/shopDesc?id='+i.id
				// })
				var address = i.address;
				/* #ifdef H5 */
				window.location.href = `http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&tocoord=${this.position}&referer=`

				/* #endif */

				const {latitude, longitude} = this.position;
				/* #ifdef MP-WEIXIN */
				
				uni.openLocation({
					latitude: Number(latitude),
					longitude: Number(longitude),
					scale: 18,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err);
					}
				})
				/* #endif */
				
				/* #ifdef APP-PLUS */
				this.openApp( Number(latitude), Number(longitude))
				/* #endif */
			},
			// 点击气泡
			callouttap(e) {
				this.storeFlag = true // 显示门店信息
				this.storeAdFlag = false // 关闭广告
				for (let i = 0; i < this.storeData.length; i++) {
					const ele = this.storeData[i]
					if (ele.id == e.detail.markerId) {
						
						this.store = ele
						break
					}
				}
				for (let i = 0; i < this.markers.length; i++) {
					const cur = this.markers[i]
					if (cur.id == e.detail.markerId) {
						
						this.position = {latitude:cur.latitude, longitude:cur.longitude}
						break
					}
				}
				


			},
			markertap(e){
				/* #ifdef APP-PLUS */
				
				
				
				this.storeFlag = true // 显示门店信息
				this.storeAdFlag = false // 关闭广告
				for (let i = 0; i < this.storeData.length; i++) {
					const ele = this.storeData[i]
					if (ele.id == e.detail.markerId) {
						
						this.store = ele
						break
					}
				}
				for (let i = 0; i < this.markers.length; i++) {
					const cur = this.markers[i]
					if (cur.id == e.detail.markerId) {
						
						this.position = {latitude:cur.latitude, longitude:cur.longitude}
						break
					}
				}
				/* #endif */
			},
			// 点击地图
			bindtap(id) {
				this.storeFlag = false
				// this.storeAdFlag=true;
			},
			// 隐藏广告图片
			hideAd() {
				this.storeAdFlag = false
			},
			updated() {
				
				
			},

			// app跳第三方导航
			openApp(latitude, longitude){
				 // 把高德坐标系GCJ-02转国测局坐标系WGS-84
				var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
				var PI = 3.1415926535897932384626;
				var a = 6378245.0;
				var ee = 0.00669342162296594323;
				var transformlat = function transformlat(lng, lat) {
					var lat = +lat;
					var lng = +lng;
					var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
					ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
					ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
					ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
					return ret
				};
			
				var transformlng = function transformlng(lng, lat) {
					var lat = +lat;
					var lng = +lng;
					var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
					ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
					ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
					ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
					return ret
				};
				var gcj02towgs84 = function gcj02towgs84(lng, lat) {
					var lat = +lat;
					var lng = +lng;
					if (out_of_china(lng, lat)) {
						return [lng, lat]
					} else {
						var dlat = transformlat(lng - 105.0, lat - 35.0);
						var dlng = transformlng(lng - 105.0, lat - 35.0);
						var radlat = lat / 180.0 * PI;
						var magic = Math.sin(radlat);
						magic = 1 - ee * magic * magic;
						var sqrtmagic = Math.sqrt(magic);
						dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
						dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
						var mglat = lat + dlat;
						var mglng = lng + dlng;
						return [lng * 2 - mglng, lat * 2 - mglat]
					}
				};
				var out_of_china = function out_of_china(lng, lat) {
					var lat = +lat;
					var lng = +lng;
					// 纬度3.86~53.55,经度73.66~135.05 
					return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
				};


				var transform_GPS = gcj02towgs84(longitude, latitude);
				// 地图包名
				var mapsPackageNames = ['com.baidu.BaiduMap', 'com.autonavi.minimap', 'com.tencent.map'];
				//iOS与Android的判断第三方程序不一样，Android是包名，iOS是action属性（Scheme）
				var iosURLTypes = ['baidumap://', 'iosamap://', 'qqmap://'];
				if(plus.os.name == "iOS"){mapsPackageNames = iosURLTypes};
				if(plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'baidumap://'}) || plus.runtime.isApplicationExist({pname:'com.tencent.map',action:'iosamap://'}) || plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'qqmap://'})){
					var m=0,gotoUrl="";//m:记录本机地图app个数，gotoUrl：记录实际直接跳转地址
					var btnArray = []; //实际显示按钮数组
					var btnTitle = ["使用百度地图导航","使用高德地图导航","使用腾讯地图导航"];
					var urlArray = []; //实际显示跳转地址数组
					//百度api文档：http://lbsyun.baidu.com/index.php?title=uri/api/android
					//高德api文档：https://lbs.amap.com/api/amap-mobile/guide/ios/route
					//腾讯api文档：https://lbs.qq.com/webApi/uriV1/uriGuide/uriMobileRoute
					var andrUrl = [
						"baidumap://map/direction?origin=&destination="+transform_GPS[1]+","+transform_GPS[0]+"&coord_type=wgs84&mode=driving&src=andr.baidu.openAPIdemo",
						"amapuri://route/plan/?slat=&slon=&dlat="+transform_GPS[1]+"&dlon="+transform_GPS[0]+"&dev=1&t=0",
						"qqmap://map/routeplan?type=drive&fromcoord=CurrentLocation&tocoord="+ latitude +","+ longitude +"&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
					]
					var iosUrl = [
						"baidumap://map/direction?origin=&destination="+transform_GPS[1]+","+transform_GPS[0]+"&coord_type=wgs84&mode=driving&src=ios.baidu.openAPIdemo",
						"iosamap://path?sourceApplication=applicationNameslat=&slon=&dlat="+transform_GPS[1]+"&dlon="+transform_GPS[0]+"&dev=1&t=0",
						"qqmap://map/routeplan?type=drive&fromcoord=CurrentLocation&tocoord="+latitude+","+longitude+"&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
					]
					//根据手机型号确定跳转数组var 
					if(plus.os.name == "iOS"){
						urlArray = iosUrl;
					}else{
						urlArray = andrUrl;
					}
					var gotoUrlArr = [];
					for(var k in mapsPackageNames){
						if(mapsPackageNames[k]){
							m++;
							gotoUrl = urlArray[k];
							btnArray.push({
								title: btnTitle[k]
							})
							gotoUrlArr.push(urlArray[k])
						}
					}
					//当只有一个地图APP时，直接跳转；不止一个时弹出原生选择框
					if(m > 1){
						plus.nativeUI.actionSheet( {
							title:"请选择地图",
							cancel:"取消",
							buttons:btnArray
						}, function(e){
							if(e.index > 0){ //=0:取消，1：百度，2：高德，3：腾讯
								plus.runtime.openURL(gotoUrlArr[e.index-1]);
								if(!plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'}) && e.index == 1){
									uni.showModal({
										title: '提示',
										content: '请安装百度地图',
										showCancel: true,
									})
									
								}else if(!plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'iosamap://'}) && e.index == 2){
									
									uni.showModal({
										title: '提示',
										content: '请安装高德地图',
										showCancel: true,
									})
								}else if(!plus.runtime.isApplicationExist({pname:'com.tencent.map',action:'qqmap://'}) && e.index == 3){
									uni.showModal({
										title: '提示',
										content: '请安装腾讯地图',
										showCancel: true,
									})
								}
							}
						} );
					}else{
						plus.runtime.openURL(gotoUrl);
					}
				}else{
					uni.showModal({
						title: '提示',
						content: '您的手机没有安装高德地图，百度地图或腾讯地图其中一个应用',
						showCancel: true,
					})
					
				}	
			},
			// 改变视野时改变经纬度
			regionchange(e) {
				var causedBy;
				/* #ifdef H5 */
				causedBy = e.detail.causedBy
				
				/* #endif */
				
				/* #ifdef MP-WEIXIN */
				causedBy = e.causedBy
				
				/* #endif */
				if (e.type === 'end' && causedBy === "drag") {
					// 使用 wx.createMapContext 获取 map 上下文 this必须要写
					var mapCtx = uni.createMapContext("myMap", this)
					mapCtx.getCenterLocation({
						// 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 uni.openLocation
						success: (res) => {
							this.centerLatitude = res.latitude
							this.centerLongitude = res.longitude
							this.nearDistance(
								this.markers,
								this.centerLatitude,
								this.centerLongitude
							)
							uni.$emit('getShopList',true)
							
						},
						fail: (err) => {
							console.log(err,'errrr')
						}
					}) //获取当前地图的中心经纬度
					


					mapCtx.getScale({
						success: (res) => {
							console.log(res,'ok');
						},
						fail: (err) => {
							console.log(err,'errMsg');
						}
					});
				}
				
				

				/* #ifdef APP-PLUS */
				
					
					// 使用 wx.createMapContext 获取 map 上下文 this必须要写
					var mapCtx = uni.createMapContext("myMap", this)
					mapCtx.getCenterLocation({
						// 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 uni.openLocation
						success: (res) => {
							this.centerLatitude = res.latitude
							this.centerLongitude = res.longitude
							this.nearDistance(
								this.markers,
								this.centerLatitude,
								this.centerLongitude
							)
							uni.$emit('getShopList',true)
							
							
							
						},
						fail: (err) => {
							console.log(err)
						}
					}) //获取当前地图的中心经纬度
					


					mapCtx.getScale({
						success: (res) => {
							console.log(res);
						},
						fail: (err) => {
							console.log(err);
						}
					});
				
				/* #endif */
			},
			// 两点间距离
			distance(la1, lo1, la2, lo2) {
				var La1 = (la1 * Math.PI) / 180.0
				var La2 = (la2 * Math.PI) / 180.0
				var La3 = La1 - La2
				var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0
				var s =
					2 *
					Math.asin(
						Math.sqrt(
							Math.pow(Math.sin(La3 / 2), 2) +
							Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)
						)
					)
				s = s * 6378.137 //地球半径
				s = Math.round(s * 10000) / 10000
				return s
			},
			// 计算最近的距离
			nearDistance(array, centerLatitude, centerLongitude) {
				let temp = []
				for (let i = 0, l = array.length; i < l; i++) {
					const element = array[i]
					let d = this.distance(
						element.latitude,
						element.longitude,
						centerLatitude,
						centerLongitude
					)
					temp.push(d)
				}
				this.distanceL = Math.min.apply(null, temp)
				
			}
		},
		onShow() {},
		onReady() {},
		created(){
			
			
			uni.getLocation({
					type: "gcj02", //返回可以用于wx.openLocation的经纬度
					altitude:true,
					/* #ifdef APP-PLUS */
					geocode:true,
					/* #endif */
					success: (res) => {
						console.log(res)
						this.latitude = res.latitude
						this.longitude = res.longitude
						// 计算最近的距离
						this.showMap = true;
						setTimeout(() =>{
							this.nearDistance(this.markers, this.latitude, this.longitude)
						},300)
						
						
					},
					fail: (err) => {
						
						console.log(err)
					}
				})
		}
		
	}
</script>

<style lang="scss" scoped>
	map {
		width: 100%;
		height: calc(100vh) !important;
	}
	.content {
		text-align: center;
		height: 400rpx;
	}

	.page-section {
		// z-index: 0;
	}

	.store-tips {
		width:auto;
		height: 100rpx;
		margin: 10rpx auto;
		border-radius: 10rpx;
		position: fixed;
		top: 80rpx;
		left: 50%;
		transform: translate(-50%, 0);
		// z-index: 2;
		overflow: hidden;

		.store-des-box {
			background: #fff;
			
			
		}

		.store-img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			margin: 10rpx;
			float: left;
		}

		.store-des {
			padding-top: 8rpx;
			/* #ifdef MP-WEIXIN || H5 */
			float: left;
			/* #endif */
			
			line-height: 1;
			font-size: 22rpx;
			color: #666;
			padding-left: 20rpx;
			padding-bottom: 8rpx;
			padding-right: 20rpx;
			text-align: center;
			.store-name {
				font-weight: 600;
				color: deeppink;
			}
		}

		.store-clear {
			width: 30rpx;
			height: 30rpx;
			position: fixed;
			top: 7rpx;
			right: 7rpx;
			margin: 30rpx;
		}
	}

	.address-icon {
		width: 38rpx;
		height: 40rpx;
		position: fixed;
		top: 22%;
		left: 50%;
		// z-index: 2;
		margin-bottom: -20rpx;
		margin-left: -20rpx;
	}

	.near-num {
		padding: 10rpx 20rpx;
		/* #ifdef APP-PLUS */
		width: 350rpx;
		height: 54rpx;
		text-align: center;
		/* #endif */
		border-radius: 10rpx;
		position: fixed;
		top: 17%;
		left: 50%;
		// z-index: 2;
		font-size: 24rpx;
		background: #fff;
		transform: translate(-50%, 0);
	}

	/* #ifdef APP-PLUS */
		.store-names {
			width: 400rpx;
			height: 35rpx;
			border-radius: 10rpx 10rpx 0 0;
			position: fixed;
			top: 10rpx;
			left: 50%;
			transform: translate(-50%, 0);
			font-weight: 600;
			color: deeppink !important;
		}

		.f-zz {
			line-height: 1;
			font-size: 22rpx;
			color: #666;
			padding-left: 20rpx;
			padding-bottom: 8rpx;
			padding-right: 20rpx;
			text-align: center;
		}
		.store-addresss {
			width: 400rpx;
			height: 35rpx;
			position: fixed;
			top: 43rpx;
			left: 50%;
			transform: translate(-50%, 0);
		}
		.store-tels {
			width: 400rpx;
			height: 35rpx;
			border-radius: 0 0 10rpx 10rpx;
			position: fixed;
			top: 75rpx;
			left: 50%;
			transform: translate(-50%, 0);
		}
	/* #endif */
</style>
