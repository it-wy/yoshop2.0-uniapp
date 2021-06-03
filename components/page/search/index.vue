<template>
  <!-- 搜索框 -->
  <view class="diy-search">
	  <view class="city" @click="run">
	  	<SelectRegion class="citys" ref="city"  v-model="address" :placeholder="city" v-on:run="run" />
		
		<u-icon @click="run2"  class="gg" name="play-right" ref="run" color="#fa2209" :class="{run: iscity,norun:iscity2}" ></u-icon>
	  </view>
    <view class="inner" :class="itemStyle.searchStyle" @click="onTargetSearch">
      <view class="search-input" :style="{ textAlign: itemStyle.textAlign }">
        <text class="search-icon iconfont icon-sousuo"></text>
        <text> {{ params.placeholder }}</text>
      </view>
    </view>
	
	<!-- 城市 -->
  </view>
</template>

<script>
	import SelectRegion from '@/components/select-region/select-region'
	import * as ShopApi from '@/api/shop'
	import formatLocation from '../../../js_sdk/jweixin.js';
  export default {

    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    props: {
      itemIndex: String,
      itemStyle: Object,
      params: Object
    },

    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
	components:{
		SelectRegion
	},
	
	data(){
		return {
			city: '全国',
			iscity: false,
			iscity2: false,
			address:[],
			// 定位
			title: 'getLocation',
			hasLocation: false,
			location: {},
			type: '',
			form:{
				lat:'',
				lng:''
			},
			isonload: false
		}
	},
	watch:{
		address(v){
			const app = this;
			
			if(typeof v == typeof [] && app.isonload){
				const address_city = v[0].label+v[1].label+v[2].label;
				// 执行定位回调
				return new Promise((resolve, reject) => {
				  ShopApi.city({address:address_city})
				    .then(result => {
				      
						uni.setStorage({
							key: 'gps',
							data: {lat:result.data.lat, lng:result.data.lng,city:address_city},
							success: function () {
								// console.log('success');
							}
						});
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
			}
			
		}
	},

    methods: {

      /**
       * 跳转到搜索页面
       */
      onTargetSearch() {
        this.$navTo('pages/search/index')
      },
	  run(){
		  // console.log("---")
		  // 添加旋转样式
		  this.isonload = true;
		  if(this.iscity){
			  this.iscity=false
			  this.iscity2 = true
		  }else {
			  this.iscity = true
			  this.iscity2 = false
			  
		  }
		  
		  // this.$refs.run.$el.classList.add('run')
		  // 
		  
	  },
	  run2(){
		  this.$refs.city.handleSelect();
	  },
	  // 经纬度转地址
	  getShopGps() {
	    const app = this
	    // console.log(app.form)
	    return new Promise((resolve, reject) => {
	      ShopApi.gps({lat:app.form.lat,lng: app.form.lng})
	        .then(result => {
				
			app.address = [{label:result.data.province,value:1},{label:result.data.city, value:2},{label:result.data.district, value:3}]
			  
	  		uni.setStorage({
	  		    key: 'gps',
	  		    data: {lat:app.form.lat, lng:app.form.lng,city:app.address},
	  		    success: function () {
	  				
	  		        // console.log('success');
	  		    }
	  		});
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
	  // 定位
	  async getLocation() {
	      // #ifdef APP-PLUS
	      // let status = await this.checkPermission();
	      // if (status !== 1) {
	      //     return;
	      // }
	      // #endif
	      // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
	      // let status = await this.getSetting();
	      // if (status === 2) {
	      //     this.showConfirm();
	      //     return;
	      // }
	      // #endif
	  
	      this.doGetLocation();
	  },
	  doGetLocation() {
	      uni.getLocation({
			  type:'gcj02',
			  altitude:true,
	          success: (res) => {
	              this.hasLocation = true;
	  			
				this.location = formatLocation(res.longitude, res.latitude);

	  			this.form.lat = res.latitude
	  			this.form.lng = res.longitude
	  			// 经纬度转地址
	  			this.getShopGps()
	  			
	          },
	          fail: (err) => {
	              // #ifdef MP-BAIDU
	              if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
	                  this.showConfirm();
	              }
	              // #endif
	              // #ifndef MP-BAIDU
	              if (err.errMsg.indexOf("auth deny") >= 0) {
	                  uni.showToast({
	                      title: "访问位置被拒绝"
	                  })
	              } else {
	                  uni.showToast({
	                      title: err.errMsg
	                  })
	              }
	              // #endif
	          }
	      })
	  },

    },
	created() {
		
		this.getLocation()
		
		const app = this;
			uni.getStorage({
			    key: 'gps',
			    success: function (res) {
			        app.address = res.data.city;
			    }
			});
		
	},
	

  }
</script>

<style lang="scss" scoped>
  .diy-search {
    background: #f1f1f2;
    padding: 20rpx 20rpx;
    font-size: 26rpx;
	display: flex;
	align-items: center;
  }
  .city {
	  
	  color: #fa2209;
	  display: flex;
	  // align-items: center;
	  .gg {
	  }
  }
  .run {
	  transition: .3s all;
	  transform: rotate(90deg);
  }
  .norun {
  	  transition: .3s all;
  	  transform: rotate(0deg);
  }

  .inner {
	margin-left: 20rpx;  
    height: 60rpx;
    background: #fff;
    overflow: hidden;
	flex: 1;
    &.radius {
      border-radius: 10rpx;
    }

    &.round {
      border-radius: 60rpx;
    }
  }

  .search-input {
    height: 60rpx;
    line-height: 60rpx;
    color: #999;
    padding: 0 20rpx;

    .search-icon {
      margin-right: 8rpx;
    }
  }
</style>
