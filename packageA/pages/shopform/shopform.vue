<template>
  <view class="wrap">
    <view>
      <u-form :model="form" ref="uForm" :label-width="180">
        <view class="b-f p-30 mb-20">
          <u-form-item label="商家名称" prop="shop_name" required>
            <u-input v-model="form.shop_name" />
          </u-form-item>

          <u-form-item
            label="商家UID"
            v-show="form.type == 2"
            prop="user_id"
            required
          >
            <u-input v-model="form.user_id" />
          </u-form-item>

          <u-form-item label="地区" prop="cascader" required>
            <select-region v-model="form.cascader" />
          </u-form-item>
          <u-form-item label="详细地址" prop="address" required>
            <u-input v-model="form.address" />
          </u-form-item>
          <u-form-item label="店铺定位" required>
            <view class="wraplat">
              {{ form.lat2 == "" ? "请点击获取定位" : "获取成功" }}
            </view>

            <view slot="right">
              <u-button size="mini" @click="getGps">获取定位</u-button>
            </view>
          </u-form-item>
        </view>

        <view class="b-f p-30 mb-20">
          <u-form-item label="开店时间" required>
            <view>
              <u-input v-model="form.start_time" />
            </view>

            <view slot="right">
              <view @click="show = true"
                >请选择 <u-icon name="arrow-right"></u-icon
              ></view>
            </view>

            <u-picker
              mode="time"
              v-model="show"
              :default-time="dafaultSTime"
              :params="params"
              @confirm="confirmtime"
            ></u-picker>
            <u-picker
              mode="time"
              v-model="shows"
              :params="params"
              @confirm="confirmendtime"
            ></u-picker>
          </u-form-item>

          <u-form-item label="关店时间" required>
            <view>
              <u-input v-model="form.end_time" />
            </view>

            <view slot="right">
              <view @click="shows = true"
                >请选择 <u-icon name="arrow-right"></u-icon>
              </view>
            </view>
          </u-form-item>
        </view>

        <view class="b-f p-30 mb-20">
          <u-form-item label="店铺折扣" >
            <view
              :class="{ actives: idx == 0 }"
              class="tag-item"
              @click="
                idx = 0;
                form.discount = 1;
              "
              >8.8折</view
            >
            <view
              :class="{ actives: idx == 1 }"
              class="tag-item"
              @click="
                idx = 1;
                form.discount = 2;
              "
              >9.5折</view
            >
          </u-form-item>
        </view>

        <view class="b-f p-30 mb-20">
          <u-form-item label="店铺图片" required>
            <!-- 图片列表 -->
            <u-upload
              ref="uUpload"
              @on-remove="onremove"
              :max-count="1"
              :file-list="fileList1"
              :auto-upload="false"
            >
              <!-- <view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
          <image
            src="https://pic.tralife.cn/10001/20210524/e320c10a7d74abb7eccae2594c75372d.png"
            mode=""
            class="imgs"
          />
          <p>上传图片</p>
        </view> -->
            </u-upload>
          </u-form-item>
          <u-form-item label="店铺场景图片" required>
            <u-upload
              ref="uUploads"
              @on-remove="onremove2"
              :auto-upload="false"
              :file-list="fileList2"
              :before-upload="beforeUploadLogo"
            ></u-upload>
          </u-form-item>
          <u-form-item label="店铺营业执照" required>
            <u-upload
              ref="uUploadShop"
              @on-remove="onremove3"
              :max-count="1"
              :file-list="fileList3"
              :auto-upload="false"
              :before-upload="beforeUploadLogo"
            ></u-upload>
          </u-form-item>
        </view>

        <view class="b-f p-30 mb-20">
          <u-form-item label="客服电话" prop="phone" required>
            <u-input v-model="form.phone" />
          </u-form-item>
          <u-form-item label="商家联系人">
            <u-input v-model="form.link_name" />
          </u-form-item>
          <u-form-item label="商家联系电话" prop="mobile" required>
            <u-input v-model="form.mobile" />
          </u-form-item>
          <u-form-item label="验证码" prop="code" required>
            <u-input v-model="form.code" />
            <u-button
              slot="right"
              :disabled="disabled"
              size="mini"
              @click="getCode"
              >获取验证码</u-button
            >
          </u-form-item>
          <u-form-item label="商铺联系人身份证正面">
            <!-- 图片列表 -->
            <u-upload
              ref="uUploadpos"
              width="500"
              :max-count="1"
              :file-list="fileList4"
              @on-remove="onremove4"
              :auto-upload="false"
              :before-upload="beforeUpload"
            ></u-upload>
          </u-form-item>
          <u-form-item label="商铺联系人身份证反面">
            <!-- 图片列表 -->
            <u-upload
              ref="uUploadant"
              width="500"
              :max-count="1"
              :file-list="fileList5"
              @on-remove="onremove5"
              :auto-upload="false"
              :before-upload="beforeUpload"
            ></u-upload>
          </u-form-item>
          <u-form-item label="备注">
            <u-input v-model="form.describe" />
          </u-form-item>
        </view>
      </u-form>

      <!-- 用户协议 -->
      <view class="p-30 b-f">
        <u-checkbox-group>
          <u-checkbox v-model="checked" size="24" active-color="#2979ff"
            >我已阅读并同意
            <text class="b-fz" @click="paymentUnit('user')"
              >《指定合作商家协议》</text
            ></u-checkbox
          >
        </u-checkbox-group>
      </view>

      <view class="p-30 b-f">
        <u-button @click="submit" type="primary">发送申请</u-button>
      </view>

      <view class="shopdesc">
        <h3>入驻指南</h3>
      </view>
      <view class="shopstep">
        <u-steps :list="numList" :current="3"></u-steps>
      </view>
      <view>
        <u-tabs-swiper
          ref="uTabs"
          :list="list"
          :current="current"
          @change="tabsChange"
          :is-scroll="false"
          swiperWidth="750"
        ></u-tabs-swiper>
      </view>
      <swiper
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <scroll-view
            scroll-y
            style="height: 800rpx; width: 100%"
            @scrolltolower="onreachBottom"
          >
            <view v-html="item.content"></view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 成功提示 -->
    <u-modal
      v-model="showmodel"
      :show-title="false"
      confirm-text="好的"
      confirm-color="#FF903F"
      @confirm="confirm"
    >
      <view class="slot-content">
        <image
          src="http://pic.tralife.cn/10001/20210423/0ab7b14e16824c77dd0e060ead2dd484.png"
          mode="aspectFit"
        />
        <text>申请已提交</text>
        <text>入驻申请审核需3个工作日</text>
      </view>
    </u-modal>
  </view>
