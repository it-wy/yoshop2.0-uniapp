<template>
  <view
      class="main-header phone-auto"
    >
    <nav-bar backState="1000" bgColor="#fff" type="transparentFixed" :shadow="false" transparentFixedFontColor="#fff" fontColor="#fff" :titleCenter="true">
		   <!-- <view slot="left">
		   	<u-icon name="arrow-left"></u-icon>
		   </view> -->
		    <view class="title" slot="transparentFixed">
		    	
		    </view>
		</nav-bar>
    <u-swiper :list="list" mode="rect" height="800" border-radius="0"></u-swiper>
    <!-- 价格 -->
    <view class="shop-info b-f">
      <view class="shop-t d-flex-b">
        <text class="d-fz">20
          <text class="d-fz">积分</text>
        </text>
        <text>市场价
          <text>299.00</text>
        </text>
        <text>
          数量：999
        </text>
      </view>
      <view class="shop-desc">
        <text class="brand">品牌</text>
        <text class="shop-title" >新款精华灵液快速包邮送到家 天枰座透真 欢颜紧致精华液 </text> 
        
      </view>
    </view>

    <!-- 抽奖规则 -->
    <view class="lottery-rules b-f d-flex-b">
      <text>抽奖规则</text>
      <view class="d-fz">
          <u-icon name="arrow-right" @click="onShowPopup(1)"></u-icon>
      </view>
      
    </view>

    <!-- 参与人数 -->
    <view class="part-number p-30 b-f">
      <view class="part-1 d-flex-b">
        <text>参与人数</text>
        <text>满
          <text class="d-fz">20</text>
          人参与即可达标开奖
        </text>
      </view>
      <view class="part-2">

      </view>
      <view class="d-flex-b">
        <text>已参与人数
          <text class="d-fz">09</text>
          人
          </text>

          <text>
            <text class="d-fz">09</text>
            /20
          </text>
      </view>
    </view>

    <!-- 本期中奖号 -->
    <view class="Winning p-30 b-f">
      <view class="win-number d-flex-b">
        <text>本期中奖号：
          <text>06</text>
        </text>
        <text>数据来源：搜狐证券</text>
      </view>
      <view class="win-user d-flex-b">
        <text>本期中奖用户:</text>
        <text>UID：
          <text class="d-fz">10010</text>
        </text>
      </view>
  
      <view class="d-flex-b">
        <text>2021年4月3日上证指数开盘价：</text>
        <text>￥3251.06</text>
      </view>
    </view>

    <!-- 我的奖号 -->
    <view class="my-award-num p-30 b-f">
      <view class="my-num d-flex-b">
        <text>我的奖号</text>
        <text>您已参与
          <text class="d-fz">{{ win_list.length }}</text>
          次
        </text>
      </view>
      <view class="award-list d-flex-b">
        <view class="award-item" v-for="(item, index) in win_list" :key="index" :class="{dcard:index==5}">
          {{item}}
        </view>
      </view>
    </view>
    <!-- 本期参与 -->
    <view class="period p-30 b-f">
      <view class="period-top d-flex-b">
        <text>本期参与</text>
        <view class="d-fz" @click="onShowPopup(2)">查看全部
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="period-list">
        <view class="period-item d-flex-b" v-for="(item, index) in part_users.slice(0,6)" :key="index">
          <image
            :src="item.img"
            mode=""
          />
          <text class="flex-box">ID：{{item.uid}}</text>
          <text>{{ item.create_time }}</text>
        </view>
      </view>
    </view>

    <!--  奖品详情 -->
    <view class="prize-details">
      <view class="prize-top p-30 b-f">
        奖品详情
      </view>
      <view class="prize-list">
        <image
          src="https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png"
          mode="widthFix"
        />
      </view>
    </view>
    <!-- 参与兑换 -->
    <view class="d-btn" @click="onShowPopup(3)">参与兑换</view>
    <!-- 弹出层 -->
    <u-popup v-model="show" mode="bottom" border-radius="14" closeable="true">
      <view class="wrap">
        <view v-if="idx==1">

        
        <view class="wrap-title" >
          抽奖规则
        </view>
        <view class="wrap-desc">
          <p>1、 所有用户可选择自己喜欢的商品(可多选)，支付所需的积分参与抽奖，获取抽奖号；</p>
          <p>2、每人每次参与需消耗相应积分兑换一个抽奖号，积分不予退还；</p>
          <p>3、每个宝贝每人最多可兑换
            <text class="d-fz">10个抽奖号</text>；</p>
          <p>4、每个宝贝开奖所需积分总数集满后的下一个工作日10：00开奖，如当天未集满，则顺延至下一天，直到积分集满为止；</p>
          <p>5、中奖奖品请在“积分夺宝-我的奖品”页面中查看；</p>
          <p>6、中奖后
            <text class="d-fz">请务必在72小时内</text>点击“领取宝贝”填写好奖品收货地址等信息，逾期作废；</p>
          <p>7、中奖奖品将在填写收货地址信息成功后的3个工作日内发货；</p>
          <p>8、开奖号码依据开奖当天的上证综合指数(上证指数)当天开盘价的后4位/3位/2位(含小数点后两位)作为开奖号码;如您的奖号内带有
            <text class="d-fz">""</text>字号则为任意数值。</p>
        </view>
        </view>
        <!-- 更多参与 -->
        <view v-if="idx==2">
          <view class="wrap-title" >
            本期参与
          </view>
          <scroll-view scroll-y="true" style="height: 600rpx;">
            <view class="period-item d-flex-b" v-for="(item, index) in part_users" :key="index">
              <image
                :src="item.img"
                mode=""
              />
              <text class="flex-box">ID：{{ item.uid }}</text>
              <text>{{ item.create_time }}</text>
            </view>
        </scroll-view> 
        </view>

        <!-- 购买奖号 -->
        <view v-if="idx==3  && win_list.length<10">
          <view class="d-flex-b shop-cart">
            <image
              src="https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png"
              mode="widthFix"
            />
            <view class="shop-r">
              <view class="shop-txt">
                新款精华灵液快速包邮送到家 天枰座透真欢颜紧致精华液
              </view>
              <view class="shop-price d-flex-b">
                <text class="d-fz">
                  <text class="fz-44">20</text>
                  积分</text>
                <text>可兑换数量10</text>
              </view>
            </view>
          </view>
          <p class="fz-32 mb-39">我的积分</p>
          <p class="points">
            <text class="d-fz fz-44">2888</text>
            
            <text class="fz-24">积分</text>
          </p>

          <p class="fz-32 mb-39">规则</p>
          <p class="points-desc">
            <text class="d-fz">
              20
              </text>
            积分兑换一个抽奖号，每个用户每天最多可兑换
            <text class="d-fz">10</text>
            个 抽奖号；
            </p>

          <view class="shop-action d-flex-b">
            <p class="fz-32">数量</p>
            
            <view class="d-flex-b ace">
              <view class="sub boxs" @click="subNum">-</view>
              <view class="price-num boxs">{{number}}</view>
              <view class="add d-fz boxs" @click="addNum">+</view>
            </view>
          </view>

          <view class="d-btn">立即兑换</view>
        </view>
        <!-- 购买限制 -->
        <view  v-if="idx==3 && win_list.length>=10">
          <view class="wrap-title" >
            购买限制
          </view>
          <p class="fz-32 mb-39">规则</p>
          <p class="mb-39">20积分兑换一个抽奖号，每个用户每天最多可兑换10个 抽奖号；</p>
          <p class="fz-32 mb-39">限制</p>
          <p class="d-fz mb-39">您已购买10个抽奖号，本次夺宝无法再次购买；</p>
          <view class="d-btn">确定</view>
        </view>
      </view>
	  </u-popup>
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
      list: [{
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ],
      win_list:['01','02','03','04','05','06','07','08','09','10','11'],
      show:false,
      idx: 0,
      number:1,
      part_users:[{
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },{
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },{
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },{
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },{
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },
      {
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },
      {
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      },{
        img:'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        uid:'10086',
        create_time: '2021/4/8  13:00:55'
      }] 
    }
  },
  methods: {
    onShowPopup(i){
      this.idx = i;
      this.show = true;
    },
    addNum(){
      
      if(this.number<10)this.number++
    },
    subNum(){
      if(this.number>=2)this.number--
    }
  },

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
  height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;

  .shop-info {
    padding: 34rpx 30rpx 40rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .shop-t {
      align-items: flex-end;
      margin-bottom: 40rpx;
      line-height: 1;
      text {
        &:nth-of-type(1){
          font-size: 54rpx;
          text {
            font-size: 32rpx;
          }
        }
        &:nth-of-type(2){
          margin-left: 22rpx;
          color: #999999;
          flex: 1;
          text {
            font-size: 24rpx;
             text-decoration: line-through;
          }
        }
        &:nth-of-type(3){
          color: #999999;
        }
      }
    }
    .shop-desc {
      .brand{
        padding: 8rpx 7rpx;
        box-sizing: border-box;
        background: #FF903F;
        border-radius: 4rpx;
        font-size: 18rpx;
        color:white;
        margin-right: 18rpx;
        line-height: 48rpx;
        vertical-align: top;
      }
      .shop-title {
        font-size: 32rpx;
      }
    }
  }

  .lottery-rules {
    padding: 31rpx 45rpx 35rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    text {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
    }
  }

  .part-number {
    margin-bottom: 20rpx;
    .part-1 {
      margin-bottom: 30rpx;
      text {
        font-family: FZLanTingHei-DB-GBK;
        font-weight: 400;
        color: #333333;
        &:nth-of-type(1) {
          font-size: 32rpx;
        }
      }
    }
    .part-2 {
        width: 100%;
        height: 30rpx;
        background: #ff8f3f83;
        overflow: hidden;
        border-radius: 15rpx;
        position: relative;
        margin-right: 8rpx;
        margin-bottom: 20rpx;
        &::after{
          position: absolute;
          left: 0%;
          content: "";
          width: 90%;
          background-color: #FF903F;
          height: 100%;
          border-radius:15rpx
        }
    }
  }

  .Winning {
    margin-bottom: 20rpx;
    .win-number {
      margin-bottom: 47rpx;
      text {
         &:first-child {
          font-size: 32rpx;
          color:#333333;
          text {
            color:#EE3551;
            font-size: 32rpx;
          }
        }
        &:last-child {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }

    .win-user {
      padding-bottom: 30rpx;
      border-bottom: 2rpx solid #F2F2F2;
      margin-bottom: 29rpx;
    }
  }

  .my-award-num {
    margin-bottom: 20rpx;
    .my-num {
      margin-bottom: 40rpx;
    }
    .award-list{
      flex-wrap: wrap;
      justify-content:flex-start !important;
      .award-item {
        width: 68rpx;
        height: 68rpx;
        line-height: 68rpx;
        text-align: center;
        box-sizing: border-box;
        margin-bottom: 24rpx;
        background: #E6E6E6;
        border-radius: 8rpx;
        color: #666;
        margin-right: 35rpx;
        
        &:nth-child(7n+1){
					  margin-left: 0;
			  }
			  &:nth-child(7n){
				  margin-right: 0;
			  }
      }
      // &:after{
      //   content: "";
	  	// 	flex: auto;
      // }
    }
    
  }

.period {
  margin-bottom: 20rpx;

  .period-top {
    margin-bottom: 31rpx;
  }
  .period-list {
    
  }
  }


  .wrap {
    padding: 40rpx;
    box-sizing: border-box;
    .wrap-title {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      margin-bottom: 47rpx;
      text-align: center;
    }
    .wrap-desc {
      p {line-height: 44rpx;color: #838383;}
    }
  }

}

.period-item {
      margin-bottom: 24rpx;
      align-items: center;
      padding-right: 30rpx;
      image {
        width: 64rpx;
        height: 64rpx;
        margin-right: 22rpx;
      }
      text {
        &:nth-of-type(2) {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
}

.shop-cart {
  margin-bottom: 61rpx;
  image {
    width: 164rpx;
    height: 154rpx;
    margin-right: 24rpx;
  }
  .shop-r {
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    .shop-txt {
      
    }
    .shop-price {
      line-height:1;
      text {
        &:nth-of-type(2) {
          color:#838383;
          display: flex;
          align-items: flex-end;
        }
      }
    }
  }
}

.points {
  line-height: 1;
  margin-bottom: 64rpx;
}
.points-desc {margin-bottom: 56rpx;}

.shop-action {
  margin-bottom: 74rpx;
  .ace {
    
    .boxs {width: 58rpx;height: 38rpx;text-align: center;;}
    .sub {
      color: #ccc;
      background: #F7F7F7;
      border-radius: 8rpx 0px 0rpx 8rpx;
    }
    .add {
      background: rgba(255, 144, 63, 0.2);
      border-radius: 0rpx 8rpx 8rpx 0rpx;
    }
  }
}
</style>
