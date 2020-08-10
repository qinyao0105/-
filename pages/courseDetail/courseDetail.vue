<template>
	<view class="content">
		<view class="course" v-if="data.cid">
			<view class="header-title">{{data.title}}</view>
			<image class="pic" :src="server.host + data.pic" mode="widthFix"></image>
		</view>
		<view class="no-data" v-else>
			加载中...
		</view>
		<view class="container">
			<view class="info">
				<text class="title">讲师 ：</text>
				<navigator :url="'../teacherDetail/teacherDetail?tid=' + data.tid" class="tname">{{data.tname}}</navigator>
			</view>
			<view class="info">
				<text class="title">课时 ：</text>
				<text>{{ data.cLength }}</text>
			</view>
			<view class="info">
				<text class="title">开课时间 ：</text>
				<text>{{ data.startTime }}</text>
			</view>
			<view class="info">
				<view class="title">上课地点 ：</view>
				<navigator class="address" :url="'../schoolDetail/schoolDetail?sid=' + item.sid" v-for="(item,index) in school" :key="index">
					{{item.sname}}
				</navigator>
			</view>
		</view>
		<view class="price-box" v-if="data.cid">
			<view class="title">课程价格 ：</view>
			<view class="price">{{data.price | currency}}</view>
			<uni-fav :checked="false" bg-color="#00be56" bg-color-checked="#f60" fg-color="#fff" circle @click="addFavorite"></uni-fav>
		</view>
		<view class="course-desc">
			<view class="desc">课程详情</view>
		</view>
		<view class="details">
			<rich-text :nodes="data.details"></rich-text>
		</view>
		<!-- 底部商品导航 -->
		<uni-goods-nav class="cart" :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onOptionClick" @buttonClick="onButtonClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				uid: '',
				school: '',
				options: [{
							icon: 'more',
							text: '更多'
					}, {
							icon: 'star',
							text: '收藏夹',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
					}, {
							icon: 'cart',
							info: '',
							text: '购物车',
					}],
					buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options){
			uni.getStorage({
				key: 'userInfo',
				success: res=>{
					this.uid = res.data.uid
				}
			})
			let cid = options.cid
			// #ifdef H5
				if(!cid){
					uni.showLoading({
						title: '加载中...',
						showCancel: false,
						success: (res) => {
							// 销毁跳转
							uni.switchTab({
								url: '/pages/course/course'
							})
							return
						}
					})
				}
			// #endif
			uni.request({
				url: this.server.courseDetail(cid),
				withCredentials: true,
				success: (res) => {
					this.data = res.data
					this.school = res.data.schoolList
					uni.hideLoading()
				}
			})
			uni.request({
				url: this.server.cartList(),
				withCredentials: true,
				success: (res) => {
					this.options[2].info=res.data.length
				}
			})
		},
		methods:{
			onOptionClick (e) {
				if(e.index===0){
					uni.switchTab({
						url: '/pages/course/course'
					})
				}else if(e.index===1){
					if(!this.uid){
						uni.showModal({
							title: '提示',
							content: '您还未登录!点击"确定"跳转到登录页面!',
							complete: (result) => {
								if(result.confirm){				//点击确定跳转登录页面
									uni.switchTab({
										url: '/pages/userCenter/userCenter'
									})
								}
							}
						})
					}else{
						uni.navigateTo({
							url: '/pages/favorite/favorite'
						})
					}
				}else if(e.index===2){
					if(!this.uid){
						uni.showModal({
							title: '提示',
							content: '您还未登录!点击"确定"跳转到登录页面!',
							complete: (result) => {
								if(result.confirm){				//点击确定跳转登录页面
									uni.switchTab({
										url: '/pages/userCenter/userCenter'
									})
								}
							}
						})
					}else{
						uni.navigateTo({
							url: '/pages/cart/cart'
						})
					}
				}
			},
			onButtonClick (e) {
				// console.log(e)
				if(e.index===0){
					let data = {
						cid: this.data.cid
					}
					this.options[2].info++;
					uni.request({
						method: 'POST',
						url: this.server.cartAdd(),
						withCredentials: true,
						data: data,
						success: (res) => {
							uni.showToast({
								title: '成功加入购物车！'
							})
						}
					})
					uni.request({
						method: 'POST',
						url: this.server.cartUpdate(),
						withCredentials: true,
						data: data,
						success: (res) => {
							uni.showToast({
								title: '成功更新购物车！'
							})
						}
					})
					//否则请求购物车添加
				}else if(e.index===1){
					// 跳转到下单的页面
				}
			},
			addFavorite(){
				let data = {
					cid: this.data.cid
				}
				if(!this.uid){
					uni.showModal({
						title: '提示',
						content: '您还未登录!点击"确定"跳转到登录页面!',
						complete: (result) => {
							if(result.confirm){				//点击确定跳转登录页面
								uni.switchTab({
									url: '/pages/userCenter/userCenter'
								})
							}
						}
					})
				}else{
					uni.request({
						method: 'POST',
						url: this.server.favoriteAdd(),
						data: data,
						withCredentials: true,
						success: (res) => {
							if(res.data.code === 490){					//登录超时
								uni.showModal({
									title: '提示',
									content: '会话超时! 点击"确定"跳转到登录页面',
									complete: (result) => {
										if(result.confirm){
											uni.switchTab({
												url: '/pages/userCenter/userCenter'
											})
										}
									}
								})
							}else if(res.data.code === 200){		//收藏成功
								uni.showToast({
									title: '收藏成功!'
								})
							}else if(res.data.code === 201){		//收藏过,重新更新收藏时间
								uni.showToast({
									title: '收藏时间已更新'
								})
							}else{			//收藏失败
								uni.showModal({
									title: '错误!',
									content: '收藏失败!请稍后重试!',
									showCancel: false
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.course{
	.header-title{
		font-size: $uni-font-size-subtitle;
		font-weight: bold;
		text-align: center;
		padding: 10rpx;
	}
	.pic{
		width: 100%;
	}
}
.no-data{
	text-align: center;
	color: $uni-text-color-grey;
	margin: 60rpx 0;
}
.container{
	background: $uni-bg-color-grey;
	margin-top: 20rpx;
	padding: 20rpx 0;
	.info{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.title{
			font-size: $uni-font-size-lg;
			font-weight: bold;
			padding: 5rpx 15rpx;
		}
		.address{
			margin-left: 10rpx;
		}
		.tname,.address{
			color: $iweb-theme-color-light;
			font-weight: bold;
			display: inline;
			white-space: pre-wrap;
		}
	}
}
.course-desc{
	display: flex;
	border-bottom: 1rpx solid $uni-border-color;
	padding-left: 15rpx;
	.desc{
		border-bottom:2rpx solid $iweb-theme-color-light;
		font-size: $uni-font-size-subtitle;
		padding: 15rpx 0;
		font-weight: bold;
	}
}
.details{
	padding: 15rpx;
	margin-bottom: 100rpx;
}
.price-box{
	display: flex;
	padding: 15rpx;
	.title{
		font-size: $uni-font-size-lg;
		font-weight: bold;
	}
	.price{
		font-size: $uni-font-size-lg;
		margin-right: 55px;
	}
}

.cart{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
