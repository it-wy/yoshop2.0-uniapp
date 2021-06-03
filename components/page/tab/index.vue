<template>
  <view>
    <view v-show="islife">
      <u-notice-bar
        mode="vertical"
        :list="list"
        :more-icon="true"
        @click="getOne"
        @getMore="onShopForm"
      ></u-notice-bar>
    </view>
    <view class="container" :class="{posic: top,tabfixed:isfixed}" ref="tabbar">
      <view
        class="c-item"
        v-for="(item, i) in tabs"
        :class="{ active_tab: i == idx }"
        :key="i"
        @click="onTab(i)"
      >
        {{ item.name }}
      </view>
    </view>
    <!-- 优选 -->
    <view class="card" v-show="idx == 0 && !islife">
      <Goods :itemStyle="itemStyle" :params="params" :dataList="dataList" />
    </view>
    <!-- 生活 -->
    <view class="life" v-show="idx == 1 && !islife">
      <div
        class="l-item"
        v-for="(item, i) in shoplist"
        :key="i"
        @click="onShopDesc(item)"
      >
        <div class="l-img">
          <div>
            <image :src="item.shop_url" mode="aspectFit"></image>
          </div>
        </div>
        <div class="l-desc">
          <p class="l-title">{{ item.shop_name }}</p>
          <div class="l-price">
            营业时间
            <text>
              {{ item.start_time.substr(0, 5) }}--{{
                item.end_time.substr(0, 5)
              }}</text
            >
          </div>
        </div>
      </div>
    </view>
    <!-- 夺宝 -->
    <view class="indiana" v-show="idx == 10 && !islife">
      <div class="in-item">
        <div class="in-image">
          <image src="../../../static/empty-02.png" mode="aspectFit"></image>
        </div>
        <div class="in-info">
          <text>话费夺宝</text>
        </div>
      </div>
      <div class="in-item">
        <div class="in-image">
          <image src="../../../static/empty-02.png" mode="aspectFit"></image>
        </div>
        <div class="in-info">
          <text>话费夺宝</text>
        </div>
      </div>

      <div class="in-item">
        <div class="in-image">
          <image src="../../../static/empty-02.png" mode="aspectFit"></image>
        </div>
        <div class="in-info">
          <text>话费夺宝</text>
        </div>
      </div>

      <div class="in-item">
        <div class="in-image">
          <image src="../../../static/empty-02.png" mode="aspectFit"></image>
        </div>
        <div class="in-info">
          <text>话费夺宝</text>
        </div>
      </div>
    </view>
    <!-- 悬浮地图按钮 -->
    <view class="map-btn" v-if="islife" @click="targetmap">
      <image
        src="/static/map-btn.png"
        mode="widthFix"
      />
    </view>
    <!-- 本地生活 -->

    <Lifes v-if="islife" :shoplist="shoplist" />
  </view>
</template>

