<template>
	<view class="content">
		<!-- 轮播图开始 -->
		<swiper class="swiper" :indicator-dots="true" indicator-active-color="#fff" :autoplay="true" :interval="3000" :duration="250" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator :url="'/pages/courseDetail/courseDetail?cid=' + item.cid">
					<image :src="server.host + item.picUrl"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 轮播图结束 -->
		
		<!-- 最新课程开始 -->
		<view class="header">
			<view class="title">最新课程</view>
			<navigator open-type="switchTab" hover-class="more-active" class="more" url="/pages/course/course">更多</navigator>
		</view>
		<view class="course-list">
			<view class="course" v-for="(item,index) in courseNew" :key="index">
				<navigator :url="'../courseDetail/courseDetail?cid=' + item.cid">
					<image :src="server.host + item.pic" mode="widthFix"></image>
				</navigator>
				<view class="title">{{item.title}}</view>
				<view class="info">
					<view class="tname">讲师: {{item.tname}}</view>
					<view class="price">{{item.price | currency}}</view>
				</view>
			</view>
		</view>
		<!-- 最新课程结束 -->
		
		<!-- 热门课程开始 -->
		<view class="header">
			<view class="title">热门课程</view>
			<navigator open-type="switchTab" hover-class="more-active" class="more" url="/pages/course/course">更多</navigator>
		</view>
		<view class="course-list">
			<view class="course" v-for="(item,index) in courseHot" :key="index">
				<navigator :url="'../courseDetail/courseDetail?cid=' + item.cid">
					<image :src="server.host + item.pic" mode="widthFix"></image>
				</navigator>
				<view class="title">{{item.title}}</view>
				<view class="info">
					<view class="tname">讲师: {{item.tname}}</view>
					<view class="price">{{item.price | currency}}</view>
				</view>
			</view>
		</view>
		<!-- 热门课程结束 -->
		
		<!-- 名师堂开始 -->
		<view class="header">
			<view class="title">名师堂</view>
			<navigator open-type="switchTab" hover-class="more-active" class="more" url="/pages/teacher/teacher">更多</navigator>
		</view>
		<scroll-view class="teacher-list" scroll-x="true">
			<view class="teacher" v-for="(item,index) in teacherList" :key="index">
				<navigator :url="'../teacherDetail/teacherDetail?tid=' + item.tid">
					<image :src="server.host + item.tpic" mode="widthFix"></image>
				</navigator>
				<view class="tname">讲师: {{item.tname}}</view>
				<view class="maincourse">主讲: {{item.maincourse}}</view>
			</view>
		</scroll-view>
		<!-- 名师堂结束 -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				courseNew:[],
				courseHot:[],
				teacherList:[]
			}
		},
		onLoad(options) {
			uni.request({
				url: this.server.carousel(),
				withCredentials: true,
				success: (res)=>{
					this.swiperList = res.data
				}
			}),
			uni.request({
				url: this.server.courseNewest(),
				withCredentials: true,
				success: (res)=>{
					this.courseNew = res.data
				}
			}),
			uni.request({
				url: this.server.courseHottest(),
				withCredentials: true,
				success: (res)=>{
					this.courseHot= res.data
				}
			}),
			uni.request({
				url: this.server.teacherList(),
				withCredentials: true,
				success: (res)=>{
					this.teacherList= res.data
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
$swiper-height: 300rpx;				//轮播广告的高度
$swiper-width: 750rpx;				//轮播广告的宽度
.swiper{
	width: $swiper-width;
	height: $swiper-height;
	
		navigator{
			height: $swiper-height;
			
			image{
				width: $swiper-width;
				height: $swiper-height;
			}
		}
}
.header{
	display:  flex;
	justify-content: space-between;
	padding: 0rpx 30rpx;
	font-size: $uni-font-size-title;
	border-bottom: 1rpx solid $uni-border-color;
	.title{
		padding: 10rpx 0rpx;
		border-bottom: 5rpx solid $iweb-theme-color;
	}
	.more{
		padding-top: 15rpx;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
	}
	.more-active{
		color: $iweb-theme-color-reverse;
	}
}
.course-list{
	display: flex;
	flex-wrap: wrap;
	margin-top: 10rpx;
	
	.course{
		width: 375rpx;
		padding: 10rpx;
		text-align: center;
		
		image {
			width: 100%;
		}
		.title{
			font-size: $uni-font-size-base;
		}
		.info{
			display: flex;
			justify-content: space-around;
			margin-top: 10rpx;
		}
		.tname{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
		.price{
			font-size: $uni-font-size-lg;
		}
	}
}
.teacher-list{
	white-space: nowrap;
	.teacher{
		display: inline-block;
		width: 300rpx;
		padding: 10rpx 10rpx;
		text-align: center;
		
		image{
			width: 100%;
		}
		.tname{
			font-size: $uni-font-size-base;
		}
		.maincourse{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
	}
}
</style>
