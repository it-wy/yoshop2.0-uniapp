<template>
  <view class="container">
    <!-- 店铺页面组件 -->
    <Page :items="items" :islife="islife" />
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
        islife: false
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
		  	url:'/packageA/pages/lifeList?id='+'餐饮美食'
		  })
		  break;
		case '10004':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'健康养生'
		  })
		  break;
		case '10005':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'教育培训'
		  })
		  break;
		case '10006':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'美容美发'
		  })
		  break;
		case '10007':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'汽车服务'
		  })
		  break;
		case '10008':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'休闲娱乐'
		  })
		  break;
		case '10009':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'婚纱摄影'
		  })
		  break;
		case '10010':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'水果生鲜'
		  })
		  break;
		case '10011':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'旅游住宿'
		  })
		  break;
		case '10012':
		  uni.navigateTo({
		  	url:'/packageA/pages/lifeList?id='+'亲子乐园'
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
	}

  }
</script>

<style lang="scss" scoped>
  .container {
    background: #fff;
  }
</style>
