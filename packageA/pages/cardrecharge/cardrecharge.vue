<template>
  <view class="container">
    <u-form :model="form" ref="uForm" :label-width="180">
        <view class="b-f p-30 mb-20">
          <u-form-item label="卡号" prop="account" required>
            <u-input v-model="form.account" />
          </u-form-item>
          <u-form-item label="密码" prop="password" required>
            <u-input v-model="form.password" type="password" />
          </u-form-item>
        </view>
    </u-form>
    <view class="p-30 b-f">
        <u-button @click="submit" type="primary">提交</u-button>
    </view>    
  </view>
</template>

<script>
import * as UserApi from '@/api/user'
export default {
  data() {
    return {
      form: {
        account: '',
        password: '',
      },
       rules: {
        account: [
          {
            required: true,
            message: "请输入卡号",
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
       }  
    }
  },
  methods: {
    // 提交
    submit(){
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          const app = this;
          return new Promise((resolve, reject) => {
            UserApi.interRecharge(app.form)
            .then(res => {
              app.$toast(res.message)
              setTimeout(() => {
                 uni.navigateBack({ delta: 1 })
              },1000)
             
              resolve(res)
            })
            .catch(err=>{
              reject(err)
            })
          })
        }
      })    
    }
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
};
</script>

<style lang="scss" scoped></style>
