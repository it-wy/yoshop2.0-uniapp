<template>
  <!-- 申请店铺入驻记录 -->
  <view class="container">

  
    <view class="store-record b-f" v-if="shopFormList.length>0" v-for="(item,i) in shopFormList" :key="i">
      <image
        :src="item.shop_url"
        mode="widthFix"
      />
      <view class="store-r">
        <text>{{item.shop_name}}</text>
        <text class="grey-txt">{{item.create_time}}</text>
      </view>
      
      <view class="store-r">
        <text class="d-fz" :class="{green_txt: item.examine_status==2}">{{item.examine_status==0?'待审核':item.examine_status==1?'未通过'+'('+item.reason+')':'已通过'}}</text>
        
      </view>
      <u-button size="mini" type="primary" v-show="item.examine_status==1" @click="editShop(item.shop_apply_id)">编辑</u-button>
      <view class="wrap-r" v-show="item.examine_status!=1">
      </view>
    </view>
    <view class="empty-data" v-if="shopFormList.length==0">
      
      <u-empty text="暂无任何申请记录" mode="list"></u-empty>
    </view>
  </view>
</template>

<script>
import * as ShopApi from '@/api/shop'
export default {
  components: {},
  data() {
    return {
      shopFormList: [],
      page: 1, // 页码
      isMore: true,
    }
  },
  methods: {
      // 获取入驻记录
    getShopFormList(){
      if(this.isMore) {
      return new Promise((resolve, reject) => {
        ShopApi.shopForm({page:this.page})
        .then(result => {
          this.isMore = result.data.list.current_page == result.data.list.last_page?false:true;
          
          this.shopFormList = [...this.shopFormList, ...result.data.list.data]
          
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
      }else {
        uni.showToast({
						icon:'none',
						title:'没有更多了'
        })
      }
    },

    // 门店编辑
    editShop(i){
      this.$navTo('packageA/pages/shopform/shopform',{iid: i})
    }
  },


  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.page = 1;
    this.isMore = true;
    this.shopFormList = [],
    this.getShopFormList();
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    this.page++;
    this.getShopFormList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx 24rpx;
  box-sizing: border-box;
}
.empty-data {
    margin-top: 25rpx;
    width: 100%;
    text-align: center;
  }

  .store-record {
    width: 100%;
    padding: 32rpx 23rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #f5f5f5;
    display: flex;
    align-items: center;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    image {
      margin-right: 20rpx;
      width: 68rpx;
    }
    .store-r {
      display: flex;
      flex-direction: column;
      justify-content:center;
      margin-right: 10rpx;
    }
    .wrap-r{
      width: 82rpx;
      height: 42rpx;
    }
    text {
      &:nth-of-type(1){
        
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

.grey-txt {color:#999;}

.crimson-txt {color:#FC503C;}

.green_txt {color:#54C68B !important;}
</style>
