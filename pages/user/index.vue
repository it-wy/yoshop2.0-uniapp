<template>
  <view v-if="!isLoading" class="container">
    <!-- 页面头部 -->
    <view
      class="main-header"
      :style="{
        height: $platform == 'H5' ? '240rpx' : '320rpx',
        paddingTop: $platform == 'H5' ? '0' : '50rpx',
      }"
    >
      <image
        class="bg-image"
        src="https://www.tralife.cn/uploads/10001/20210408/d1b849cc48b301f3be61db9aa7fdb19f.png"
        mode="scaleToFill"
      ></image>
      <!-- 用户信息 -->
      <view v-if="isLogin" class="user-info" >
        <view class="user-avatar" @click="onUser">
          <image
            class="image"
            :src="
              userInfo.avatar_url
                ? userInfo.avatar_url
                : '/static/default-avatar.png'
            "
          ></image>
        </view>
        <view class="user-content">
          <!-- 会员昵称 -->
          <view class="nick-name">{{ userInfo.nick_name }}</view>
          <!-- 会员等级 -->
          <view
            v-if="userInfo.grade_id > 0 && userInfo.grade"
            class="user-grade"
          >
            <view class="user-grade_icon">
              <image
                class="image"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA0lBMVEUAAAD/tjL/tzH/uDP/uC7/tjH/tzH/tzL/tTH+tTL+tjP/tDD/tTD+tzD/tjL/szD/uDH/tjL/tjL+tjD/tjT/szb/tzL/tTL+uTH+tjL/tjL/tjL/tTT/tjL/tjL+tjH/uTL/vDD/tjL/tjH/tzL9uS//tTL/nBr/sS7/tjH/ujL/szD/uTv+rzf/tzL+tzH+vDP+uzL+tjP+ry7+tDL9ki/7szf/sEX/tTL/tjL+tjL/tTH/tTT/tzH/tzL/tjP/sTX/uTP/wzX+rTn/vDX9vC8m8ckhAAAAOXRSTlMAlnAMB/vjxKWGMh0S6drMiVxPRkEY9PLy0ru0sKagmo5+dGtgVCMgBP716eXWyMGxqJGRe2o5KSmFNjaYAAABP0lEQVQ4y8XS13KDMBAF0AWDDe4t7r3ETu9lVxJgJ/n/X8rKAzHG5TE+Twz3zki7I/g/KXdghIbGJewrU4yzn08Ebgl6TuZzzuOC6W5es3HX6qsSz3NFShRU0MpucytDmOSpu3yULx3CA9RD1HjVedc0jSjqm6ZzhUjDsFDQhSp/OKj5GQvg0+ZCOixsbtDLAeTTOm/yGi8GyIphIVsgH737FEDV44LJa88IRKK/SetrwT9G/GUIr6vXjoy4GXn7+RboVXnghuSjaoGecwQxL2su3CwAKlO+QFoqxI4FMctHQhQd2OhxTu184jWUlI+rMTBTn1/IQcJHQ6GQdZ7pWiDaNdhTt330efISeiqYwQEzQpTlsURJLhzkEmpCPsERfeIUVyXr6MNuIyp5uziW6xURtt7hhGwzmMNJExfO4Bd9X0ZPqAxdNwAAAABJRU5ErkJggg=="
              ></image>
            </view>
            <view class="user-grade_name">
              <text
                >{{ userInfo.grade.name }}
                {{
                  userInfo.user_id ? "(UID:" + userInfo.user_id + ")" : ""
                }}</text
              >
            </view>
          </view>
          <!-- 会员无等级时显示手机号 -->
          <view v-else class="mobile"
            >{{ userInfo.mobile
            }}{{
              userInfo.user_id ? "(UID:" + userInfo.user_id + ")" : ""
            }}</view
          >
          <!-- 城市达人 -->
          <view class="user_vip">
            <!-- <u-tag :text="vip" border-color="#c59a46" color="white" bg-color="#ff5722e0"  mode="dack" /> -->
            <view class="vip" v-if="userInfo.dr_gradeName!=''">{{ userInfo.dr_gradeName }}</view>
            &nbsp;{{ userInfo.shop_id_arr.length > 0 ? "[商家]" : "" }}
          </view>
        </view>
        <!-- #ifdef APP-PLUS -->
        <!-- <view class="user-qrcode" @click="onQrcode">
          <u-icon name="camera-fill" color="#ff5622"></u-icon>
          扫码
        </view> -->
        <!-- #endif -->
        
      </view>
      <!-- 未登录 -->
      <view v-else class="user-info" @click="handleLogin">
        <view class="user-avatar">
          <image class="image" src="/static/default-avatar.png"></image>
        </view>
        <view class="user-content">
          <view class="nick-name">未登录</view>
          <view class="login-tips">点击登录账号</view>
        </view>
      </view>
    </view>

    <!-- 我的钱包 -->
    <view class="my-asset">
      <view class="asset-left flex-box dis-flex flex-x-center">
        <view class="asset-left-item" @click="onTargetWallet">
          <view class="item-value dis-flex flex-x-center">
            <text>{{ isLogin ? assets.balance.toFixed(2) : "--" }}</text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>账户余额</text>
          </view>
        </view>
        <view class="asset-left-item" @click="onTargetPoints">
          <view class="item-value dis-flex flex-x-center">
            <text>{{ isLogin ? assets.points.toFixed(2) : "--" }}</text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text
              >我的{{ setting[SettingKeyEnum.POINTS.value].points_name }}</text
            >
          </view>
        </view>
        <view class="asset-left-item" @click="onTargetMyCoupon">
          <view class="item-value dis-flex flex-x-center">
            <text>{{ isLogin ? assets.coupon : "--" }}</text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>优惠券</text>
          </view>
        </view>
      </view>
      <view class="asset-right">
        <view class="asset-right-item" @click="onTargetWallet">
          <view class="item-icon dis-flex flex-x-center">
            <text class="iconfont icon-qianbao"></text>
          </view>
          <view class="item-name dis-flex flex-x-center">
            <text>我的钱包</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 订单操作 -->
    <view class="order-navbar">
      <view
        class="order-navbar-item"
        v-for="(item, index) in orderNavbar"
        :key="index"
        @click="onTargetOrder(item)"
      >
        <view class="item-icon">
          <text class="iconfont" :class="[`icon-${item.icon}`]"></text>
        </view>
        <view class="item-name">{{ item.name }}</view>
        <text class="order-badge" v-if="item.count && item.count > 0">{{
          item.count
        }}</text>
      </view>
    </view>

    <!-- 我的服务 -->
    <view class="my-service">
      <view class="service-title">我的服务</view>
      <view class="service-content clearfix">
        <block v-for="(item, index) in service" :key="index">
          <view
            v-if="item.type == 'link'"
            class="service-item"
            @click="handleService(item)"
          >
            <view class="item-icon">
              <text class="iconfont" :class="[`icon-${item.icon}`]"></text>
            </view>
            <view class="item-name">{{ item.name }}</view>
          </view>
          <view
            v-if="item.type == 'button' && $platform == 'MP-WEIXIN'"
            class="service-item"
          >
            <button class="btn-normal" :open-type="item.openType">
              <view class="item-icon">
                <text class="iconfont" :class="[`icon-${item.icon}`]"></text>
              </view>
              <view class="item-name">{{ item.name }}</view>
            </button>
          </view>
        </block>
      </view>
    </view>

    <!-- 备案 -->
    <view class="ba">
      <p>
        <image
          src="http://pic.tralife.cn/10001/20210427/20baeb551865e8d6eab32ac6d333c696.png"
          mode=""
        ></image
        >闽公网安备 35020302034438号
      </p>
      <p>闽ICP备20008662号-1</p>
      <p>增值电信业务经营许可证：闽B2-20210494</p>
    </view>

    <!-- 达人申请框 -->
    <u-modal v-model="show" :show-title="false" @cancel="cancel" @confirm="confirm" :mask-close-able="false" confirm-text="同意" cancel-text="不同意" :show-cancel-button="true">
      <scroll-view scroll-y style="height:400rpx;">
        <view class="container p-30 b-f">
          <p>
	<p class="MsoNormal">
		甲方：旅享通联（厦门）科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>（以下简称甲方）</span> 
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		<span>乙方：</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>（以下简称</span>乙<span>方）</span> 
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		<span>甲方为</span><span>“旅享生活”平台（简称"品牌方"</span><span>）中国大陆区</span>域唯一授权运营商,为<span>了充分发挥</span><span>“旅享生活”平台的作用,真正实现便民、利民、惠民的功能,同时让实体商家有效地开展拓客、留客业务,更好地维护和提高商家美誉及效益,经双方友好协商达成此协议</span>，<span>并自觉履行，以达到资源共享，合作共赢，共同推动事业健康，有序发展的目的。</span> 
	</p>
	<p class="MsoNormal">
		第一条&nbsp;<span>合作关系</span> 
	</p>
	<p class="MsoNormal">
		1、 双方均为独立的合法经营者，双方不存在隶属、投资、承包关系；
	</p>
	<p class="MsoNormal">
		2、 甲方通过自身平台，帮助乙方开展拓客、留客等业务；
	</p>
	<p class="MsoNormal">
		3<span>、</span> 合作过程中，<span>双方各自承担经营及员工费用；</span> 
	</p>
	<p class="MsoNormal">
		4<span>、</span> <span>乙方不得以甲方名义做出作何承诺；</span> 
	</p>
	<p class="MsoNormal">
		5<span>、</span> <span>“旅享生活”平台所有权归甲方所有，乙方仅有使用权。 </span>
	</p>
	<p class="MsoNormal">
		第二条&nbsp;<span>合作期限</span> 
	</p>
	<p class="MsoNormal">
		&nbsp;&nbsp;&nbsp;&nbsp;<span>本协议自乙方申请入驻旅享生活平台之日起生效，有效期为壹年，到期后若无异议则本合同自动续约。</span>
	</p>
	<p class="MsoNormal">
		第三条&nbsp;<span>服务</span>方式及结算约定&nbsp;
	</p>
	<p class="MsoNormal">
		1、甲方<span>与乙方约定，按照</span><span>“旅享生活”平台客户扫码交易实付金额</span><span>（具体比例以签约提交选定的比例为准）</span>；
	</p>
	<p class="MsoNormal">
		2、乙方在“旅享生活”平台上自行绑定收款账户。<span>到账时间</span><span>D+1到账，平台按照</span><span>0.3</span>%代收手续费。
	</p>
	<p class="MsoNormal">
		第四条&nbsp;<span>甲方义务</span> 
	</p>
	<p class="MsoNormal">
		1、 负责“旅享生活”平台的维护，并保证其正常运行；
	</p>
	<p class="MsoNormal">
		2、&nbsp;负责对乙方指定人员进行平台系统操作培训；
	</p>
	<p class="MsoNormal">
		<!--[if !supportLists]-->3、&nbsp;<!--[endif]-->负责对乙方使用平台时出现的问题进行沟通和调整，促成双方合作共赢；
	</p>
	<p class="MsoNormal">
		<!--[if !supportLists]-->4、&nbsp;<!--[endif]-->甲方有权根据市场和发展需要，在保证乙方资料、数据安全的情况下，对平台系统进行升级或修改，且无需获得乙方同意。
	</p>
	<p class="MsoNormal">
		第五条&nbsp;<span>乙方义务</span> 
	</p>
	<p class="MsoNormal">
		1、 店家不得限制“旅享生活”平台会员的消费次数，不准借故拒客影响会员正常消费；
	</p>
	<p class="MsoNormal">
		2、 有义务杜绝“旅享生活”平台会员虚假消费，保证使用服务平台进行交易的过程中遵守诚实信用原则，不得采取不正当交易行为，扰乱市场交易秩序；
	</p>
	<p class="MsoNormal">
		3、乙方在签订本协议时应向甲方提供合法有效并加盖公章的营业执照复印件作为本合同附件。
	</p>
	<p class="MsoNormal">
		4、乙方必须对甲方平台引流的用户提供优质的服务和产品，不得向平台用户强行推销，如因乙方原因产生平台客户抱怨、平台差评等其他问题，由乙方负责解决，由此产生甲方负面影响的，乙方应承担相关损失；
	</p>
	<p class="MsoNormal">
		5、乙方在协议有效期，应当极力维护甲方的品牌形象及声誉，不得作出任何有损甲方的言论及行动。
	</p>
	<p class="MsoNormal">
		<span>第六条</span> <span>保密事项</span>
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		甲乙双方在履行本协议期间对于所获知的另一方商业及技术秘密负有保密义务，如因此泄露造成另一方的损失，泄露一方应当承担赔偿责任。
	</p>
	<p class="MsoNormal" style="text-indent:0pt;">
		<!--[if !supportLists]-->第七条&nbsp;<!--[endif]-->违约责任
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		在合作期限内，甲、乙任意一方违反本协议之约定造成对方损失的，违约方应当赔偿守约方的全部损失（包括但不限于直接、间接经济损失，诉讼费、律师费、公告费、保全费等）
	</p>
	<p class="MsoNormal" style="text-indent:0pt;">
		<!--[if !supportLists]-->第八条&nbsp;<!--[endif]-->协议的解除
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		有下列情形之一的，甲方有权终止本协议：
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		<!--[if !supportLists]-->（1）<!--[endif]-->乙方在合作期间有不正当竞争行为，扰乱甲方平台的交易秩序；
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		<!--[if !supportLists]-->（2）<!--[endif]-->乙方发布违法或虚假信息或广告的；
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		<!--[if !supportLists]-->（3）<!--[endif]-->乙方被吊销营业执照、或被责令停业整顿等导致企业陷入瘫痪状态的；
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		<!--[if !supportLists]-->（4）<!--[endif]-->其他违法本协议约定的行为。
	</p>
	<p class="MsoNormal" style="text-indent:0pt;">
		<span>第九条</span> <span>争议解决</span>
	</p>
	<p class="MsoNormal" style="text-indent:20pt;">
		本协议履行过程中如发生争执，应通过友好协商的方式予以解决，经友好协商不能解决的，任何一方可向甲方所在地人民法院提起诉讼解决。
	</p>
	<p class="MsoNormal">
		第十条&nbsp;<span>其它约定</span> 
	</p>
	<p class="MsoNormal">
		1、 乙方若有违反以上约定的行为，甲方有权终止其指定合作商家<span>资格；</span> 
	</p>
	<p class="MsoNormal">
		2、 本协议经乙方申请入驻时在线确认视同同意本合同条款，与对应的纸质合同具有同等法律效率。
	</p>
