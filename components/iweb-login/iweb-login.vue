<template>
	<view>
		<uni-card title="用户登录" is-shadow>
			<input type="text" v-model="uname" placeholder="请输入用户邮箱" />
			<input type="number" v-model="upwd" placeholder="请输入用户密码" password />
			<button class="btn" @click="onLogin">登录</button>
			<view class="goRegister" @click="goToRegister">注册新用户</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uname: '',
				upwd: ''
			};
		},
		methods: {
			onLogin(){
				let data = {
					uname: this.uname,
					upwd: this.upwd
				}
				uni.request({
					method: 'POST',
					data: data,
					url: this.server.userLogin(),
					withCredentials: true,					//携带身份凭证
					success: (res) => {
						let body = res.data
						// console.log(res)
						if(body.code===200){
							uni.showToast({
								title: '登录成功',
							})
							// 在客户端保持登录的信息
							// getApp().globalData.userInfo = body.userInfo
							uni.setStorage({
								key: 'userInfo',
								data: body.userInfo,
								success: () => {
									//登录成功,进入用户中心页面
									this.$emit('loginSucc')
								}
							})
						}else{
							uni.showModal({
								title: '错误',
								content: '登录失败,服务器异常:' + body.code + body.msg,
								showCancel: false
							})
						}
					}
				})
			},
			goToRegister(){
				this.$emit('changeShowLogin')
			},
		}
	}
</script>

<style lang="scss">
input{
	padding: 0rpx 20rpx;
	height: 3rem;
	border-bottom: 1rpx solid $uni-border-color;
}
.btn{
	margin: 30rpx 0;
}
.goRegister{
	text-align: right;
	color: $iweb-theme-color;
}
</style>
