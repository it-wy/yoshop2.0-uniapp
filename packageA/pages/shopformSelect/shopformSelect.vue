<template>
  <view class="container b-f">
    <view class="wrap">

    <p class="store" @click="onTarget">申请记录</p>
    <p class="selects">请选择您的身份</p>
    <view class="cards">
      <view  class="tag-item" @click="onShopform(1)">
        <view class="circle" :class="{active: idx==1}">
           <image
          :src="d_img"
          mode="widthFix"
        />
        </view>
       
        我是商家
      </view>
      <view  class="tag-item" @click="onShopform(2)">
        <view class="circle" :class="{active: idx==2}">

        
         <image
          :src="c_img"
          mode="widthFix"
        />
        </view>
        帮助入驻
      </view>
    </view>
    </view>
    
    <view class="d-btn step-btn" :class="{disbtn:idx==''? true:false}" @click="targetShopform">
      下一步
    </view>
    
  </view>
				
  
</template>

<script>

export default {
  data() {
    return {
      idx: '',
      d_img: 'https://pic.tralife.cn/10001/20210524/458a44a319cebf90b915d733f8c27274.png',
      c_img: 'https://pic.tralife.cn/10001/20210524/fbd94d9980802a43221ce350c66aca0b.png'
    }
  },
  methods: {
    onShopform(i){
      this.idx = i;
      if(i==1){
        this.d_img = 'https://pic.tralife.cn/10001/20210524/e580d262f919e60ccf9cd1662e5ae3bc.png'
        this.c_img = 'https://pic.tralife.cn/10001/20210524/fbd94d9980802a43221ce350c66aca0b.png'
      }else {
        this.d_img = 'https://pic.tralife.cn/10001/20210524/458a44a319cebf90b915d733f8c27274.png'
         this.c_img = 'https://pic.tralife.cn/10001/20210524/b15a33bce1a069282becb5ac47fc5649.png'
      }
    },
    targetShopform(){
        if(this.idx!='')
        this.$navTo('packageA/pages/shopform/shopform',{type: this.idx})
    },
    onTarget(){
      this.$navTo('packageA/pages/shopformList/shopformList')
    }
    
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    
    // this.getShopFormList();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    
  },
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    
  },
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
  position: absolute;
  left:0;
  top:0;
  height:100%;
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  .wrap {
    width: 100%;
  
  .store {
    text-align: right;
  }
  .selects {
    text-align: center;
    font-size: 46rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin: 124rpx 0 174rpx 0;
  }
  .cards {
    display: flex;
    justify-content: space-evenly;
    .tag-item {
      width: 46%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .circle {
        margin-bottom: 31rpx;
        
        image {
          width: 210rpx;
          
        }
      }
    }
  }
  }
  
 

  .empty-data {
    margin-top: 25rpx;
    width: 100%;
    text-align: center;
  }

  .store-record {
    width: 100%;
    padding: 22rpx 0rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #f5f5f5;
    display: flex;
    align-items: center;
    image {
      margin-right: 20rpx;
      width: 68rpx;
    }
    .store-r {
      display: flex;
      flex-direction: column;
      justify-content:center;
      margin-right: 10rpx;
    }
    .wrap-r{
      width: 82rpx;
      height: 42rpx;
    }
    text {
      &:nth-of-type(1){
        
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

.step-btn {
  align-self: flex-end;
}

.disbtn {
  opacity: .5;
}
.active {
  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}
</style>
