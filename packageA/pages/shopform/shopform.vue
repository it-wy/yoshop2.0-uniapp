<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" :label-width="150">
			<u-form-item label="商家姓名" prop="shop_name">
				<u-input v-model="form.shop_name" />
			</u-form-item>
			<u-form-item label="联系人" prop="link_name">
				<u-input v-model="form.link_name" />
			</u-form-item>
			<u-form-item label="地区" prop="cascader">
			  <select-region v-model="form.cascader" />
			</u-form-item>
			<u-form-item label="详细地址" prop="address">
				<u-input v-model="form.address" />
			</u-form-item>
			<u-form-item label="联系电话" prop="mobile">
				<u-input v-model="form.mobile" />
			</u-form-item>
			<u-form-item label="验证码" prop="code">
				<u-input v-model="form.code" />
				<u-button slot="right" :disabled="disabled" size="mini" @click="getCode">获取验证码</u-button>
			</u-form-item>
			<u-form-item label="备注" >
				<u-input v-model="form.describe" />
			</u-form-item>
		</u-form>
		<u-button @click="submit" type="primary">发送申请</u-button>
		<view class="shopdesc">
			<h3>入驻指南</h3>
		</view>
		<view class="shopstep">
				<u-steps :list="numList" :current="3"></u-steps>
		</view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
					<view v-html="item.content"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
	
</template>

<script>
	import SelectRegion from '@/components/select-region/select-region'
	import * as ShopApi from '@/api/shop'
export default {
	data() {
		return {
			form: {
				shop_name: '',
				link_name: '',
				mobile: '',
				code: '',
				address: '',
				describe: '',
				cascader: ''
			},
			time:0,
			disabled: false,
			rules: {
				shop_name: [
					{
						required: true,
						message: '请输入商家名称',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}
				],
				link_name: [
					{
						required: true,
						message: '请输入联系人',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}
				],
				// 字段名称
				mobile: [
					{
						required: true, 
						message: '请输入手机号',
						trigger: ['change',],
					},
					{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					}
				],
				address: [
					{
						required: true,
						message: '请输入详细地址',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}
				],
				cascader: [{
				  required: true,
				  message: '请选择省市区',
				  trigger: ['blur', 'change'],
				  type: 'array'
				}],
				
			},
			numList: [{
				name: '信息提交'
			}, {
				name: '对接服务'
			}, {
				name: '审核资质'
			}, {
				name: '店铺开通'
			}, ],
			
			list: [{
				name: '招商方向',
				content: '餐饮业，健康养生，教育培训，美容美发，汽车服务，休闲娱乐，茶馆会所，水果生鲜，酒店民宿，旅游度假等类别商家。'
			}, {
				name: '招商说明',
				content: '<p>需有提供资料如下：</p> <p>1.店铺名字 </p> <p>2.店铺经营地址 </p> <p>3.店铺营业时间 </p> <p>4.店铺联系人和联系电话</p> <p>5.一到三款爆款（套餐名字+价位+图片+详情介绍）</p>'
			}, {
				name: '资质要求',
				content:'商家要有基本的营业执照（餐饮业需要有对应的食品流通许可证，健康证等）'
			},{
				name: '资费标准',
				content:`<p>目前为免费邀约入驻</p>`
			}],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
		};
	},
	components:{
		SelectRegion
	},
	methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 店铺详情
						
						const app = this;
						return new Promise((resolve, reject) => {
						  ShopApi.form(app.form)
							.then(result => {
								uni.showToast({
									title:"提交成功",
									success() {
										uni.navigateBack({
											delta:0
										})
									}
								})
								
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
						
					} else {
						console.log('验证失败');
					}
				});
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			getCode(){
				var myreg = /^1[3-9]\d{9}$/;
				if(this.form.mobile==''){
					uni.showToast({
						icon:'none',
						title:'手机不能为空'
					})
				}else if(!myreg.test(this.form.mobile)){
					uni.showToast({
						icon:'none',
						title:'手机号格式不对'
					})
				}else {
					return new Promise((resolve, reject) => {
					  ShopApi.code({form:{mobile:this.form.mobile}})
						.then(result => {
							this.disabled = true;
							this.time = 30;
							this.code_end();
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
				
			},
			 // 判断手机号
			  code_end(send_btn){
					
					if(this.time == 0){
						this.disabled = false;	
						
						this.time = 0;
					}else {
									
							this.time--;
							setTimeout(()=> {
							  
								this.code_end()
							}, 1000)
					}
			  },
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad() {
		
	}
};
</script>
<style lang="scss" scoped>
	.wrap {
		padding: 10rpx;
		box-sizing: border-box;
		.shopdesc {
			background-color: #f5f5f5;
			width: 100%;
			padding: 40rpx 0 40rpx 0;
			text-align: center;
			letter-spacing: 6rpx;
		}
		.shopstep {
			margin-bottom: 40rpx;
		}
		
	}
</style>