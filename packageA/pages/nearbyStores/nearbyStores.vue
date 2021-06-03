<template>
  <view>
    <!-- 传入门店信息，标记点 -->
    
        <da-position :storeData="storeData" :markers="markers"></da-position>
   
   
  </view>
</template>

<script>
import daPosition from "@/components/da-position/da-position.vue";

import * as ShopApi from '@/api/shop';
export default {
  components: {
    daPosition,
  },
  data() {
    return {
      // 门店信息展示
      storeData: [
        // {
        //   id: 1,
        //   name: "门店dadaqianduan1号",
        //   address: "厦门市号",
        //   tel: "12345678956",
        // },
        // {
        //   id: 2,
        //   name: "门店dadaqianduan2号",
        //   address: "厦门市号2号",
        //   tel: "12522222222",
        // },
      ],
      //门店在地图上的标记
      markers: [
        // {
        //   id: 1,
        //   latitude: 24.485761,
        //   longitude: 118.176881,
        //   iconPath: "/static/shop2.png",
        //   width: 35,
        //   height: 35,
        //   callout: {
        //     content: "门店XXXXX1号店",
        //     borderRadius: 10,
        //     padding: 10,
        //     display: "ALWAYS",
        //   },
        // },
        // {
        //   id: 2,
        //   latitude: 24.465761,
        //   longitude: 118.186881,
        //   iconPath: "/static/shop2.png",
        //   width: 35,
        //   height: 35,
        //   callout: {
        //     content: "门店XXXXX2号店",
        //     borderRadius: 10,
        //     padding: 10,
        //     display: "ALWAYS",
        //   },
        // },
      ],
	  form: {
		  page: 0,
		  status: 4,
		  type_id: 0,
		  lat:'',
		  lng:''
	  },
	  isMore: true,
	  isopen: true
    };
  },
  onLoad() {
    
	
	
    
  },
  mounted() {
    const app = this;
    uni.getStorage({
      key: 'gps',
      success: ({ data }) => {
        
        app.form.lng = data.lng;
        app.form.lat = data.lat;
        app.getShopList()
        uni.$on('getShopList', (data) => {
          app.getShopList()
        })
        
      },
      fail: (error) => {}
    })
  },
  onUnload() {
	  uni.$off('getShopList')
  },
  onShow() {
    console.log("页面显示了");
  },
  onReady() {
    console.log("页面初次渲染完成了");
  },
  onHide() {
    console.log("页面隐藏了");
  },
  methods: {
    // 获取店铺
    getShopList() {
      const app = this;
		
      if (app.isMore) {
		  app.form.page++;
        return new Promise((resolve, reject) => {
          ShopApi.list(app.form)
            .then((result) => {
              
              app.isMore =
                result.data.result.current_page == result.data.result.last_page
                  ? false
                  : true;
              
			if (result.data.result.data.length > 0) {
				app.markers = [...app.markers, ...result.data.result.markers];
				app.storeData = [...app.storeData, ...result.data.result.storeData];
				app.isopen = result.data.result.button_open;
			}
              

              resolve(result.data);
            })
            .catch((err) => {
              if (err.result && err.result.status == 401) {
                // app.isLogin = false
                resolve(null);
              } else {
                reject(err);
              }
            });
        });
      } else {
        // uni.showToast({
        //   icon: "none",
        //   title: "没有更多了",
        // });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
