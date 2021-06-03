<template>
  <view
      class="main-header"
    >
    <nav-bar backState="1000" bgColor="#fff" type="transparentFixed" :shadow="false" transparentFixedFontColor="#fff" fontColor="#fff" :titleCenter="true">
		   <!-- <view slot="left">
		   	<u-icon name="arrow-left"></u-icon>
		   </view> -->
       <!-- #ifdef APP-PLUS || MP-WEIXIN -->
       <view class="title" slot="transparentFixed">
		    	邀请夺宝
		    </view>
       <!-- #endif -->
		    <!-- #ifdef H5 -->
        <view class="title" slot="transparentFixed">
		    	
		    </view>
        <!-- #endif -->
		</nav-bar>

    <p>快来夺宝</p>
    <p>积分当钱花</p>  
    <view class="wrap">
      <view class="wrap_invite">
        <!-- 图中位置 -->
        <view class="invite-qrcode">
          <image
            src="https://test2.tralife.cn/uploads/user/131830.jpg"
            mode="widthFix"
          />
          <text>
            您的UID： <text class="d-fz">129154</text> 
          </text>
          <view class="copy-btn">复制</view>
        </view>
        <p>1、 您可以通过系统生成的二维码图片通过微信分享给您的好友；</p>
        <p>2、 您可以转发本页面通过微信分享给您的好友；</p>
        <p>3、每个二维码信息都不同，请使用您自己生成的二维码图片进行传播。</p>
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
  background: #000;
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  background:url('https://pic.tralife.cn/10001/20210513/6355880f7bc00b56910e82effd0d43db.png') no-repeat center;
  background-size: cover;
  box-sizing: border-box;
  
  p{
    font-size: 70rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    
    &:nth-of-type(1){
      /* #ifdef H5 */
       margin-top: 0rpx !important;
      /* #endif */

      /* #ifdef APP-PLUS || MP-WEIXIN */
      margin-top: 132rpx !important;
      /* #endif */
      
    }
    &:nth-of-type(2){
      font-size: 80rpx;
    }
  }
  .wrap {
    position: absolute;
    /* #ifdef H5 || MP-WEIXIN */
    top: 45%;
    /* #endif */
    
    /* #ifdef APP-PLUS */
    top: 38%;
    /* #endif */
    left: 0;
    width: 100%;
    /* #ifdef H5 || MP-WEIXIN */
    height: 50%;
    /* #endif */
    
    /* #ifdef APP-PLUS */
    height: 62%;
    /* #endif */
    padding: 0 50rpx 24rpx 50rpx;
    box-sizing: border-box;
    .wrap_invite {
      width: 100%;
      height: 100%;
       display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      .invite-qrcode {
        width: 324rpx;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        image {
          width: 100%;
          
          box-shadow: 0px 6px 20px 0px hsla(36, 93%, 70%, 0.3);
        }
        text {
          margin-top: 48rpx;
          font-size: 30rpx;
          color: #666;
          
          
        }
        .copy-btn {
          width: 180rpx;
          height: 56rpx;
          line-height: 56rpx;
          background: linear-gradient(-30deg, #FAC26C, #FF9247);
          border-radius: 28rpx;
          /* #ifdef  MP-WEIXIN */
           margin-bottom: 124rpx;
          /* #endif */
          /* #ifdef APP-PLUS*/
           margin-bottom: 0rpx;
          /* #endif */
          /* #ifdef H5 */
            margin-bottom: 44rpx;
          /* #endif */
         
          margin-top: 39rpx;
          text-align: center;
          color: #fff;
        }
      }
      p {
        font-size: 24rpx;
        color: #fff;
        font-weight: normal;
        text-align: left;
        width: 100%;
      }
      
    }
  }
}

.fix-nav {

}
</style>

<style>
.uni-page-head { display: none;}
</style>