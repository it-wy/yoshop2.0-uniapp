<template>
  <view class=""> 开发中
  <view class="container" v-if="false">
    <view class="point_header">
    <view class="intergal">
      <text>28888</text>
      <view>我的积分 
        <u-icon name="arrow-right"></u-icon>
      </view>
      
    </view>
    <!-- 积分夺宝tab -->
    <view class="Points">
      <view class="points_tab" v-for="(item,i) in pointsTab" :key="i" @click="target_tab(item,i)">
        <view class="points_tab_img">
          <image
                :src="item.img"
                mode=""
          />
        </view>
        <view class="points_tab_title">
          {{ item.title }}
        </view>
      </view>
    </view>
    </view>
    <!-- 开奖 -->
    <view class="Drawprize">
      <view class="Drawprize_type">
        <view class="Drawprize_tab" :class="{active_tab: idx==0}" @click="onDrawprize(0)">
          参与抽奖
        </view>
        <view class="Drawprize_tab" :class="{active_tab: idx==1}" @click="onDrawprize(1)">
          往期开奖
        </view>

        <view class="Drawprize_time">
          满人次日<text>10:00</text>开奖
        </view>
      </view>
      <!-- 开奖列表 -->
      <view class="Drawprize_list">
          <view class="Drawprize_item" v-for="(item,i) in pointsTab" :key="i"> 
            <!-- 左边 -->
            <view class="Drawprize_left">
              <image
                :src="item.img"
                mode=""
              />
            </view> 
            <!-- 右边 -->
            <view class="Drawprize_right">
              <view class="Drawprize_title">
                大玉颜堂琥珀精油补水 套装一盒
              </view>
              <view class="Drawprize_step">
                <view class="step_title" :class="{grey_mode:idx==1}">
                  参与人数
                </view>
                <view class="steps" :class="{grey_mode:idx==1}">
                  <view class="step" :class="{grey_bg:idx==1}"></view>
                  9/10
                </view>
                <view class="Drawprize_price">
                  <text v-if="idx==0">988
                    <text>积分</text>
                  </text>
                  <text class="users" v-if="idx==1">
                    中奖用户 10086
                  </text>
                  <text v-show="idx==0">
                    ￥299
                  </text>
                  <text :class="{grey_bg:idx==1}" @click="targetTrea()">{{idx==0?'参与':'已开奖'}}</text>
                </view>
              </view>
            </view>
          </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pointsTab:[{
        img: 'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        title: '夺宝规则',
        type: 1
      },{
        img: 'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        title: '夺宝订单',
        type: 2
      },{
        img: 'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        title: '去赚积分',
        type: 3
      },{
        img: 'https://pic.tralife.cn/10001/20210510/176c0a64579d11de7d7ab455dce0cee3.png',
        title: '邀请夺宝',
        type: 4
      }],
      idx: 0,
    };
  },
  onLoad() {},
  onUnload() {
    uni.switchTab({
    	url:'/pages/index/index'
    });
  },
  onReachBottom() {},
  methods: {
    // 抽奖切换
    onDrawprize(i){
      const app = this;
      app.idx = i;
    },
    // tab点击
    target_tab(i,v){
      
      const app = this;
      if(i.type == '4'){
        app.$navTo('packageA/pages/InviteRob/InviteRob');
      }else if (i.type == '3'){
        app.$navTo('packageA/pages/eEarnPoints/eEarnPoints');
      }else {
        app.$navTo('packageA/pages/loot/loot',{type: i.type});
      }
      
    },
    // 夺宝详情页
    targetTrea(){
      this.$navTo('packageA/pages/treasureDetails/treasureDetails')
    }
  },
};
</script>

<style>
</style>

<style lang="scss" scoped>
.point_header {
  width: 100%;
  padding: 50rpx 24rpx 40rpx;
  box-sizing: border-box;
  background-color:#fff;
  .intergal {
    width: 100%;
    background: #F0DFCF;
    border-radius: 20px;
    padding: 50rpx 37rpx 44rpx;
    display: flex;
    flex-direction: column;
    margin-bottom: 40rpx;
    text {
      font-family: PingFang SC;
      color: #666666;
      &:first-child{
        font-size: 68rpx;
        font-weight: 600;
        margin-bottom: 39rpx;
      }
      &:last-child {
        font-size: 24rpx;
        font-weight: 400;
      }
    }
  }
  .Points{
    width: 100%;
    display: flex;
    .points_tab {
      width: 100%;
      flex: 1;
      display:flex;
      flex-direction: column;
      align-items: center;
      .points_tab_img{
        width: 46rpx;
        height: 46rpx;
        margin-bottom: 29rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .points_tab_title {
        font-size: 24rpx;
        font-family: FZLanTingHei-R-GBK;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}

.Drawprize {
  margin: 19rpx 35rpx;
  .Drawprize_type {
    display: flex;
    justify-content: space-between;
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
    .Drawprize_time {
      flex: 1;
      text-align:right;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      text {
        color: #FF903F;
      }
    }
  }
}

.Drawprize_list {
  margin-top: 44rpx;
  
  border-radius: 8rpx;
  .Drawprize_item {
    background: #FFFFFF;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content:space-between;
    margin-bottom: 24rpx;
    .Drawprize_left{
      width: 280rpx;
      height: 280rpx;
      margin-right: 24rpx;
      image {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        border-radius: 10rpx
      }
    }
    .Drawprize_right{
      display: flex;
      flex-direction: column;
      justify-content:space-evenly;
      .Drawprize_step {
        display: flex;
        flex-direction: column;
        font-family: FZLanTingHei-R-GBK;
        color: #FF903F;
        font-weight: 400;
        margin-top: 21rpx;
        .step_title {
          
          font-size: 24rpx;
        }
        .steps {
          display: flex;
          align-items: center;
          margin-bottom: 69rpx;
          .step {
            width: 180rpx;
            height: 16rpx;
            background: #ff8f3f83;
            overflow: hidden;
            border-radius: 8rpx;
            position: relative;
            margin-right: 8rpx;
            &::after{
              position: absolute;
              left: 0%;
              content: "";
              width: 90%;
              background-color: #FF903F;
              height: 100%;
              border-radius:8rpx
            }
          }
          font-size: 20rpx;
        }
        .Drawprize_price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text {
              font-size: 36rpx;
              color: #FF903F;
              &:first-child{
                text {
                  font-size: 24rpx;
                }
              }
              &:nth-child(2){
                font-size: 24rpx;
                font-family: PingFang SC;
                text-decoration: line-through;
                color: #B3B3B3;
              }
              &:nth-child(3){
                color: #fff;
               
                padding: 12rpx 20rpx;
                box-sizing: border-box;
                background: linear-gradient(-30deg, #FAC26C, #FF9247);
                border-radius: 8rpx;
                font-size: 24rpx;
                
              }
            }
          }
      }
      text {
        font-family: FZLanTingHei-M-GBK;
          font-weight: 400;
        &:first-child{
          font-size: 32rpx;
          
          color: #333333;
          word-wrap: break-word;
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

.grey_mode{
  color: #999999 !important;
}
.grey_bg {
  background: #999 !important;
  &::after{
    background:#999!important;
  }
}

.users{
  font-size: 24rpx !important;
}
</style>