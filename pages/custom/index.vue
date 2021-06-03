<template>
  <view class="container">
    <!-- 店铺页面组件 -->
    <Page :items="items" :islife="islife" :isfixed="isfixed" :scrolltop="scrolltop" />
  </view>
</template>

<script>
  import * as Api from '@/api/page'
  import Page from '@/components/page'

  const App = getApp()

  export default {
    components: {
      Page
    },
    data() {
      return {
        // 页面参数
        options: {},
        // 页面属性
        page: {},
        // 页面元素
        items: [],
        // 是否本地生活
        islife: false,
        // 是否固定
        isfixed: false,
        // 距离顶部
        scrolltop: 0
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // 当前页面参数
      this.options = options
      
		// 根据pageid跳转
	  switch (this.options.pageId) {
	    case '10002':
	      this.islife = true;
	      break;
		case '10003':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10001
		  })
		  break;
		case '10004':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10002
		  })
		  break;
		case '10005':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10003
		  })
		  break;
		case '10006':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10004
		  })
		  break;
		case '10007':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10005
		  })
		  break;
		case '10008':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10006
		  })
		  break;
		case '10009':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10007
		  })
		  break;
		case '10010':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10008
		  })
		  break;
		case '10011':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10009
		  })
		  break;
		case '10012':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+this.options.title+'&shopId='+10010
		  })
		  break;
    case '10014':
      
		  uni.navigateTo({
		  	url:'/packageA/pages/lifepay/lifepay'
		  })
		  break;
    case '10015':
      
		   uni.navigateTo({
		  	url:'/packageA/pages/flexList/flexList'
		  })
		  break;    					
	  
	    default:
	      break;
	  }
      // 加载页面数据
      this.getPageData()
			
	  	
	 
    },
    methods: {

      /**
       * 加载页面数据
       * @param {Object} callback
       */
      getPageData(callback) {
        const app = this
        const pageId = app.options.pageId || 0
        Api.detail(pageId)
          .then(result => {
            // 设置页面数据
            const { data: { pageData } } = result
            app.page = pageData.page
            app.items = pageData.items
            app.items.map((item) =>{
              
              if(item.name == '导航组'){
                item.data.map((v,k) =>{ 
                  v.shopId = 10000+(k+1)
                })
                
                uni.setStorage({
                  key: 'shopList',
                  data: item.data,
                })
              }
              
            })
            // 设置顶部导航栏栏
            app.setPageBar();
          })
          .finally(() => callback && callback())
      },

      /**
       * 设置顶部导航栏
       */
      setPageBar() {
        const { page } = this
        // 设置页面标题
        uni.setNavigationBarTitle({
          title: page.params.title
        })
        // 设置navbar标题、颜色
        uni.setNavigationBarColor({
          frontColor: page.style.titleTextColor === 'white' ? '#ffffff' : '#000000',
          backgroundColor: page.style.titleBackgroundColor
        })
      }

    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
		
      // 获取首页数据
      this.getPageData(() => {
        uni.stopPullDownRefresh()
      })
	  
    },

    /**
     * 分享当前页面
     */
    onShareAppMessage() {
      const app = this
      const { page } = app
      return {
        title: page.params.share_title,
        path: "/pages/index/index?" + app.$getShareUrlParams()
      }
    },

    /**
     * 分享到朋友圈
     * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
     * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
     */
    onShareTimeline() {
      const app = this
      const { page } = app
      return {
        title: page.params.share_title,
        path: "/pages/index/index?" + app.$getShareUrlParams()
      }
    },
	//上拉
	onReachBottom() {
		uni.$emit('onReachBottom');
	},
   // 页面滚动
  onPageScroll({ scrollTop }) {
   
    this.isfixed = scrollTop>393 ? true : false;
    this.scrolltop = scrollTop;
  }

  }
</script>

<style lang="scss" scoped>
  .container {
    background: #fff;
  }
</style>
