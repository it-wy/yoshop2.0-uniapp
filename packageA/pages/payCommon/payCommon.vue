<template>
  <view class="container">
    <view class="wrap">
      <view class="content">
        <view class="pay_header">
          <view class="pay_img">
            <image
              :src="config.img"
              mode="widthFix"
            />
            
          </view>
          <view class="typeTxt">
            {{config.title}}
          </view>
          

          <view class="pay_type city" @click="run">
            <SelectRegion class="citys" ref="city"  v-model="address" :placeholder="city" v-on:run="run" />
		
		        <u-icon @click="run2"  class="gg" name="arrow-right" ref="run" color="#333333" :class="{run: iscity,norun:iscity2}" ></u-icon>
          </view>
        </view>

        <!-- 缴费单位 -->
        <view class="graytxt">缴费单位</view>
        <view class="Payment_unit" @click="paymentUnit(config.title)">
          <view class="Payment_tit">
            国电福建省电费
          </view>

          <u-icon name="arrow-right"></u-icon>
        </view>

        <!-- 缴费户号 -->
        <view class="payment_user">
          <text class="graytxt">缴费户号</text>
          <text class="helpUser" @click="helpUser">如何获取户号？</text>
        </view>

        <u-form :model="form" ref="uForm"  >
				
            <u-form-item  prop="remark" >
              <u-input height="54" :custom-style="styles" v-model="form.remark" placeholder="请输入缴费户号" />
            </u-form-item>
            <view class="graytxt pay-mt" v-show="config.title=='电费' && form.remark!=''">应交金额</view>
            <u-form-item  v-show="config.title=='电费' && form.remark!=''" >
              <u-input height="54" disabled :custom-style="styles" v-model="form.remark"  />
            </u-form-item>
        </u-form>

        


      </view>

      
    </view>

    <!-- 用户协议 -->
      <view class="UserAgment">
        <u-checkbox-group>
          <u-checkbox v-model="checked" size="24" active-color="#FF903F">我已阅读并同意 <text class="agent" @click="paymentUnit('user')">旅享支付生活缴费服务协议</text></u-checkbox>
        </u-checkbox-group>
      </view>

      <!-- 立即缴费 -->
      <view class="submit" @click="submit" :class="{noCheck: form.remark==''}" >
        下一步
      </view>

      <!-- 获取户号提示 -->
    <u-modal v-model="show" :show-title="false" confirm-text="确定" confirm-color="#FF903F" @confirm="confirmUser">
      <view  class="slot-content">
       
        <text>如何查户号？</text>
        <text>您可以查看缴费账单、催缴短信或 拨打机构客服电话查询。</text>
      </view>

    </u-modal>
  </view>
</template>

<script>
import SelectRegion from '@/components/select-region/select-region'
export default {
  components: {SelectRegion},
  data() {
    return {
      // 充值
      form: {
        remark:'',
      },
      rules:{
        remark: [
						{
							required: true, 
							message: '请输入缴费户号',
							trigger: ['change',],
						},
        ],
      },
      city: '全国',
			iscity: false,
			iscity2: false,
			address:[],
      styles:{fontSize:'34rpx'},
      checked: false,// 用户协议
      show: false,
      config: {
        title:'',
        img: ''
      },
      
    }
  },
  methods: {
    // 提交
    submit(){
        this.$refs.uForm.validate(valid => {
					 
			  		if (valid) {
              if(!this.checked){ this.$toast('请阅读商家协议');return;}
              const app = this;
              app.$navTo('packageA/pages/billDetail/billDetail',{type:app.config.title})	
            }
        })      
    },
    // 获取户号弹窗
    helpUser(){
      const app = this
      app.show = true
    },
    confirmUser(){
      const app = this
      app.show = false
    },
    // 跳转缴费单位
    paymentUnit(i){
      this.$navTo('packageA/pages/paumentUnit/paumentUnit',{type: i})
    },
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
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    switch (options.type) {
      case 'pay3':
        uni.setNavigationBarTitle({ title: '水费' })
        this.config.title = '水费'
        this.config.img = 'http://pic.tralife.cn/10001/20210422/e47e4a1afc7a2aa179543a2cfb48218c.png'
        break;
      case 'pay4':
        uni.setNavigationBarTitle({ title: '电费' })
        this.config.title = '电费'
        this.config.img = 'http://pic.tralife.cn/10001/20210422/63160146390a9ba71af8e911a8828aee.png'
        break;
      case 'pay5':
        uni.setNavigationBarTitle({ title: '宽带' })
        this.config.title = '宽带'
        this.config.img = 'http://pic.tralife.cn/10001/20210422/4aaac41266b3f39994ba67b011fa2867.png'
        break;    
    
      default:
        break;
    }

    const app = this;
    uni.getStorage({
        key: 'gps',
        success: function (res) {
            app.address = res.data.city;
        }
    });
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
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
    .content {
      padding: 30rpx;
      box-sizing: border-box;
      .pay_header {
        display:flex;
        align-items: center;
        margin-bottom: 94rpx;
        .pay_img {
          width: 46rpx;
          image {
            width: 100%;
            
          }
        }
        .typeTxt {
          margin-left: 27rpx;
          font-size: 34rpx;
        }
        .pay_type {
          text-align: right;
          flex: 1;
        }
      }

      .Payment_unit {
        margin-top: 53rpx;
        margin-bottom: 82rpx;
        display: flex;
        justify-content:space-between;
        align-items: center;
        border-bottom: 1rpx solid #F2F2F2;
        padding-bottom: 31rpx;
        .Payment_tit {
          font-size: 34rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333
        }
      }

      .payment_user {
        display: flex;
        justify-content:space-between;
        .helpUser {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FF903F
        }
      }
    }

    
  }
  .UserAgment{
    margin-top: 108rpx;
    font-size: 24rpx;
    .agent {
      color: #FF903F;
    }
  }

  .submit {
      margin-top: 49rpx;
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
}

.noCheck{
  opacity: 0.5;
}

.graytxt {
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
}

.pay-mt {
  margin-top: 82rpx;
}

.slot-content {
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
  margin-bottom: 50rpx;
  text {
    text-align: center;
    &:nth-of-type(1){
      margin: 47rpx 0  49rpx 0 ;
      font-size: 34rpx;
      font-family: PingFang SC;
      font-weight: 700;
      color: #333333;
      line-height: 48rpx;
      letter-spacing: 3rpx;
    }
     &:nth-of-type(2){
       margin: 30rpx;
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

  .city {
    display: flex;
    justify-content:flex-end;
    align-items: baseline;
  }
</style>
