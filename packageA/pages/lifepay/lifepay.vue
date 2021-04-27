<template>
  <view class="container">
    <view class="card">
      <view class="card-item" @click="onCome('pay1')">
        <image
          src="http://pic.tralife.cn/10001/20210422/23384859713053191a948bbcfbfe26c3.png"
          mode="scaleToFill"
        />
        <text>加油</text>
      </view>

      <view class="card-item" @click="onCome('pay2')">
        <image
          src="http://pic.tralife.cn/10001/20210422/accdd92669f9ec343bb55d974a9aebbe.png"
          mode="scaleToFill"
        />
        <text>话费</text>
      </view>

      <view class="card-item" @click="onCome('pay3')">
        <image
          src="http://pic.tralife.cn/10001/20210422/e47e4a1afc7a2aa179543a2cfb48218c.png"
          mode="scaleToFill"
        />
        <text>水费</text>
      </view>

      <view class="card-item" @click="onCome('pay4')">
        <image
          src="http://pic.tralife.cn/10001/20210422/63160146390a9ba71af8e911a8828aee.png"
          mode="scaleToFill"
        />
        <text>电费</text>
      </view>

      <view class="card-item" @click="onCome('pay5')">
        <image
          src="http://pic.tralife.cn/10001/20210422/4aaac41266b3f39994ba67b011fa2867.png"
          mode="scaleToFill"
        />
        <text>宽带</text>
      </view>

      <view class="card-item" @click="onCome('pay6')">
        <image
          src="http://pic.tralife.cn/10001/20210422/67e893a18f131d3df4d3037a0a77ce84.png"
          mode="scaleToFill"
        />
        <text>流量</text>
      </view>

    </view>
  </view>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      
    }
  },
  methods: {
    onCome(i){
      switch (i) {
        case 'pay1':
          this.$toast('正在开发中')
          break;
        case 'pay2':
          this.$navTo('packageA/pages/paylife/paylife?type='+i)
          break;  
        case 'pay3':
          this.$toast('正在开发中')
          break;
        case 'pay4':
          this.$toast('正在开发中')
          break;
        case 'pay5':
          this.$toast('正在开发中')
          break;
        case 'pay6':
          this.$toast('正在开发中')
          break;      
        default:
          break;
      }
      
    }
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
	 //  const page = getCurrentPages();
	 //  	const len = page.length;
		// console.log(page[len-2].route,len)
	// uni.navigateBack({ delta: 2 })
	uni.switchTab({
		url:'/pages/index/index'
	})
  },


};
</script>

<style lang="scss">
.container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  padding: 30rpx 25rpx;
  box-sizing: border-box;
  .card {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .card-item {
      
      width: 31%;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 40rpx;
      padding: 40rpx 0;
      min-height: 110rpx;

        &:nth-child(1){
          image {
             width: 55rpx;
            height: 80rpx;
          }
         
        }
        &:nth-child(2){
          image {
             width: 48rpx;
            height: 80rpx;
          }
         
        }
        &:nth-child(3){
          image {
             width: 61rpx;
            height: 80rpx;
          }
         
        }
        &:nth-child(4){
          image {
             width: 56rpx;
            height: 80rpx;
          }
         
        }
        &:nth-child(5){
          padding-top: 0;
          image {
            margin-top: 54rpx;
             width: 80rpx;
            height: 67rpx;
          }
         
        }
        &:nth-child(6){
          image {
             width: 80rpx;
            height: 80rpx;
          }
         
        }

      text {
        margin-top: 29rpx;
        color: #333;
        font-weight: 400;
        font-family: PingFang SC;
        font-size: 24rpx;
        letter-spacing:3rpx;
      }
    }
  }
}


</style>
