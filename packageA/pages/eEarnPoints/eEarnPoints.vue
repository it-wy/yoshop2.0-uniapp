<template>
  <view
      class="main-header"
    >
    <nav-bar backState="1000" bgColor="#fff" type="transparentFixed" :shadow="false" transparentFixedFontColor="#fff" fontColor="#fff" :titleCenter="true">
		   <!-- <view slot="left">
		   	<u-icon name="arrow-left"></u-icon>
		   </view> -->
		    <view class="title" slot="transparentFixed">
		    	积分获取与应用
		    </view>
		</nav-bar>

    <view class="main-image">
      <view class="points-title">
        积分玩法攻略
      </view>
      
    <view class="points-raiders">
    旅享生活是一个集线上线下各种积分应用场景的惠民服
    务平台，致力于真正意义上让用户感受到积分的价值，实现
    积分直接当钱花。并通过赋能商家、厂家、将实打实的优惠
    给予用户。
    </view>

    </view>
    
    <view class="points-desc">
      <p>旅享生活积分怎么用？</p>

      <view class="points-item">
        <view class="points-steps">
          <view class="points-round">

          </view>
          <view class="verticalBar"></view>
        </view>
        
        <view class="points-legend">
          <view class="points-card">

          </view>
        </view>
       </view>

       <view class="d-btn">
         立即参与夺宝
       </view>
    </view>

  </view>  
</template>

<script>
import navBar from "@/components/zhouWei-navBar/zhouWei-navBar.vue";
export default {
  components: {navBar},
  data() {
    return {
       // 当前运行的终端 (此处并不冗余,因为微信小程序端view层无法直接读取$platform)
      $platform: this.$platform,
    }
  },
  methods: {},

  // 页面周期函数--监听页面加载
  onLoad() {  
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
.main-header{
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  .main-image {
    width: 100%;
    height: 536rpx;
    background: linear-gradient(-30deg, #FAC26C, #FF9247);
    // background:url('https://pic.tralife.cn/10001/20210513/6355880f7bc00b56910e82effd0d43db.png') no-repeat center;
    background-size: cover;
    padding: 0 49rpx;
    box-sizing: border-box;
    font-family: PingFang SC;
    color: #FFFFFF;
    .points-title {
      padding-top: 169rpx;
      font-size: 48rpx;
      font-weight: 600;
      line-height: 64rpx;
      margin-bottom: 31rpx;
      text-align: center;
    }
    .points-raiders {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 40rpx;
      text-indent: 2em;
    }
  }

  .points-desc {
    position: relative;
    top: -100rpx;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    border-radius: 100rpx 0rpx 0rpx 0rpx;
    padding: 36rpx 46rpx;
    font-family: PingFang SC;
    box-sizing: border-box;
    p {
      font-size: 32rpx;
      font-weight: 400;
      color: #333333;
      line-height: 40rpx;
      text-align: center;
    }
    .points-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .points-steps {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 47rpx;
        .points-round {
          width: 32rpx;
          height: 32rpx;
          border: 6rpx solid #FF903F;
          border-radius: 50%;
          margin-bottom: 26rpx;
        }
        .verticalBar {
          width: 2rpx;
          height: 862rpx;
          background: #FF903F;
          opacity: 0.3;
        }
      }

      .points-legend {
        margin-left: 32rpx;
        flex: 1;
        .points-card {
          width: 100%;
          height: 200rpx;
          margin-top: 47rpx;
          background: #FFFFFF;
          border: 2rpx solid #F2F2F2;
          box-shadow: 0px 10px 20px 0px rgba(215, 215, 215, 0.4);
          border-radius: 16rpx;
        }
      }
    }
  }
}


</style>
