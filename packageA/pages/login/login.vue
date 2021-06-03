<!--
 * @Author: your name
 * @Date: 2021-04-13 10:56:14
 * @LastEditTime: 2021-04-14 09:25:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \yoshop2.0-uniapp\packageA\pages\login\login.vue
-->
<template>
  <!-- #ifdef MP-WEIXIN -->
  <web-view src="https://www.tralife.cn/1.html"></web-view>
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <!-- #endif -->
</template>
<script>
import store from "@/store";
import * as UserApi from "@/api/user";
export default {
  data() {
    return {};
  },
  methods: {
    getCode() {
      const app = this;
      var code = "";
      var local = window.location.href; // 获取页面url
      var appid = "wx374b7f026d00b120";

      code = this.getUrlCode().code; // 截取code

      if (code == null || code === "") {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect&connect_redirect=1`;
        // scope=snsapi_base      静默授权,自动跳转到回调页的  特点：用户无感知；
        // scope=snsapi_userinfo  非静默授权，第一次有弹框
      } else {
        // 你自己的业务逻辑
        store
          .dispatch("MpWxH5Login", code)
          .then((result) => {
            // 显示登录成功
            app.$toast(result.message);
            // 跳转回原页面
            uni.getStorage({
              key: "res_id",
              success: ({ data }) => {
                return new Promise((resolve, reject) => {
                  UserApi.userShare({ res_id: data })
                    .then((result) => {
                      uni.removeStorageSync("res_id");
                      setTimeout(() => {
                    // 微信浏览器返回

                    window.history.go(-3);
                    // uni.switchTab({ url: '/pages/user/index' })
                    }, 2000);
                      resolve(result);
                    })
                    .catch((err) => {
                      setTimeout(() => {
                      // 微信浏览器返回

                      window.history.go(-3);
                      // uni.switchTab({ url: '/pages/user/index' })
                      }, 2000);
                      reject(err)
                    });
                });
              },
              fail: (res) => {
                // 跳转回原页面
                setTimeout(() => {
              // 微信浏览器返回

                window.history.go(-3);
                // uni.switchTab({ url: '/pages/user/index' })
                }, 2000);
              },
            });;
          })
          .catch(() => {});
      }
    },
    // 截取url中的code方法
    getUrlCode() {
      var url = location.search;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    // return window.location.href.split("#")[0].split("?")[1].split("&")[0].split("=")[1];
  },
  onLoad() {
    /* #ifdef H5 */
    this.getCode();
    /* #endif */
  },
};
</script>

<style>
</style>