</template>

<script>
import SelectRegion from "@/components/select-region/select-region";
import * as ShopApi from "@/api/shop";
import * as UploadApi from "@/api/upload";
export default {
  data() {
    return {
      form: {
        shop_name: "",
        link_name: "",
        mobile: "",
        phone: "",
        code: "",
        address: "",
        describe: "",
        file2: [],
        cascader: [],
        start_time: "00:00:00",
        end_time: "00:00:00",
        lat2: "",
        lng2: "",
        imageList: [],
        shop_images: [],
        file_images: [],
        card1: [],
        card2: [],
        logo_image_id: "",
        license: "",
        id_card_1: "",
        id_card_2: "",
        type: 1,
        discount: 1,
        shop_type: 1,
        user_id: "",
      },
      // 非真实地址
      dafaultSTime: "", // 默认开始时间
      dafaultETime: "", // 默认结束时间
      time: 0,
      disabled: false,
      fileList: [],
      rules: {
        shop_name: [
          {
            required: true,
            message: "请输入商家名称",
            // 可以单个或者同时写两个触发验证方式
            trigger: "blur,change",
          },
        ],
        // 字段名称
        mobile: [
          {
            required: true,
            message: "请输入商家手机号",
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
        address: [
          {
            required: true,
            message: "请输入详细地址",
            // 可以单个或者同时写两个触发验证方式
            trigger: "blur,change",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            // 可以单个或者同时写两个触发验证方式
            trigger: "blur,change",
          },
        ],
        cascader: [
          {
            required: true,
            message: "请选择省市区",
            trigger: ["blur", "change"],
            type: "array",
          },
        ],
      },
      numList: [
        {
          name: "信息提交",
        },
        {
          name: "审核资质",
        },
        {
          name: "店铺开通",
        },
      ],

      list: [
        {
          name: "招商方向",
          content:
            "餐饮美食，健康养生，教育培训，丽人医美，汽车服务，休闲娱乐，婚庆摄影，商超生鲜，旅游住宿，亲子乐园等类别商家。",
        },
        {
          name: "招商说明",
          content:
            "<p>需有提供资料如下：</p> <p>1.店铺名字 </p> <p>2.店铺经营地址 </p> <p>3.店铺营业时间 </p> <p>4.店铺联系人和联系电话</p> <p>5.一到三款爆款（套餐名字+价位+图片+详情介绍）</p>",
        },
        {
          name: "资质要求",
          content:
            "商家要有基本的营业执照（餐饮业需要有对应的食品流通许可证，健康证等）",
        },
        {
          name: "资费标准",
          content: `<p>目前为免费邀约入驻</p>`,
        },
      ],
      // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      idx: 0,
      // 开店时间
      params: {
        year: false,
        month: false,
        day: false,
        hour: true,
        minute: true,
        second: true,
      },
      show: false,
      shows: false,
      showmodel: false, // 申请成功弹窗
      checked: false, // 同意协议单选
      shop_type: 1,
      shop_apply_id: "", // 编辑店铺id
      fileList1: [], // 1
      fileList2: [],
      fileList3: [], // 1
      fileList4: [],
      fileList5: [],
    };
  },
  components: {
    SelectRegion,
  },
  watch: {
    fileList1(val) {
      console.log(val);
    },
  },
  methods: {
    // 入驻申请
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          if (this.checked) {
            // 店铺详情
            this.form.imageList =
              this.$refs.uUpload.lists.length > 0
                ? [this.$refs.uUpload.lists[0].file]
                : false;
            this.form.file_images = this.$refs.uUploadShop.lists[0].file
              ? [this.$refs.uUploadShop.lists[0].file]
              : false;
            if (this.$refs.uUploadpos.lists.length > 0) {
              this.form.card1 = this.$refs.uUploadpos.lists[0].file
                ? [this.$refs.uUploadpos.lists[0].file]
                : false;
            } else {
              this.form.card1 = false;
            }

            if (this.$refs.uUploadant.lists.length > 0) {
              this.form.card2 = this.$refs.uUploadant.lists[0].file
                ? [this.$refs.uUploadant.lists[0].file]
                : false;
            } else {
              this.form.card2 = false;
            }

            if (this.$refs.uUploads.lists.length > 0) {
              const arr = [];
              this.$refs.uUploads.lists.map((i) => {
                if (i.file) arr.push(i.file);
              });

              this.form.file2 = arr;
            }

            // console.log(this.form.imageList, this.form.file_images, this.form.card1, this.form.card2, this.form.file2);
            if (this.shop_apply_id != "") {
              this.check();
            } else {
              this.subForm();
            }
          } else {
            this.$toast("请勾选商家入驻协议");
          }
        } else {
          console.log("验证失败");
        }
      });
    },
    // 筛选
    async check() {
      var res = "1";
      if (this.form.imageList && this.form.logo_image_id == "") {
        res = await this.uploadFile();
      }

      if (this.form.file2.length != 0) {
        if (res) res = await this.uploadFile2();
      } else {
        this.form.shop_images = this.form.shop_images.map((i) => {
          return i.file_id;
        });
      }

      if (this.form.file_images && this.form.license == "") {
        if (res) res = await this.uploadFile3();
      }
      if (this.form.card1 && this.form.id_card_1 == "") {
        if (res) res = await this.uploadFile4();
      }
      if (this.form.card2 && this.form.id_card_2 == "") {
        if (res)
          this.uploadFile5().then(() => {
            const app = this;
            return new Promise((resolve, reject) => {
              ShopApi.editForm(app.form)
                .then((result) => {
                  app.showmodel = true;

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
          });
      } else {
        const app = this;
        return new Promise((resolve, reject) => {
          ShopApi.editForm(app.form)
            .then((result) => {
              app.showmodel = true;

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
    },
    async subForm() {
      var res = "1";
      if (this.form.imageList && this.form.logo_image_id == "") {
        res = await this.uploadFile();
      }

      if (this.form.file2.length != 0 && this.form.shop_images.length == 0) {
        if (res) res = await this.uploadFile2();
      }
      // else {
      //   this.form.shop_images = this.form.shop_images.map((i) => {
      // 	  return i.file_id
      //   })
      // }

      if (this.form.file_images && this.form.license == "") {
        if (res) res = await this.uploadFile3();
      }
      if (this.form.card1 && this.form.id_card_1 == "") {
        if (res) res = await this.uploadFile4();
      }
      if (this.form.card2 && this.form.id_card_2 == "") {
        if (res)
          this.uploadFile5().then(() => {
            const app = this;
            return new Promise((resolve, reject) => {
              ShopApi.form(app.form)
                .then((result) => {
                  app.showmodel = true;

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
      } else {
        const app = this;
        return new Promise((resolve, reject) => {
          ShopApi.form(app.form)
            .then((result) => {
              app.showmodel = true;

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
      }
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
    onreachBottom() {},
    getCode() {
      var myreg = /^1[3-9]\d{9}$/;
      if (this.form.mobile == "") {
        uni.showToast({
          icon: "none",
          title: "手机不能为空",
        });
      } else if (!myreg.test(this.form.mobile)) {
        uni.showToast({
          icon: "none",
          title: "手机号格式不对",
        });
      } else {
        return new Promise((resolve, reject) => {
          ShopApi.code({ form: { mobile: this.form.mobile } })
            .then((result) => {
              this.disabled = true;
              this.time = 30;
              this.code_end();
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
    // 时间
    confirmtime(e) {
      this.form.start_time = e.hour + ":" + e.minute + ":" + e.second;
    },
    // 获取本地存储定位
    getGps() {
      uni.getStorage({
        key: "gps",
        success: ({ data }) => {
          this.form.lat2 = data.lat;
          this.form.lng2 = data.lng;
        },
        fail: (error) => {},
      });
    },
    // 上传图片
    uploadFile() {
      const app = this;
      var { form } = app;
      // 整理上传文件路径
      const files = [];
      form = [form];

      form.forEach((item, index) => {
        if (item.imageList.length) {
          const images = item.imageList.map((image) => image);

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
                  app.form.logo_image_id = fileIds[0];
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
    uploadFile2() {
      const app = this;
      var { form } = app;
      // 整理上传文件路径
      const files = [];
      form = [form];

      form.forEach((item, index) => {
        if (item.file2.length) {
          const images = item.file2.map((image) => image);

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
                  app.form.shop_images = [...app.form.shop_images, ...fileIds];
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
    // 商铺执照
    uploadFile3() {
      const app = this;
      var { form } = app;
      // 整理上传文件路径
      const files = [];
      form = [form];

      form.forEach((item, index) => {
        if (item.file_images.length) {
          const images = item.file_images.map((image) => image);

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
                  app.form.license = fileIds[0];
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
    // 身份证正面
    uploadFile4() {
      const app = this;
      var { form } = app;
      // 整理上传文件路径
      const files = [];
      form = [form];

      form.forEach((item, index) => {
        if (item.card1.length) {
          const images = item.card1.map((image) => image);

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
                  app.form.id_card_1 = fileIds[0];
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
    // 身份证反面
    uploadFile5() {
      const app = this;
      var { form } = app;
      // 整理上传文件路径
      const files = [];
      form = [form];

      form.forEach((item, index) => {
        if (item.card2.length) {
          const images = item.card2.map((image) => image);

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
                  app.form.id_card_2 = fileIds[0];
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
    confirmendtime(e) {
      this.form.end_time = e.hour + ":" + e.minute + ":" + e.second;
    },
    // 商铺审核未通过编辑
    getShopInfo() {
      return new Promise((resolve, reject) => {
        ShopApi.formInfo({ shop_apply_id: this.shop_apply_id })
          .then((result) => {
            const { res } = result.data;
            this.fileList1 = [
              { url: res.shop_url, logo_image_id: res.logo_image_id },
            ]; // 商铺图片
            res.license1.url = res.license1.preview_url;
            this.fileList3 = [res.license1]; // 商铺资格证书图片
            res.idcardurl1.url = res.idcardurl1.preview_url;
            res.idcardurl2.url = res.idcardurl2.preview_url;
            this.fileList4 = [res.idcardurl1]; // 身份证正面图片
            this.fileList5 = [res.idcardurl2]; // 身份证反面图片
            var args = res.shop_images.map((i) => {
              return { url: i.preview_url, file_id: i.file_id };
            });

            this.fileList2 = args;
            res.code = "";
            res.file2 = [];
            this.form = res;
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
    },
    onremove(i, lists, name) {
      this.form.logo_image_id = "";
    },
    onremove2(i, lists, name) {
      let arr = [];
      this.form.shop_images.map((i) => {
        lists.map((v) => {
          if (v.url == i.preview_url) arr.push(i.file_id);
        });
      });

      this.form.shop_images = arr;
    },
    onremove3(i, lists, name) {
      this.form.license = "";
    },
    onremove4(i, lists, name) {
      this.form.id_card_1 = "";
    },
    onremove5(i, lists, name) {
      this.form.id_card_2 = "";
    },
    paymentUnit() {
      this.$navTo("packageA/pages/merchAgreement/merchAgreement");
    },
    confirm() {
      setTimeout(() => {
        uni.navigateBack({
          delta: 0,
        });
      }, 1500);
    },
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.dafaultSTime = "2025-07-02 13:01:00";
    this.dafaultETime = "2025-07-02 13:01:00";
    this.$refs.uForm.setRules(this.rules);
  },
  onLoad(options) {
    if (options.type) {
      this.form.type = options.type;
    }
    if (options.iid) {
      this.shop_apply_id = options.iid;
      this.getShopInfo();
    }
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20rpx 0;
  box-sizing: border-box;
  .shopdesc {
    background-color: #f5f5f5;
    width: 100%;
    padding: 40rpx 0 40rpx 0;
    text-align: center;
    letter-spacing: 6rpx;
  }
  .adduser {
    margin-top: 30rpx;
  }
  .shopstep {
    padding-top: 40rpx;
    margin-bottom: 40rpx;
  }
}

.tag-item {
  padding: 10rpx 25rpx;
  box-sizing: border-box;
  background: #fff;
}
.actives {
  background: #2979ff;
  color: #fff;
}

.wraplat {
}

.imgs {
  width: 52rpx;
  height: 40rpx;
}
.slot-btn {
  width: 170rpx;
  height: 170rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: rgb(244, 245, 246);
  border-radius: 10rpx;
  color: #999997;
}

.b-fz {
  color: #2979ff;
}

.slot-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50rpx;
  text {
    &:nth-of-type(1) {
      margin: 24rpx 0 49rpx 0;
      font-size: 34rpx;
      font-family: PingFang SC;
      font-weight: 700;
      color: #333333;
      line-height: 48rpx;
      letter-spacing: 3rpx;
    }
  }

  image {
    width: 100rpx;
    height: 100rpx;
    margin-top: 50rpx;
  }
}
</style>
