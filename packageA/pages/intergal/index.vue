<template>
  <view class="container">
      <view class="intergal">
          <view class="intergal-item" v-for="(item, index) in intergal_type" :key="index" @click="onIntergal(item.value)">
              <view class="intergal_img">
                <image
                    :src="item.img"
                    mode="widthFix"
                />
              </view>
              <view class="intergal_title">
                  {{item.value}}
              </view>
              

          </view>
      </view>
  </view>
</template>

<script>
export default {
    data() {
        return {
            intergal_type: [
                {
                    img:'https://pic.tralife.cn/10001/20210510/82cb025108073a7b5daf0f7a1e3f4365.png',
                    value: "银行积分",
                },
                {
                    img:'https://pic.tralife.cn/10001/20210510/e11c0042980fe20e0e099de03afe24e4.png',
                    value: "航空积分",
                },
                {
                    img:'https://pic.tralife.cn/10001/20210510/c390a20637ded30e11569a0d9a5204f6.png',
                    value: "通讯积分",
                },
                {
                    img:'https://pic.tralife.cn/10001/20210510/67840a8306df961f78268a060fc647dd.png',
                    value: "其他积分"
                },   
            ]
        }
    },
    methods: {
        onIntergal(i){
            const app = this;
            switch (i) {
                case '银行积分':
                    app.$navTo('packageA/pages/intergaltype/index',{intergal_type:i})
                    break;
                case '航空积分':
                    app.$navTo('packageA/pages/intergaltype/index',{intergal_type:i})
                    break;
                case '通讯积分':
                    app.$navTo('packageA/pages/intergaltype/index',{intergal_type:i})
                    break;        
            
                default:
                    app.$toast('待开放')
                    break;
            }
        },
        
        
    },
    onLoad(){
        
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 25rpx;
    box-sizing: border-box;
    .intergal {
        display: flex;
        justify-content:space-between;
        flex-wrap: wrap;
        .intergal-item {
            width: 340rpx;
            
            background: #FFFFFF;
            box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.03);
            border-radius: 20px;
            padding: 82rpx 0 52rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content:center;
            margin-bottom: 30rpx;
            .intergal_img {
                width: inherit;
                max-width: 123rpx;
                margin-bottom: 43rpx;
                image {
                    width: 100%;
                }
            }
            .intergal_title{
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
        &::after{
            content: "";
            width: 30%;
            height: auto;
        }
    }
}
</style>