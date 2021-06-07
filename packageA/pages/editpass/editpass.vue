<template>
  <view class="editpass">
    <u-form :model="form" ref="uForm" :label-width="150" v-if="type=='name'">
      <u-form-item label="手机号码" prop="phone">
        <u-input v-model="form.phone" />
      </u-form-item>
      <u-form-item label="验证码" prop="code">
        <u-input v-model="form.code" />
        <u-button slot="right" :disabled="disabled" @click="getCode"
          >发送验证码</u-button
        >
      </u-form-item>
      <u-form-item label="密码"  prop="password">
        <u-input v-model="form.password" type="password" />
      </u-form-item>
      <u-form-item label="确认密码"  prop="new_pass">
        <u-input v-model="form.new_pass" type="password" />
      </u-form-item>
    </u-form>

    <u-form :model="form" ref="uForm" :label-width="180" v-else>
				<u-form-item label="手机号码" >
					<u-input v-model="form.mobile" disabled />
				</u-form-item>
				<u-form-item label="验证码" prop="code"  >
					<u-input v-model="form.code" />
					<u-button slot="right" :disabled="disabled" @click="getCode">发送验证码</u-button>
				</u-form-item>
				<u-form-item label="新手机号码" prop="new_phone"  >
					<u-input v-model="form.new_phone" />
				</u-form-item>
				<u-form-item label="验证码" prop="new_code"  >
					<u-input v-model="form.new_code" />
					<u-button slot="right" :disabled="disabled2" @click="getCode2">发送验证码</u-button>
				</u-form-item>
			</u-form>
    <u-button @click="submit" type="primary">修改</u-button>
  </view>
</template>

<script>
import * as ShopApi from "@/api/shop";
import * as UserApi from "@/api/user";
export default {
  data(){
    return {
    time: 0,
    disabled: false,
    time2: 0,
    disabled2: false,
    form: {
      phone: "",
      code: "",
      password: "",
      new_pass: "",
    },
    type: '',
    // 会员信息
    rules: {
      // 字段名称
      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: ["change"],
        },
        {
          // 自定义验证函数，见上说明
          validator: (rule, value, callback) => {
            // 上面有说，返回true表示校验通过，返回false表示不通过
            // this.$u.test.mobile()就是返回true或者false的
            return this.$u.test.mobile(value);
          },
          message: "手机号码不正确",
          // 触发器可以同时用blur和change
          trigger: ["change", "blur"],
        },
      ],
      
      code: [
        {
          required: true,
          message: "请输入手机验证码",
          // 可以单个或者同时写两个触发验证方式
          trigger: "blur,change",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          // 可以单个或者同时写两个触发验证方式
          trigger: "blur,change",
        },
      ],
      new_pass: [
        {
          required: true,
          message: "请输入确认密码",
          // 可以单个或者同时写两个触发验证方式
          trigger: "blur,change",
        },
      ],
    },
  }
  },
  methods: {
    submit() {
      
      this.$refs.uForm.validate((valid) => {
        
        if (valid) {
          
          if(this.type == "name"){
            if (this.form.new_pass != this.form.password) {
              uni.showToast({
                title: "两次密码不一致",
                icon: "none",
              });
            } else {
              // 店铺详情

              const app = this;
              return new Promise((resolve, reject) => {
                UserApi.userNewPassword(app.form)
                  .then((result) => {
                    uni.showToast({
                      title: "提交成功",
                      success() {
                        uni.navigateBack({
                          delta: 0,
                        });
                      },
                    });

                    resolve(result.data);
                  })
                  .catch((err) => {
                    if (err.result && err.result.status == 401) {
                      // app.isLogin = false
                      resolve(null);
                    } else {
                      reject(err);
                    }
                  });
              });
            }
          }else {
            const app = this;
              return new Promise((resolve, reject) => {
                UserApi.editMobile(app.form)
                  .then((result) => {
                    uni.showToast({
                      title: "提交成功",
                      success() {
                        uni.navigateBack({
                          delta: 0,
                        });
                      },
                    });

                    resolve(result.data);
                  })
                  .catch((err) => {
                    if (err.result && err.result.status == 401) {
                      // app.isLogin = false
                      resolve(null);
                    } else {
                      reject(err);
                    }
                  });
              });
          }
          
        } else {
          console.log("验证失败");
        }
      });
    },
    // 判断手机号
    code_end(send_btn) {
      if (this.time == 0) {
        this.disabled = false;

        this.time = 0;
      } else {
        this.time--;
        setTimeout(() => {
          this.code_end();
        }, 1000);
      }
    },
    getCode() {
      var myreg = /^1[3-9]\d{9}$/;
      if (this.time == 0) {
        if (this.form.phone == "") {
          uni.showToast({
            icon: "none",
            title: "手机不能为空",
          });
        } else if (!myreg.test(this.form.phone)) {
          uni.showToast({
            icon: "none",
            title: "手机号格式不对",
          });
        } else {
          return new Promise((resolve, reject) => {
            ShopApi.code({ form: { mobile: this.form.phone } })
              .then((result) => {
                this.disabled = true;
                this.time = 30;
                this.code_end();
                uni.showToast({
                  title: "发送成功",
                });
                resolve(result.data);
              })
              .catch((err) => {
                if (err.result && err.result.status == 401) {
                  // app.isLogin = false
                  resolve(null);
                } else {
                  reject(err);
                }
              });
          });
        }
      }
    },
    // 获取当前用户信息
			getUserInfo() {
				const app = this
				return new Promise((resolve, reject) => {
				UserApi.info()
					.then(result => {
					app.userInfo = result.data.userInfo
					this.form.phone = app.userInfo.mobile;
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
			  getCode2(){
			  	var myreg = /^1[3-9]\d{9}$/;
			  	if(this.time2==0){
			  	if(this.form.new_phone==''){
			  		uni.showToast({
			  			icon:'none',
			  			title:'手机不能为空'
			  		})
			  	}else if(!myreg.test(this.form.new_phone)){
			  		uni.showToast({
			  			icon:'none',
			  			title:'手机号格式不对'
			  		})
			  	}else {
			  		return new Promise((resolve, reject) => {
			  		  ShopApi.code({form:{mobile:this.form.new_phone}})
			  			.then(result => {
			  				this.disabled2 = true;
			  				this.time2 = 30;
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
			    code_end2(send_btn){
			  		
			  		if(this.time2 == 0){
			  			this.disabled2 = false;	
			  			
			  			this.time2 = 0;
			  		}else {
			  						
			  				this.time2--;
			  				setTimeout(()=> {
			  				  
			  					this.code_end2()
			  				}, 1000)
			  		}
			    },
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.type = options.type;
    
    
    if(options.type=='phone'){
      uni.setNavigationBarTitle({
				　　title:'修改手机'
				})
      this.form = {
					code: '',
					mobile: '',
					new_code: '',
					new_phone: '',
      };
      // 会员信息
      this.rules =  {
					code: [
						{
							required: true,
							message: '请输入旧手机验证码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					
					// 字段名称

					new_phone: [
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
					new_code: [
						{
							required: true,
							message: '请输入新手机验证码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					
      };

      this.getUserInfo()
    }else {
      this.getUserInfo()
    }
    

    
    
},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    console.log(this.rules);
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
.editpass {
  padding: 20rpx;
  box-sizing: border-box;
}
</style>
