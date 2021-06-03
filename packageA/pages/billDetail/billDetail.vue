<template>
  <view class="container">
    <view class="wrap">
      <view class="pay-img">
        <image
          :src="config.img"
          mode="widthFix"
        />
      </view>
      <text class="pay-txt">缴费金额</text>
      <view class="pay-price">
        50.00
        <text>元</text>
      </view>

      <view class="deduct-points point">
        <text>扣除积分</text>
        <text>-500积分</text>
      </view>

      <view class="current-points point">
        <text>当前积分</text>
        <text>9999积分</text>
      </view>
    </view>
    <view class="btn">
      立即缴费
    </view>
    <view class="pay-record ">
      缴费记录
    </view>

    <!-- 成功提示 -->
    <u-modal v-model="show" :show-title="false" confirm-text="知道了" confirm-color="#FF903F" @confirm="confirm">
      <view  class="slot-content">
        <image
          src="http://pic.tralife.cn/10001/20210423/0ab7b14e16824c77dd0e060ead2dd484.png"
          mode="aspectFit"
        />
        <text>充值成功</text>
        <text>订单将在24小时内到账</text>
      </view>

    </u-modal>
  </view>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      config: {
        title: "",
        img: ''
      }
    }
  },
  methods: {
    confirm(){
      this.show = false;
    }
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    switch (options.type) {
      case '水费':
        this.config.title = '水费'
        this.config.img = 'https://pic.tralife.cn/10001/20210512/31101860991231b9a9c00324e3c44533.png'
        break;
      case '电费':
        this.config.title = '电费'
        this.config.img = 'https://pic.tralife.cn/10001/20210512/8abd1f9fc7424a09399ca286b4a0c434.png'
        break;
      case '宽带':
        this.config.title = '宽带'
        this.config.img = 'https://pic.tralife.cn/10001/20210512/b5c4c25577d76f5ddba11967a33ea6c6.png'
        break;
      case '流量':
        this.config.title = '流量'
        this.config.img = 'https://pic.tralife.cn/10001/20210512/f0c86dcbcda812d88c063218bbfb3cdf.png'
        break;         
    
      default:
        break;
    }

    
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
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
.container {
  padding: 30rpx;
  box-sizing: border-box;
  .wrap {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8rpx;
    display:flex;
    align-items: center;
    flex-direction: column;
    padding: 30rpx 61rpx 80rpx 61rpx;
    box-sizing: border-box;
    .pay-img {
      width: 108rpx;
      image{
        width: 100%;
      }
    }
    .pay-txt {
      margin-top: 20rpx;
      margin-bottom: 32rpx;
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .pay-price {
      width: 100%;
      text-align: center;
      font-size: 88rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333;
      border-bottom: 1rpx solid #F2F2F2;
      padding-bottom: 47rpx;
      margin-bottom: 79rpx;
      text {
        margin-left: 10rpx;
        font-size: 32rpx;
      }
    }
    .point{
      width: 100%;
      display:flex;
      justify-content:flex-start;
      
      text {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333;
        &:first-child{
          
          margin-right: 87rpx;
          color: #999999;
        }
      }
    }
  }

  .btn {
    margin-top: 47rpx;
    width: 100%;
    background: #FF903F;
    border-radius: 8rpx;
    padding: 32rpx;
    box-sizing: border-box;
    color: #fff;
    text-align:center;
    font-size: 34rpx;
    font-family: PingFang SC;
    font-weight: 400;
  }

  .pay-record {
    text-align: center;
    margin-top: 58rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
  }
}

.slot-content {
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
  margin-bottom: 50rpx;
  text {
    &:nth-of-type(1){
      margin: 24rpx 0  49rpx 0 ;
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

.deduct-points {

        margin-bottom: 68rpx;
      
}
</style>
