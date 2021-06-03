<template>
  <view class="container">
    <view class="wrap">

    
    <!-- 缴费 -->
    <view class="paycard">
      <u-form :model="form" ref="uForm"  >
				
        <u-form-item  prop="remark" >
					<u-input height="100" :custom-style="styles" v-model="form.remark" placeholder="请输入手机号码" />
				</u-form-item>

        <view class="payType">
            <view class="flow-txt" v-show="payType=='pay6'">
              <text>超值7天包</text>
              <text>流量包7天有效，可跨月</text>
            </view>
            <view v-for="(item,i) in list" :key="i" class="pay-item" :class="{active: idx==i}" @click="onPaytype(item,i)">
              <p>{{item.selling_point}}<text :class="{blackberry:payType=='pay6'}">{{payType=='pay6'?'GB':'元'}}</text></p>
              <p>售价&nbsp;{{parseInt(Number(item.goods_point_min))}}积分</p>
            </view>
        </view>

        <view class="paydesc">
          <p>充值须知</p>
          <p>1、每个用户每月 <text>只能充值一次</text>；  </p>
          <view v-html="description">

          </view>
        </view>
			</u-form>
    </view>

    <view class="btn" @click="submit">
      立即充值&nbsp;{{parseInt(Number(form.goods_point_min))}}积分
    </view>
    </view>
  <!-- 成功提示 -->
    <u-modal v-model="show" :show-title="false" confirm-text="知道了" confirm-color="#FF903F" @confirm="confirm">
      <view  class="slot-content">
        <image
          src="http://pic.tralife.cn/10001/20210423/0ab7b14e16824c77dd0e060ead2dd484.png"
          mode="aspectFit"
        />
        <text>充值成功</text>
        <text>订单充值金额将在24小时内到账</text>
      </view>

    </u-modal>
  </view>
</template>

<script>
import * as LifeApi from '@/api/life'
import * as GoodsApi from '@/api/goods'
import * as CheckoutApi from '@/api/checkout'
export default {
  components: {},
  data() {
    return {
      show: false, // 充值提示框
      // 充值
      form: {
        remark:'',
      },
      list: [], // 商品列表数据
      idx:0,
      styles:{fontSize:'54rpx'},
      rules:{
        remark: [
						{
							required: true, 
							message: '请输入手机号',
							trigger: ['change',],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
        ],
      },
      payType:'', // 充值类型
      
      description:`<p>2、一旦充值将无法退款，急用请慎拍！号码请仔细核对，个人原因充错号码概不负责！</p><p>3、本产品上线充值业务不提供任何发票</p>` 
    }
  },
  methods: {
      // 选择
      onPaytype(item,i){
        const app = this;
        item.remark = app.form.remark;
        const arr = {
          remark: item.remark,
          goodsId:item.goods_id,
          payType: 30,
          goods_point_min: item.goods_point_min,
          couponId: 0,
          delivery: 10,
          goodsNum: "1",
          goodsSkuId: "0",
          isUsePoints: 0
        }
        app.form = arr
        
        app.idx = i;
      },
      // 提交
      submit(){
        this.$refs.uForm.validate(valid => {
					 
			  		if (valid) {
              if(this.payType != 'pay6'){
                const app = this;
              return new Promise((resolve, reject) => {
                  CheckoutApi.submit('buyNow',app.form)
                  .then(result => app.show = true)
                  .catch(err => {
                  })
              })	
              }else {
                this.$navTo('packageA/pages/billDetail/billDetail',{type:'流量'})
              }
              
            }
        })      
      },
      //获取虚拟商品
      /**
       * 获取商品列表
       * @param {number} pageNo 页码
       */
      getGoodsList(pageNo = 1) {
        const app = this
       
        const param = {
          sortType: '',
          sortPrice: '',
          categoryId: 0,
          goodsName: '',
          page: pageNo,
          attr: 4
        }
        return new Promise((resolve, reject) => {
          GoodsApi.list(param)
            .then(result => {
              // 合并新数据
              
              app.list = result.data.list.data
              const arr = {
                remark: '',
                goodsId:app.list[0].goods_id,
                payType: 30,
                goods_point_min: app.list[0].goods_point_min,
                couponId: 0,
                delivery: 10,
                goodsNum: "1",
                goodsSkuId: "0",
                isUsePoints: 0
              }
              app.form = Object.assign(app.form,arr)
              resolve(app.list)
            })
            .catch(reject)
        })
      },
      confirm(){
        this.$navTo('pages/order/index')
      }
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    switch (options.type) {
      case 'pay1':
        uni.setNavigationBarTitle({ title: '加油充值' })
        break;
      case 'pay2':
        this.getGoodsList();
        
        uni.setNavigationBarTitle({ title: '话费充值' })
        
        break;
      case 'pay6':
        this.payType = 'pay6';
        this.description = `<p>2、流量包到账后无效，当月有效；</p><p>3、此流量包不支持港澳台地区以及国际漫游；</p>`
        this.getGoodsList();
        uni.setNavigationBarTitle({ title: '流量充值' })
        break;    
    
      default:
        break;
    }
  },
  // 页面周期函数--监听页面初次渲染完成
 // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    
    this.$refs.uForm.setRules(this.rules);
    
  },
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss">
.container {
  padding: 30rpx 24rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  .paycard {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx 40rpx 40rpx;
    box-sizing: border-box;
    height: fit-content;
    .payType {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 40rpx 0 79rpx 0;
      flex-wrap: wrap;
      .flow-txt {
        width: 100%;
        margin-bottom: 30rpx;
        text {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #000000;
          &:last-child{
            margin-left: 18rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
          }
        }
      }
      .pay-item {
        background: #FFFFFF;
        box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10rpx;
        padding: 30rpx 68rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #333;
        border: solid 2rpx transparent;
          p {
            &:first-child{
              font-size: 60rpx;
              text {
              margin-left: 6rpx;
              font-size: 32rpx;
              }
            }
            &:last-child {
              font-size: 26rpx;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FC3A46;
            }
            
          }
          
        
      }
    }

    .paydesc {
      p{
        color: #999;
        font-size: 26rpx;
        line-height: 45rpx;
        &:first-child {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          margin-bottom: 29rpx;
        }
        &:nth-child(2){
          color: #FF903F;
        }
      }
    }
  }
  }

  .btn {
    align-self: flex-end;
    width: 100%;
    height: 96rpx;
    background: #FF903F;
    border-radius: 8rpx;
    font-size: 34rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 96rpx;
    text-align: center;
    letter-spacing: 4rpx;
  }
}

.active {
  border: solid 2rpx #FF903F !important;
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

.blackberry {
  color: #333;
  font-size: 60rpx !important;
}

</style>
