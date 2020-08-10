<template>
	<view>
		<uni-card title="注册新用户" is-shadow>
			<input type="text" v-model="uname" placeholder="请输入用户邮箱" />
			<input type="text" v-model="upwd" placeholder="请输入登录密码" password />
			<input type="text" v-model="repwd" placeholder="请再次确认密码" password />
			<input type="number" v-model="phone" placeholder="请输入电话号码" />
			<input type="text" v-model="captcha" maxlength="5" placeholder="请输入验证码"/>
			<!-- 添加路由后面的参数,让验证码单击发起新请求刷新 -->
			<image class="captcha" :src="server.captchaRegister()+'?' + rand" @click="rand = Math.random()" mode="widthFix"></image>
			<button class="btn" @click="onRegister">注册</button>
			<view class="goLogin" @click="goToLogin">已注册?去登录!</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uname: '',
				upwd: '',
				repwd: '',
				phone: '',
				captcha: '',
				rand: Math.random()
			};
		},
		methods: {
			goToLogin(){
				this.$emit('changeShowLogin')
			},
			onRegister(){
				let data = {
					uname: this.uname,
					upwd: this.upwd,
					phone: this.phone,
					captcha:this.captcha.toLowerCase()
				}
				uni.request({
					method: 'POST',
					url: this.server.userRegister(),
					data: data,
					withCredentials: true,				//跨域请求时,携带身份凭证
					success: (res) => {
						// 更新验证码
						this.rand = Math.random()
						let body = res.data
						if(body.code===200){			//注册成功
							uni.showModal({
								title: '成功',
								content: '新用户注册成功! 点击"确定"去登录!',
								showCancel: true,
								success: (result) => {
									if(result.confirm){
										this.$emit('changeShowLogin')
									}
								}
							})
						}else{						//注册失败
							uni.showModal({
								title: '错误',
								content: '注册失败! 服务器异常:' + body.code + ',' + body.msg,
								showCancel: false
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
input{
	padding: 0rpx 20rpx;
	height: 3rem;
	border-bottom: 1rpx solid $uni-border-color;
}
.captcha{
	width: 100%;
}
.btn{
	margin: 30rpx 0;
}
.goLogin{
	text-align: right;
	color: $iweb-theme-color;
}
</style>