</p>
<p>
	<br />
</p>
        </view>
      </scroll-view>
    </u-modal>
    <!-- 达人通知框 -->
    <u-modal
      v-model="is_show"
      title="达人"
      :content="content"
      @confirm="onGift"
    ></u-modal>
    <!-- 模态框 -->
    <view class="mask" @click="confi" v-show="is_drshow">
      <view class="content">
        <image
          src="http://pic.tralife.cn/10001/20210419/24337d376972960ff287eb6780250284.png"
          mode="scaleToFill"
        />
        <p>恭喜您成功升级为达人</p>
      </view>
    </view>
  </view>
</template>

<script>
import { setCartTabBadge } from "@/utils/app";
import SettingKeyEnum from "@/common/enum/setting/Key";
import SettingModel from "@/common/model/Setting";
import * as UserApi from "@/api/user";
import * as OrderApi from "@/api/order";
import { checkLogin } from "@/utils/app";

// 订单操作
const orderNavbar = [
  { id: "all", name: "全部订单", icon: "qpdingdan" },
  { id: "payment", name: "待支付", icon: "daifukuan", count: 0 },
  { id: "delivery", name: "待发货", icon: "daifahuo", count: 0 },
  { id: "received", name: "待收货", icon: "daishouhuo", count: 0 },
];

