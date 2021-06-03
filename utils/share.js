import store from '@/store'
/* #ifdef H5 */
import jweixin from './jweixin'
import * as UserApi from '@/api/user'
/* #endif */
export default{
    data(){
        return {
           //设置默认的分享参数
           //如果页面不设置share，就触发这个默认的分享
		   // 全局分享设置
            share:{
                title:'分享',
                path:'/'+this.__route__+'?scene='+store.getters.userId,
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
    methods: {
        onH5Share(){
            const app = this;
            return new Promise((resolve, reject) => {
                UserApi.userOpenShare({url: window.location.href})
                .then((res) => {
                    const { data } = res;
                    
                    
                    jweixin.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId:'wx374b7f026d00b120', // 必填，公众号的唯一标识
                        timestamp:data.timestamp, // 必填，生成签名的时间戳
                        nonceStr:data.nonceStr, // 必填，生成签名的随机串
                        signature:data.signature, // 必填，签名，见附录1
                        jsApiList: [
                        'onMenuShareTimeline',//分享接口
                        'onMenuShareAppMessage',//分享接口
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                      });
                      if(this.goods){
                        var {goods_name, goods_image} = this.goods
                      }
                      
                      if(this.shopInfo){
                        var {shop_name, shop_image} = this.shopInfo
                      }
                      
                      jweixin.ready(()=>{
                        // 显示分享按钮  
                        jweixin.showOptionMenu();  
                        //配置自定义分享内容
                        jweixin.onMenuShareAppMessage({
                            title: "旅享生活", // 分享标题
                            desc: this.route== 'pages/goods/detail'?goods_name :this.route == 'packageA/pages/shopDesc/shopDesc'? shop_name :"快来加入旅享生活", // 分享描述
                            link: window.location.href+`&refereeId=`+store.getters.userId, // 分享链接，当前页面地址
                            imgUrl: this.route== 'pages/goods/detail'?goods_image :this.route == 'packageA/pages/shopDesc/shopDesc'? shop_image :"https://pic.tralife.cn/10001/20210517/b2c62ccefff24ac64bd9aba07ceceb05.png", // 分享图标的链接
                            type: "link", // 分享类型
                            dataUrl: "", // 默认为空
                            success: res=> {
                                console.log(res)
                            }
                        });
                      });
                    
                    resolve(res);
                })
                .catch((err) => reject(err));
            });    



            
        }
    },
    onLoad(options) {
        /* #ifdef H5 */
        setTimeout(() =>{
            this.onH5Share();
        },300)
        /* #endif */

        if(options && options.refereeId){
            uni.setStorage({
                key: 'res_id',
                data: decodeURIComponent(options.refereeId),
                success: res=> {
                    
                }
            })
              
        }
        

    },
    /* #ifdef MP-WEIXIN || APP-PLUS */
    onShareAppMessage(res) {
		
		
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    },
    /* #endif */

    
    
   
}    