<script>
import Goods from "../goods";
import * as ShopApi from "@/api/shop";
import Lifes from "../lifes/lifes.vue";
import formatLocation from "../../../js_sdk/jweixin.js";
export default {
  data() {
    return {
      idx: 0,
      tabs: [
        {
          name: "优选",
        },
        {
          name: "生活",
        },
        {
          name: "夺宝",
        },
      ],
      //本地
      lifes: [
        {
          name: "推荐",
        },
        {
          name: "新入",
        },
        {
          name: "附近",
        },
      ],
      // 滾動
      list: [],
      // 页码
      form: {
        page: 1,
        type: 0,
        type_id: 0,
        status: 1,
        lat: "",
        lng: "",
      },
      // 定位
      title: "getLocation",
      hasLocation: false,
      location: {},
      type: "",
      address: [],
      // 店铺数据
      shoplist: [],
      isMore: true,
      curRoutes: "",
      // 是否开启
      isopen: "0",
      // 距离顶部
      top: false
    };
  },
  components: {
    Goods,
    Lifes,
  },
  props: {
    itemStyle: Object,
    params: Object,
    dataList: Array,
    islife: Boolean,
    isfixed: Boolean,
    scrolltop: Number
  },
  methods: {
    // 点击切换
    onTab(i) {
      const app = this;
      
      

      app.idx = i;
      if (app.curRoutes == "pages/index/index" && i == 2) {
        app.idx = 0;
      }
      var current = app.curRoutes;
      if (app.curRoutes == "pages/index/index" && app.idx == 1) {
        uni.$on("onReachBottom", (current) => {
          let routes = getCurrentPages(); // 获取当前打开过的页面路由数组

          if (routes.length == 1 && app.idx == 1) {
            app.form.page++;
            app.getShopList();
          }
        });
      }

      app.form.page = 1;
      app.isMore = true;
     

      // 如果本地生活则执行
      if (app.islife) {
        switch (i) {
          case 0:
            app.form.status = 1;
            break;
          case 1:
            app.form.status = 2;

            break;
          case 2:
            app.form.status = 3;

            break;

          default:
            break;
        }
        app.getShopList();

        
      }
    },
    // 获取店铺
    getShopList() {
      const app = this;
      
      if (app.isMore) {
        return new Promise((resolve, reject) => {
          ShopApi.list(app.form)
            .then((result) => {
               if (app.islife && app.form.page == 1) {
                app.shoplist = [];
              }
              app.isMore =
                result.data.result.current_page == result.data.result.last_page
                  ? false
                  : true;
              if (app.form.page != 1) {
                if (result.data.result.data.length > 0) {
                  app.shoplist = app.shoplist.concat(result.data.result.data);

                  app.isopen = result.data.result.button_open;
                }
              } else {
                app.shoplist = app.shoplist.concat(result.data.result.data);
                app.isopen = result.data.result.button_open;
                app.shoplist.map((i) => {
                  app.list.push(i.shop_name + "-加入成功");
                });
              }

              

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
      } else {
        uni.showToast({
          icon: "none",
          title: "没有更多了",
        });
      }
    },
    // 经纬度转地址
    getShopGps() {
      const app = this;
      // console.log(app.form)
      return new Promise((resolve, reject) => {
        ShopApi.gps({ lat: app.form.lat, lng: app.form.lng })
          .then((result) => {
            app.address = [
              { label: result.data.province, value: 1 },
              { label: result.data.city, value: 2 },
              { label: result.data.district, value: 3 },
            ];
            uni.setStorage({
              key: "gps",
              data: { lat: app.form.lat, lng: app.form.lng, city: app.address },
              success: function () {
                // console.log('success');
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
    },
    // 店鋪滾動

    onShopForm() {
      if (this.isopen == "1") {
        // uni.navigateTo({
        //   url: "/packageA/pages/shopform/shopform",
        // });
      }
    },
    //
    getOne(i) {
      console.log(i);
    },
    // 跳转店铺详情页
    onShopDesc(i) {
      uni.navigateTo({
        url: "/packageA/pages/shopDesc/shopDesc?id=" + i.shop_id,
      });
    },
    targetmap(){
      this.$navTo('packageA/pages/nearbyStores/nearbyStores')
    }
  },
  created() {
    const app = this;
    
    // 定位
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    let curRoute = routes[routes.length - 1].route;
    this.curRoutes = curRoute;

    if (curRoute == "pages/index/index") {
      // app.getLocation()
    }

    // 判断是否本地生活
    app.tabs = !app.islife ? app.tabs : app.lifes;
	
    if (app.islife) {
      if (curRoute == "pages/custom/index") {
        uni.getStorage({
          key: "gps",
          success: (res) => {
            app.form.lat = res.data.lat;
            app.form.lng = res.data.lng;
            app.getShopList();

            uni.$on("onReachBottom", function (data) {
              if (curRoute == "pages/custom/index") {
                app.form.page++;
                app.getShopList();
              }
            });
          },
        });
      }
    } else {
      uni.getStorage({
        key: "gps",
        success: (res) => {
          app.form.lat = res.data.lat;
          app.form.lng = res.data.lng;
          app.getShopList();
          
        },
        fail: (error) => {
          app.getShopList();

        }
      });
    }

    
  },
    // 页面滚动
  onPageScroll({ scrollTop }) {
    console.log("----");
    console.log(scrollTop);
  }
}  
</script>

<style lang="scss">
.container {
  padding: 10rpx 20rpx 20rpx;
  color: white;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20rpx;
  color: #fa2209;
  .c-item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-weight: bold;
    background-image: url(https://www.tralife.cn/uploads/10001/20210408/d1b849cc48b301f3be61db9aa7fdb19f.png)
      no-repeat;
  }
  .active_tab {
    border-bottom: 4rpx solid #fa2209;
  }
}

// 距离顶部固定
.posic {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

}

.life {
  background: rgb(246, 246, 246);
  padding: 4rpx;
  display: flex;
  flex-wrap: wrap;
  .l-item {
    width: 50%;
    padding: 6rpx;
    box-sizing: border-box;
    .l-img {
      div {
        width: 100%;
        height: 358rpx;
        background-color: #fff;
        image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .l-desc {
      padding: 8rpx;
      box-sizing: border-box;
      background-color: #fff;
      .l-title {
        height: 64rpx;
        color: #484848;
        line-height: 2;
        font-size: 26rpx;
      }
      .l-price {
        display: flex;
        justify-content: space-between;
        text {
          font-size: 24rpx;
          color: #fa2209;
        }
      }
    }
  }
}

.indiana {
  display: flex;
  padding: 6rpx;
  flex-wrap: wrap;
  background: #f6f6f6;
  .in-item {
    width: 50%;
    padding: 8rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    overflow: hidden;
    .in-image {
      width: 100%;
      background-color: #fff;
      height: 240rpx;
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .in-info {
      padding: 8rpx;
      box-sizing: border-box;
      background-color: #fff;
      padding-bottom: 20rpx;
    }
  }
}

.tabfixed {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
   padding: 10rpx 20rpx 20rpx;
   width: 100%;
  color: white;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20rpx;
  color: #fa2209;
  background-color: #fff;
}

.map-btn {
  position: fixed;
  bottom: 180rpx;
  right: 40rpx;
  z-index: 99;
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
