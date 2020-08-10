<template>
	<view class="content">
		<view class="favorite-list" v-for="(item,index) in data" :key="index"  @click="onFavoriteClick(item.courseId)">
			<image  class="pic" :src="server.host + item.pic" mode="widthFix"></image>
			<view>
				<view class="title">{{item.title}}</view>
				<view class="price">{{item.price | currency}}</view>
				<view class="ftime">收藏时间：{{item.fTime | timeStamp}}</view>
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
				url: this.server.favoriteList(),
				withCredentials: true,
				success: (res) => {
					this.data = res.data
				}
			})
		},
		methods: {
			onFavoriteClick(cid){
				uni.navigateTo({
					url:'/pages/courseDetail/courseDetail?cid=' + cid
				})
			}
		}
	}
</script>

<style lang="scss">
.favorite-list{
	margin: 30rpx 20rpx;
	display: flex;
	align-items: center;
	.pic{
		width: 300rpx;
		margin-right: 20rpx;
	}
}
</style>
