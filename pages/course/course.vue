<template>
	<view class="content">
		<!-- 顶部分页器 -->
		<uni-segmented-control class="segmented" :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#00be56"></uni-segmented-control>
		<!-- 课程列表 -->
		<uni-list class="list">
			<uni-list-item v-for="(item,index) in courseList" :key="index" @click="onCourseClick(item.cid)">
				<view class="course">
					<image class="pic" :src="server.host + item.pic" mode="widthFix"></image>
					<view class="details">
						<view class="title">{{item.title}}</view>
						<view class="tname">讲师: {{item.tname}}</view>
						<view class="cLength">课时: {{item.cLength}}</view>
					</view>
					<view class="price">{{item.price | currency}}</view>
				</view>
			</uni-list-item>
		</uni-list>
		<!-- 底部更多按钮 -->
		<button type="default" disabled>{{ hasMore?'loading...':'这次真没有了!' }}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['全部课程'],
				current: 0,						//当前选中的课程类别
				pageNum: 0,						//当前加载的哪一页数据
				hasMore: true,				//还有更多数据吗
				courseList: []
			};
		},
		onLoad() {
			uni.request({
				url: this.server.type(),
				withCredentials: true,
				success: (res) => {
					let arr = res.data.map((item,i)=>{
						return item.tpname
					})
					this.items = this.items.concat(arr)
				}
			}),
			this.getData();
		},
		onReachBottom() {				//滚动到底部事件
			this.getData()
		},
		// onPullDownRefresh() {
		// 	this.getData()
		// },
		methods:{
			onCourseClick(cid){
				// 保留跳转到课程详情页
				uni.navigateTo({
					url:'/pages/courseDetail/courseDetail?cid=' + cid
				})
				
			},
			onClickItem(e) {
				//console.log(e)   //{currentIndex: 当前选中项}
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					this.hasMore = true
					this.pageNum = 0						//重置当前页
					this.courseList = []				//加载其他类别时,清空上一个类别的课程
					//加载点击的课程数据
					this.getData()
				}
			},
			getData(){
				if(!this.hasMore){
					return
				}
				uni.showLoading({
					title: 'loading...',
					mask: true
				})
				this.pageNum++
				uni.request({
					url: this.server.courseList(this.pageNum,this.current),
					withCredentials: true,
					success: (res)=>{
						this.courseList = this.courseList.concat(res.data.courseList);
						this.pageNum = res.data.pageNum;
						if (this.pageNum >= res.data.pageCount){
							this.hasMore = false
						}
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.segmented{
	margin: 20rpx 30rpx 0rpx 30rpx;
}
.course{
	display: flex;
	align-items: center;
	.pic{
		width: 250rpx;
	}
	.details{
		flex: 1;
		padding: 0rpx 20rpx;
		overflow: hidden;
		.title{
			font-size: $uni-font-size-base;
			font-weight: bold;
			margin-bottom: 10rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.tname, .cLength{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
	}
}
</style>
