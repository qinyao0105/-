<template>
	<view class="content">
		<view class="header">
			<view class="title">金牌讲师</view>
		</view>
		<view class="teacher" v-for="(item,index) in teacherList" :key="index" @click="onTeacherClick(item.tid)">
			<view>
				<image class="pic" :src="server.host + item.tpic" mode="widthFix"></image>
			</view>
			<view class="detail">
				<text class="tname">{{item.tname}}</text>
				<text class="maincourse">{{item.maincourse}}</text>
				<view class="tstyle">授课风格</view>
				<view class="desc">{{item.style}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacherList: []
			};
		},
		onLoad() {
			uni.request({
				url:this.server.teacherList(),
				withCredentials: true,
				success: (res) => {
					this.teacherList = res.data
				}
			})
		},
		methods:{
			onTeacherClick(tid){
				uni.navigateTo({
					url: '/pages/teacherDetail/teacherDetail?tid=' + tid
				})
			}
		}
	}
</script>

<style lang="scss">
.header{
	border-bottom: 5rpx solid $uni-border-color;
}
.title{
	width: 200rpx;
	padding: 20rpx;
	color: $iweb-theme-color;
	font-size: $uni-font-size-subtitle;
	border-bottom: 5rpx solid $iweb-theme-color-light;
}
.teacher{
	display: flex;
	border-bottom: 1rpx solid $uni-border-color;
	padding: 20rpx;
	.pic{
		width: 300rpx;
	}
	.detail{
		padding: 20rpx;
		.tname,.maincourse{
			font-size: $uni-font-size-base;
			color: $uni-color-warning;
			font-weight: bold;
			margin-right: 20rpx;
		}
		.tstyle{
			font-weight: bold;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}
		.desc{
			text-indent: 64rpx;
		}
	}
}
</style>
