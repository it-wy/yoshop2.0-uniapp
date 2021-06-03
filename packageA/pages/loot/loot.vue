<template>
  <view class="container" :class="{Drawprizes: type != '1'}">
    <view class="wrap" v-if="type=='1'">
      <p>1、 所有用户可选择自己喜欢的商品（可多选），支付所需的
     积分参与抽奖，获取抽奖号；</p>
    <p>2、 每人每次参与需消耗相应积分兑换一个抽奖号，积分不予
     退还；</p>
    <p>3、每个宝贝每人最多可兑换 <text class="d-fz">10</text> 个抽奖号；</p>
    <p>4、每个宝贝开奖所需积分总数集满后的 <text class="d-fz">下一个工作日10：00</text>
     开奖，如当天未集满，则顺延至下一天，直到积分集满为
     止；</p>
    <p>5、中奖奖品请在“积分夺宝-我的奖品”页面中查看；</p>
    <p>6、中奖后请务必在 <text class="d-fz">72小时</text> 内点击“领取宝贝”填写好奖品收货
     地址等信息，逾期作废；</p>
    <p>7、中奖奖品将在填写收货地址信息成功后的3个工作日内发货；</p>
    <p>8、开奖号码依据开奖当天的上证综合指数(上证指数)当天开盘
     价的后4位/3位/2位（含小数点后两位）作为开奖号码；如
     您的奖号内带有"*"字号则为任意数值。</p>
    </view>

    <view class="wrap" v-else>
      <view class="Drawprize_type">
        <view class="Drawprize_tab" :class="{active_tab: idx==0}" @click="onDrawprize(0)">
          待开奖
        </view>
        <view class="Drawprize_tab" :class="{active_tab: idx==1}" @click="onDrawprize(1)">
          已开奖
        </view>
      </view>

      <view class="Drawprize_shop">

      
      <view class="Drawprize_list" @click="ontarget(idx)">
        <view class="jeader">
          <text>积分夺宝</text>
          <text>开始时间：2021/1/26 22:10:11</text>
        </view>
        <view class="Drawprize_info">
          <view class="Drawprize_left">
            <image
              src="https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png"
              mode="widthFix"
            />
          </view>

          <view class="Drawprize_right">
            <view class="Drawprize_title">
              官方官网正品透真春季素颜紧致精华霜
            </view>
            <view class="Drawprize_pop">
              <view class="Drawprize_price">
                价值: <text>129.00</text>
              </view>
              <view class="Drawprize_status">
                {{idx==1?'恭喜中奖':'等待开奖'}}
              </view>
            </view>
          </view>
        </view>
      </view>  
</view>
      
    </view>
    
    <view class="d-btn btn"  v-if="type=='1'">
      立即参与夺宝
    </view>
  </view>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      type: '',
      idx: 0,
    }
  },
  methods: {
    // 抽奖切换
    onDrawprize(i){
      const app = this;
      app.idx = i;
    },
    // 点击判断是否中奖
    ontarget(i){
      console.log(i);
      if(i==1) this.$navTo('packageA/pages/awardDetail/awardDetail')
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    
    switch (options.type) {
      case '1':
        this.type = options.type;
        uni.setNavigationBarTitle({ title: '夺宝规则说明' })
        break;
      case '2':
        this.type = options.type;
        uni.setNavigationBarTitle({ title: '夺宝订单' })
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
  display:flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  .wrap {
    border-radius: 8rpx;
    
    height: fit-content;
    width: 100%;
    p{
      line-height: 44rpx;
    }
    .Drawprize_type {
      background-color: #fff;
      padding: 30rpx 24rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      .Drawprize_tab {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        position: relative;
        &:first-child{
          margin-right: 41rpx;
        }
        &::after{
          position: absolute;
          bottom: -16rpx;
          left: calc(50% - 14rpx);
          content: "";
          width: 28rpx;
          height: 8rpx;
          background: transparent;
          border-radius: 4rpx;
          
        }
      }
    }
  }
  .btn {
    align-self: flex-end;
  }
  .Drawprize_shop {
    padding: 22rpx 25rpx;
    box-sizing: border-box;
    
  .Drawprize_list {
    background-color: #fff;
    padding: 22rpx 25rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content:center;
    
    .jeader {
      display: flex;
      justify-content: space-between;
      margin-bottom: 23rpx;
      text {
        &:nth-of-type(2){
          color:#999;
          font-size: 22rpx;
        }
      }
    }
    .Drawprize_info {
      display: flex;
      justify-content:space-between;
      align-items: center;
      width: 100%;
      height: 180rpx;
      .Drawprize_left {
        width: 180rpx;
        margin-right: 22rpx;
        image {
          width: 100%;
        }
      }
      .Drawprize_right {
        flex: 1;
        width: 100%;
        height: 100%;
        .Drawprize_title {
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-bottom: 48rpx;
          max-width:374rpx;
          line-height: 44rpx;
        }
        .Drawprize_pop {
          width: 100%;
          display: flex;
          justify-content:space-between;
          font-family: PingFang SC;
          line-height: 36rpx;
          .Drawprize_price {
            font-size: 24rpx;
            
            font-weight: 400;
            color: #EE3551;
            
            text {
              font-size: 28rpx;
              font-weight: 600;
              color: #EE3551;
            }
          }
          .Drawprize_status {
            font-size: 28rpx;
            font-weight: 500;
            color: #FF903F;
          }
        }
      }
      }
    }
  }
}

.active_tab{
  font-size: 34rpx !important;
  font-weight: 600 !important;
  color: #333333 !important;
  &::after{
        position: absolute;
        bottom: -10rpx;
        left: calc(50% - 14rpx) !important;
        content: "";
        width: 28rpx;
        height: 8rpx;
        background: linear-gradient(-30deg, #FAC26C, #FF9247) !important;
        border-radius: 4rpx;
  }
}

.Drawprizes {
  padding: 0;
}
</style>
