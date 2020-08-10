<template>
	<view class="content">
		<!-- 如果用户未登录 -->
		<block v-if="!alreadyLogin">
			<uni-transition :mode-class="['slide-left','fade']" :show="showLogin">
				<iweb-login @changeShowLogin="changeShowLogin" @loginSucc="changeLogin" class="transition-box"></iweb-login>
			</uni-transition>
			
			<uni-transition :mode-class="['slide-right','fade']" :show="!showLogin">
				<iweb-register @changeShowLogin="changeShowLogin" class="transition-box"></iweb-register>
			</uni-transition>
		</block>
		<!-- 如果用户已登录 -->
		<block v-else>
			<iweb-user-info @changeAlreadyLogin="changeAlreadyLogin"></iweb-user-info>
			<button class="logout" @click="logout">退出登录</button>
		</block>
	</view>
</template>

<script>
	import iwebLogin from '@/components/iweb-login/iweb-login'
	import iwebRegister from '@/components/iweb-register/iweb-register'
	import iwebUserInfo from '@/components/iweb-user-info/iweb-user-info'
	export default {
		components: {
			iwebLogin,
			iwebRegister,
			iwebUserInfo
		},
		data() {
			return {
				alreadyLogin: false,						//记录当前是否已登录
				showLogin: true,								//显示登录卡片
			};
		},
		onLoad(){
			// 读取本地缓存中存储的数据
			uni.getStorage({
				key: 'userInfo',
				success: result=>{
					this.alreadyLogin = true				//缓存中读取到了登录信息
				}
			})
		},
		methods: {
			changeShowLogin(){
				this.showLogin = !this.showLogin
			},
			changeLogin(){
				this.alreadyLogin= true
			},
			changeAlreadyLogin(){
				this.alreadyLogin= false
			},
			logout(){
				// 清除客户端的登录缓存
				uni.removeStorage({
					key: 'userInfo',
					success: () => {
						// 刷新当前页面
						this.alreadyLogin = false
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.transition-box{
	position: absolute;
	left: 0;
	right: 0;
}
.logout{
	margin: 50rpx 0;
}
</style>
