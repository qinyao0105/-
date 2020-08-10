<template>
	<view class="user">
		<block v-if="user.uid">
			<!-- 头像 -->
			<image class="avatar" :src="server.host + user.avatar" mode="scaleToFill"></image>
			<view class="welcome">欢迎您！
				<text class="uname">{{user.uname}}</text>
			</view>
			<!-- 用户信息 -->
			<uni-collapse accordion>
				<uni-collapse-item title="我的信息" open>
					<view class="wrapper">
						<view class="row">
							<view class="label">用户：</view>
							<view>{{user.uname}}</view>
						</view>
						<view class="row">
							<view class="label">昵称：</view>
							<view>{{user.nickname}}</view>
						</view>
						<view class="row">
							<view class="label">电话：</view>
							<view>{{user.phone | phoneMask}}</view>
						</view>
						<view class="row">
							<view class="label">性别：</view>
							<view>{{user.sex}}</view>
						</view>
						<view class="row">
							<view class="label">年龄：</view>
							<view>{{user.age}}</view>
						</view>
						<view class="row">
							<view class="label">学历：</view>
							<view>{{user.edu}}</view>
						</view>
						<view class="row">
							<view class="label">职业：</view>
							<view>{{user.job}}</view>
						</view>
						
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="修改密码">
					<view class="wrapper">
						<input type="text" v-model="upwd" placeholder="请输入新密码" password />
						<input type="text" v-model="npwd" @blur="checkPassword" placeholder="请确认新密码" password />
						<button type="default" @click="updatePassword">提交修改</button>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="修改头像">
					<view class="wrapper">
						<button @click="changeAvatar">选择并上传</button>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="我的订单">
					<view class="wrapper">
						内容
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="我的收藏夹">
					<view class="favorite-box" v-for="(item,index) in favorite" :key="index" @click="onCourseClick(item.courseId)">
						<image class="pic" :src="server.host + item.pic" mode="widthFix"></image>
						<view class="detail">
							<view class="title">{{item.title}}</view>
							<view>
								价格：
								<text class="price">{{item.price | currency}}</text>
							</view>
							<view class="ftime">收藏时间：{{item.fTime | timeStamp}}</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</block>
		<view class="loading" v-else>
			数据加载中...
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},										//当前用户登录的完整信息
				favorite: [],
				upwd: '',
				npwd: ''
			};
		},
		mounted() {
			uni.request({
				url: this.server.userDetails(),
				withCredentials: true,
				success: (res) => {
					this.user = res.data
				}
			})
			uni.request({
				url: this.server.favoriteList(),
				withCredentials: true,
				success: (res) => {
					this.favorite = res.data
				}
			})
		},
		methods: {
			checkPassword(){
				if(this.upwd !== this.npwd){
					uni.showModal({
						title: '提示',
						content: '两次密码输入不一致!',
						complete: (result) => {
							if(result.confirm){				//点击确定跳转登录页面
								uni.switchTab({
									url: '/pages/userCenter/userCenter'
								})
							}
						}
					})
				}
			},
			updatePassword(){
				let data = {
					upwd: this.npwd
				}
				uni.request({
					method: 'POST',
					url: this.server.userUpdatePassword(),
					data: data,
					withCredentials: true,
					success: (result) => {
						uni.showModal({
							title: '提示',
							content: '修改成功!',
							complete: (result) => {
								if(result.confirm){
									this.$emit('changeAlreadyLogin')
								}
							}
						})
					}
				})
			},
			changeAvatar(){
				//①客户端选择一张本地图片
				uni.chooseImage({
					count: 1,		//限制选择的图片数量
					success: result=>{	//用户选择了一张图片
						//console.log(result)  //tempFiles、 tempFilePaths
						let filePath = result.tempFilePaths[0]//用户选择的图片路径
			
						//②客户端上传图片、服务器接收图片，并生成随机文件名
						//wx.uploadFile()此方法不支持修改withCredentials属性！！
						uni.uploadFile({
							url: this.server.userUploadAvatar(), //上传头像文件的API
							filePath: filePath,
							name: 'avatar',	//服务器端要读取的文件上传字段名
							success: res=>{
								//uni.uploadFile()不会自动把响应消息中的JSON对象解析为JS对象
								let body = JSON.parse(res.data)	//String=>Object
								let fileName = body.fileName //客户端上传的图片在服务器上存储文件名
								
								//③服务器把新文件名保存入数据库中
								uni.request({
									method: 'POST',
									url: this.server.userUpdateAvatar(), //更新头像路径
									data: {fileName: fileName},
									withCredentials: true,
									success: res=>{
										uni.showToast({
											title: '头像修改成功!'
										})
									}
								})
							}
						})
					}
				})
			},
			onCourseClick(cid){
				// 保留跳转到课程详情页
				uni.navigateTo({
					url:'/pages/courseDetail/courseDetail?cid=' + cid
				})
				
			}
		}
	}
</script>

<style lang="scss">
.user{
	.avatar{
		width: 140rpx;
		height: 140rpx;
		display: block;
		margin: 20rpx auto;
		box-shadow: 0 0 8rpx #999;
		border-radius: 50%;
	}
	.welcome{
		text-align: center;
		padding-bottom: 10rpx;
		.uname{
			color: $uni-color-error;
			font-size: $uni-font-size-subtitle;
		}
	}
	.wrapper{
		padding: 20rpx 25rpx 50rpx;
		background: lighten($uni-bg-color-grey, 1);
		input{
			height: 3em;
			border-bottom: 1rpx solid $uni-border-color;
		}
		.row{
			line-height: 1.5em;
			display: flex;
			.label{
				font-weight: bold;
				margin-right: 1em;
			}
		}
	}
	.favorite-box{
		padding: 20rpx 25rpx 50rpx;
		background: lighten($uni-bg-color-grey, 1);
		display: flex;
		align-items: center;
		.pic{
			width: 250rpx;
			margin-right: 20rpx;
		}
		.title{
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
	}
	.loading{
		margin: 50rpx;
		text-align: center;
	}
}

</style>
