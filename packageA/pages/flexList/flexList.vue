<template>
  <view class=""> 正在开发中 </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  onUnload() {
    uni.switchTab({
    	url:'/pages/index/index'
    });
  },
  onReachBottom() {},
  methods: {},
};
</script>

<style>
</style>

<style lang="scss" scoped>
</style>