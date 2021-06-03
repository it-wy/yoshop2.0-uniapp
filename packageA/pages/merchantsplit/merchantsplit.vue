<template>
  <view class="wrap">
    <u-form :model="form" ref="uForm" :label-width="180">
      <view class="b-f p-30 mb-20">
        <u-form-item label="店铺门头图片" required>
          <u-upload
            ref="uUploads"
            @on-remove="onRemove1"
            :auto-upload="false"
            @on-choose-complete="selectimg1"
          ></u-upload>
        </u-form-item>
        <u-form-item label="店铺门脸" required>
          <u-upload
            ref="uUploadShop"
            @on-remove="onRemove2"
            :max-count="1"
            :auto-upload="false"
            @on-choose-complete="selectimg2"
          ></u-upload>
        </u-form-item>
        <u-form-item label="商铺联系人身份证正面">
          <!-- 图片列表 -->
          <u-upload
            ref="uUploadpos"
            width="500"
            :max-count="1"
            @on-remove="onRemove3"
            @on-choose-complete="selectimg3"
            :auto-upload="false"
          ></u-upload>
        </u-form-item>
      </view>
    </u-form>

    <view class="p-30 b-f">
      <u-button @click="submit" type="primary">发送申请</u-button>
    </view>
  </view>
</template>

<script>
import * as ShopApi from "@/api/shop";
import * as UploadApi from "@/api/upload";
export default {
  components: {},
  data() {
    return {
      form: {
        shop_img1: [],
        shop_img2: [],
        shop_img3: [],
        shop_hard: [], // 门头
        shop_face: [], // 门脸
        acnt_certif_1: [],
      },
      rules: {},
    };
  },
  watch: {},
  methods: {
    onRemove1() {},
    onRemove2() {},
    // 提交到后端
    submit() {
      const app = this;
      if (app.form.shop_img1.length == 0) {
        app.$toast("请上传门头");
      } else if (app.form.shop_img2.length == 0) {
        app.$toast("请上传门脸");
      } else if (app.form.shop_img3.length == 0) {
        app.$toast("请上传商铺联系人身份证正面");
      } else {
        app.check();
      }
    },
    selectimg1(list, name) {
      this.form.shop_img1 = [list[0].file];
    },
    selectimg2(list, name) {
      this.form.shop_img2 = [list[0].file];
    },
    selectimg3(list, name) {
      this.form.shop_img3 = [list[0].file];
    },
    async check() {
      var res = "1";
      
        res = await this.uploadFile('shop_img1','shop_hard');
      
        if (res) res = await this.uploadFile('shop_img2','shop_face');
     
        if (res)
          this.uploadFile('shop_img3','acnt_certif_1').then(() => {
            const app = this;
            return new Promise((resolve, reject) => {
              ShopApi.record(app.form)
                .then((result) => {
                  

                  resolve(result.data);
                })
                .catch((err) => {
                  if (err.result && err.result.status == 401) {
                    resolve(null);
                  } else {
                    reject(err);
                  }
                });
            });
          });
    },
	// 上传图片
    uploadFile(k, v) {
      const app = this;
      var { form } = app;
      // 整理上传文件路径
      const files = [];
      form = [form];

      form.forEach((item, index) => {
        if (item[k].length) {
          const images = item[k].map((image) => image);

          files.push({ formDataIndex: index, images });
        }
      });

      // 批量上传
      return new Promise((resolve, reject) => {
        Promise.all(
          files.map((file, index) => {
            return new Promise((resolve, reject) => {
              UploadApi.image(file.images)
                .then((fileIds) => {
                  app.form[v] = fileIds[0];
                  resolve(fileIds);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          })
        ).then(resolve, reject);
      });
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style></style>
