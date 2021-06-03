<template>
	<view class="container">
		<view class="avatar">
			<u-image width="150rpx" height="150rpx"   shape="circle" :src="info.avatar_url"></u-image>
		</view>
		<view class="wrap">
			<u-form :model="form" ref="uForm" :label-width="180">
				<u-form-item label="姓名"  right-icon="arrow-right">
					<u-input v-model="info.real_name" disabled placeholder=" " @click="realName" />
				</u-form-item>
				<u-form-item label="密码"  right-icon="arrow-right" >
					<u-input v-model="password" disabled placeholder=" " @click="targetPass" />
				</u-form-item>
				<u-form-item label="手机号码" right-icon="arrow-right"   >
					<u-input v-model="form.mobile"  disabled @click="editMobile"/>
				</u-form-item>
				<!-- <u-form-item label="验证码" prop="code"  v-if="app.info.mobile!=''">
					<u-input v-model="form.code" />
					<u-button slot="right" :disabled="disabled" @click="getCode">发送验证码</u-button>
				</u-form-item>
				<u-form-item label="新手机号码" prop="new_phone"  v-if="app.info.mobile!=''">
					<u-input v-model="form.new_phone" />
				</u-form-item>
				<u-form-item label="验证码" prop="new_code"  v-if="app.info.mobile!=''">
					<u-input v-model="form.new_code" />
					<u-button slot="right" :disabled="disabled2" @click="getCode2">发送验证码</u-button>
				</u-form-item> -->
			</u-form>
			<!-- <u-button @click="submit"  v-if="app.info.mobile!=''">修改</u-button> -->
			<view class="btn">
				<u-button type="primary" @click="quit()">退出登陆</u-button>
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
				src: 'https://www.uviewui.com/common/logo.png',
				
				
				
				disabled: false,
				password:'*******',
				
				time2: 0,
				disabled2: false,
				info:{},
				form: {
					mobile:''
				}
				
			}
		},
		methods:{
			// 获取会员信息
			getUserInfo() {
			  const app = this
			  return new Promise((resolve, reject) => {
			    UserApi.info()
			      .then(result => {
			        app.info= result.data.userInfo;
					app.form.mobile = app.info.mobile==''?'暂无手机号请点击绑定':app.info.mobile;
					app.info.real_name = app.info.real_name ==''?'暂无实名请点击实名':app.info.real_name;
			        resolve(app.userInfo)
			      })
			  })
			},
			// 实名认证
			realName(){
				
				if(this.info.real_name=='' || this.info.real_name=='暂无实名请点击实名'){
					 uni.navigateTo({
						url:'/packageA/pages/with/with?type='+'name'
					})	
				}else {
					this.$toast('已实名请勿重复实名')
				}
				
			},
			// 跳转修改手机号
			editMobile(){
				const app = this;
				if(app.form.mobile == '暂无手机号请点击绑定'){
					uni.navigateTo({
                  url:'/packageA/pages/with/with?type='+'phone'
         		 })	
				}else {
					uni.navigateTo({
                  url:'/packageA/pages/editpass/editpass?type='+'phone'
         		 })	
				}
				 
			},

			// 注销
			quit(){
				store.dispatch('Logout')
				uni.navigateBack({
					delta:0
				})
			}, 
			// 跳转修改密码
			targetPass(){
				console.log("on");
				uni.navigateTo({ url: '/packageA/pages/editpass/editpass?type=name' })
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		onShow() {this.getUserInfo();},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			
			this.$refs.uForm.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
		box-sizing: border-box;
		.avatar {
			width: 100%;
			display: flex;
			justify-content: center;
			border-bottom: 2rpx solid #F5F5F5;
			padding-bottom: 30rpx;
		}
		.wrap {
			padding: 20rpx;
			box-sizing: border-box;
			
			border-radius:  0 0 8rpx 8rpx;
			.btn {
				margin-top: 20rpx;
			}
		}
	}
</style>
