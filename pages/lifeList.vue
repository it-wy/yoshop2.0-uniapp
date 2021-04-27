<template>
	<view class="container">
		<view style="width: 100%;margin-bottom: 40rpx;">
			<xfl-select
			    :list="list"
			    :clearable="false"
			    :showItemNum="5" 
			    :listShow="false"
			    :isCanInput="true"  
			    :style_Container="'height: 40px; font-size: 16px;'"
			    :placeholder = "'请查找'"
			    :initValue="initValue"
			    :selectHideType="'hideAll'"
				@change="onchange"
			>
			</xfl-select>
		</view>
	       
			<Lifes />
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';     //导入
	import Lifes from '@/components/page/lifes/lifes.vue';
	export default {
		data() {
			return {
				 list: [ //要展示的数据
					'全部',
					'餐饮美食',
					'健康养生',
					'教育培训',
					'美容美发',
					'汽车服务',
					'休闲娱乐',
					'婚纱摄影',
					'水果生鲜',
					'旅游住宿',
					'亲子乐园',
				],
				initValue: '全部'
			}
		},
		components:{
			xflSelect,
			 Lifes
		},
		methods: {
			onchange(i){
				console.log(i)
			}
		},
		onUnload(){
			uni.navigateBack({
				delta:1
			})
		},
		onLoad(options) {
			this.initValue = options.id
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10rpx;
		box-sizing: border-box;
	}

</style>
