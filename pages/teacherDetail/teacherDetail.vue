<template>
	<view class="content" v-if="data.tpic">
		<image class="pic" :src="server.host + data.tpic" mode="widthFix"></image>
		<view class="detail">
			<text class="title">
				姓名：
				<text class="tcolor">{{data.tname}}</text>
			</text>
			<view class="title">
				主讲课程：
				<text class="tcolor">{{data.maincourse}}</text>
			</view>
			<view class="title">授课风格：</view>
			<view class="desc">{{data.style}}</view>
			<view class="title">工作经历：</view>
			<view class="desc">{{data.experience}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: []
			};
		},
		onLoad(options) {
			let tid = options.tid
			// #ifdef H5
				if(!tid){
					uni.showModal({
						title: '警告',
						content: '你!逮到了!',
						showCancel: false,
						success: (res) => {
							// 销毁跳转
							uni.switchTab({
								url: '/pages/teacher/teacher'
							})
							return
						}
					})
				}
			// #endif
			uni.request({
				url: this.server.teacherDetail(tid),
				withCredentials: true,
				success: (res) => {
					this.data = res.data
				}
			})
		}
	}
</script>

<style lang="scss">
.pic{
width: 100%;
}
.detail{
	padding: 20rpx;
	.title{
		font-size: $uni-font-size-lg;
		font-weight: bold;
		margin-bottom: 10rpx;
		.tcolor{
			color: $iweb-theme-color-reverse;
		}
	}
	.desc{
		text-indent: 64rpx;
	}
}
</style>
