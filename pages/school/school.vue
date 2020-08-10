<template>
	<view class="content">
		<view class="header">
			<view class="title">iWeb校区</view>
		</view>
		<view class="schoolList" v-for="(item,index) in data" :key="index" @click="onSchoolClick(item.sid)">
			<image class="address-img" src="/static/images/address.png" mode="widthFix"></image>
			<view class="detail">
				<view class="sname">{{item.sname}}</view>
				<view class="address">校区地址：{{item.address}}</view>
				<view class="phone">咨询电话：{{item.phone}}</view>
				<view class="postcode">邮编：{{item.postcode}}</view>
			</view>
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
		onLoad() {
			uni.request({
				url: this.server.schoolList(),
				withCredentials: true,
				success: (res) => {
					this.data = res.data
				}
			})
		},
		methods:{
			onSchoolClick(sid){
				uni.navigateTo({
					url: '/pages/schoolDetail/schoolDetail?sid=' + sid
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
	width: 210rpx;
	padding: 20rpx;
	color: $iweb-theme-color;
	font-size: $uni-font-size-subtitle;
	border-bottom: 5rpx solid $iweb-theme-color-light;
}
.schoolList{
	display: flex;
	align-items: center;
	margin: 30rpx;
	padding-bottom: 30rpx;
	border-bottom: 1rpx solid $uni-border-color;
	.address-img{
		width: 150rpx;
	}
	.detail{
		margin-left: 20rpx;
		.sname{
			font-size: $uni-font-size-subtitle;
			color: $iweb-theme-color-reverse;
			padding-bottom: 15rpx;
		}
		.address,.phone,.postcode{
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
			padding-bottom: 5rpx;
		}
	}
}

</style>
