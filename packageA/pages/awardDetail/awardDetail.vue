<template>
  <view class="container"> 
    <!-- 快递配送：配送地址 -->
    <view v-if="curDelivery == DeliveryTypeEnum.EXPRESS.value" @click="onSelectAddress" class="flow-delivery">
      <view class="flow-delivery__detail dis-flex flex-y-center">
        <view class="detail-location dis-flex">
          <text class="iconfont icon-dingwei"></text>
        </view>
        <view class="detail-content flex-box">
          <block >
            <view class="detail-content__title dis-flex">
              <text class="f-30">航海大基地</text>
              <text class="detail-content__title-phone f-28">15738847085</text>
            </view>
            <view class="address detail-content__describe">
              <text class="region" >11</text>
              <text class="detail">2222</text>
            </view>
          </block>
          <block v-if="false">
            <view class="detail-content__describe dis-flex">
              <text class="col-6">请选择配送地址</text>
            </view>
          </block>
        </view>
        <view class="detail-arrow dis-flex">
          <text class="iconfont icon-xiangyoujiantou"></text>
        </view>
      </view>
    </view>
    <!-- 夺宝商品卡片 -->
    <view class="award-shop b-f p-30">
      <view class="shop-target">
        <image
          src="https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png"
          mode="scaleToFill"
        />
        <text>积分夺宝</text>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view class="shop-info d-flex-b">
        <view class="s-left">
          <image
            src="https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png"
            mode="widthFix"
          />
        </view>
        <view class="s-right">
          <view class="s-title">新款精华灵液快速包邮送到家 天枰座透真欢颜紧致精华液</view>
          <view class="d-flex-b s-num">
            <text class="d-fz">¥ 588</text>
            <text>X1</text>
          </view>
        </view>
      </view>

        
    </view>

    <view class="p-30 b-f bor-t box1">
      <view class="d-flex-b">
        <text>快递运费</text>
        <text>包邮</text>
      </view> 
      </view>

      <view class="p-30 b-f bor-t box2">
        <view class="d-flex-b">
          <text>留言</text>
          <u-input v-model="value" height="15" input-align="right" placeholder="给卖家留言"  />
          
        </view>
      </view>

    <!-- 底部按钮 -->
    
    <view class="b-btn-fix d-flex-b b-f">
      <text>恭喜中奖</text>
      
      <view class="d-btn fill">确认中奖</view>
      
      
    </view>
  </view>
</template>

<script>
import DeliveryTypeEnum from '@/common/enum/order/DeliveryType'
export default {
  components: {},
  data() {
    return {
      // 当前选中的配送方式
      curDelivery: 10,
      // 枚举类
      DeliveryTypeEnum,
      value: ''
    }
  },
  methods: {
     // 快递配送：选择收货地址
      onSelectAddress() {
        this.$navTo('pages/address/index', { from: 'checkout' })
      },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
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

<style lang="scss" scoped>
@import "@/pages/checkout/style.scss";

.award-shop {
  .shop-target {
    image {
      width: 24rpx;
      height: 24rpx;
      margin-right: 11rpx;
    }
    text {
      margin-right: 14rpx;
    }
  }

  .shop-info {
    margin-top: 30rpx;
    margin-bottom: 86rpx;
    .s-left {
      width: 140rpx;
      margin-right: 18rpx;
      image {
        width: 100%;
      }
    }
    .s-right {
      display: flex;
      flex-direction: column;
      justify-content:space-between;
      .s-title {
        font-size: 26rpx;
        line-height: 42rpx;
      }
      .s-num {
        
      }
    }
  }

  
}

.bor-t {
  
  border-top: 2rpx solid #F5F5F5;
  text {
    font-size: 28rpx;
  }
}

.b-btn-fix {
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 98rpx;
  line-height:98rpx;
  align-items: center;
  text {
    font-size: 32rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #292621;
    padding-left: 38rpx;
  }
  .fill {
    width: 270rpx !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
}
</style>
