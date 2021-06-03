<template>
	<view class="container">
		<view class="wrap">
			<u-form :model="form" ref="uForm" :label-width="150" v-if="type=='with' || type=='swith'">
				<u-form-item label="商家店铺" prop="shop_name"  v-if="type=='swith'">
					<u-input v-model="form.shop_name" @click="onShopList" type="select"  />
				</u-form-item>
				<u-form-item label="我的余额"  >
					<u-input v-model="balance"  disabled/>
				</u-form-item>
				<u-form-item label="所属银行" prop="bank_name">
					<u-input v-model="form.bank_name" />
				</u-form-item>
				<u-form-item label="所属支行" prop="bank_zh" >
					<u-input v-model="form.bank_zh" />
				</u-form-item>
				<u-form-item label="银行账户" prop="card">
					<u-input v-model="form.card" />
				</u-form-item>
				<u-form-item label="提取金额" prop="amount">
					<u-input v-model="form.amount" />
				</u-form-item>
				
				<u-form-item label="手机号" prop="mobile">
					<u-input v-model="form.mobile" disabled />
				</u-form-item>
				<u-form-item label="验证码" prop="code">
					<u-input v-model="form.code" />
					<u-button slot="right" :disabled="disabled" @click="getCode()">发送验证码</u-button>
				</u-form-item>
			</u-form>
			<u-select v-model="show" :list="shopList"  @confirm="confirm"></u-select>
			<!-- 余额转账 -->
			<u-form :model="form" ref="uForm" :label-width="150" v-if="type=='balance'">
				<u-form-item label="我的余额"  >
					<u-input v-model="balance"  disabled/>
				</u-form-item>
				<u-form-item label="转入UID" prop="member_id">
					<u-input v-model="form.member_id"   />
				</u-form-item>
				<u-form-item label="转入余额" prop="balance">
					<u-input v-model="form.balance" />
				</u-form-item>
				<u-form-item label="手机号" prop="mobile" >
					<u-input v-model="form.mobile" disabled />
				</u-form-item>
				<u-form-item label="手机验证码" prop="code">
					<u-input v-model="form.code" />
					<u-button slot="right" :disabled="disabled" @click="getCode">发送验证码</u-button>
				</u-form-item>
				
			</u-form>
			<!-- 绑定手机 -->
			<u-form :model="form" ref="uForm" :label-width="200" v-if="type=='phone'">
				<u-form-item label="手机号" prop="mobile" >
					<u-input v-model="form.mobile" />
				</u-form-item>
				<u-form-item label="手机验证码" prop="code">
					<u-input v-model="form.code" />
					<u-button slot="right" :disabled="disabled" @click="getCode">发送验证码</u-button>
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="form.password" />
				</u-form-item>
				<u-form-item label="再次输入密码" prop="password2">
					<u-input v-model="form.password2" />
				</u-form-item>
			</u-form>
			<!-- 实名认证 -->
			<u-form :model="form" ref="uForm" :label-width="200" v-if="type=='name'">
				<u-form-item label="真实姓名" prop="real_name">
					<u-input v-model="form.real_name" />
				</u-form-item>
				<u-form-item label="身份证号码" prop="number">
					<u-input v-model="form.number" />
				</u-form-item>
			</u-form>
			<view class="btn"><u-button type="primary" @click="submit">确认</u-button></view>
			<view class="desc">
				<p style="font-weight: bold;margin: 20rpx 0;">注意事项</p>
				<view class="" v-html="desc">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as UserApi from '@/api/user'
	import * as ShopApi from '@/api/shop'
	export default {
		data(){
			return {

				form: {
					mobile: '',
					code: '',
					password: '',
					password2:''
				},
				shopList: [],
				time:0,
				disabled: false,
				balance: '',
				rules: {
					
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
					code: [
						{
							required: true,
							message: '请输入验证码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					password2: [
						{
							required: true,
							message: '请再次输入密码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
				},
				// 富文本
				desc: `<p>1.您必须完成实名认证才可以进行提现操作;</p>
				<p>2.提现到帐时间为T+1 (T为工作日);</p>
				<p>3.提现金额为10(元)的整倍数,如果您填写带有尾数的金额，系统将自动换算为10(元)的整倍数。</p>
				<p>4.提现手续费为8%，转账免费</p>
				<p>5.系统将默认记录您最后一次的银行卡信息。请仔细核对;(本操作仅作为减轻您的操作步骤而提供的功能，请仔细核对,平台对此不承担任何责任。)</p>`,
				type: 'with',
				show: false,
				userInfo:{}
			}
		},
		methods:{
			// 获取店铺列表
			onShopList(){
				this.show = true;
			},
			confirm(e){
				
				this.form.shop_name = e[0].label;
				this.form.shop_id = e[0].value;
				this.shopList.map((i)=>{
						
						if(e[0].value == i.shop_id) this.balance = i.balance;
				})
			},
			getShopList(){
				const app = this;
				return new Promise((resolve, reject) => {
					ShopApi.qrcode()
					.then(res => {
						
						res.data.list.map((i)=>{
							i.label = i.shop_name;
							i.value = i.shop_id;
						})
						this.shopList = res.data.list;
						this.balance = '未选中店铺'						
						resolve(app.shopList)
					})
				})	
			},
			getDefault(){
				const app = this;
				return new Promise((resolve, reject) => {
					UserApi.userShopWithDefault()
					.then(res => {
						if(typeof res.data.list== typeof {}){
							this.form.card = res.data.list.card;
							this.form.bank_name = res.data.list.bank_name;
							this.form.bank_zh = res.data.list.bank_zh;
						}else {
							this.form = this.form;	
						}
											
						resolve(app.shopList)
					})
				})	
				
			},
			// 获取当前用户信息
			getUserInfo() {
				const app = this
				return new Promise((resolve, reject) => {
				UserApi.info()
					.then(result => {
					app.userInfo = result.data.userInfo
					this.form.mobile = app.userInfo.mobile;
					
					
					resolve(app.userInfo)
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
			// 获取验证码
			getCode(){
				var myreg = /^1[3-9]\d{9}$/;
				if(this.time==0){
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
							uni.showToast({
								title:'发送成功'
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
				}
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
			  submit() {
			  	this.$refs.uForm.validate(valid => {
					 
			  		if (valid) {
			  			// 店铺详情
			  			
			  			const app = this;
			  			return new Promise((resolve, reject) => {
							switch (this.type) {
							   case 'balance':
								 UserApi.blancetran(app.form)
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
								 break;
								case 'name':
								 UserApi.realName(app.form)
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
								 break;
								case 'with':
								 UserApi.userWith(app.form)
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
								 break;
								case 'swith':
								 UserApi.userShopWith(app.form)
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
								 break;  
							   default:
									UserApi.userPhone(app.form)
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
								 break;
							 }
			  			  })
			  			
			  		} else {
			  			console.log('验证失败');
			  		}
			  	});
			  },
			  // 获取余额
			  // 获取账户资产
			  getUserAssets() {
			    const app = this
			    return new Promise((resolve, reject) => {
			      UserApi.assets()
			        .then(result => {
			          app.balance = result.data.assets.balance.toFixed(2)
			          resolve(app.balance)
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
		},
		onLoad(options) {
			this.type = options.type
			if(options.type=='balance'){
				this.desc = `<p>1.转入余额为实时到帐；无需对方确认；</p>
				<p>2.请认真填写转入用户UID；如果误操作;您的余额将无法追回</p>
				<p>3.转出余额为10以上100的整倍数,如果您填写带有尾数的数额，系统将自动换算为10以上100的整倍数。</p>`
				
				this.form = {
					user_id: '',
					member_id: '',
					balance: '',
					code: '',
					mobile: ''
				}
				uni.getStorage({
				    key: 'userId',
				    success: (res)=> {
				        this.form.user_id = res.data
				    }
				});
				
				this.getUserAssets();
				this.getUserInfo();
				this.rules = {
					balance: [
						{
							required: true,
							message: '请输入转入余额',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					member_id: [
						{
							required: true,
							message: '请输入转入uid',
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
					code: [
						{
							required: true,
							message: '请输入验证码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					
				};
				
				uni.setNavigationBarTitle({
				　　title:'余额转账'
				})
				
			} else if(options.type=='phone'){
				this.desc = `<p>1.绑定手机号；</p>`;
				uni.setNavigationBarTitle({
				　　title:'绑定手机'
				})
			} else if(options.type=='with'){
				this.form = {
					card: '',
					bank_name: '',
					bank_zh: '',
					code: '',
					mobile: '',
					amount: ''
				}
				this.getUserAssets();
				this.getUserInfo();
				this.getDefault();
				this.rules = {
					card: [
						{
							required: true,
							message: '请输入卡号',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					bank_name: [
						{
							required: true,
							message: '请输入银行名字',
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
					code: [
						{
							required: true,
							message: '请输入验证码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					bank_zh: [
						{
							required: true,
							message: '请输入支行名字',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					amount: [
						{
							required: true,
							message: '请输入提现金额',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					
				};

				uni.setNavigationBarTitle({
				　　title:'提现'
				})
			}else if (options.type == 'swith'){
				this.form = {
					card: '',
					bank_name: '',
					bank_zh: '',
					code: '',
					mobile: '',
					amount: '',
					shop_name: '',
					shop_id:''
				}
				this.getUserAssets();
				this.getUserInfo();
				this.getShopList();
				this.getDefault();
				this.rules = {
					card: [
						{
							required: true,
							message: '请输入卡号',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					bank_name: [
						{
							required: true,
							message: '请输入银行名字',
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
					code: [
						{
							required: true,
							message: '请输入验证码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					bank_zh: [
						{
							required: true,
							message: '请输入支行名字',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					amount: [
						{
							required: true,
							message: '请输入提现金额',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					shop_name: [
						{
							required: true,
							message: '请选择您的店铺',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					
				};

				uni.setNavigationBarTitle({
				　　title:'商家提现'
				})
				this.desc = `<p></p>`;
			} else if (options.type == 'name'){
				this.desc = `<p>1.实名认证；</p>`;
				this.form = {
					member_id: '',
					real_name: '',
					number: '',
				}
				uni.getStorage({
				    key: 'userId',
				    success: (res)=> {
				        this.form.member_id = res.data
				    }
				});
				this.rules = {
					real_name: [
						{
							required: true,
							message: '请输入真实姓名',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					number: [
						{
							required: true,
							message: '请输入身份证号码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					
				};

				uni.setNavigationBarTitle({
				　　title:'实名认证'
				})
			}
		},
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
		.wrap {
			border-radius:  0 0 8rpx 8rpx;
			.btn {
				margin-top: 20rpx;
			}
		}
	}
</style>
