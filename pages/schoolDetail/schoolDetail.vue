<template>
	<view class="content">
		<view class="header">
			<view>
				<image class="img" src="../../static/icon/course_active.png" mode="widthFix"></image>
			</view>
			<text class="sname">{{schoolList.sname}}</text>
		</view>
		<view class="header">
			<view>
				<image class="img" src="../../static/images/address.png" mode="widthFix"></image>
			</view>
			<text class="address">{{schoolList.address}}</text>
		</view>
		<view class="course" v-for="(item,index) in courseList" :key="index">
			<view>
				<image class="pic" :src="server.host + item.pic" mode="widthFix"></image>
			</view>
			<view class="info">
				<view class="title">开课时间：{{item.startTime}}</view>
				<view class="title">课时：{{item.cLength}}</view>
				<view class="price">{{item.price | currency}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolList: [],
				courseList: []
			};
		},
		onLoad(options){
			let sid = options.sid
			uni.request({
				url: this.server.schoolDetail(sid),
				withCredentials: true,
				success: (res) => {
					// console.log(res)
					this.schoolList = res.data.school
					this.courseList = res.data.courseList
				}
			})
		}
	}
</script>

<style lang="scss">
.content{
	padding: 20rpx;
}
.header{
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	.img{
		width: 80rpx;
	}
	.sname{
		font-size: $uni-font-size-title;
		font-weight: bold;
		padding-left: 10rpx;
	}
	.address{
		padding-left: 10rpx;
		font-size: $uni-font-size-lg;
	}
}
.course{
	display: flex;
	align-items: center;
	padding: 20rpx 0rpx;
	border-bottom: 1rpx solid $uni-border-color;
	.pic{
		width: 300rpx;
		margin-right: 15rpx;
	}
	.title{
		font-size: $uni-font-size-lg;
		padding-bottom: 10rpx;
	}
	.price{
		font-size: $uni-font-size-subtitle;
		color: $iweb-theme-color-reverse;
	}
}
</style>