/**
 * 我的服务
 * id: 标识; name: 标题名称; icon: 图标; type 类型(link和button); url: 跳转的链接
 */

export default {
  data() {
    return {
      // 枚举类
      SettingKeyEnum,
      // 当前运行的终端 (此处并不冗余,因为微信小程序端view层无法直接读取$platform)
      $platform: this.$platform,
      // 正在加载
      isLoading: true,
      // 是否已登录
      isLogin: false,
      // 系统设置
      setting: {},
      // 当前用户信息
      userInfo: {},
      // 账户资产
      assets: { balance: "--", points: "--", coupon: "--" },
      // 我的服务
      service: [
        {
          id: "address",
          name: "收货地址",
          icon: "shouhuodizhi",
          type: "link",
          url: "pages/address/index",
        },
        
        {
          id: "coupon",
          name: "申请达人",
          icon: "lingquan",
          type: "link",
          url: "packageA/pages/gift/gift",
        },
        {
          id: "myCoupon",
          name: "我的粉丝",
          icon: "tuandui",
          type: "link",
          url: "packageA/pages/fans/fans",
        },
        {
          id: "help",
          name: "我要分享",
          icon: "fenxiang",
          type: "link",
          url: "packageA/pages/share/share",
        },
        {
          id: "contact",
          name: "在线客服",
          icon: "kefu",
          type: "button",
          openType: "contact",
        },
        {
          id: "poin",
          name: "我的明细",
          icon: "jifen",
          type: "link",
          url: "packageA/pages/log/log",
        },
        // { id: 'refund', name: '退换/售后', icon: 'shouhou', type: 'link', url: 'pages/refund/index' },
        // { id: 'refund', name: '夺宝订单', icon: 'fuwu', type: 'link', url: 'pages/refund/index' },
        {
          id: "refund",
          name: "绑定手机",
          icon: "dianhua",
          type: "link",
          url: "packageA/pages/with/with",
        },
      ],
      // 订单操作
      orderNavbar,
      // 当前用户待处理的订单数量
      todoCounts: { payment: 0, deliver: 0, received: 0 },
      // 达人弹窗显示
      show: false,
      // 达人领取
      content: "您已购买达人商品,还没有填写收货地址！",
      // 礼包弹窗显示
      is_show: false,
      // 定位
      vip: "普通会员",
      is_drshow: false,
      cur_shopId: '', // 默认为同意协议商铺id
      agree: '' // 0 no 1 ok
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options) {
    const app = this;
    // 更新购物车角标
    setCartTabBadge();
    // 判断是否已登录
    this.isLogin = checkLogin();
    
     this.service = [
            {
              id: "address",
              name: "收货地址",
              icon: "shouhuodizhi",
              type: "link",
              url: "pages/address/index",
            },
            {
              id: "address",
              name: "获取积分",
              icon: "help",
              type: "link",
              url: "packageA/pages/intergal/index",
            },
            { id: 'poin', name: '消费卡充值', icon: 'qianbao', type: 'link', url: 'packageA/pages/cardrecharge/cardrecharge' },
            {
              id: "!app",
              name: "申请达人",
              icon: "lingquan",
              type: "link",
              url: "packageA/pages/gift/gift",
            },
            {
              id: "myCoupon",
              name: "我的粉丝",
              icon: "tuandui",
              type: "link",
              url: "packageA/pages/fans/fans",
            },
            {
              id: "help",
              name: "我要分享",
              icon: "fenxiang",
              type: "link",
              url: "packageA/pages/share/share",
            },

            {
              id: "contact",
              name: "在线客服",
              icon: "kefu",
              type: "button",
              openType: "contact",
            },
            {
              id: "poin",
              name: "我的明细",
              icon: "jifen",
              type: "link",
              url: "packageA/pages/log/log",
            },
            // { id: 'refund', name: '退换/售后', icon: 'shouhou', type: 'link', url: 'pages/refund/index' },
            // { id: 'refund', name: '夺宝订单', icon: 'fuwu', type: 'link', url: 'pages/refund/index' },
            {
              id: "refund",
              name: "绑定手机",
              icon: "dianhua",
              type: "link",
              url: "packageA/pages/with/with",
            },
            {
              id: "refund",
              name: "用户帮助",
              icon: "help",
              type: "link",
              url: "packageA/pages2/index/index",
            },
            
            { id: 'poin', name: '商家入驻', icon: 'dianpu', type: 'link', url: 'packageA/pages/shopformSelect/shopformSelect' },
            // { id: 'poin', name: '商家分账', icon: 'sy-yh', type: 'link', url: 'packageA/pages/merchantsplit/merchantsplit' },    
          ];
           
    this.getPageData();

    uni.getStorage({
      key: "res_id",
      success: ({ data }) => {
        if (this.isLogin) {
          return new Promise((resolve, reject) => {
            UserApi.userShare({ res_id: data })
              .then((result) => {

                uni.removeStorageSync("res_id");
                resolve(result);
              })
              .catch((err) => {
                if (err.result && err.result.status == 401) {
                  resolve(null);
                } else {
                  reject(err);
                }
              });
          });
        }
      },
    });
  },
  onLoad(options) {
    const app = this;
    // if(options.scene){
    //   uni.setStorage({
    // 	key: 'res_id',
    // 	data: decodeURIComponent(options.scene),
    //   })
    // }
  },

  methods: {
    // 获取页面数据
    getPageData(callback) {
      const app = this;
      app.isLoading = true;
      
      Promise.all([
        app.getSetting(),
        app.getUserInfo(),
        app.getUserAssets(),
        app.getTodoCounts(),
      ])
        .then((result) => {
          app.isLoading = false;
          // app.initSer();
          // 获取页面数据
         
          // 初始化我的服务数据
          app.initService();
          // 初始化订单操作数据
          app.initOrderTabbar();
          // 执行回调函数
          callback && callback();
        })
        .catch((err) => {
          console.log("catch", err);
          app.initGet()
        });
    },
    confi() {
      this.is_drshow = false;
    },

    // 初始化我的服务数据
    initService() {
      
      const app = this;
      
      const newService = [];
      app.service.forEach((item) => {
        if (item.id === "points") {
          item.name =
            "我的" + app.setting[SettingKeyEnum.POINTS.value].points_name;
        }
        newService.push(item);
      });
      app.service = newService;
      
    },

    // 初始化订单操作数据
    initOrderTabbar() {
      const app = this;
      const newOrderNavbar = [];
      orderNavbar.forEach((item) => {
        if (item.hasOwnProperty("count")) {
          item.count = app.todoCounts[item.id];
        }
        newOrderNavbar.push(item);
      });
      app.orderNavbar = newOrderNavbar;
    },

    // 获取商城设置
    getSetting() {
      const app = this;
      return new Promise((resolve, reject) => {
        SettingModel.data()
          .then((setting) => {
            app.setting = setting;
            
            resolve(setting);
          })
          .catch((err) => reject(err));
      });
    },

    // 获取当前用户信息
    getUserInfo(i = 0) {
      const app = this;
      if (!app.isLogin) {
        app.initGet();
      }
      return new Promise((resolve, reject) => {
        !app.isLogin
          ? resolve(null)
          : UserApi.info()
              .then((result) => {
                app.userInfo = result.data.userInfo;

                

                if(i!=1){
                  const arr = [{
                  id: "help",
                  name: "商家二维码",
                  icon: "erweima",
                  type: "link",
                  url: "packageA/pages/share/share?shop=shop",
                },
                {
                  id: "poin",
                  name: "商家提现明细",
                  icon: "zhangben",
                  type: "link",
                  url: "packageA/pages/log/log?log=shop",
                },
                {
                  id: "poin",
                  name: "商家流水",
                  icon: "zhangben",
                  type: "link",
                  url: "packageA/pages/log/log?log=shops",
                },
                {
                  id: "poin",
                  name: "商家提现",
                  icon: "fapiaoguanli",
                  type: "link",
                  url: "packageA/pages/with/with?type=swith",
                },]

                app.service = [...app.service, ...arr]
                app.initSer();
                
                }
                


                for (const i of  app.userInfo.shopAll) {
                  if(i.status==10){ 
                    app.cur_shopId = i.shop_id;
                    app.show = true;
                    break;
                  } 
                }
                
                
               
                if (app.userInfo.drOrder) {
                  app.is_show = true;
                }

                
                
                
                
                resolve(app.userInfo);
              })
              .catch((err) => {
                if (err.result && err.result.status == 401) {
                  app.isLogin = false;
                  resolve(null);
                } else {
                  reject(err);
                }
              });
      });
    },

    // 获取账户资产
    getUserAssets() {
      const app = this;
      return new Promise((resolve, reject) => {
        !app.isLogin
          ? resolve(null)
          : UserApi.assets()
              .then((result) => {
                app.assets = result.data.assets;
                resolve(app.assets);
              })
              .catch((err) => {
                if (err.result && err.result.status == 401) {
                  app.isLogin = false;
                  resolve(null);
                } else {
                  reject(err);
                }
              });
      });
    },

    // 获取当前用户待处理的订单数量
    getTodoCounts() {
      const app = this;
      return new Promise((resolve, reject) => {
        !app.isLogin
          ? resolve(null)
          : OrderApi.todoCounts()
              .then((result) => {
                app.todoCounts = result.data.counts;
                resolve(app.todoCounts);
              })
              .catch((err) => {
                if (err.result && err.result.status == 401) {
                  app.isLogin = false;
                  resolve(null);
                } else {
                  reject(err);
                }
              });
      });
    },

    // 跳转到登录页
    handleLogin() {
      !this.isLogin && this.$navTo("pages/login/index");
    },

    // 跳转到钱包页面
    onTargetWallet() {
      this.$navTo("packageA/pages/wallet/index");
    },

    // 跳转到订单页
    onTargetOrder(item) {
      this.$navTo("pages/order/index", { dataType: item.id });
    },

    // 跳转到我的积分页面
    onTargetPoints() {
      this.$navTo("packageA/pages/points/log");
    },

    // 跳转到我的优惠券页
    onTargetMyCoupon() {
      this.$navTo("pages/my-");
    },

    // 跳转到服务页面
    handleService({ url, id }) {
      if (url == "packageA/pages/with/with") {
        this.$navTo(url, { type: "phone" });
      }else if(this.userInfo.sku){
        this.$navTo(url, {sku: this.userInfo.sku});
      } else {
        this.$navTo(url);
      }
      // const i = url!=''? this.$navTo(url) : this.show = true;
    },

    // 达人余额支付
    cancel() {
      this.show = false;
      app.agree = 0;
      app.confirm();
    },

    // 达人微信支付
    confirm() {
      const app = this;
      app.agree = 1;
      return new Promise((resolve, reject)=>{
        UserApi.agree({shop_id: app.cur_shopId, agree: app.agree})
        .then(res=>{
          app.show = false;
          setTimeout(()=>{
            app.getUserInfo(1);
          },300)
          
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    onGift() {
      const app = this;
      uni.navigateTo({
        url: "/pages/address/create?drOrder=" + app.userInfo.drOrder,
      });
    },

    // 个人中心
    onUser() {
      uni.navigateTo({
        url: "/packageA/pages/userinfo/index",
      });
    },
    initSer() {
      
      const app = this;

      if (app.userInfo.dr_grade == 0) {
        app.vip = "普通会员";
        uni.removeStorage({
          key: "isdr",
        });
      } else {
        app.service = app.service.filter((i) => {
          return i.id != "!app";
        });
        app.vip =
          app.userInfo.dr_grade == 1
            ? "城市达人"
            : app.userInfo.dr_grade == 2
            ? "团长"
            : app.userInfo.dr_grade == 3
            ? "县级服务商"
            : app.userInfo.dr_grade == 4
            ? "市级服务商"
            : app.userInfo.dr_grade == 5
            ? "省级服务商"
            : app.userInfo.dr_grade == 6
            ? "运营中心"
            : "达人";

        uni.getStorage({
          key: "isdr",
          fail: (error) => {
            uni.setStorage({
              key: "isdr",
              data: true,
              success: () => {
                uni.getStorage({
                  key: "isdr",
                  success: ({ data }) => {
                    this.is_drshow = data;
                  },
                });
              },
            });
          },
        });

        app.$forceUpdate();
      }

      if (
        app.userInfo.shop_id_arr != undefined &&
        app.userInfo.shop_id_arr.length > 0
      ) {
      } else {
        app.service = app.service.filter((i) => {
          return i.name != "商家二维码";
        });
        app.service = app.service.filter((i) => {
          return i.name != "商家提现明细";
        });
        app.service = app.service.filter((i) => {
          return i.name != "商家提现";
        });

        app.service = app.service.filter((i) => {
          return i.name != "商家流水";
        });

        app.$forceUpdate();
      }

      if (app.userInfo.mobile != "") {
        app.service.map((i) => {
          if (i.name == "绑定手机") {
            i.name = "设置";
            i.icon = "shezhi";
            i.url = "packageA/pages/userinfo/index";
          }
        });

        app.$forceUpdate();
      }
      
      uni.setStorage({
      key: 'dr_type',
      data: app.userInfo.sku,
    })
      if(app.userInfo.res_table!=null){

        // if(app.userInfo.res_table.includes('100278')){
        // app.service.forEach((i) => {
        //   if(i.id == '!app'){
        //     i.id = 'app';
        //     uni.setStorage({
        //       key: 'dr_type',
        //       data: i.id,
        //     })
        //   } 
        // });
      //   app.$forceUpdate();
      // }
      }
      

      
    },
    initGet() {
      const app = this;
      app.service = app.service.filter((i) => {
        return i.name != "申请达人";
      });

      app.service = app.service.filter((i) => {
        return i.name != "商家二维码";
      });
      app.service = app.service.filter((i) => {
        return i.name != "商家提现明细";
      });
      app.service = app.service.filter((i) => {
        return i.name != "商家提现";
      });

      app.service = app.service.filter((i) => {
        return i.name != "商家流水";
      });
      app.service = app.service.filter((i) => {
        return i.name != "绑定手机";
      });
    },
    // 扫码
    onQrcode() {
      // 允许从相机和相册扫码
      uni.scanCode({
        success: function (res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        },
      });
    },
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    // 获取首页数据
    // this.getPageData(() => {
    //   uni.stopPullDownRefresh();
    // });
  },
};
</script>

<style lang="scss" scoped>
// 页面头部
.main-header {
  background-color: #fff;
  // background-image: url('/static/background/user-header.png');
  position: relative;
  width: 100%;
  height: 280rpx;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  // padding-top: 40rpx;
  padding-left: 30rpx;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .user-info {
    display: flex;
    height: 100rpx;
    z-index: 1;
    width: 100%;
    margin-right: 30rpx;
    .user-avatar .image {
      display: block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }

    .user-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 30rpx;
      color: #c59a46;
      flex: 1;
      
      .nick-name {
        font-size: 32rpx;
        font-weight: bold;
      }

      .mobile {
        margin: 15rpx 0;
        font-size: 26rpx;
      }

      .user-grade {
        display: flex;
        align-items: center;
        background: #3c3c3c;
        margin-top: 12rpx;
        border-radius: 10rpx;
        padding: 4rpx 12rpx;

        .user-grade_icon .image {
          display: block;
          width: 32rpx;
          height: 32rpx;
        }

        .user-grade_name {
          margin-left: 5rpx;
          font-size: 24rpx;
          color: #eee0c3;
        }
      }

      .login-tips {
        margin-top: 12rpx;
        font-size: 28rpx;
      }
    }

    .user-qrcode {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      color: #ff5622;
    }
  }
}

// 我的钱包
.my-asset {
  display: flex;
  background: #fff;
  padding: 40rpx 0;

  .asset-right {
    width: 200rpx;
    border-left: 1rpx solid #eee;
  }

  .asset-right-item {
    text-align: center;
    color: #545454;

    .item-icon {
      font-size: 40rpx;
    }

    .item-name {
      margin-top: 10rpx;
    }

    .item-name text {
      font-size: 25rpx;
    }
  }

  .asset-left-item {
    text-align: center;
    color: #666;
    padding: 0 37rpx;

    .item-value {
      font-size: 30rpx;
      color: red;
    }

    .item-name {
      margin-top: 6rpx;
    }

    .item-name {
      font-size: 25rpx;
    }
  }
}

// 订单操作
.order-navbar {
  display: flex;
  margin: 20rpx auto 20rpx auto;
  padding: 20rpx 0;
  width: 94%;
  box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
  font-size: 30rpx;
  border-radius: 5rpx;
  background: #fff;

  &-item {
    position: relative;
    width: 25%;

    .item-icon {
      text-align: center;
      margin: 0 auto;
      padding: 10rpx 0;
      color: #545454;
      font-size: 40rpx;
    }

    .item-name {
      font-size: 24rpx;
      color: #545454;
      text-align: center;
      margin-right: 10rpx;
    }

    .order-badge {
      position: absolute;
      top: 0;
      right: 55rpx;
      font-size: 22rpx;
      background: #fa2209;
      text-align: center;
      line-height: 28rpx;
      color: #fff;
      border-radius: 100%;
      min-height: 30rpx;
      min-width: 30rpx;
      padding: 1rpx;
    }
  }
}

// 我的服务
.my-service {
  margin: 22rpx auto 22rpx auto;
  padding: 20rpx 0;
  width: 94%;
  box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
  border-radius: 5rpx;
  background: #fff;

  .service-title {
    padding-left: 20rpx;
    margin-bottom: 30rpx;
    font-size: 28rpx;
  }

  .service-content {
    // margin-bottom: -30rpx;
    .service-item {
      position: relative;
      width: 25%;
      float: left;
      margin-bottom: 30rpx;

      .item-icon {
        text-align: center;
        margin: 0 auto;
        padding: 10rpx 0;
        color: #ff3800;
        font-size: 40rpx;
      }

      .item-name {
        font-size: 24rpx;
        color: #545454;
        text-align: center;
        // margin-right: 10rpx;
      }
    }
  }
}

.mask {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.692);
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      text-align: center;
      color: white;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}

.p1 {
  margin: 30rpx;
  text-align: center;
}
.ba {
  margin-top: 35rpx;
  p {
    text-align: center;
    color: #858687;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }
  }
}

.user_vip {
  display: flex;
  .vip {
    // border: 2rpx solid #c59a46;
    background: #ff5622;
    color: white;
    border-radius: 4rpx;
    font-size: 22rpx;
    height: 46rpx;
    padding: 8rpx 22rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
}
</style>
