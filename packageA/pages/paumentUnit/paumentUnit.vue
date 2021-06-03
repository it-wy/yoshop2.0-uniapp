<template>
  <view class="container" >
    <view class="wrap" v-show="type!='user'">
      <u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
      <view class="payment">
        <view class="typeTxt">
          {{type}}
        </view>
        

        <view class="pay_type city" @click="run">
           <SelectRegion class="citys" ref="city"  v-model="address" :placeholder="city" v-on:run="run" />
		
		        <u-icon @click="run2"  class="gg" name="arrow-right" ref="run" color="#333333" :class="{run: iscity,norun:iscity2}" ></u-icon>
        </view>
      </view>
    </view>
    <view class="hrs" v-show="type!='user'"></view>
    <view class="wrap t_wrap" v-show="type!='user'">
      <view class="city_unit" v-for="(item,i) in city_unit" :key="i" @click="current_type(item,i)">
        <text>{{ item.title}}</text>
        <u-icon v-show="idx==i" name="checkmark" color="#FF903F"></u-icon>
      </view>
    </view>
    <!-- 用户协议 -->
    <view class="wrap user_wrap" v-show="type=='user'">
      <p>旅享生活支付生活缴费服务协议</p>
      <p>重要提示:</p>
      <view class="p-mb">
        财付通支付科技有限公司(为了便于理解，以下简称“本公
        司”)依据本协议为用户(以下简称“你”)提供旅享支付生活
        缴费服务。本协议对你和本公司均具有法律约束力。


       
      </view>
      <view>
 在使用旅享支付生活缴费服务前，你应当阅读并遵守本协
        议、《财付通服务协议》及《旅享支付用户服务协议》。
        由于旅享支付生活缴费服务是本公司依托旅享及旅享公众
        平台提供的服务，你在使用本服务时，还需使用旅享软件
        服务所以你应阅读并遵守《旅享生活软件许可及服务协
议》，若你需要使用旅享公众平台服务，你还应阅读并遵
守《旅享公众平台服务协议》。 本公司在此特别提醒你认
真阅读并充分理解前述协议各条款，特别是免除或限制本
公司的责任、限制你的权利、规定争议解决方式的相关条
款。请你审慎阅读并选择是否接受前述协议，如你对本协
议有任何疑问，应向客服咨询。
</view>
      <p class="user_serve">一、本服务
      </p>
      <view>
        11生活缴费服务，指当你需要缴纳水费、电费、宽带费、
        固话费、加油费、流量费、时本公司可依托旅享及旅享公
        众平台等，为你和收款人(下称“缴费单位”)之间提供的货
        币资金转移服务。(下称“本服务”)
      
        
      </view>
      <view>
12你理解并同意，本服务的上述流程，可能因适用场景和功
        能存续情况的变化而发生调整所以具体以本公司实际提供的
        服务流程为准。
      </view>
    </view>
  </view>
</template>

<script>
import SelectRegion from '@/components/select-region/select-region'
export default {
  components: {SelectRegion},
  data() {
    return {
      keyword:'',
      type: 'unit',
      city: '全国',
			iscity: false,
			iscity2: false,
			address:[],
      idx: 0, // 选择服务商
      city_unit:[{
        title: '厦门市水费'
      },{
        title: '厦门市中央水费'
      }]
      
    }
  },
  methods: {
     // 城市选择
    run(){
		  // console.log("---")
		  // 添加旋转样式
		  this.isonload = true;
		  if(this.iscity){
			  this.iscity=false
			  this.iscity2 = true
		  }else {
			  this.iscity = true
			  this.iscity2 = false
			  
		  }
		  
		  // this.$refs.run.$el.classList.add('run')
		  // 
		  
	  },
	  run2(){
		  this.$refs.city.handleSelect();
	  },
    current_type(v,i){
      this.idx = i;
    }
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.type = options.type
    const app = this;
    uni.getStorage({
        key: 'gps',
        success: function (res) {
            app.address = res.data.city;
        }
    });
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
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

<style lang="scss" scoped>
.container {
  .wrap {
    padding: 30rpx 32rpx;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    .payment {
      margin-top: 55rpx;
      display: flex;
      justify-content: space-between;
    }
    .city_unit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx  solid #f5f5f5;
      padding: 30rpx;
      &:last-child{
        border:none;
      }
    }

    
  }
  .t_wrap {
    padding: 0 !important;
  }
  .hrs {
    width: 100%;
    height: 20rpx;
    background-color: #f5f5f5;
  }
  .user_wrap {
    font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #666;
      height: 100vh;
      p {
        
        &:first-child{
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          margin-bottom: 39rpx;
          color: #333;
        }
      }
    .user_serve {
      font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333;
        margin: 82rpx 0 41rpx 0;
    }
  }
}

.run {
	  transition: .3s all;
	  transform: rotate(90deg);
  }
  .norun {
  	  transition: .3s all;
  	  transform: rotate(0deg);
  }

.p-mb{
  margin-bottom: 41rpx;
}
 .city {
    display: flex;
    justify-content:flex-end;
    align-items: baseline;
  }
</style>
