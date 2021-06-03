<template>
  <view class="container">
      <view class="intergal">
          <view class="intergal-item" v-for="(item, index) in intergal_type" :key="index" @click="onIntergal(item)">
              <view class="intergal_img">
                  <image
                      :src="item.img"
                      mode="widthFix"
                  />
              </view>
              {{item.value}}
          </view>
      </view>
  </view>
</template>

<script>
export default {
    data() {
        return {
            intergal_type: [
                
            ]
        }
    },
    methods: {
        onIntergal(){
            const app = this;
            app.$toast('待开放')
        } 
    },
    onLoad(options){
        const app = this;
        uni.setNavigationBarTitle({ title: options.intergal_type })
            switch (options.intergal_type) {
                case '银行积分':
                    app.intergal_type = [
                        {
                            img:'https://pic.tralife.cn/10001/20210511/92a2c07d52e3791e974c0f60b3fff72c.png',
                            value: "厦门银行",
                        },
                        {
                            img:'https://pic.tralife.cn/10001/20210511/7d41d7612d57bc70064a29c2dea43f8a.png',
                            value: "民生银行",
                        },
                        {
                            img:'https://pic.tralife.cn/10001/20210511/cb8aed888be83e63269096cda92665c4.png',
                            value: "农业银行",
                        },
                        {
                            img:'https://pic.tralife.cn/10001/20210511/3dbce409d08a90d3b97b2da97fff8132.png',
                            value: "工商银行",
                        },
                        {
                            img:'https://pic.tralife.cn/10001/20210511/a0435b7fbdbfabcee140dc85bf027a28.png',
                            value: "兴业银行",
                        },
                    ]
                    break;
                case '航空积分':
                    app.intergal_type = [
                        {
                            img:'https://pic.tralife.cn/10001/20210511/c4f04b9855bbdbadfe1abf4e7d61033c.png',
                            value: "厦门航空",
                        },
                        {
                            img:'https://pic.tralife.cn/10001/20210511/751131a4a58f353d09c0250737173a85.png',
                            value: "东方航空",
                        },
                    ]
                    break;
                case '通讯积分':
                    app.intergal_type = [
                        {
                            img:'https://pic.tralife.cn/10001/20210511/4d64a6837198a9398afe2fa7a91f541c.png',
                            value: "中国移动",
                        },
                    ]
                    break;         
            
                default:
                    
                    break;
            }
        
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 20rpx;
    box-sizing: border-box;
    .intergal {
        display: flex;
        justify-content:space-between;
        flex-wrap: wrap;
        .intergal-item {
            width: 31%;
            padding: 34rpx 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content:center;
            background-color: #fff;
            border-radius: 20rpx;
            box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.03);
            margin-bottom: 30rpx;
            .intergal_img {
                width: 50%;
                image {
                    width: 100%;
                }
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